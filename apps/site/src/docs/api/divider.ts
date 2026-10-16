// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { dividerApiRows as curated } from './curated/divider';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Divider',
      rows: [
        ['orientation', 'orientation 的配置或回调。', '"right" | "left" | "center"', '-'],
        ['vertical', 'vertical 的配置或回调。', 'boolean', '-'],
        ['dashed', 'dashed 的配置或回调。', 'boolean', 'true'],
        ['plain', 'plain 的配置或回调。', 'boolean', '-'],
        ['color', 'color 的配置或回调。', 'string', '-'],
        ['character', '自定义评分字符。', 'string', '-'],
        ['left', 'left 的配置或回调。', 'string | number | boolean', '-'],
        ['right', 'right 的配置或回调。', 'string | number | boolean', '-'],
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
          '"right" | "left" | "center"',
          '-',
        ],
        ['vertical', 'Configuration or callback for vertical.', 'boolean', '-'],
        ['dashed', 'Configuration or callback for dashed.', 'boolean', 'true'],
        ['plain', 'Configuration or callback for plain.', 'boolean', '-'],
        ['color', 'Configuration or callback for color.', 'string', '-'],
        ['character', 'Custom rating character.', 'string', '-'],
        ['left', 'Configuration or callback for left.', 'string | number | boolean', '-'],
        ['right', 'Configuration or callback for right.', 'string | number | boolean', '-'],
      ],
    },
  ],
};
export const dividerApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
