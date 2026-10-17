// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { typographyApiRows as curated } from './curated/typography';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Typography',
      rows: [
        ['muted', 'muted 的配置或回调。', 'boolean', '-'],
        ['compact', 'compact 的配置或回调。', 'boolean', '-'],
      ],
    },
    {
      title: 'Title',
      rows: [
        ['level', 'level 的配置或回调。', '1 | 2 | 3 | 4 | 5', '2'],
        ['muted', 'muted 的配置或回调。', 'boolean', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['copyable', 'copyable 的配置或回调。', 'TypographyCopyable', '-'],
        ['ellipsis', 'ellipsis 的配置或回调。', 'TypographyEllipsis', '-'],
      ],
    },
    {
      title: 'Paragraph',
      rows: [
        ['muted', 'muted 的配置或回调。', 'boolean', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['copyable', 'copyable 的配置或回调。', 'TypographyCopyable', '-'],
        ['ellipsis', 'ellipsis 的配置或回调。', 'TypographyEllipsis', '-'],
      ],
    },
    {
      title: 'Text',
      rows: [
        [
          'tone',
          'tone 的配置或回调。',
          "'default' | 'secondary' | 'muted' | CinnaStatus",
          "'default'",
        ],
        ['strong', 'strong 的配置或回调。', 'boolean', '-'],
        ['code', 'code 的配置或回调。', 'boolean', '-'],
        ['mark', 'mark 的配置或回调。', 'boolean', '-'],
        ['delete', 'delete 的配置或回调。', 'boolean', '-'],
        ['underline', 'underline 的配置或回调。', 'boolean', '-'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['link', 'link 的配置或回调。', 'boolean', '-'],
        ['href', 'href 的配置或回调。', 'string', '-'],
        ['target', 'target 的配置或回调。', 'string', '-'],
        ['rel', 'rel 的配置或回调。', 'string', '-'],
        ['copyable', 'copyable 的配置或回调。', 'TypographyCopyable', '-'],
        ['ellipsis', 'ellipsis 的配置或回调。', 'TypographyEllipsis', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Typography',
      rows: [
        ['muted', 'Configuration or callback for muted.', 'boolean', '-'],
        ['compact', 'Configuration or callback for compact.', 'boolean', '-'],
      ],
    },
    {
      title: 'Title',
      rows: [
        ['level', 'Configuration or callback for level.', '1 | 2 | 3 | 4 | 5', '2'],
        ['muted', 'Configuration or callback for muted.', 'boolean', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['copyable', 'Configuration or callback for copyable.', 'TypographyCopyable', '-'],
        ['ellipsis', 'Configuration or callback for ellipsis.', 'TypographyEllipsis', '-'],
      ],
    },
    {
      title: 'Paragraph',
      rows: [
        ['muted', 'Configuration or callback for muted.', 'boolean', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['copyable', 'Configuration or callback for copyable.', 'TypographyCopyable', '-'],
        ['ellipsis', 'Configuration or callback for ellipsis.', 'TypographyEllipsis', '-'],
      ],
    },
    {
      title: 'Text',
      rows: [
        [
          'tone',
          'Configuration or callback for tone.',
          "'default' | 'secondary' | 'muted' | CinnaStatus",
          "'default'",
        ],
        ['strong', 'Configuration or callback for strong.', 'boolean', '-'],
        ['code', 'Configuration or callback for code.', 'boolean', '-'],
        ['mark', 'Configuration or callback for mark.', 'boolean', '-'],
        ['delete', 'Configuration or callback for delete.', 'boolean', '-'],
        ['underline', 'Configuration or callback for underline.', 'boolean', '-'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['link', 'Configuration or callback for link.', 'boolean', '-'],
        ['href', 'Configuration or callback for href.', 'string', '-'],
        ['target', 'Configuration or callback for target.', 'string', '-'],
        ['rel', 'Configuration or callback for rel.', 'string', '-'],
        ['copyable', 'Configuration or callback for copyable.', 'TypographyCopyable', '-'],
        ['ellipsis', 'Configuration or callback for ellipsis.', 'TypographyEllipsis', '-'],
      ],
    },
  ],
};
export const typographyApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
