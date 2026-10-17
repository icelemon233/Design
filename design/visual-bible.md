# Cinna Design Visual Bible

## Positioning

Cinna Design is a themed application component library with signature dessert components. It should feel warm, soft, touchable, and a little handmade, while still being practical enough for real forms, tables, navigation, and feedback surfaces.

## Current mascot

Cinna is an original cloud-dessert fairy with ivory hair, cloud-blue clothes, a cinnamon-roll hair bun and a cloud clasp. Use the full portrait for the homepage and the simplified avatar for the wordmark, favicon and loading identity. Original PNGs live in design/brand; prompts live in design/asset-prompts/cinna-mascot.md. Earlier cloud-cat illustrations remain reference assets.

Documentation section icons use the same Cinna character: an open example book for samples, a tutorial notebook for usage, and a specification clipboard for API tables. Their prompts live in design/asset-prompts/cinna-documentation-icons.md.

## Core Metaphor

Clouds over a dessert counter:

- Milk-cloud blue is the main interaction color.
- Cream and vanilla surfaces keep pages warm.
- Cocoa text adds readability and avoids cold gray.
- Butter, strawberry, pistachio, and lavender accents create variety.
- Rounded forms should feel like frosting, marshmallow, and soft dough.
- Typography uses Quicksand for all Latin text, including code, API tables, native form controls and the footer. Chinese text uses the system fallback in the same token. Display and hand font roles alias the base family so they follow one font setting.

## Design Rules

1. Use blue as freshness, not coldness. Pair it with cream and cocoa.
2. Interactive targets should be visibly touchable, with soft depth or a clear press state.
3. Avoid sharp corners on interactive elements. Default radius starts at 14px.
4. Motion should be gentle and buoyant: floating, breathing, pressing, and settling.
5. Decorative assets must be original and theme-specific: clouds, sugar stars, pastry dots, ribbons, recipe paper.
6. Dense application screens must remain readable. Sweetness is an accent, not visual noise.
7. Documentation and generated examples must use source-of-truth tokens, not copied hex values.
8. Keep Cinna's type mood original: light, airy, soft, and compatible with real application UI.

## First Signature Component

`Loading` uses Cinna's avatar, floating cloud motion, and tiny sugar sparkles. It should be small enough for application loading states but charming enough to be memorable.
