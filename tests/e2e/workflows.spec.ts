import { test, expect, type Page, type Locator } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function example(page: Page, route: string) {
  await page.addInitScript(() => localStorage.setItem('cinna-site-language', 'en'));
  await page.goto('/#/' + route);
  const root = page.locator('[data-example="enhanced-' + route + '"]');
  await root.waitFor();
  return root;
}

async function expectPanelFits(page: Page, panel: Locator) {
  const viewport = page.viewportSize()!;
  await expect
    .poll(
      async () => {
        const box = await panel.boundingBox();
        return (
          !!box &&
          box.x >= 0 &&
          box.y >= 0 &&
          box.x + box.width <= viewport.width &&
          box.y + box.height <= viewport.height
        );
      },
      { message: 'the open panel stays completely inside the viewport' },
    )
    .toBe(true);
}

test('form validates, submits and resets in a real browser', async ({ page }) => {
  const root = await example(page, 'form');
  await root.getByRole('textbox', { name: 'Recipe name' }).fill('');
  await root.getByRole('button', { name: 'Save recipe' }).click();
  await expect(root.getByRole('alert')).toHaveText('Enter a recipe name.');
  await root.getByRole('textbox', { name: 'Recipe name' }).fill('Cinnamon cloud');
  await root.getByRole('button', { name: 'Save recipe' }).click();
  await expect(root.getByRole('status')).toHaveText('Saved: Cinnamon cloud');
  await root.getByRole('button', { name: 'Reset recipe' }).click();
  await expect(root.getByRole('textbox', { name: 'Recipe name' })).toHaveValue('Cloud cake');
});

test('upload validates, progresses and removes a file', async ({ page }) => {
  const root = await example(page, 'upload');
  await root.locator('input[type=file]').setInputFiles({
    name: 'recipe.txt',
    mimeType: 'text/plain',
    buffer: Buffer.from('Cloud cake'),
  });
  await expect(root.getByText('Uploaded', { exact: true })).toBeVisible();
  await root.getByRole('button', { name: 'Remove recipe.txt' }).click();
  await expect(root.getByText('recipe.txt', { exact: true })).toHaveCount(0);
});

test('message queue updates one keyed message', async ({ page }) => {
  const root = await example(page, 'message');
  await root.getByRole('button', { name: 'Show message' }).click();
  await expect(page.locator('.cinna-message-stack .cinna-message')).toHaveCount(1);
  await root.getByRole('button', { name: 'Update same message' }).click();
  await expect(page.locator('.cinna-message-stack .cinna-message')).toHaveCount(1);
  await expect(page.locator('.cinna-message-stack')).toHaveText(/Recipe saved/);
  await root.getByRole('button', { name: 'Clear messages' }).click();
  await expect(page.locator('.cinna-message-stack .cinna-message')).toHaveCount(0);
});

test('notification actions dismiss the notification', async ({ page }) => {
  const root = await example(page, 'notification');
  await root.getByRole('button', { name: 'Show notification' }).click();
  await expect(page.locator('.cinna-notification-stack')).toContainText('Recipe published');
  await page.getByRole('button', { name: 'Dismiss publication' }).click();
  await expect(page.locator('.cinna-notification-stack .cinna-notification')).toHaveCount(0);
});

test('select filters multiple options with keyboard control', async ({ page }) => {
  const root = await example(page, 'select');
  await root.getByRole('button', { name: 'Search ingredients' }).click();
  const search = root.getByRole('combobox', { name: 'Search options' });
  await expect(search).toBeFocused();
  await search.fill('blue');
  await expectPanelFits(page, root.locator('.cinna-select__popup'));
  await search.press('ArrowDown');
  await search.press('Enter');
  await expect(root.getByRole('option', { name: /Blueberry/ })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await search.press('Escape');
  await root.getByRole('button', { name: 'Clear selection' }).click();
  await expect(root.getByRole('button', { name: 'Search ingredients' })).toContainText(
    'Search ingredients',
  );
});

test('tree checks enabled descendants and honors disabled nodes', async ({ page }) => {
  const root = await example(page, 'tree');
  await root.getByRole('checkbox', { name: 'Check Recipes' }).locator('..').click();
  await expect(root.getByRole('checkbox', { name: 'Check Cloud cake' })).toBeChecked();
  await expect(root.getByRole('checkbox', { name: 'Check Archived recipe' })).not.toBeChecked();
  await expect(root.getByRole('checkbox', { name: 'Check Archived recipe' })).toBeDisabled();
});

test('tree select searches hierarchy and restores keyboard focus', async ({ page }) => {
  const root = await example(page, 'tree-select');
  const control = root.getByRole('button', { name: 'Find a recipe' });
  await control.click();
  await expectPanelFits(page, root.locator('.cinna-select__popup'));
  await root.getByRole('textbox', { name: 'Search nodes' }).fill('cinnamon');
  await root.getByRole('button', { name: 'Cinnamon tart', exact: true }).click();
  await expect(control).toContainText('Cinnamon tart');
  await expect(control).toBeFocused();
});

test('rating accepts half-star keyboard steps', async ({ page }) => {
  const root = await example(page, 'rate');
  const rating = root.getByRole('slider', { name: 'Rate the recipe' });
  await rating.focus();
  await rating.press('ArrowRight');
  await expect(rating).toHaveAttribute('aria-valuenow', '4');
  await rating.press('ArrowLeft');
  await expect(rating).toHaveAttribute('aria-valuenow', '3.5');
});

test('table combines filters, selection, expansion and pagination', async ({ page }) => {
  const root = await example(page, 'table');
  await root.getByRole('combobox', { name: 'Filter Category' }).selectOption('cake');
  await root.getByRole('checkbox', { name: 'Select all rows' }).locator('..').click();
  await expect(root.getByRole('status')).toContainText('Selected recipes: 2');
  await root.getByRole('button', { name: 'Expand row 1' }).click();
  await expect(root.getByText('Prepare 8 servings of Cloud cake.')).toBeVisible();
  await root.getByRole('button', { name: 'Next page' }).click();
  await expect(root.getByText('Vanilla cloud', { exact: true })).toBeVisible();
});

test('date and time panels commit constrained values', async ({ page }) => {
  let root = await example(page, 'date-picker');
  await root.getByRole('button', { name: 'Open calendar' }).click();
  const calendar = root.getByRole('dialog', { name: 'Choose date' });
  await expectPanelFits(page, calendar);
  const enabledDay = calendar
    .locator('.cinna-calendar__grid button:not(:disabled)')
    .filter({ hasText: /^20$/ })
    .first();
  await enabledDay.click();
  await expect(root.locator('input[type=date]')).toHaveValue('2026-10-20');
  root = await example(page, 'time-picker');
  await root.getByRole('button', { name: 'Open time panel' }).click();
  await expectPanelFits(page, root.getByRole('dialog'));
  await root
    .getByRole('listbox', { name: 'Minutes' })
    .getByRole('option', { name: '45', exact: true })
    .click();
  await expect(root.locator('input[type=time]')).toHaveValue('09:45');
  await root.getByRole('button', { name: 'Done', exact: true }).click();
});

test('delayed spin blocks and releases wrapped actions', async ({ page }) => {
  const root = await example(page, 'spin');
  await root.getByRole('button', { name: 'Start loading' }).click();
  await expect(root.locator('.cinna-spin')).toHaveAttribute('aria-busy', 'true');
  await expect(root.locator('.cinna-spin__content')).toHaveAttribute('inert', '');
  await root.getByRole('button', { name: 'Stop loading' }).click();
  await expect(root.locator('.cinna-spin__content')).not.toHaveAttribute('inert');
});

test('target tour advances and closes with Escape', async ({ page }) => {
  const root = await example(page, 'tour');
  await root.getByRole('button', { name: 'Start guide' }).click();
  const dialog = page.getByRole('dialog', { name: 'Choose a recipe' });
  await expect(dialog).toBeVisible();
  await expect(page.locator('.cinna-tour__spotlight')).toBeVisible();
  await dialog.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Save your changes' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('modal traps focus and restores its trigger', async ({ page }) => {
  await page.goto('/#/modal');
  await page.locator('[data-example="basic-modal"]').waitFor();
  const opener = page
    .locator('[data-example="basic-modal"]')
    .getByRole('button', { name: 'Open modal', exact: true });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Recipe review' });
  await expect(dialog).toBeVisible();
  await dialog.getByRole('button', { name: 'OK', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(dialog.getByRole('button', { name: 'Close modal' })).toBeFocused();
  const results = await new AxeBuilder({ page })
    .include('.cinna-modal')
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('drawer dismisses from the keyboard', async ({ page }) => {
  await page.goto('/#/drawer');
  await page.locator('[data-example="basic-drawer"]').waitFor();
  const opener = page
    .locator('[data-example="basic-drawer"]')
    .getByRole('button', { name: 'Open drawer', exact: true });
  await opener.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('popup stays inside the viewport when opened', async ({ page }) => {
  await page.goto('/#/popup');
  await page.locator('[data-example="popup-tooltip-basic"]').waitFor();
  const root = page.locator('[data-example="popup-tooltip-basic"]');
  const trigger = root.locator('button').first();
  await trigger.focus();
  const panel = root.locator('.cinna-popup__panel');
  await expect(panel).toBeVisible();
  const rect = await panel.boundingBox();
  expect(rect).not.toBeNull();
  expect(rect!.x).toBeGreaterThanOrEqual(0);
  expect(rect!.x + rect!.width).toBeLessThanOrEqual(page.viewportSize()!.width);
  await page.keyboard.press('Escape');
  await expect(panel).not.toBeVisible();
});

test('nested select closes before its modal and invalid fields receive focus', async ({ page }) => {
  const root = await example(page, 'modal');
  const opener = root.getByRole('button', { name: 'Open recipe editor' });
  await opener.click();
  const dialog = page.getByRole('dialog', { name: 'Edit recipe' });
  await dialog.getByRole('button', { name: 'Save category' }).click();
  await expect(dialog.getByRole('alert')).toHaveText('Choose a category.');
  const select = dialog.getByRole('button', { name: /^Category / });
  await expect(select).toBeFocused();
  await select.click();
  await expect(dialog.getByRole('listbox')).toBeVisible();
  await expectPanelFits(page, dialog.locator('.cinna-select__popup'));
  await dialog.getByRole('option', { name: 'Tart', exact: true }).click();
  await expect(select).toContainText('Tart');
  await select.click();
  await page.keyboard.press('Escape');
  await expect(dialog.getByRole('listbox')).toHaveCount(0);
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('cascader keeps expanded columns on screen and commits a leaf', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('cinna-site-language', 'en'));
  await page.goto('/#/cascader');
  const root = page.locator('[data-example="basic-cascader"]');
  await root.getByRole('combobox').click();
  await root.getByRole('option', { name: /Docs/ }).first().click();
  await expectPanelFits(page, root.locator('.cinna-cascader__popup'));
  await root.getByRole('option', { name: 'API', exact: true }).click();
  await expect(root.getByRole('combobox')).toContainText('Docs / API');
  await expect(root.getByRole('listbox')).toHaveCount(0);
});

test('mobile navigation supports Escape and restores its trigger', async ({ page }) => {
  test.skip(
    (page.viewportSize()?.width ?? 1440) > 900,
    'Mobile navigation is only shown below 900px.',
  );
  await page.goto('/#/tabs');
  await page.locator('.component-example').first().waitFor();
  const opener = page.getByRole('button', { name: 'Open component menu' });
  await opener.click();
  await expect(page.locator('.docs-mobile-drawer')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('.docs-mobile-drawer')).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test('desktop navigation preserves its filter when a component changes', async ({ page }) => {
  test.skip(
    (page.viewportSize()?.width ?? 1440) <= 900,
    'This checks the persistent desktop sidebar.',
  );
  await page.addInitScript(() => localStorage.setItem('cinna-site-language', 'en'));
  await page.goto('/#/tabs');
  await page.locator('.component-example').first().waitFor();
  const sidebar = page.locator('.docs-sidebar:visible');
  const input = sidebar.locator('input');
  await input.fill('Input');
  await sidebar.getByRole('button', { name: 'InputNumber', exact: true }).click();
  await expect(page).toHaveURL(/input-number/);
  await expect(input).toHaveValue('Input');
});
