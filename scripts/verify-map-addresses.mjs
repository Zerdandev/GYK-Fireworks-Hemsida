import { readFile, writeFile } from 'node:fs/promises'

const cachePath = new URL('../.verification/map-addresses.json', import.meta.url)
const cache = JSON.parse(await readFile(cachePath, 'utf8').catch(() => '{}'))
for (const query of ['Motonet, Örebro', 'Säljarevägen 5C, Örebro', 'Sörbybacken, Örebro', 'Lillåns grill, Örebro']) {
  if (!cache[query]) {
    const params = new URLSearchParams({ format: 'jsonv2', countrycodes: 'se', q: query, addressdetails: '1', limit: '3' })
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { 'User-Agent': 'GYKFireworksWebsite/1.0 (one-time store address verification)' },
      signal: AbortSignal.timeout(20000),
    })
    if (!response.ok) throw new Error(`Lookup failed: ${response.status}`)
    cache[query] = await response.json()
    await writeFile(cachePath, JSON.stringify(cache, null, 2) + '\n')
    await new Promise((resolve) => setTimeout(resolve, 1100))
  }
  console.log(JSON.stringify({ query, results: cache[query] }))
}
