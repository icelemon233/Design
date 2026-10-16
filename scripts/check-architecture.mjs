import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const readSource = (file) =>
  ts.createSourceFile(
    file,
    fs.readFileSync(file, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
const navigation = readSource('apps/site/src/docs/navigation.ts');
const declaration = navigation.statements.find(
  (node) => node.declarationList?.declarations[0]?.name.getText(navigation) === 'docsNavItems',
).declarationList.declarations[0];
const items = declaration.initializer.elements.map((node) =>
  Object.fromEntries(
    node.properties.map((property) => [
      property.name.getText(navigation),
      property.initializer.text,
    ]),
  ),
);
const categories = [
  'general',
  'layout',
  'navigation',
  'data-entry',
  'data-display',
  'feedback',
  'overlay',
];
const ordered = categories.flatMap((category) =>
  items
    .filter((item) => item.category === category)
    .sort((a, b) => a.name.localeCompare(b.name, 'en')),
);
const scope = ordered.slice(ordered.findIndex((item) => item.key === 'tabs'));
assert.equal(
  scope.length,
  49,
  'The Tabs-onward acceptance scope changed; update the checklist intentionally.',
);
for (const item of items) {
  for (const file of [
    'packages/react/src/components/' + item.key + '/index.tsx',
    'packages/react/src/components/' + item.key + '/types.ts',
    'apps/site/src/docs/api/' + item.key + '.ts',
  ]) {
    assert.ok(fs.existsSync(file), 'Missing feature boundary: ' + file);
  }
  if (item.key !== 'button')
    assert.ok(
      fs.existsSync('apps/site/src/docs/components/' + item.key + '.tsx'),
      'Missing documentation for ' + item.key,
    );
}
for (const item of scope)
  assert.ok(
    fs.existsSync('packages/react/src/components/' + item.key + '/behavior.test.tsx'),
    'Missing behavior coverage: ' + item.name,
  );
for (const legacy of [
  'DataEntry',
  'DataDisplay',
  'Navigation',
  'Layout',
  'Overlay',
  'Feedback',
  'Components.test',
]) {
  assert.ok(
    !fs.existsSync('packages/react/src/components/' + legacy + '.tsx'),
    'Grouped implementation returned: ' + legacy,
  );
}
const walk = (directory) =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(directory, entry.name))
        : [path.join(directory, entry.name)],
    );
for (const file of walk('packages/react/src').filter((file) => /\.[tj]sx?$/.test(file))) {
  const text = fs.readFileSync(file, 'utf8');
  assert.ok(
    !/apps[\\/]site|services[\\/]supabase/.test(text),
    'The library cannot depend on the documentation app: ' + file,
  );
  assert.ok(
    !/C:[\\/]Users[\\/]|\bwork[\\/]cinna-design/.test(text),
    'Machine-specific path in distributable source: ' + file,
  );
}
for (const file of ['packages/react/src/styles/index.css', 'apps/site/src/styles/index.css']) {
  const imports = [...fs.readFileSync(file, 'utf8').matchAll(/@import\s+["']([^"']+)["']/g)];
  assert.ok(imports.length > 1, 'Styles must retain ordered modules.');
  imports.forEach((match) =>
    assert.ok(
      fs.existsSync(path.resolve(path.dirname(file), match[1])),
      'Missing stylesheet: ' + match[1],
    ),
  );
}
const tokenSource = readSource('packages/tokens/src/index.ts');
const colorDeclaration = tokenSource.statements.find(
  (node) => node.declarationList?.declarations[0]?.name.getText(tokenSource) === 'cinnaColors',
).declarationList.declarations[0];
const colorObject = colorDeclaration.initializer.expression;
const tokenCss = fs.readFileSync('packages/tokens/src/tokens.css', 'utf8');
for (const property of colorObject.properties) {
  const key = property.name.getText(tokenSource);
  const cssKey =
    key === 'background'
      ? 'bg'
      : key.replace(/[A-Z]/g, (character) => '-' + character.toLowerCase());
  const value = tokenCss
    .match(new RegExp('--cinna-color-' + cssKey + '\\s*:\\s*([^;]+);'))?.[1]
    .trim();
  assert.equal(
    value?.toLowerCase(),
    property.initializer.text.toLowerCase(),
    'Token drift: ' + key,
  );
}
console.log(
  'Architecture verified: ' +
    items.length +
    ' documented routes; ' +
    scope.length +
    ' individually tested components from Tabs onward.',
);
