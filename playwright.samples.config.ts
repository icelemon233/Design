import { defineConfig } from '@playwright/test';

const production = process.env.SAMPLE_PRODUCTION === '1';
const engine = process.env.SAMPLE_ENGINE;
if (engine && !['chromium', 'firefox', 'webkit'].includes(engine))
  throw new Error('SAMPLE_ENGINE must be chromium, firefox or webkit.');
const baseURL =
  process.env.SAMPLE_BASE_URL ??
  (production ? 'http://127.0.0.1:5193/Design/' : 'http://127.0.0.1:5173/');

export default defineConfig({
  testDir: './tests/samples',
  outputDir: './test-results/samples',
  fullyParallel: true,
  workers: process.env.CI || process.platform === 'win32' ? 1 : 2,
  globalTimeout: (process.env.CI ? 12 : 30) * 60 * 1000,
  retries: 0,
  timeout: 60000,
  expect: { timeout: 7000 },
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/samples-results.json' }],
    ['html', { outputFolder: 'playwright-report/samples', open: 'never' }],
  ],
  use: {
    baseURL,
    headless: true,
    actionTimeout: 10000,
    navigationTimeout: 30000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: ['chromium', 'firefox', 'webkit']
    .filter((browser) => !engine || browser === engine)
    .flatMap((browser) =>
      [
        {
          name: 'desktop',
          viewport: { width: 1440, height: 1000 },
          deviceScaleFactor: 1,
          hasTouch: false,
          reducedMotion: 'no-preference',
        },
        {
          name: 'tablet-touch',
          viewport: { width: 768, height: 1024 },
          deviceScaleFactor: 2,
          hasTouch: true,
          reducedMotion: 'no-preference',
        },
        {
          name: 'phone-touch',
          viewport: { width: 390, height: 844 },
          deviceScaleFactor: 3,
          hasTouch: true,
          reducedMotion: 'no-preference',
        },
        {
          name: 'reduced-motion',
          viewport: { width: 1440, height: 1000 },
          deviceScaleFactor: 2,
          hasTouch: false,
          reducedMotion: 'reduce',
        },
      ].map((mode) => ({
        name: browser + '-' + mode.name,
        use: {
          browserName: browser as 'chromium' | 'firefox' | 'webkit',
          headless: !(process.env.CI && browser === 'webkit'),
          ...(browser === 'chromium' && process.env.PLAYWRIGHT_CHANNEL
            ? { channel: process.env.PLAYWRIGHT_CHANNEL }
            : {}),
          viewport: mode.viewport,
          deviceScaleFactor: mode.deviceScaleFactor,
          hasTouch: mode.hasTouch,
          isMobile: browser !== 'firefox' && mode.name === 'phone-touch',
          reducedMotion: mode.reducedMotion as 'reduce' | 'no-preference',
        },
      })),
    ),
  webServer: process.env.SAMPLE_BASE_URL
    ? undefined
    : {
        command: production
          ? 'pnpm --filter @cinna-design/site preview --port 5193 --strictPort --base /Design/'
          : 'pnpm dev',
        url: baseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 60000,
      },
});
