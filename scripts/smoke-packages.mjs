import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

const require = createRequire(import.meta.url);
const esm = await import(pathToFileURL(path.resolve('packages/react/dist/index.js')).href);
const cjs = require('../packages/react/dist/cjs/index.cjs');
for (const name of [
  'Button',
  'Tabs',
  'Form',
  'FormItem',
  'Select',
  'Cascader',
  'Upload',
  'Tree',
  'Table',
  'Popup',
  'Modal',
  'Drawer',
  'Message',
  'Notification',
  'Spin',
]) {
  assert.ok(esm[name], 'Missing ESM export: ' + name);
  assert.ok(cjs[name], 'Missing CommonJS export: ' + name);
}
for (const file of ['packages/react/dist/style.css', 'packages/react/dist/types/index.d.ts'])
  assert.ok(fs.existsSync(file), 'Missing package artifact: ' + file);
const elements = [
  React.createElement(esm.Tabs, { items: [{ key: 'a', label: 'A', children: 'Panel' }] }),
  React.createElement(esm.Select, { options: [{ value: 'a', label: 'A' }] }),
  React.createElement(esm.Tree, { treeData: [{ key: 'a', title: 'A' }] }),
  React.createElement(esm.Table, {
    columns: [{ title: 'Name', dataIndex: 'name' }],
    dataSource: [{ key: 1, name: 'Cloud' }],
  }),
  React.createElement(esm.Popup, { label: 'More', content: 'Details' }),
  React.createElement(esm.Modal, { open: true, title: 'Server dialog' }),
  React.createElement(esm.Drawer, { open: true, title: 'Server drawer' }),
  React.createElement(
    esm.Form,
    { initialValues: { name: 'Cloud' } },
    React.createElement(
      esm.FormItem,
      { name: 'name', label: 'Name' },
      React.createElement(esm.Input),
    ),
  ),
];
const warnings = [];
const originalError = console.error;
console.error = (...args) => warnings.push(args.join(' '));
try {
  elements.forEach((element) => renderToString(element));
} finally {
  console.error = originalError;
}
assert.deepEqual(warnings, [], 'Server rendering emitted warnings.');
const tokens = await import(pathToFileURL(path.resolve('packages/tokens/dist/index.js')).href);
const icons = await import(pathToFileURL(path.resolve('packages/icons/dist/index.js')).href);
assert.ok(Object.keys(tokens).length);
assert.equal(typeof icons.CloudIcon, 'function');
console.log(
  'Built packages verified: ESM, CommonJS, CSS, declarations, tokens, icons and server rendering.',
);
