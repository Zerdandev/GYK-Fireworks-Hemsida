export const stores = [
  // Coordinates are [latitude, longitude]. See docs/store-map-sources.md.
  { slug: 'orebro-handlarn', name: "Handlar'n Återförsäljare", city: 'Örebro', address: 'Järnvägsgatan 13', coordinates: [59.277077, 15.219784], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-myrmalm/sortiment/' },
  { slug: 'katrineholm', name: 'Katrineholm', city: 'Katrineholm', address: 'Uppsalavägen 1', coordinates: [59.0050632, 16.2319854], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-katrineholm/sortiment/' },
  { slug: 'kristinehamn', name: 'Kristinehamn', city: 'Kristinehamn', address: 'Albinvägen 2', coordinates: [59.3128608, 14.1011979], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-kristinehamn/sortiment/' },
  { slug: 'linkoping-tornby', name: 'Tornby', city: 'Linköping', address: 'Norra Svedengatan 34', coordinates: [58.4331659, 15.5999638], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-vansbro/sortiment/' },
  { slug: 'orebro-netonnet', name: 'NetOnNet', city: 'Örebro', address: 'Åbyvägen 1', coordinates: [59.2661803, 15.169961], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-netonnet/sortiment/' },
  { slug: 'kumla', name: 'Kumla', city: 'Kumla', address: 'Västra Drottninggatan 46', coordinates: [59.13024, 15.12395], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-kumla/sortiment/' },
  { slug: 'norrkoping-ingelsta', name: 'Ingelsta', city: 'Norrköping', address: 'Koppargatan 30', coordinates: [58.6231362, 16.1559136], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-ingelstad/sortiment/' },
  { slug: 'orebro-motonet', name: 'Marieberg Motonet Parkering', city: 'Örebro', address: 'Säljarevägen 5 C', coordinates: [59.2196912, 15.1397459], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-marieberg/sortiment/' },
  { slug: 'orebro-lillans-gatukok', name: "Lillåns Gatukök", city: 'Örebro', address: 'Klockarängsvägen 1', coordinates: [59.3163, 15.2304], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-lillan-gatukok/sortiment/' },
  { slug: 'orebro-sorbybacken', name: 'Sörbybacken', city: 'Örebro', address: 'Sörbyvägen 4', coordinates: [59.2490765, 15.2305729], coordinatesApproximate: true, vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-sorbacken/sortiment/' },
  { slug: 'karlstad', name: 'Karlstad', city: 'Karlstad', address: 'Ullebergsleden 10', coordinates: [59.3750447, 13.4397568], vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-karlstad/sortiment/' },
  { slug: 'vasteras-erikslund', name: 'Erikslund', city: 'Västerås', address: 'Hallsta Gårdsgata 13', coordinates: [59.61222, 16.4593194], coordinatesApproximate: true, vulcanUrl: 'https://vulcaneurope.se/aterforsaljare/gyk-vasteras/sortiment/' },
]

export const cities = [
  'Alla orter', 'Örebro', 'Katrineholm', 'Kristinehamn',
  'Linköping', 'Kumla', 'Norrköping', 'Karlstad', 'Västerås',
]

export const storePath = (store) => `/butiker/${store.slug}`
