import { useState } from 'react'
import { stores } from '../../data/stores'
import { SectionEyebrow } from '../ui/SitePrimitives'

const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim() || 'gykfastigheter@gmail.com'

export function ContactForm({ initialType = 'Allmän fråga' }) {
  const [type, setType] = useState(initialType)
  const [notice, setNotice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEvent = type === 'Eventförfrågan'
  const isStore = type === 'Butiksfråga'

  async function handleSubmit(event) {
    event.preventDefault()

    if (!contactEmail) {
      setNotice('Konfigurera VITE_CONTACT_EMAIL i .env.local eller .env för att skicka formuläret till din e-post.')
      return
    }

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      _subject: `Ny förfrågan: ${formData.get('subject') || 'Kontakt'} `,
      _captcha: 'false',
      _template: 'table',
      name: formData.get('name') || '',
      email: formData.get('email') || '',
      phone: formData.get('phone') || '',
      subject: formData.get('subject') || '',
      store: formData.get('store') || '',
      eventType: formData.get('eventType') || '',
      eventDate: formData.get('eventDate') || '',
      eventLocation: formData.get('eventLocation') || '',
      budget: formData.get('budget') || '',
      message: formData.get('message') || '',
    }

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000)
      setIsSubmitting(true)
      setNotice('')

      let response
      try {
        response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(contactEmail)}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        })
      } finally {
        clearTimeout(timeoutId)
      }

      if (!response.ok) {
        throw new Error('Nätverksfel')
      }

      form.reset()
      setType(initialType)
      setNotice('Tack! Ditt meddelande har skickats och kommer nu till din e-post.')
    } catch (error) {
      setNotice(
        error.name === 'AbortError'
          ? 'Det tar längre tid än väntat att skicka meddelandet. Kontrollera din e-post innan du försöker igen.'
          : 'Något gick fel när formuläret skulle skickas. Kontrollera e-postadressen eller försök igen lite senare.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>Namn<input name="name" autoComplete="name" required /></label>
        <label>E-post<input name="email" type="email" autoComplete="email" required /></label>
        <label>Telefonnummer<input name="phone" type="tel" autoComplete="tel" /></label>
        <label>Ärende
          <select name="subject" value={type} onChange={(event) => setType(event.target.value)}>
            <option>Allmän fråga</option><option>Butiksfråga</option><option>Eventförfrågan</option>
          </select>
        </label>
        {isStore && <label className="form-full">Butik
          <select name="store" defaultValue=""><option value="" disabled>Välj butik</option>
            {stores.map((store) => <option key={store.slug} value={store.slug}>{store.name} – {store.city}</option>)}
          </select>
        </label>}
        {isEvent && <>
          <label>Typ av event<input name="eventType" required /></label>
          <label>Datum<input name="eventDate" type="date" /></label>
          <label>Ort eller plats<input name="eventLocation" required /></label>
          <label>Ungefärlig budget <span className="optional">Frivilligt</span><input name="budget" inputMode="decimal" /></label>
        </>}
        <label className="form-full">Meddelande<textarea name="message" rows="5" required /></label>
      </div>
      <div className="form-actions">
        <button className="button button-gold" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Skickar…' : 'Skicka förfrågan'} <span aria-hidden="true">↗</span>
        </button>
        <span className="form-privacy">Genom att skicka godkänner du att vi hanterar dina uppgifter för att besvara din fråga.</span>
      </div>
      {notice && <p className="form-result" role="status">{notice}</p>}
    </form>
  )
}

export function ContactSection({ compact = false, initialType }) {
  return (
    <section className={`contact-section${compact ? ' contact-section-compact' : ''}`} id="kontakt">
      <div className="contact-copy">
        <SectionEyebrow light>VI HÖR GÄRNA FRÅN DIG</SectionEyebrow>
        <h2>Planerar du något att fira?</h2>
        <p>Berätta om dina planer eller skicka oss en fråga. Vi återkommer så snart vi kan.</p>
        <span className="contact-rule" />
      </div>
      <ContactForm initialType={initialType} />
    </section>
  )
}