import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { stores } from '../src/stores.js'

// One-time address verification. Cache every response and keep requests sequential.
// Usage policy: https://operations.osmfoundation.org/policies/nominatim/
const cachePath = new URL('../.verification/geocoding.json', import.meta.url)
await mkdir(new URL('../.verification/', import.meta.url), { recursive: true })
const cache = JSON.parse(await readFile(cachePath, 'utf8').catch(() => '{}'))
for (const store of stores) {
  const key = `${store.address}, ${store.city}`
  if (!cache[key]) {
    const params = new URLSearchParams({
      format: 'jsonv2', countrycodes: 'se', country: 'Sweden',
      street: store.address, city: store.city, addressdetails: '1', limit: '3',
    })
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { 'User-Agent': 'GYKFireworksWebsite/1.0 (one-time store address verification)' },
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`Geocoding failed: ${response.status}`)
    cache[key] = { checkedAt: new Date().toISOString(), results: await response.json() }
    await writeFile(cachePath, JSON.stringify(cache, null, 2) + '\n')
    await new Promise((resolve) => setTimeout(resolve, 1100))
  }
  console.log(JSON.stringify({ slug: store.slug, ...cache[key] }))
}
