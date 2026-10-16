<p align="center"><img src="./apps/site/src/assets/cinna-cloud-cat.webp" alt="Cinna Design" width="150"></p>

<h1 align="center">Cinna Design</h1>

<p align="center">English · <a href="./README_zh_CN.md">简体中文</a></p>

React components with pastel colors, rounded shapes, and a cloud cat mascot.

[Component demos](https://icelemon233.github.io/cinna-design/) · [MIT license](./LICENSE)

The library includes buttons, cards, inputs, loading animations, and components for forms, navigation, and data display. It supports React 18 and newer; some controls are experimental.

## Example

The workspace package is `@cinna-design/react`. Its components can be composed like this:

```tsx
import '@cinna-design/react/style.css';
import { Button, Card } from '@cinna-design/react';

export function Example() {
  return (
    <Card title="Notes">
      <Button>Save</Button>
    </Card>
  );
}
```

## Browse locally

Use Node.js and the pnpm version declared in the repository:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Open the local address printed by the server. The public demo is also available without a local setup.

## Credits

Visual inspiration: [animal-island-ui](https://github.com/guokaigdg/animal-island-ui/tree/main).
