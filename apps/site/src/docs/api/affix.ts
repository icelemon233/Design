// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { affixApiRows as curated } from './curated/affix';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Affix',
      rows: [
        ['offsetTop', 'offsetTop 的配置或回调。', 'number', '-'],
        ['offsetBottom', 'offsetBottom 的配置或回调。', 'number', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Affix',
      rows: [
        ['offsetTop', 'Configuration or callback for offsetTop.', 'number', '-'],
        ['offsetBottom', 'Configuration or callback for offsetBottom.', 'number', '-'],
      ],
    },
  ],
};
export const affixApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
