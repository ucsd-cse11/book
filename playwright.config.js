// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 240_000, // first CheerpJ run downloads the runtime
  fullyParallel: false,
  workers: 1,
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Cross-engine spot check (user's daily driver is Safari): npx playwright test --project=webkit
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  webServer: {
    command: 'python3 serve.py',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
  },
});
