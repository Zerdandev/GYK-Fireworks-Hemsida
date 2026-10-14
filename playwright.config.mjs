import { defineConfig } from '@playwright/test'

const externalServer = process.env.PLAYWRIGHT_BASE_URL

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: externalServer || 'http://127.0.0.1:5174', channel: 'chrome', headless: true },
  webServer: externalServer ? undefined : {
    command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5174 --strictPort',
    url: 'http://127.0.0.1:5174', reuseExistingServer: true,
  },
})
