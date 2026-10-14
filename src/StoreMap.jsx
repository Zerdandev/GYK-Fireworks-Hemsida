import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import { storePath } from './data/stores'
import './StoreMap.css'

const pin = L.divIcon({
  className: 'store-map-pin',
  iconSize: [38, 48],
  iconAnchor: [19, 47],
  popupAnchor: [0, -43],
  html: '<svg viewBox="0 0 38 48" aria-hidden="true"><path d="M19 1C9 1 1 9 1 19c0 13 18 28 18 28s18-15 18-28C37 9 29 1 19 1Z" fill="currentColor" stroke="#f8e8ca" stroke-width="1.5"/><g stroke="#080f1e" stroke-width="1.5" stroke-linecap="round"><path d="M19 8v6m0 10v6M8 19h6m10 0h6M11 11l4 4m8 8 4 4m0-16-4 4m-8 8-4 4"/><circle cx="19" cy="19" r="2" fill="#080f1e"/></g></svg>',
})

function popupFor(store) {
  const content = document.createElement('div')
  content.className = 'store-map-popup'
  const city = document.createElement('span')
  city.className = 'store-map-popup-city'
  city.textContent = store.city
  const heading = document.createElement('h3')
  heading.textContent = store.name
  const address = document.createElement('p')
  address.textContent = store.address
  content.append(city, heading, address)
  if (store.coordinatesApproximate) {
    const note = document.createElement('p')
    note.className = 'store-map-approximate'
    note.textContent = 'Ungefärligt läge. Se adressen för vägbeskrivning.'
    content.append(note)
  }
  const links = document.createElement('div')
  links.className = 'store-map-popup-links'
  const details = document.createElement('a')
  details.href = storePath(store)
  details.textContent = 'Se butiken →'
  const directions = document.createElement('a')
  directions.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${store.address}, ${store.city}, Sverige`)}`
  directions.target = '_blank'
  directions.rel = 'noreferrer'
  directions.textContent = 'Hitta hit ↗'
  directions.setAttribute('aria-label', `Vägbeskrivning till ${store.name} (öppnas i ny flik)`)
  links.append(details, directions)
  content.append(links)
  return content
}

export default function StoreMap({ stores }) {
  const container = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef(null)
  const [tilesUnavailable, setTilesUnavailable] = useState(false)

  useEffect(() => {
    const map = L.map(container.current, {
      center: [59.5, 15], zoom: 7, minZoom: 4, maxZoom: 18,
      scrollWheelZoom: false, zoomControl: false,
    })
    mapRef.current = map
    L.control.zoom({ position: 'bottomright', zoomInTitle: 'Zooma in', zoomOutTitle: 'Zooma ut' }).addTo(map)
    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
      className: 'store-map-tiles',
    }).addTo(map)
    tiles.on('tileerror', () => setTilesUnavailable(true))
    tiles.on('load', () => {
      const loaded = [...(container.current?.querySelectorAll('.leaflet-tile-loaded') || [])].some((tile) => tile.naturalWidth > 0)
      if (loaded) setTilesUnavailable(false)
    })
    markersRef.current = L.markerClusterGroup({
      maxClusterRadius: 36,
      showCoverageOnHover: false,
      animate: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      spiderfyOnMaxZoom: true,
      iconCreateFunction: (cluster) => L.divIcon({
        className: 'store-map-cluster', iconSize: [44, 44],
        html: `<span aria-label="${cluster.getChildCount()} butiker. Zooma in för att se dem.">${cluster.getChildCount()}</span>`,
      }),
    }).addTo(map)
    const resizeObserver = new ResizeObserver(() => map.invalidateSize({ pan: false }))
    resizeObserver.observe(container.current)
    return () => {
      resizeObserver.disconnect()
      tiles.off()
      map.remove()
      mapRef.current = null
      markersRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const markers = markersRef.current
    if (!map || !markers) return
    markers.clearLayers()
    stores.forEach((store) => {
      const marker = L.marker(store.coordinates, {
        icon: pin, title: `${store.name}, ${store.city}`, alt: `${store.name}, ${store.city}`,
      }).bindPopup(() => popupFor(store), { maxWidth: 260, minWidth: 210 })
      markers.addLayer(marker)
    })
    if (stores.length) {
      map.fitBounds(L.latLngBounds(stores.map((store) => store.coordinates)), {
        padding: [48, 58], maxZoom: 14, animate: false,
      })
    }
  }, [stores])

  function resetView() {
    if (!stores.length) return
    mapRef.current?.fitBounds(L.latLngBounds(stores.map((store) => store.coordinates)), {
      padding: [48, 58], maxZoom: 14, animate: false,
    })
  }

  return (
    <div className="store-map-section">
      <div className="store-map-heading">
        <div><h2>Hitta oss på kartan</h2><p>Klicka på en markör för butik och vägbeskrivning.</p></div>
        <button type="button" className="store-map-reset" onClick={resetView} disabled={!stores.length}>Visa hela urvalet</button>
      </div>
      <a className="store-map-skip" href="#butikslista">Hoppa till butikslistan</a>
      <div className="store-map-frame">
        <div className="store-map" ref={container} role="region" aria-label="Karta över GYK:s butiker" aria-describedby="store-map-help" />
        {!stores.length && <p className="store-map-empty" role="status">Inga butiker matchar din sökning.</p>}
      </div>
      {tilesUnavailable && <p className="store-map-status" role="status">Kartbakgrunden kunde inte laddas. Du hittar alla adresser och butikslänkar i listan nedanför.</p>}
      <p className="store-map-help" id="store-map-help"><span className="store-map-legend" aria-hidden="true" />GYK-butik <span>En siffra samlar flera butiker – klicka för att zooma in.</span></p>
    </div>
  )
}
