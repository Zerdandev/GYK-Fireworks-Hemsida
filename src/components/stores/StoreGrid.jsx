import { lazy, Suspense } from 'react'
import { cities, storePath, stores } from '../../data/stores'

const StoreMap = lazy(() => import('../../StoreMap'))

export default function StoreGrid({ selectedCity = 'Alla orter', onCityChange, compact = false, showMap = false, searchQuery = '' }) {
  const query = searchQuery.trim().toLocaleLowerCase('sv')
  const filteredStores = stores.filter((store) => (
    (selectedCity === 'Alla orter' || store.city === selectedCity)
    && `${store.name} ${store.address} ${store.city}`.toLocaleLowerCase('sv').includes(query)
  ))

  return (
    <>
      <div className="store-toolbar">
        <label className="filter-label" htmlFor="city-filter">Filtrera efter ort</label>
        <select id="city-filter" value={selectedCity} onChange={(event) => onCityChange(event.target.value)}>
          {cities.map((city) => <option key={city}>{city}</option>)}
        </select>
        <p className="store-count" aria-live="polite">{filteredStores.length} {filteredStores.length === 1 ? 'försäljningsplats' : 'försäljningsplatser'}</p>
      </div>
      {showMap && <Suspense fallback={<p className="store-map-loading" role="status">Laddar kartan…</p>}><StoreMap stores={filteredStores} /></Suspense>}
      {!filteredStores.length && <p className="store-search-empty">Inga butiker hittades. Prova en annan sökning eller välj en annan ort.</p>}
      <div id={showMap ? 'butikslista' : undefined} className={`store-grid${compact ? ' store-grid-compact' : ''}`}>
        {filteredStores.map((store, index) => (
          <a className={`store-card${showMap ? '' : ' reveal'}`} key={store.slug} href={storePath(store)}>
            <span className="store-card-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="store-card-city">{store.city}</span>
            <h3>{store.name}</h3>
            <p>{store.address}</p>
            <span className="store-card-link">Upptäck butiken <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </>
  )
}