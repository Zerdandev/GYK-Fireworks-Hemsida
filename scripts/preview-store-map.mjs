import { chromium, expect } from '@playwright/test'
import { mkdir } from 'node:fs/promises'

await mkdir('.verification', { recursive: true })
const browser = await chromium.launch({ channel: 'chrome', headless: true })
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } })
  const errors = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('http://127.0.0.1:5175/butiker', { waitUntil: 'domcontentloaded' })
  await page.locator('.store-map-pin').first().waitFor()
  await page.waitForFunction(() => [...document.querySelectorAll('.leaflet-tile-loaded')].some((tile) => tile.naturalWidth > 0), { timeout: 20000 })
  await page.waitForFunction(() => [...document.querySelectorAll('.leaflet-tile')].every((tile) => tile.complete && tile.style.opacity === '1'))
  await page.locator('.store-map-section').screenshot({ path: '.verification/store-map-desktop.png' })
  const loadedTiles = await page.locator('.leaflet-tile-loaded').evaluateAll((tiles) => tiles.filter((tile) => tile.naturalWidth > 0).length)
  await page.setViewportSize({ width: 375, height: 812 })
  await page.getByLabel('Filtrera efter ort').selectOption('Karlstad')
  await page.locator('.store-map-pin').click()
  await expect(page.locator('.leaflet-popup')).toHaveCSS('opacity', '1')
  await page.waitForFunction(() => [...document.querySelectorAll('.leaflet-tile')].every((tile) => tile.complete && tile.style.opacity === '1'))
  await page.locator('.store-map-frame').screenshot({ path: '.verification/store-map-mobile.png' })
  console.log(JSON.stringify({ loadedTiles, errors }))
} finally {
  await browser.close()
}
