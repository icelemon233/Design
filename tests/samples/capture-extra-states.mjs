import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium, firefox, webkit } from '@playwright/test';

const out = path.resolve('test-results/sample-review/extra');
const baseURL = process.env.SAMPLE_BASE_URL ?? 'http://127.0.0.1:5193/Design/';
const records = [];
const modes = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    hasTouch: false,
  },
  {
    name: 'tablet-touch',
    viewport: { width: 768, height: 1024 },
    deviceScaleFactor: 2,
    hasTouch: true,
  },
  {
    name: 'phone-touch',
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    hasTouch: true,
  },
  {
    name: 'reduced-motion',
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    hasTouch: false,
    reducedMotion: 'reduce',
  },
];
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch();
  try {
    for (const mode of modes) {
      const context = await browser.newContext({
        ...mode,
        isMobile: name !== 'firefox' && mode.name === 'phone-touch',
      });
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.addInitScript(() => localStorage.setItem('cinna-site-language', 'en'));
      await page.goto(baseURL.replace(/\/?$/, '/') + '#/tabs');
      const lab = page.locator('[data-sample="tabs"]');
      await lab.waitFor({ timeout: 30000 });
      await page.evaluate(() => document.fonts.ready);
      const root = lab.locator('.cinna-tabs');
      const toggle = async (label) => {
        const target = lab.getByRole('checkbox', { name: label, exact: true }).locator('..');
        if (mode.hasTouch) await target.tap();
        else await target.click();
      };
      await toggle('Editable');
      await toggle('Reorderable');
      await lab.getByRole('combobox', { name: 'Variant', exact: true }).selectOption('borderless');
      await root
        .getByRole('tab', { name: 'Overview', exact: true })
        .evaluate((node) => node.focus({ preventScroll: true }));
      await page.keyboard.press('ArrowRight');
      const directory = path.join(out, name + '-' + mode.name);
      await fs.mkdir(directory, { recursive: true });
      const capture = (file) =>
        root.screenshot({
          path: path.join(directory, file + '.png'),
          animations: 'disabled',
          style: '.docs-mobile-bar, .docs-page-toolbar { visibility: hidden !important; }',
        });
      await capture('tabs-pill-focus');
      if (mode.reducedMotion === 'reduce') {
        assert.equal(
          await root
            .locator('.cinna-tabs__active-pill')
            .evaluate((node) => getComputedStyle(node).transitionProperty),
          'none',
        );
        assert.equal(
          await root.getByRole('tabpanel').evaluate((node) => getComputedStyle(node).animationName),
          'none',
        );
      }
      await toggle('Disabled');
      for (const tab of await root.getByRole('tab').all())
        assert.equal(await tab.isDisabled(), true);
      await capture('tabs-pill-disabled');
      await lab.getByRole('combobox', { name: 'Variant', exact: true }).selectOption('bordered');
      await capture('tabs-card-disabled');
      await toggle('Disabled');
      await root
        .getByRole('tab', { name: 'Overview', exact: true })
        .evaluate((node) => node.focus({ preventScroll: true }));
      await page.keyboard.press('ArrowRight');
      await capture('tabs-card-focus');
      assert.deepEqual(errors, []);
      records.push({
        project: name + '-' + mode.name,
        browserVersion: browser.version(),
        screenshots: 4,
        reducedMotionChecked: mode.reducedMotion === 'reduce',
        errors,
      });
      console.log(name + '-' + mode.name + ': captured four keyboard/disabled states');
      await context.close();
    }
  } finally {
    await browser.close();
  }
}
await fs.writeFile(
  path.resolve(out, '..', 'extra-state-checks.json'),
  JSON.stringify(records, null, 2) + '\n',
);
