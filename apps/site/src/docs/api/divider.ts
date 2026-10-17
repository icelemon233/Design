// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { dividerApiRows as curated } from './curated/divider';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Divider',
      rows: [
        ['orientation', 'orientation 的配置或回调。', "'left' | 'center' | 'right'", '-'],
        ['vertical', 'vertical 的配置或回调。', 'boolean', '-'],
        ['dashed', 'dashed 的配置或回调。', 'boolean', 'true'],
        ['plain', 'plain 的配置或回调。', 'boolean', '-'],
        ['color', 'color 的配置或回调。', 'string', '-'],
        ['character', '自定义评分字符。', 'string', '-'],
        ['left', 'left 的配置或回调。', 'boolean | number | string', '-'],
        ['right', 'right 的配置或回调。', 'boolean | number | string', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Divider',
      rows: [
        [
          'orientation',
          'Configuration or callback for orientation.',
          "'left' | 'center' | 'right'",
          '-',
        ],
        ['vertical', 'Configuration or callback for vertical.', 'boolean', '-'],
        ['dashed', 'Configuration or callback for dashed.', 'boolean', 'true'],
        ['plain', 'Configuration or callback for plain.', 'boolean', '-'],
        ['color', 'Configuration or callback for color.', 'string', '-'],
        ['character', 'Custom rating character.', 'string', '-'],
        ['left', 'Configuration or callback for left.', 'boolean | number | string', '-'],
        ['right', 'Configuration or callback for right.', 'boolean | number | string', '-'],
      ],
    },
  ],
};
export const dividerApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
