import { test, expect } from '@playwright/test'

for (const width of [1280, 375]) {
  test(`homepage cards stay visible after repeated city changes at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    const filter = page.getByLabel('Filtrera efter ort')
    const cards = page.locator('.store-card')
    await expect(cards).toHaveCount(12)

    for (const [city, count] of [
      ['Örebro', 5],
      ['Karlstad', 1],
      ['Örebro', 5],
      ['Alla orter', 12],
      ['Karlstad', 1],
      ['Alla orter', 12],
    ]) {
      await filter.selectOption(city)
      await expect(cards).toHaveCount(count)
      await expect(page.locator('.store-count')).toHaveText(`${count} ${count === 1 ? 'försäljningsplats' : 'försäljningsplatser'}`)

      for (const card of await cards.all()) {
        await card.scrollIntoViewIfNeeded()
        await expect(card).toBeVisible()
        await expect(card).toHaveCSS('opacity', '1')
        if (city !== 'Alla orter') {
          await expect(card.locator('.store-card-city')).toHaveText(city)
        }
      }
    }
  })
}
