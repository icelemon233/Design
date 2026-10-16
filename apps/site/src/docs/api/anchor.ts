// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { anchorApiRows as curated } from './curated/anchor';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Anchor',
      rows: [
        ['items', '展示项目。', 'AnchorItem[]', '-'],
        ['offsetTop', 'offsetTop 的配置或回调。', 'number', '0'],
        ['targetOffset', 'targetOffset 的配置或回调。', 'number', '-'],
        ['direction', 'direction 的配置或回调。', 'AnchorDirection', "'vertical'"],
        ['affix', 'affix 的配置或回调。', 'boolean', 'false'],
        ['getContainer', 'getContainer 的配置或回调。', '(() => HTMLElement | Window | null)', '-'],
        ['defaultActiveHref', 'defaultActiveHref 的配置或回调。', 'string', '-'],
        [
          'onItemClick',
          'onItemClick 的配置或回调。',
          '((event: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => void)',
          '-',
        ],
        ['onChange', '值变更时调用。', '((activeHref: string) => void)', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Anchor',
      rows: [
        ['items', 'Items to display.', 'AnchorItem[]', '-'],
        ['offsetTop', 'Configuration or callback for offsetTop.', 'number', '0'],
        ['targetOffset', 'Configuration or callback for targetOffset.', 'number', '-'],
        ['direction', 'Configuration or callback for direction.', 'AnchorDirection', "'vertical'"],
        ['affix', 'Configuration or callback for affix.', 'boolean', 'false'],
        [
          'getContainer',
          'Configuration or callback for getContainer.',
          '(() => HTMLElement | Window | null)',
          '-',
        ],
        ['defaultActiveHref', 'Configuration or callback for defaultActiveHref.', 'string', '-'],
        [
          'onItemClick',
          'Configuration or callback for onItemClick.',
          '((event: React.MouseEvent<HTMLAnchorElement>, item: AnchorItem) => void)',
          '-',
        ],
        ['onChange', 'Called when the value changes.', '((activeHref: string) => void)', '-'],
      ],
    },
  ],
};
export const anchorApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
