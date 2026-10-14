import { ContactForm } from '../components/contact/ContactForm'
import { PageHeading, SectionEyebrow } from '../components/ui/SitePrimitives'

export default function ContactPage() {
  const params = new URLSearchParams(window.location.search)
  const initialType = params.get('arende') === 'event' ? 'Eventförfrågan' : params.get('arende') === 'butik' ? 'Butiksfråga' : 'Allmän fråga'

  return (
    <main className="inner-page contact-page">
      <PageHeading breadcrumb="Kontakt" eyebrow="KONTAKT" title="Vad kan vi hjälpa dig med?" intro="Skicka en fråga om en försäljningsplats eller berätta om ditt kommande event." />
      <section className="contact-details wrap" aria-label="Kontaktuppgifter">
        <SectionEyebrow>KONTAKTUPPGIFTER</SectionEyebrow>
        <div className="contact-detail-grid">
          <div><span>Kontaktperson</span><strong>Zerdan Geyik</strong></div>
          <div><span>Telefon</span><a href="tel:+46737587342">+46 73 758 73 42</a></div>
          <div><span>E-post</span><a href="mailto:gykfastigheter@gmail.com">gykfastigheter@gmail.com</a></div>
        </div>
      </section>
      <div className="contact-page-form wrap"><ContactForm initialType={initialType} /></div>
    </main>
  )
}