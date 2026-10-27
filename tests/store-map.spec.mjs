import { test, expect } from '@playwright/test'

const tile = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jRZkAAAAASUVORK5CYII=', 'base64')

test.beforeEach(async ({ page }) => {
  await page.route('https://tile.openstreetmap.org/**', (route) => route.fulfill({ contentType: 'image/png', body: tile }))
})

test('all stores are represented, clusters expand and marker links work', async ({ page }) => {
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/butiker')
  await expect(page.locator('.store-map .leaflet-marker-icon').first()).toBeVisible()
  await expect(page.locator('#butikslista .store-card')).toHaveCount(12)
  await expect.poll(() => page.locator('.store-map .leaflet-marker-icon').evaluateAll((markers) => (
    markers.reduce((count, marker) => count + (marker.classList.contains('store-map-cluster') ? Number(marker.textContent) : 1), 0)
  ))).toBe(12)
  await page.locator('.store-map-cluster').first().click()
  await expect(page.locator('.store-map-pin').first()).toBeVisible()
  await page.getByLabel('Filtrera efter ort').selectOption('Karlstad')
  await expect(page.locator('#butikslista .store-card')).toHaveCount(1)
  await expect(page.locator('.store-map-pin')).toHaveCount(1)
  await page.locator('.store-map-pin').focus()
  await page.keyboard.press('Enter')
  await expect(page.locator('.store-map-popup')).toContainText('Ullebergsleden 10')
  await expect(page.getByRole('link', { name: 'Se butiken', exact: true })).toHaveAttribute('href', '/butiker/karlstad')
  await expect(page.getByRole('link', { name: /Vägbeskrivning till Karlstad/ })).toHaveAttribute('href', /destination=Ullebergsleden/)
  expect(errors).toEqual([])
})

test('each store detail links to its assigned Vulcan assortment', async ({ page }) => {
  const vulcanLinks = [
    ['orebro-handlarn', 'gyk-myrmalm'],
    ['katrineholm', 'gyk-katrineholm'],
    ['kristinehamn', 'gyk-kristinehamn'],
    ['linkoping-tornby', 'gyk-vansbro'],
    ['orebro-netonnet', 'gyk-netonnet'],
    ['kumla', 'gyk-kumla'],
    ['norrkoping-ingelsta', 'gyk-ingelstad'],
    ['orebro-motonet', 'gyk-marieberg'],
    ['orebro-lillans-gatukok', 'gyk-lillan-gatukok'],
    ['orebro-sorbybacken', 'gyk-sorbacken'],
    ['karlstad', 'gyk-karlstad'],
    ['vasteras-erikslund', 'gyk-vasteras'],
  ]

  for (const [storeSlug, vulcanSlug] of vulcanLinks) {
    await page.goto(`/butiker/${storeSlug}`)
    await expect(page.locator('.store-order a'))
      .toHaveAttribute('href', `https://vulcaneurope.se/aterforsaljare/${vulcanSlug}/sortiment/`)
  }
})

test('search and city filters stay in sync with pins and recover from empty results', async ({ page }) => {
  await page.goto('/butiker')
  await page.getByLabel('Sök butik').fill('åbyvägen')
  await expect(page.locator('#butikslista .store-card')).toHaveCount(1)
  await expect(page.locator('.store-map-pin')).toHaveAttribute('title', 'NetOnNet, Örebro')
  await page.getByLabel('Filtrera efter ort').selectOption('Karlstad')
  await expect(page.locator('.store-map-empty')).toBeVisible()
  await expect(page.locator('.store-map .leaflet-marker-icon')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Visa hela urvalet' })).toBeDisabled()
  await page.getByLabel('Sök butik').fill('')
  await page.getByLabel('Filtrera efter ort').selectOption('Alla orter')
  await expect(page.locator('#butikslista .store-card')).toHaveCount(12)
  await expect(page.locator('#butikslista .store-card').first()).toHaveCSS('opacity', '1')
  await page.getByRole('button', { name: 'Visa hela urvalet' }).click()
  await expect(page.locator('.store-map-pin').first()).toBeVisible()
})

test('mobile map and popup stay inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/butiker')
  await page.getByLabel('Filtrera efter ort').selectOption('Karlstad')
  await page.locator('.store-map-pin').click()
  await expect(page.locator('.store-map-popup')).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
  const popup = await page.locator('.leaflet-popup').boundingBox()
  expect(popup.x).toBeGreaterThanOrEqual(0)
  expect(popup.x + popup.width).toBeLessThanOrEqual(375)
  const zoom = await page.locator('.leaflet-control-zoom').boundingBox()
  expect(popup.y + popup.height).toBeLessThanOrEqual(zoom.y)
  await page.getByRole('button', { name: 'Öppna meny' }).click()
  await expect(page.locator('.main-nav a[aria-current="page"]')).toHaveText('Våra butiker')
})

test('failed map tiles leave the store list usable', async ({ page }) => {
  await page.unroute('https://tile.openstreetmap.org/**')
  await page.route('https://tile.openstreetmap.org/**', (route) => route.abort())
  await page.goto('/butiker')
  await expect(page.locator('.store-map-status')).toBeVisible()
  await expect(page.locator('#butikslista .store-card')).toHaveCount(12)
})

test('homepage does not load the map library or tiles', async ({ page }) => {
  const mapRequests = []
  page.on('request', (request) => {
    if (/tile\.openstreetmap|StoreMap\.jsx|leaflet\.js/.test(request.url())) mapRequests.push(request.url())
  })
  await page.goto('/')
  await expect(page.locator('.store-card')).toHaveCount(12)
  expect(mapRequests).toEqual([])
})
