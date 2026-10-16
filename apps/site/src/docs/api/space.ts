// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { spaceApiRows as curated } from './curated/space';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Space',
      rows: [
        ['direction', 'direction 的配置或回调。', '"horizontal" | "vertical"', "'horizontal'"],
        ['size', '组件尺寸。', 'number | CinnaSize', "'medium'"],
        [
          'align',
          'align 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          "'center'",
        ],
        [
          'justify',
          'justify 的配置或回调。',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['wrap', 'wrap 的配置或回调。', 'boolean', 'false'],
        ['split', 'split 的配置或回调。', 'React.ReactNode', '-'],
        ['block', '铺满父容器宽度。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Space',
      rows: [
        [
          'direction',
          'Configuration or callback for direction.',
          '"horizontal" | "vertical"',
          "'horizontal'",
        ],
        ['size', 'Component size.', 'number | CinnaSize', "'medium'"],
        [
          'align',
          'Configuration or callback for align.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.AlignItems',
          "'center'",
        ],
        [
          'justify',
          'Configuration or callback for justify.',
          'import("C:/Users/icy/Documents/Codex/2026-10-17/https-github-com-icelemon233-cinna-design/work/cinna-design/node_modules/.pnpm/csstype@3.2.3/node_modules/csstype/index").Property.JustifyContent',
          '-',
        ],
        ['wrap', 'Configuration or callback for wrap.', 'boolean', 'false'],
        ['split', 'Configuration or callback for split.', 'React.ReactNode', '-'],
        ['block', 'Fill the parent width.', 'boolean', '-'],
      ],
    },
  ],
};
export const spaceApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
