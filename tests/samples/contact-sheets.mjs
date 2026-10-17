import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';

const source = path.resolve('test-results/samples');
const review = path.resolve('test-results/sample-review');
const output = path.join(review, 'contact-sheets');
await fs.mkdir(output, { recursive: true });
const projects = process.argv.slice(2);
if (!projects.length) {
  for (const engine of ['chromium', 'firefox', 'webkit'])
    for (const mode of ['desktop', 'tablet-touch', 'phone-touch', 'reduced-motion'])
      projects.push(engine + '-' + mode);
}
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
const entries = await fs.readdir(source, { withFileTypes: true });
const records = [];
const browser = await chromium.launch();
try {
  for (const project of projects) {
    const phone = project.endsWith('phone-touch');
    const tablet = project.endsWith('tablet-touch');
    const dpr = phone ? 3 : project.endsWith('desktop') ? 1 : 2;
    const columns = phone ? 300 : tablet ? 640 : 780;
    const screenshots = new Map();
    for (const entry of entries.filter(
      (item) => item.isDirectory() && item.name.endsWith('-' + project),
    )) {
      for (const file of await fs.readdir(path.join(source, entry.name))) {
        if (file.endsWith('.png') && !file.startsWith('test-failed'))
          screenshots.set(file, path.join(source, entry.name, file));
      }
    }
    const extra = path.join(review, 'extra', project);
    for (const file of await fs.readdir(extra).catch(() => [])) {
      if (file.endsWith('.png')) screenshots.set(file, path.join(extra, file));
    }
    const groups = [
      [
        'tabs-surfaces',
        [
          'borderless-top',
          'borderless-bottom',
          'borderless-left',
          'borderless-right',
          'bordered-top',
          'bordered-bottom',
          'bordered-left',
          'bordered-right',
        ],
      ],
      [
        'tabs-states',
        [
          'tabs-default',
          'tabs-editable-reorderable',
          'tabs-320-editable-reorderable',
          'tabs-empty',
          'tabs-chinese',
          'tabs-pill-focus',
          'tabs-card-focus',
          'tabs-pill-disabled',
          'tabs-card-disabled',
          'tabs-source-toggle',
        ],
      ],
    ];
    const transferStates = [
      'transfer-default',
      'transfer-stacked-long',
      'transfer-selected-focus',
      'transfer-moved-focus',
      'transfer-disabled',
      'transfer-no-results',
      'transfer-chinese',
      'transfer-source-toggle',
    ];
    const perSheet = phone ? 2 : 4;
    for (let index = 0; index < transferStates.length; index += perSheet)
      groups.push([
        'transfer-' + (index / perSheet + 1),
        transferStates.slice(index, index + perSheet),
      ]);
    const page = await browser.newPage({
      viewport: { width: columns * 2 + 64, height: 1000 },
      deviceScaleFactor: 1,
    });
    try {
      for (const [group, names] of groups) {
        const cards = [];
        const files = [];
        for (const name of names) {
          const file = screenshots.get(name + '.png');
          if (!file) continue;
          const bytes = await fs.readFile(file);
          const width = bytes.readUInt32BE(16),
            height = bytes.readUInt32BE(20);
          const cssWidth = Math.round(width / dpr);
          cards.push(
            '<figure><figcaption>' +
              escape(name) +
              ' · ' +
              cssWidth +
              'px wide</figcaption><img style="width:' +
              cssWidth +
              'px" src="data:image/png;base64,' +
              bytes.toString('base64') +
              '"></figure>',
          );
          files.push({
            path: path.relative(path.resolve('.'), file).replaceAll('\\', '/'),
            width,
            height,
            sha256: createHash('sha256').update(bytes).digest('hex'),
          });
        }
        if (!cards.length) continue;
        const html =
          '<!doctype html><html><head><meta charset="UTF-8"><style>*{box-sizing:border-box}body{margin:24px;background:#eee9e2;color:#46332a;font:14px Arial}h1{margin:0 0 8px;font-size:22px}p{margin:0 0 20px}.grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:start}figure{margin:0;padding:12px;background:white;border-radius:12px;min-width:0}figcaption{font-size:12px;line-height:1.4;margin-bottom:12px}img{display:block;max-width:100%;height:auto}</style></head><body><h1>' +
          escape(project) +
          ' · ' +
          group +
          '</h1><p>Rendered component captures. Review candidates; no approved pixel baseline.</p><div class="grid">' +
          cards.join('') +
          '</div></body></html>';
        await page.setContent(html);
        await page
          .locator('img')
          .evaluateAll((images) => Promise.all(images.map((image) => image.decode())));
        const target = path.join(output, project + '-' + group + '.png');
        await page.screenshot({ path: target, fullPage: true });
        records.push({
          project,
          group,
          sheet: path.relative(path.resolve('.'), target).replaceAll('\\', '/'),
          screenshots: files,
        });
      }
    } finally {
      await page.close();
    }
    console.log(project + ': contact sheets generated');
  }
} finally {
  await browser.close();
}
await fs.writeFile(path.join(output, 'index.json'), JSON.stringify(records, null, 2) + '\n');
