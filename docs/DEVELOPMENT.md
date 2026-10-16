# Developing Cinna Design

Cinna is a React 18 component library with a Vite documentation app. The public package remains `@cinna-design/react`; Ant Design is the reference for interaction patterns, while the API and visual system belong to Cinna.

## Workspace boundaries

- `packages/react/src/components/<name>/index.tsx` implements one feature. Public props live in its `types.ts`; behavior and regression tests live beside it.
- `packages/react/src/hooks` owns controlled state, outside interaction, Escape layering, responsive tags and server-safe layout effects.
- `packages/react/src/internal` owns shared dialog behavior, viewport-aware picker panels, disabled state and portal theme inheritance. These internals stay outside the package's public entry.
- `packages/react/src/styles/index.css` preserves the ordered CSS cascade through smaller modules. Accessibility and added component states have separate files.
- `packages/tokens` defines the cloud, cream and cocoa tokens. TypeScript and CSS values must agree.
- `packages/icons` contains the standalone SVG set. The React package also retains the existing raster arrows.
- `apps/site/src/docs/components` defines each component page. Complete examples live in `docs/examples`; the displayed code uses the actual preview source through Vite's `?raw` import.
- `apps/site/src/docs/api` contains per-component tables generated from public types. Authored descriptions live in `api/curated`.
- `apps/site/src/services` contains optional site integrations. The component library never imports the documentation app.
- `design/brand` stores the original mascot PNGs. Optimized assets live in the consuming packages.

Import components through the public package entry. Inside the library, import another feature directly, for example `../button`, to keep dependencies visible and avoid a circular public barrel.

## Development commands

Use Node.js 24+ and pnpm 11.5.2, as declared in package.json.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm docs:api
pnpm format:check
```

The check command verifies architecture, types, unit tests, all package builds and built ESM/CommonJS/CSS/declaration artifacts. The package smoke check also renders representative components on the server.

Install the browser once, then run the browser suite:

```sh
pnpm exec playwright install chromium
pnpm test:e2e
```

Set PLAYWRIGHT_CHANNEL=chrome to use an installed Chrome instead. CI uses bundled Chromium. The three viewports are 1440×1000, 768×1024 and 390×844. Desktop examples also run automated accessibility checks.

## Component acceptance

The default navigation groups components and sorts each group by name. Tabs is the final navigation component after Steps. The acceptance scope contains Tabs and all 48 subsequent pages.

For every component, check its advertised functionality, controlled and uncontrolled state, disabled/read-only behavior where supported, keyboard operation, error/loading/empty states, and the rendered examples. Passing unit tests alone does not establish visual quality.

Browser workflows exercise form validation/reset, actual file selection and simulated upload progress, message replacement, notification actions, hierarchical checks, searching, table combinations, date/time panels, loading overlays, target tours, focus trapping, nested Escape and mobile navigation. Screenshots and accessibility results are saved in test-results/visual.

Ant Design is a behavioral reference, not a drop-in API compatibility promise. Native attributes remain native for inputs, textareas, numeric/date/time inputs and Upload. Upload selects local files until action or customRequest is provided; the documentation request demo does not send files.

## Adding a component

1. Add a feature directory, explicit props and a public export.
2. Add its documentation entry and usable examples.
3. Add meaningful behavior tests and responsive browser coverage.
4. Regenerate API tables, then format and validate.

Keep earlier component styling intact when refining later pages. Use the existing tokens for color, surfaces, focus and motion. Preserve reduced-motion behavior and the meaning of native controls.

## Build and deployment

The pages build uses the /cinna-design/ asset base. The deploy:pages command builds and updates the gh-pages branch through a temporary checkout. It works on Windows, macOS and Linux with Git and pnpm available.

Normal validation and pull request creation do not publish the site. Review the checklist and screenshots before publishing a release.

## References

- [Ant Design components](https://ant.design/components/overview/)
- [WAI-ARIA tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [WAI-ARIA modal dialogs](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
