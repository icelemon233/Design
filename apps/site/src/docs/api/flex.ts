// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { flexApiRows as curated } from './curated/flex';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Flex',
      rows: [
        ['vertical', 'vertical 的配置或回调。', 'boolean', '-'],
        [
          'align',
          'align 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          '-',
        ],
        [
          'justify',
          'justify 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['gap', '水印平铺间距。', 'number | CinnaSize', "'medium'"],
        ['wrap', 'wrap 的配置或回调。', 'boolean', '-'],
        ['inline', 'inline 的配置或回调。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Flex',
      rows: [
        ['vertical', 'Configuration or callback for vertical.', 'boolean', '-'],
        [
          'align',
          'Configuration or callback for align.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          '-',
        ],
        [
          'justify',
          'Configuration or callback for justify.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['gap', 'Watermark tile spacing.', 'number | CinnaSize', "'medium'"],
        ['wrap', 'Configuration or callback for wrap.', 'boolean', '-'],
        ['inline', 'Configuration or callback for inline.', 'boolean', '-'],
      ],
    },
  ],
};
export const flexApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
