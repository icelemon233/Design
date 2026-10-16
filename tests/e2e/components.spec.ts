import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

// Same order as the site's default grouped navigation, starting at Tabs.
const components = [
  ['tabs', 'Tabs'],
  ['auto-complete', 'AutoComplete'],
  ['cascader', 'Cascader'],
  ['checkbox', 'Checkbox'],
  ['color-picker', 'ColorPicker'],
  ['date-picker', 'DatePicker'],
  ['form', 'Form'],
  ['input', 'Input'],
  ['input-number', 'InputNumber'],
  ['mentions', 'Mentions'],
  ['radio', 'Radio'],
  ['rate', 'Rate'],
  ['segmented', 'Segmented'],
  ['select', 'Select'],
  ['slider', 'Slider'],
  ['switch', 'Switch'],
  ['textarea', 'TextArea'],
  ['time-picker', 'TimePicker'],
  ['transfer', 'Transfer'],
  ['tree-select', 'TreeSelect'],
  ['upload', 'Upload'],
  ['avatar', 'Avatar'],
  ['badge', 'Badge'],
  ['calendar', 'Calendar'],
  ['card', 'Card'],
  ['carousel', 'Carousel'],
  ['collapse', 'Collapse'],
  ['descriptions', 'Descriptions'],
  ['image', 'Image'],
  ['list', 'List'],
  ['statistic', 'Statistic'],
  ['table', 'Table'],
  ['tag', 'Tag'],
  ['timeline', 'Timeline'],
  ['tree', 'Tree'],
  ['watermark', 'Watermark'],
  ['alert', 'Alert'],
  ['empty', 'Empty'],
  ['loading', 'Loading'],
  ['message', 'Message'],
  ['notification', 'Notification'],
  ['progress', 'Progress'],
  ['result', 'Result'],
  ['skeleton', 'Skeleton'],
  ['spin', 'Spin'],
  ['drawer', 'Drawer'],
  ['modal', 'Modal'],
  ['popup', 'Popup'],
  ['tour', 'Tour'],
] as const;

for (const [key, name] of components) {
  test(key + ' renders all examples and its API', async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (
        /validateDOMNesting|does not recognize|unique.*key|uncontrolled.*controlled|controlled.*uncontrolled/i.test(
          message.text(),
        )
      )
        errors.push(message.text());
    });
    await page.addInitScript(() => {
      localStorage.setItem('cinna-site-language', 'en');
      localStorage.setItem('cinna-docs-nav-sort-mode', 'default');
    });
    await page.goto('/#/' + key);
    await expect(page.locator('h1').first()).toContainText(name);
    await page.locator('.component-example').first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.api-table tbody tr').first()).toBeVisible();
    expect(await page.locator('.component-example').count()).toBeGreaterThan(0);
    expect(await page.locator('.api-table tbody tr').count()).toBeGreaterThan(1);
    const layout = await page.evaluate(() => ({
      width: innerWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    expect(layout.scroll, 'page must fit the viewport').toBeLessThanOrEqual(layout.width + 2);
    expect(
      await page.locator('button button').count(),
      'interactive controls must not be nested',
    ).toBe(0);
    expect(errors, 'browser and React errors').toEqual([]);
    if (key === 'calendar') {
      for (const calendar of await page.locator('.cinna-calendar').all()) {
        expect(
          await calendar.evaluate((node) => node.scrollWidth <= node.clientWidth + 1),
          'all seven calendar columns fit their surface',
        ).toBe(true);
      }
    }
    if (key === 'switch') {
      for (const control of await page.locator('.cinna-switch').all()) {
        expect(
          await control.evaluate((node) => {
            const track = node.getBoundingClientRect();
            const knob = node.querySelector('.cinna-switch__handle')!.getBoundingClientRect();
            return (
              knob.left >= track.left &&
              knob.right <= track.right &&
              knob.top >= track.top &&
              knob.bottom <= track.bottom
            );
          }),
          'every switch size keeps its knob inside the track',
        ).toBe(true);
      }
    }
    const directory = path.join('test-results/visual', testInfo.project.name);
    await mkdir(directory, { recursive: true });
    await page.screenshot({
      path: path.join(directory, key + '.jpg'),
      fullPage: true,
      type: 'jpeg',
      quality: 75,
      animations: 'disabled',
    });
    if (testInfo.project.name === 'desktop') {
      const accessibility = await new AxeBuilder({ page })
        .include('.component-example-list')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      await writeFile(
        path.join(directory, key + '-accessibility.json'),
        JSON.stringify(accessibility.violations, null, 2),
      );
      expect(
        accessibility.violations.map((item) => ({
          id: item.id,
          impact: item.impact,
          nodes: item.nodes.map((node) => node.target),
        })),
        'accessible examples',
      ).toEqual([]);
    }
  });
}

test('homepage, mascot and navigation work', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Cinna Design');
  await expect(page.locator('.hero__mascot-image')).toBeVisible();
  await expect(page.locator('.hero__mascot-image')).toHaveJSProperty('complete', true);
  const directory = path.join('test-results/visual', testInfo.project.name);
  await mkdir(directory, { recursive: true });
  await page.screenshot({
    path: path.join(directory, 'home.jpg'),
    fullPage: true,
    type: 'jpeg',
    quality: 85,
    animations: 'disabled',
  });
  await page.locator('.hero__actions button').click();
  await expect(page).toHaveURL(/button/);
  await page.locator('.component-example').first().waitFor();
});
