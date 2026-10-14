import { useState } from 'react'
import StoreGrid from '../components/stores/StoreGrid'
import { Breadcrumbs, ButtonLink, SectionEyebrow } from '../components/ui/SitePrimitives'
import { STORE_HERO_IMAGE, VULCAN_URL } from '../data/siteContent'

export default function StoresPage() {
  const [city, setCity] = useState('Alla orter')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="inner-page stores-page">
      <section className="stores-page-hero">
        <img src={STORE_HERO_IMAGE} alt="Fyrverkerier lyser upp natthimlen" fetchPriority="high" />
        <div className="stores-page-shade" />
        <div className="stores-page-hero-content wrap">
          <Breadcrumbs current="Våra butiker" light />
          <SectionEyebrow light>VÅRT NÄTVERK / 12 FÖRSÄLJNINGSPLATSER</SectionEyebrow>
          <h1>Hitta din GYK-butik</h1>
          <p>Våra 12 försäljningsplatser finns på åtta orter. Välj en plats för adress, vägbeskrivning och vidare länk till Vulcan.</p>
          <div className="stores-page-stats"><strong>12 <span>platser</span></strong><i /><strong>8 <span>orter</span></strong></div>
        </div>
      </section>
      <section className="section-pad wrap">
        <label className="store-search">
          <span>Sök butik</span>
          <input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Sök efter namn, adress eller ort…" />
        </label>
        <StoreGrid selectedCity={city} onCityChange={setCity} searchQuery={searchQuery} showMap />
      </section>
      <div className="vulcan-band"><p>Sortiment och beställning hanteras hos Vulcan.</p><ButtonLink href={VULCAN_URL} variant="outline" external>Besök Vulcan Europe</ButtonLink></div>
    </main>
  )
}