# Cinna Design

English | [简体中文](./README_zh_CN.md)

<img src="./apps/site/src/assets/cinna-cloud-cat.webp" alt="Cinna Design cloud cat mascot" width="180" />

React UI components with a soft cloud-and-dessert style: warm colors, rounded surfaces, and a playful cloud cat mascot.

[Explore the component demos](https://icelemon233.github.io/cinna-design/)

## What you can build with

- Buttons, cards, labeled inputs, and cloud cat loading animations.
- Layout, navigation, forms, data displays, and feedback components.
- Shared colors and theme settings for a consistent interface.

The library targets React 18 and newer. Core components sit alongside a broader set of experimental controls; check the demos for the behavior you need.

## Preview locally

Use Node.js and the pnpm version declared in this repository. From a clone, run:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

Open the local address printed by the preview server.

## Component example

The components are available in this repository's workspace package, `@cinna-design/react`. A minimal example looks like this:

```tsx
import '@cinna-design/react/style.css';
import { Button, Card } from '@cinna-design/react';

export function Example() {
  return (
    <Card title="My project">
      <Button>Save</Button>
    </Card>
  );
}
```

## Acknowledgments

Visual inspiration: [animal-island-ui](https://github.com/guokaigdg/animal-island-ui/tree/main).

## License

[MIT](./LICENSE).
