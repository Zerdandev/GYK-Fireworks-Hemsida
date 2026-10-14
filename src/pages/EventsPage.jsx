import { ButtonLink, SectionEyebrow } from '../components/ui/SitePrimitives'
import { EVENT_IMAGES } from '../data/siteContent'

export default function EventsPage() {
  const occasions = [
    { title: 'Bröllop', image: EVENT_IMAGES[1], alt: 'Dekorerad lokal inför en bröllopsfest' },
    { title: 'Privata fester & jubileer', image: EVENT_IMAGES[0], alt: 'Gäster samlas till ett firande' },
    { title: 'Företagsevent & invigningar', image: EVENT_IMAGES[2], alt: 'Publik vid ett större evenemang' },
    { title: 'Festivaler & större evenemang', image: EVENT_IMAGES[3], alt: 'Kvällsljus över en festlig utomhusmiljö' },
  ]

  return (
    <main className="inner-page events-page">
      <section className="events-hero"><img src={EVENT_IMAGES[2]} alt="Publik vid ett större kvällsevenemang" /><div className="hero-shade" /><div className="wrap events-hero-copy"><SectionEyebrow light>EVENT & FYRVERKERISHOWER</SectionEyebrow><h1>Ge ditt firande en <em>storslagen final.</em></h1><p>Bröllop, jubileum eller företagsevent. Berätta om tillfället, platsen, datumet och dina önskemål.</p><ButtonLink href="/kontakt?arende=event" variant="gold">Berätta om ditt event</ButtonLink></div></section>
      <section className="occasion-section section-pad wrap"><div className="section-heading"><SectionEyebrow>ETT ÖGONBLICK ATT MINNAS</SectionEyebrow><h2>Fira stort, på ditt sätt.</h2></div><div className="occasion-grid">{occasions.map((item) => <article className="occasion-card reveal" key={item.title}><img src={item.image} alt={item.alt} loading="lazy" /><h3>{item.title}</h3></article>)}</div></section>
      <section className="event-callout"><div className="wrap"><SectionEyebrow light>BERÄTTA MER</SectionEyebrow><h2>Var börjar din idé?</h2><p>Skicka en förfrågan med tillfälle, plats, datum och önskemål. Vi kan återkomma när formuläret är anslutet.</p><ButtonLink href="/kontakt?arende=event" variant="gold">Berätta om ditt event</ButtonLink></div></section>
    </main>
  )
}