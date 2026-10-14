import { useEffect } from 'react'

const pageMetadata = {
  '/': ['GYK Fireworks | Stora ögonblick förtjänar en storslagen himmel', 'Sveriges största återförsäljare för Vulcan Europe. Hitta din GYK-butik eller kontakta oss inför ditt event.'],
  '/butiker': ['Våra butiker | GYK Fireworks', 'Hitta GYK Fireworks försäljningsplatser på åtta orter i Sverige.'],
  '/event': ['Event & fyrverkerishower | GYK Fireworks', 'Berätta om bröllop, fest, företagsevent eller ett större firande.'],
  '/om-gyk': ['Om GYK Fireworks', 'Lär känna GYK Fireworks och vårt nätverk av försäljningsplatser.'],
  '/kontakt': ['Kontakt | GYK Fireworks', 'Skicka en fråga om en butik eller berätta om ditt kommande event.'],
  '/integritet': ['Integritetsinformation | GYK Fireworks', 'Information om formulär och personuppgiftshantering.'],
}

export default function usePageMeta(path, selectedStore) {
  useEffect(() => {
    const details = selectedStore
      ? [`GYK Fireworks – ${selectedStore.name}, ${selectedStore.city}`, `${selectedStore.name}, ${selectedStore.address}, ${selectedStore.city}. Hitta hit och besök Vulcan Europe.`]
      : pageMetadata[path] || ['Sidan hittades inte | GYK Fireworks', 'GYK Fireworks, Sveriges största återförsäljare för Vulcan Europe.']

    document.title = details[0]
    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = details[1]

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [path, selectedStore])
}