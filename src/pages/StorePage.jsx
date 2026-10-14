import { STORE_HERO_IMAGE, VULCAN_URL } from '../data/siteContent'
import { Breadcrumbs, ButtonLink, SectionEyebrow } from '../components/ui/SitePrimitives'

export default function StorePage({ store }) {
  const mapQuery = `${store.address}, ${store.city}, Sverige`
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`
  const holidayOpeningHours = [
    { date: '26 dec', hours: '10:00–20:00' },
    { date: '27 dec', hours: '10:00–20:00' },
    { date: '28 dec', hours: '10:00–20:00' },
    { date: '29 dec', hours: '10:00–20:00' },
    { date: '30 dec', hours: '10:00–20:00' },
    { date: '31 dec', hours: '10:00–16:00' },
  ]

  return (
    <main className="inner-page store-detail">
      <Breadcrumbs current={store.name} ancestors={[{ label: 'Våra butiker', href: '/butiker' }]} />
      <section className="store-detail-hero">
        <img src={STORE_HERO_IMAGE} alt="Illustrationsbild med fyrverkerier, inte ett foto av försäljningsplatsen" />
        <div className="store-detail-shade" />
        <div className="store-detail-content wrap"><SectionEyebrow light>{store.city.toUpperCase()} / FÖRSÄLJNINGSPLATS</SectionEyebrow><h1>GYK Fireworks <em>– {store.name}, {store.city}</em></h1><p>{store.name} är en av GYK Fireworks försäljningsplatser. Välkommen till {store.address}, {store.city}.</p></div>
        <span className="image-disclaimer">Illustrationsbild · visar inte butiken</span>
      </section>
      <section className="store-info wrap">
        <div className="store-address"><SectionEyebrow>BESÖK OSS</SectionEyebrow><h2>{store.name}</h2><p>{store.address}<br />{store.city}</p><div className="hours-card"><span className="hours-label">Öppettider</span><ul className="hours-list">{holidayOpeningHours.map(({ date, hours }) => (<li key={date}><span>{date}</span><strong>{hours}</strong></li>))}</ul></div><ButtonLink href={mapUrl} variant="navy" external>Hitta hit</ButtonLink></div>
        <div className="store-order"><SectionEyebrow>SORTIMENT & BESTÄLLNING</SectionEyebrow><h2>Fortsätt till Vulcan</h2><p>Sortiment och beställning hanteras hos Vulcan. En specifik butikslänk har inte lagts till ännu.</p><ButtonLink href={VULCAN_URL} variant="gold" external>Besök Vulcan</ButtonLink></div>
      </section>
      <section className="store-detail-foot wrap"><p>Har du en fråga om den här försäljningsplatsen?</p><a className="text-link" href="/kontakt?arende=butik">Kontakta GYK <span aria-hidden="true">↗</span></a><a className="back-link" href="/butiker">← Till alla butiker</a></section>
    </main>
  )
}