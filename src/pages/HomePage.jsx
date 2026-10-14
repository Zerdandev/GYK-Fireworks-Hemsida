import { useState } from 'react'
import homeHeroImage from '../assets/Älg vid skogssjö med fyrverkerier.png'
import AboutSection from '../components/about/AboutSection'
import { ContactSection } from '../components/contact/ContactForm'
import StoreGrid from '../components/stores/StoreGrid'
import { ArrowIcon, Breadcrumbs, ButtonLink, SectionEyebrow } from '../components/ui/SitePrimitives'
import { EVENT_IMAGES } from '../data/siteContent'

export default function HomePage() {
  const [city, setCity] = useState('Alla orter')

  return (
    <>
      <section className="home-hero">
        <img className="hero-photo" src={homeHeroImage} alt="Älg vid en skogssjö medan fyrverkerier lyser upp natthimlen" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <Breadcrumbs current="Startsida" standalone={false} light />
          <SectionEyebrow light>SVERIGES STÖRSTA ÅTERFÖRSÄLJARE FÖR VULCAN EUROPE</SectionEyebrow>
          <h1>Stora ögonblick förtjänar en <em>storslagen himmel.</em></h1>
          <p>Upptäck fyrverkerier från Vulcan hos våra 12 försäljningsplatser eller kontakta oss inför ditt nästa firande.</p>
          <div className="hero-actions">
            <ButtonLink href="/butiker" variant="gold">Hitta din butik</ButtonLink>
            <ButtonLink href="/kontakt?arende=event" variant="outline">Förfrågan om event</ButtonLink>
          </div>
        </div>
        <a className="scroll-cue" href="#narmare">Scrolla för att upptäcka <span aria-hidden="true">↓</span></a>
        <span className="hero-caption">GYK FIREWORKS <i /> VULCAN EUROPE</span>
      </section>
      <section className="position-strip" id="narmare" aria-label="GYK Fireworks i siffror">
        <div className="position-inner wrap">
          <div><strong>12</strong><span>försäljningsplatser</span></div>
          <div><strong>8</strong><span>orter</span></div>
          <div className="position-claim"><span>Sveriges största</span><span>återförsäljare för Vulcan Europe</span></div>
        </div>
      </section>
      <section className="pathways section-pad wrap">
        <div className="section-heading reveal"><SectionEyebrow>TVÅ SÄTT ATT BÖRJA</SectionEyebrow><h2>Vad planerar du?</h2></div>
        <div className="pathway-grid">
          <article className="pathway-card pathway-shop reveal">
            <img src="https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=1200&q=85" alt="Händer håller sprakande tomtebloss i mörkret" loading="lazy" />
            <div className="pathway-overlay" />
            <div className="pathway-content"><span>01 / NYÅR & FIRANDE</span><h3>Fyrverkerier till nyår</h3><p>Hitta din närmaste GYK-butik och gå vidare till Vulcan för sortiment och beställning.</p><ButtonLink href="/butiker" variant="light">Se våra butiker</ButtonLink></div>
          </article>
          <article className="pathway-card pathway-event reveal">
            <img src={EVENT_IMAGES[1]} alt="Festlokal förberedd för ett firande" loading="lazy" />
            <div className="pathway-overlay" />
            <div className="pathway-content"><span>02 / EVENT & SHOW</span><h3>Fyrverkerier till ditt event</h3><p>Bröllop, företagsfest eller ett annat tillfälle värt att fira? Berätta om dina planer.</p><ButtonLink href="/kontakt?arende=event" variant="gold">Skicka en förfrågan</ButtonLink></div>
          </article>
        </div>
      </section>
      <section className="stores-section section-pad">
        <div className="wrap">
          <div className="section-heading stores-heading reveal">
            <div><SectionEyebrow>HITTA DIN NÄRMASTE</SectionEyebrow><h2>12 platser. 8 orter.</h2></div>
            <a className="text-link" href="/butiker">Alla våra butiker <span aria-hidden="true"><ArrowIcon /></span></a>
          </div>
          <StoreGrid selectedCity={city} onCityChange={setCity} compact />
        </div>
      </section>
      <AboutSection />
      <ContactSection compact />
    </>
  )
}