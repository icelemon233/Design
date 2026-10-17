import { expect, test, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const browserErrors = new WeakMap<Page, string[]>();
const componentShot = {
  animations: 'disabled' as const,
  style: '.docs-mobile-bar, .docs-page-toolbar { visibility: hidden !important; }',
};
test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on('pageerror', (error) => errors.push(error.message));
  await page.addInitScript(() => {
    const inputs: { type: string; pointerType?: string; trusted: boolean }[] = [];
    Object.assign(window, { sampleInputEvents: inputs });
    addEventListener(
      'pointerdown',
      (event) => {
        inputs.push({ type: event.type, pointerType: event.pointerType, trusted: event.isTrusted });
      },
      true,
    );
    addEventListener(
      'touchstart',
      (event) => {
        inputs.push({ type: event.type, trusted: event.isTrusted });
      },
      true,
    );
  });
});
test.afterEach(({ page }) => {
  expect(browserErrors.get(page) ?? [], 'browser exceptions').toEqual([]);
});

async function activate(target: Locator) {
  if (test.info().project.use.hasTouch) await target.tap();
  else await target.click();
}
async function setChecked(input: Locator, checked: boolean) {
  if ((await input.isChecked()) !== checked) await activate(input.locator('..'));
  if (checked) await expect(input).toBeChecked();
  else await expect(input).not.toBeChecked();
}

async function sample(page: Page, kind: 'tabs' | 'transfer') {
  await page.addInitScript(() => localStorage.setItem('cinna-site-language', 'en'));
  await page.goto('#/' + kind);
  const lab = page.locator('[data-sample="' + kind + '"]');
  await lab.waitFor({ timeout: 30000 });
  await page.bringToFront();
  await page.evaluate(() => document.fonts.ready);
  const frames = await page.evaluate(
    () =>
      new Promise<{ timestamps: number[]; visibility: string }>((resolve) => {
        const timestamps: number[] = [];
        const deadline = setTimeout(
          () => resolve({ timestamps, visibility: document.visibilityState }),
          2000,
        );
        const tick = (time: number) => {
          timestamps.push(time);
          if (timestamps.length === 2) {
            clearTimeout(deadline);
            resolve({ timestamps, visibility: document.visibilityState });
          } else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }),
  );
  await test.info().attach(kind + '-rendering-frames', {
    body: JSON.stringify(frames),
    contentType: 'application/json',
  });
  expect(frames.timestamps, 'native rendering frames advance before interaction').toHaveLength(2);
  expect(frames.timestamps[1]).toBeGreaterThan(frames.timestamps[0]);
  return { lab, root: lab.locator('.cinna-' + kind).first() };
}
async function seam(root: Locator, position: string) {
  await expect
    .poll(
      async () => {
        const active = await root.locator('.cinna-tabs__item--active').boundingBox();
        const panel = await root.getByRole('tabpanel').boundingBox();
        if (!active || !panel) return 100;
        return Math.abs(
          position === 'top'
            ? active.y + active.height - panel.y
            : position === 'bottom'
              ? panel.y + panel.height - active.y
              : position === 'left'
                ? active.x + active.width - panel.x
                : panel.x + panel.width - active.x,
        );
      },
      { message: 'the selected tab meets the content frame without a gap' },
    )
    .toBeLessThanOrEqual(2);
}

test('Samples use working Chinese labels and report their actual emulation settings', async ({
  page,
  browser,
}, info) => {
  for (const kind of ['tabs', 'transfer'] as const) {
    const { lab, root } = await sample(page, kind);
    await activate(page.getByRole('button', { name: '中', exact: true }));
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
    if (kind === 'tabs') {
      await expect(lab.getByRole('group', { name: '配置 Tabs' })).toBeVisible();
      await setChecked(lab.getByRole('checkbox', { name: '允许增删', exact: true }), true);
      await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
      await expect(root.getByRole('tab', { name: 'New 1', exact: true })).toHaveAttribute(
        'aria-selected',
        'true',
      );
    } else {
      const source = root.getByRole('region', { name: '待选项目', exact: true });
      await setChecked(source.getByRole('checkbox', { name: 'Tokens', exact: true }), true);
      await activate(root.getByRole('button', { name: '移入已选项目', exact: true }));
      await expect(
        root
          .getByRole('region', { name: '已选项目', exact: true })
          .getByRole('checkbox', { name: 'Tokens', exact: true }),
      ).toBeVisible();
    }
    await root.screenshot({ path: info.outputPath(kind + '-chinese.png'), ...componentShot });
  }
  const capabilities = await page.evaluate(() => ({
    dpr: devicePixelRatio,
    touchPoints: navigator.maxTouchPoints,
    coarse: matchMedia('(any-pointer: coarse)').matches,
    reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    inputs: (
      window as unknown as {
        sampleInputEvents: { type: string; pointerType?: string; trusted: boolean }[];
      }
    ).sampleInputEvents,
  }));
  expect(capabilities.dpr).toBe(info.project.use.deviceScaleFactor);
  if (info.project.use.hasTouch) {
    expect(capabilities.coarse).toBe(true);
    expect(
      capabilities.inputs.some(
        (event) => event.trusted && (event.type === 'touchstart' || event.pointerType === 'touch'),
      ),
    ).toBe(true);
  }
  await info.attach('browser-capabilities', {
    body: JSON.stringify({ version: browser.version(), ...capabilities }),
    contentType: 'application/json',
  });
});
test('Tabs has clean surfaces and connected seams in both variants, four positions and three sizes', async ({
  page,
}, info) => {
  test.setTimeout(120000);
  const { lab, root } = await sample(page, 'tabs');
  for (const variant of ['borderless', 'bordered']) {
    await lab.getByRole('combobox', { name: 'Variant', exact: true }).selectOption(variant);
    for (const position of ['top', 'bottom', 'left', 'right']) {
      await lab.getByRole('combobox', { name: 'Position', exact: true }).selectOption(position);
      for (const size of ['small', 'medium', 'large']) {
        await lab.getByRole('combobox', { name: 'Size', exact: true }).selectOption(size);
        const surfaces = await root.evaluate((node) => {
          const list = getComputedStyle(node.querySelector('.cinna-tabs__list')!);
          const panel = getComputedStyle(node.querySelector('.cinna-tabs__panel:not([hidden])')!);
          return {
            shadow: panel.boxShadow,
            listBg: list.backgroundImage,
            dividerX: list.borderRightWidth,
            dividerY: list.borderBottomWidth,
            panelBorder: panel.borderTopWidth,
            pageWidth: document.documentElement.scrollWidth,
            viewport: innerWidth,
          };
        });
        expect(surfaces.shadow).toBe('none');
        expect(surfaces.listBg).toBe('none');
        expect(surfaces.dividerX).toBe('0px');
        expect(surfaces.dividerY).toBe('0px');
        expect(surfaces.pageWidth).toBeLessThanOrEqual(surfaces.viewport + 2);
        if (info.project.use.hasTouch) {
          const touchTarget = await root
            .locator('[role="tab"][aria-selected="true"]')
            .boundingBox();
          expect(touchTarget!.height).toBeGreaterThanOrEqual(44);
        }
        const compact = (await root.boundingBox())!.width <= 480;
        const expectedPosition =
          compact && (position === 'left' || position === 'right') ? 'top' : position;
        await expect(root.getByRole('tablist')).toHaveAttribute(
          'aria-orientation',
          expectedPosition === 'left' || expectedPosition === 'right' ? 'vertical' : 'horizontal',
        );
        if (expectedPosition === 'left' || expectedPosition === 'right') {
          for (const label of await root.locator('.cinna-tabs__label').all())
            await expect
              .poll(() => label.evaluate((node) => node.scrollWidth <= node.clientWidth + 1))
              .toBe(true);
        }
        if (variant === 'bordered') await seam(root, expectedPosition);
        else {
          expect(surfaces.panelBorder).toBe('0px');
          const pill = root.locator('.cinna-tabs__active-pill');
          await expect(pill).toHaveCSS('box-shadow', 'none');
          await expect(pill).toHaveCSS('background-image', 'none');
        }
        if (size === 'medium')
          await root.screenshot({
            path: info.outputPath(variant + '-' + position + '.png'),
            ...componentShot,
          });
      }
    }
  }
});
test('Tabs keyboard navigation and panel preservation work in the browser', async ({ page }) => {
  const { lab, root } = await sample(page, 'tabs');
  await root.getByRole('tab', { name: 'Overview', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(root.getByRole('tab', { name: 'Activity', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await page.keyboard.press('Home');
  await root.getByRole('textbox', { name: 'Notes for overview' }).fill('Saved draft');
  await activate(root.getByRole('tab', { name: 'Settings', exact: true }));
  await activate(root.getByRole('tab', { name: 'Overview', exact: true }));
  await expect(root.getByRole('textbox', { name: 'Notes for overview' })).toHaveValue(
    'Saved draft',
  );
  await setChecked(lab.getByRole('checkbox', { name: 'Preserve panel state', exact: true }), false);
  await activate(root.getByRole('tab', { name: 'Settings', exact: true }));
  await activate(root.getByRole('tab', { name: 'Overview', exact: true }));
  await expect(root.getByRole('textbox', { name: 'Notes for overview' })).toHaveValue('');
  await lab.getByRole('combobox', { name: 'Position', exact: true }).selectOption('left');
  await root.getByRole('tab', { name: 'Overview', exact: true }).focus();
  await page.keyboard.press(
    (await root.getByRole('tablist').getAttribute('aria-orientation')) === 'vertical'
      ? 'ArrowDown'
      : 'ArrowRight',
  );
  await expect(root.getByRole('tab', { name: 'Activity', exact: true })).toBeFocused();
  await page.keyboard.press('End');
  await expect(root.getByRole('tab', { name: 'Settings', exact: true })).toBeFocused();
});
test('Tabs editing retains a logical selection, restores focus and uses unique keys', async ({
  page,
}, info) => {
  const { lab, root } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Editable', exact: true }), true);
  await activate(root.getByRole('tab', { name: 'Activity', exact: true }));
  await page.keyboard.press('Delete');
  await expect(root.getByRole('tab', { name: 'Settings', exact: true })).toBeFocused();
  await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
  await expect(root.getByRole('tab', { name: 'New 1', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await activate(root.getByRole('button', { name: 'Close New 1', exact: true }));
  await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
  await expect(root.getByRole('tab', { name: 'New 2', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  for (let index = 0; index < 6 && (await root.getByRole('tab').count()); index++) {
    await root.locator('[role="tab"][aria-selected="true"]').focus();
    await page.keyboard.press('Delete');
  }
  await expect(root.getByRole('tab')).toHaveCount(0);
  await expect(root.getByRole('button', { name: 'Add tab', exact: true })).toBeFocused();
  await root.screenshot({ path: info.outputPath('tabs-empty.png'), ...componentShot });
  await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
  await expect(root.getByRole('tab')).toHaveCount(1);
});
test('Tabs scrolling reveals the selected label without moving the document', async ({ page }) => {
  const { lab, root } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Many tabs', exact: true }), true);
  await root.scrollIntoViewIfNeeded();
  await root
    .getByRole('tab', { name: 'Overview', exact: true })
    .evaluate((node) => node.focus({ preventScroll: true }));
  const before = await page.evaluate(() => scrollY);
  await page.keyboard.press('End');
  const last = root.getByRole('tab', { name: 'Tab 12', exact: true });
  await expect(last).toBeFocused();
  await expect
    .poll(async () => {
      const label = await last.boundingBox(),
        viewport = await root.locator('.cinna-tabs__viewport').boundingBox();
      return (
        !!label &&
        !!viewport &&
        label.x >= viewport.x - 2 &&
        label.x + label.width <= viewport.x + viewport.width + 2
      );
    })
    .toBe(true);
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThanOrEqual(2);
  await expect(root.getByRole('button', { name: 'Scroll tabs backward' })).toBeEnabled();
  await seam(root, 'top');
});
test('Tabs reordering has a keyboard alternative', async ({ page }) => {
  const { lab, root } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Reorderable', exact: true }), true);
  await root.getByRole('tab', { name: 'Overview', exact: true }).focus();
  await page.keyboard.press('Alt+ArrowRight');
  await expect(root.getByRole('tab')).toHaveText(['Activity', 'Overview', 'Settings']);
  await expect(root.getByRole('tab', { name: 'Overview', exact: true })).toBeFocused();
  await setChecked(lab.getByRole('checkbox', { name: 'Disabled', exact: true }), true);
  for (const tab of await root.getByRole('tab').all()) await expect(tab).toBeDisabled();
  await expect(root.getByRole('tabpanel')).toBeVisible();
});

test('Tabs keep editing and dragging usable together in narrow containers', async ({
  page,
  browserName,
}, info) => {
  const { lab, root } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Editable', exact: true }), true);
  await setChecked(lab.getByRole('checkbox', { name: 'Reorderable', exact: true }), true);
  for (const variant of ['borderless', 'bordered']) {
    await lab.getByRole('combobox', { name: 'Variant', exact: true }).selectOption(variant);
    for (const position of ['top', 'bottom', 'left', 'right']) {
      await lab.getByRole('combobox', { name: 'Position', exact: true }).selectOption(position);
      const compact = (await root.boundingBox())!.width <= 480;
      if (compact) {
        await expect(root.getByRole('tablist')).toHaveAttribute('aria-orientation', 'horizontal');
        const viewport = await root.locator('.cinna-tabs__viewport').boundingBox();
        const component = await root.boundingBox();
        expect(viewport!.width).toBeGreaterThanOrEqual(component!.width - 2);
        const first = root.locator('[data-tab-key="overview"]');
        await root.getByRole('tab', { name: 'Overview', exact: true }).focus();
        await expect
          .poll(async () => {
            const label = await first.locator('.cinna-tabs__label').boundingBox();
            const close = await root
              .getByRole('button', { name: 'Close Overview', exact: true })
              .boundingBox();
            return !!label && !!close && label.width >= 32 && label.x + label.width <= close.x + 1;
          })
          .toBe(true);
        for (const target of [
          first.locator('.cinna-tabs__grip'),
          root.getByRole('button', { name: 'Close Overview', exact: true }),
        ]) {
          const hit = await target.boundingBox();
          expect(hit!.width).toBeGreaterThanOrEqual(44);
          expect(hit!.height).toBeGreaterThanOrEqual(44);
        }
      }
      if (variant === 'bordered')
        await seam(root, compact && ['left', 'right'].includes(position) ? 'top' : position);
    }
  }
  await lab.getByRole('combobox', { name: 'Position', exact: true }).selectOption('top');
  await root.getByRole('tab', { name: 'Overview', exact: true }).focus();
  await page.keyboard.press('End');
  await activate(root.getByRole('button', { name: 'Close Settings', exact: true }));
  await expect(root.getByRole('tab', { name: 'Activity', exact: true })).toBeFocused();
  await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
  await expect(root.getByRole('tab', { name: 'New 1', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  if (browserName === 'chromium')
    await expect(root.getByRole('button', { name: 'Add tab', exact: true })).toHaveCSS(
      '-webkit-tap-highlight-color',
      'rgba(0, 0, 0, 0)',
    );
  await root.screenshot({
    path: info.outputPath('tabs-editable-reorderable.png'),
    ...componentShot,
  });
  if (info.project.name.endsWith('phone-touch')) {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.reload();
    await sample(page, 'tabs');
    await setChecked(lab.getByRole('checkbox', { name: 'Editable', exact: true }), true);
    await setChecked(lab.getByRole('checkbox', { name: 'Reorderable', exact: true }), true);
    await activate(root.getByRole('button', { name: 'Add tab', exact: true }));
    await expect
      .poll(() => root.locator('.cinna-tabs__viewport').evaluate((node) => node.clientWidth))
      .toBeGreaterThanOrEqual(180);
    await info.attach('phone-320-layout', {
      body: JSON.stringify(
        await page.evaluate(() => ({
          viewport: innerWidth,
          layoutViewport: document.documentElement.clientWidth,
          screen: screen.width,
          page: document.documentElement.scrollWidth,
          overflowing: [...document.querySelectorAll('body *')]
            .map((node) => {
              const bounds = node.getBoundingClientRect();
              return {
                tag: node.tagName,
                className: node.getAttribute('class'),
                left: bounds.left,
                right: bounds.right,
                width: bounds.width,
              };
            })
            .filter((item) => item.right > innerWidth + 1 && item.width > 0)
            .slice(0, 20),
        })),
      ),
      contentType: 'application/json',
    });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1))
      .toBe(true);
    for (const button of [
      root.getByRole('button', { name: 'Add tab', exact: true }),
      root.getByRole('button', { name: 'Close New 1', exact: true }),
    ]) {
      const bounds = await button.boundingBox();
      expect(bounds!.width).toBeGreaterThanOrEqual(44);
      expect(bounds!.height).toBeGreaterThanOrEqual(44);
    }
    await root.screenshot({
      path: info.outputPath('tabs-320-editable-reorderable.png'),
      ...componentShot,
    });
  }
});

test('Tabs handle reorders with actual pointer capture and edge scrolling', async ({
  page,
  browserName,
}, info) => {
  const { lab, root } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Reorderable', exact: true }), true);
  const handle = root.locator('[data-tab-key="overview"] .cinna-tabs__grip');
  await handle.scrollIntoViewIfNeeded();
  const start = await handle.boundingBox(),
    target = await root.getByRole('tab', { name: 'Settings', exact: true }).boundingBox();
  const viewport = await root.locator('.cinna-tabs__viewport').boundingBox();
  const endX = Math.min(target!.x + target!.width / 2, viewport!.x + viewport!.width - 5);
  const endY = start!.y + start!.height / 2;
  if (browserName === 'chromium' && info.project.use.hasTouch) {
    const session = await page.context().newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchStart',
      touchPoints: [{ x: start!.x + start!.width / 2, y: endY, id: 1 }],
    });
    await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove',
      touchPoints: [{ x: endX, y: endY, id: 1 }],
    });
    await expect(root.locator('.cinna-tabs__item--drop')).toHaveAttribute(
      'data-tab-key',
      'settings',
    );
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await session.detach();
  } else {
    await page.mouse.move(start!.x + start!.width / 2, endY);
    await page.mouse.down();
    await page.mouse.move(endX, endY, { steps: 12 });
    await expect(root.locator('.cinna-tabs__item--drop')).toHaveAttribute(
      'data-tab-key',
      'settings',
    );
    await page.mouse.up();
  }
  await expect(root.getByRole('tab')).toHaveText(['Activity', 'Settings', 'Overview']);
  await expect(root.getByRole('tab', { name: 'Overview', exact: true })).toBeFocused();
  await expect(root.locator('.cinna-tabs__item--dragging')).toHaveCount(0);
});

test('Tabs style props change rendered typography, colors, radius and panel borders', async ({
  page,
}) => {
  const { lab, root: sampleRoot } = await sample(page, 'tabs');
  await setChecked(lab.getByRole('checkbox', { name: 'Tint tab strip', exact: true }), true);
  await expect(sampleRoot.locator('.cinna-tabs__nav')).toHaveCSS(
    'background-color',
    'rgb(240, 250, 254)',
  );
  const root = page.locator('[data-example="custom-tabs"] .cinna-tabs');
  const active = root.getByRole('tab', { name: 'Tone', exact: true });
  await expect(active).toHaveCSS('font-size', '15px');
  await expect(active).toHaveCSS('font-weight', '900');
  await expect(active).toHaveCSS('color', 'rgb(40, 115, 141)');
  await expect(root.locator('.cinna-tabs__item--active')).toHaveCSS(
    'background-color',
    'rgb(255, 255, 255)',
  );
  await expect(root.locator('.cinna-tabs__item--active')).toHaveCSS(
    'border-top-left-radius',
    '12px',
  );
  const panel = root.getByRole('tabpanel');
  await expect(panel).toHaveCSS('color', 'rgb(81, 51, 35)');
  await expect(panel).toHaveCSS('background-color', 'rgb(255, 252, 246)');
  await expect(panel).toHaveCSS('border-top-color', 'rgb(234, 216, 192)');
  await expect(panel).toHaveCSS('font-size', '16px');
  const inactive = root.locator('[data-tab-key="motion"]');
  await expect(inactive).toHaveCSS('background-color', 'rgb(255, 248, 238)');
  await expect(inactive).toHaveCSS('border-top-color', 'rgb(234, 216, 192)');
  await expect(inactive).toHaveCSS('color', 'rgb(107, 88, 75)');
  await sampleRoot.evaluate((node) => {
    (node as HTMLElement).style.setProperty('--cinna-tabs-tab-bg', '#fff8ee');
    (node as HTMLElement).style.setProperty('--cinna-tabs-active-bg', '#d8eff7');
    (node as HTMLElement).style.setProperty('--cinna-tabs-active-border', '#28738d');
  });
  await lab.getByRole('combobox', { name: 'Variant', exact: true }).selectOption('borderless');
  await expect(sampleRoot.locator('.cinna-tabs__active-pill')).toHaveCSS(
    'background-color',
    'rgb(216, 239, 247)',
  );
  await expect(sampleRoot.locator('.cinna-tabs__active-pill')).toHaveCSS(
    'border-top-color',
    'rgb(40, 115, 141)',
  );
  await expect(sampleRoot.locator('.cinna-tabs__item--active')).toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)',
  );
});
test('Transfer selects filtered items, moves both directions and honors disabled rows', async ({
  page,
}) => {
  const { root } = await sample(page, 'transfer');
  const source = root.getByRole('region', { name: 'Source', exact: true });
  const target = root.getByRole('region', { name: 'Target', exact: true });
  await source.getByRole('textbox').fill('token');
  await setChecked(source.getByRole('checkbox', { name: 'Select all', exact: true }), true);
  await activate(root.getByRole('button', { name: 'Move selected to target', exact: true }));
  await expect(target.getByRole('checkbox', { name: 'Tokens', exact: true })).toBeVisible();
  await source.getByRole('textbox').fill('');
  await expect(source.getByRole('checkbox', { name: 'Archived item', exact: true })).toBeDisabled();
  await setChecked(target.getByRole('checkbox', { name: 'Select all', exact: true }), true);
  await activate(root.getByRole('button', { name: 'Move selected to source', exact: true }));
  await expect(target.getByText('No items', { exact: true })).toBeVisible();
  await expect(source.getByRole('checkbox', { name: 'Tokens', exact: true })).toBeVisible();
  await setChecked(source.getByRole('checkbox', { name: 'Select all', exact: true }), true);
  await activate(root.getByRole('button', { name: 'Move selected to target', exact: true }));
  await expect(source.getByRole('checkbox', { name: 'Archived item', exact: true })).toBeVisible();
  await expect(source.getByRole('checkbox')).toHaveCount(2);
});
test('Transfer responds to container width, has correct direction icons and usable touch targets', async ({
  page,
}, info) => {
  const { lab, root } = await sample(page, 'transfer');
  await setChecked(lab.getByRole('checkbox', { name: 'Narrow container', exact: true }), true);
  const source = await root.getByRole('region', { name: 'Source', exact: true }).boundingBox();
  const target = await root.getByRole('region', { name: 'Target', exact: true }).boundingBox();
  expect(target!.y).toBeGreaterThan(source!.y + source!.height);
  const toTarget = root.getByRole('button', { name: 'Move selected to target', exact: true });
  await expect(toTarget.locator('.cinna-transfer__action-icon--stacked')).toBeVisible();
  await expect(toTarget.locator('.cinna-transfer__action-icon--wide')).toBeHidden();
  const hit = await toTarget.boundingBox();
  expect(hit!.width).toBeGreaterThanOrEqual(44);
  expect(hit!.height).toBeGreaterThanOrEqual(44);
  await setChecked(lab.getByRole('checkbox', { name: 'Long names', exact: true }), true);
  expect(await root.evaluate((node) => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  const longLabel = root.locator('.cinna-check__label').filter({ hasText: 'A long item name' });
  expect(await longLabel.evaluate((node) => node.scrollWidth <= node.clientWidth + 1)).toBe(true);
  await longLabel.scrollIntoViewIfNeeded();
  await expect(longLabel).toBeInViewport();
  const labelBounds = await longLabel.boundingBox();
  const rowBounds = await longLabel.locator('..').locator('..').boundingBox();
  expect(labelBounds!.y).toBeGreaterThanOrEqual(rowBounds!.y);
  expect(labelBounds!.y + labelBounds!.height).toBeLessThanOrEqual(
    rowBounds!.y + rowBounds!.height + 1,
  );
  await root.screenshot({
    path: info.outputPath('transfer-stacked-long.png'),
    ...componentShot,
  });
  await setChecked(lab.getByRole('checkbox', { name: 'Empty data', exact: true }), true);
  await expect(
    root.getByRole('button', { name: 'Move selected to target', exact: true }),
  ).toBeDisabled();
  await expect(root.getByText('No items', { exact: true })).toHaveCount(2);
});

test('Transfer controlled selection, empty search and keyboard focus follow real moves', async ({
  page,
}, info) => {
  const { lab, root } = await sample(page, 'transfer');
  await setChecked(lab.getByRole('checkbox', { name: 'Controlled selection', exact: true }), true);
  const source = root.getByRole('region', { name: 'Source', exact: true });
  const target = root.getByRole('region', { name: 'Target', exact: true });
  await source.getByRole('textbox').fill('missing-search-result');
  await expect(source.getByText('No matching items', { exact: true })).toBeVisible();
  await expect(source.getByRole('checkbox', { name: 'Select all', exact: true })).toBeDisabled();
  await root.screenshot({
    path: info.outputPath('transfer-no-results.png'),
    ...componentShot,
  });
  await setChecked(lab.getByRole('checkbox', { name: 'Search', exact: true }), false);
  await expect(source.getByRole('checkbox', { name: 'Tokens', exact: true })).toBeVisible();
  await setChecked(lab.getByRole('checkbox', { name: 'Search', exact: true }), true);
  await expect(source.getByText('No matching items', { exact: true })).toBeVisible();
  await source.getByRole('textbox').fill('');
  const checkbox = source.getByRole('checkbox', { name: 'Tokens', exact: true });
  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toBeChecked();
  await root.screenshot({ path: info.outputPath('transfer-selected-focus.png'), ...componentShot });
  await root.getByRole('button', { name: 'Move selected to target', exact: true }).focus();
  await page.keyboard.press('Enter');
  await expect(target.getByRole('checkbox', { name: 'Tokens', exact: true })).not.toBeChecked();
  await expect(target.getByRole('checkbox', { name: 'Select all', exact: true })).toBeFocused();
  const focusedBox = target
    .getByRole('checkbox', { name: 'Select all', exact: true })
    .locator('..')
    .locator('.cinna-check__box');
  await expect(focusedBox).toHaveCSS('outline-style', 'solid');
  await expect(focusedBox).toHaveCSS('outline-width', '3px');
  await expect(focusedBox).toHaveCSS('opacity', '1');
  await expect(lab.locator('output')).toContainText('toTarget: tokens');
  await root.screenshot({ path: info.outputPath('transfer-moved-focus.png'), ...componentShot });
  await setChecked(lab.getByRole('checkbox', { name: 'Disabled', exact: true }), true);
  for (const input of await root.locator('input').all()) await expect(input).toBeDisabled();
  for (const button of await root.getByRole('button').all()) await expect(button).toBeDisabled();
  await root.screenshot({ path: info.outputPath('transfer-disabled.png'), ...componentShot });
});
test('Samples load their drawn icons, support reduced motion and pass scoped accessibility checks', async ({
  page,
}, info) => {
  for (const kind of ['tabs', 'transfer'] as const) {
    const { lab, root } = await sample(page, kind);
    if (kind === 'tabs')
      await setChecked(lab.getByRole('checkbox', { name: 'Editable', exact: true }), true);
    for (const image of await root.locator('img.cinna-icon').all()) {
      expect(
        await image.evaluate(
          (node) =>
            (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0,
        ),
      ).toBe(true);
    }
    if (await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      const panel = root.getByRole('tabpanel');
      if (kind === 'tabs') await expect(panel).toHaveCSS('animation-name', 'none');
    }
    const results = await new AxeBuilder({ page })
      .include('[data-sample="' + kind + '"]')
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(
      results.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
    ).toEqual([]);
    await root.screenshot({ path: info.outputPath(kind + '-default.png'), ...componentShot });
  }
});

test('Sample source toggles use drawn icons and API tables describe the current public props', async ({
  page,
}, info) => {
  for (const kind of ['tabs', 'transfer'] as const) {
    await sample(page, kind);
    const name = kind === 'tabs' ? 'Tabs' : 'Transfer';
    const article = page.locator('[data-example="' + kind + '-sample"]');
    const summary = article.locator('summary');
    await activate(summary);
    await expect(article.locator('details')).toHaveAttribute('open', '');
    await expect(summary.locator('.component-example__toggle-up')).toBeVisible();
    await expect(summary.locator('.component-example__toggle-down')).toBeHidden();
    await expect(article.locator('pre')).toContainText(
      'export default function ' + name + 'Sample',
    );
    await expect(article.locator('pre code')).toHaveCSS('font-family', /Quicksand/);
    await summary.screenshot({
      path: info.outputPath(kind + '-source-toggle.png'),
      ...componentShot,
    });
    await activate(summary);
    await expect(article.locator('details')).not.toHaveAttribute('open');
    const api = page.getByRole('region', { name: name + ' API table', exact: true });
    await expect(api).toHaveCount(1);
    const props = await api.locator('tbody tr td:first-child code').allTextContents();
    expect(new Set(props).size).toBe(props.length);
    expect(await api.textContent()).not.toContain('Configuration or callback');
    if (kind === 'tabs') {
      expect(props).toEqual(
        expect.arrayContaining([
          'items',
          'activeKey',
          'disabled',
          'emptyContent',
          'onOrderChange',
          'destroyInactiveTabPanel',
        ]),
      );
      for (const obsolete of ['type', 'indicatorColor', 'listBorderColor', 'scrollable'])
        expect(props).not.toContain(obsolete);
      expect(await api.textContent()).not.toContain('dropping files');
    } else {
      expect(props).toEqual(
        expect.arrayContaining([
          'dataSource',
          'targetKeys',
          'defaultSelectedKeys',
          'selectedKeys',
          'locale',
        ]),
      );
      await expect(
        page
          .getByRole('region', { name: 'TransferLocale API table', exact: true })
          .locator('tbody tr'),
      ).toHaveCount(8);
    }
  }
});
