// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const cardApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Card',
      rows: [
        ['tone', 'tone 的配置或回调。', 'CardTone', "'cream'"],
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['extra', '额外内容。', 'React.ReactNode', '-'],
        ['interactive', 'interactive 的配置或回调。', 'boolean', 'false'],
        ['padded', 'padded 的配置或回调。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Card',
      rows: [
        ['tone', 'Configuration or callback for tone.', 'CardTone', "'cream'"],
        ['title', 'Title content.', 'React.ReactNode', '-'],
        ['extra', 'Additional content.', 'React.ReactNode', '-'],
        ['interactive', 'Configuration or callback for interactive.', 'boolean', 'false'],
        ['padded', 'Configuration or callback for padded.', 'boolean', 'true'],
      ],
    },
  ],
};
