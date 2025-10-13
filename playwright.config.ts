import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from './src/config/constant';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,

  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['list'], ['allure-playwright']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'on',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    baseURL: BASE_URL || 'http:/localhost:3000',
  },

  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        // viewport: { width: 1920, height: 1080 },
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions: {
          args: ['--start-maximized', '--ignore-certificate-errors'],
        },
      },
    },
  ],
});
