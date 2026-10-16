// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const emptyApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Empty',
      rows: [
        ['description', '辅助描述内容；false 可隐藏。', 'React.ReactNode', "'No data yet'"],
        ['image', '自定义空状态插画。', 'React.ReactNode', '-'],
        ['actions', 'actions 的配置或回调。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Empty',
      rows: [
        ['description', 'Description; false hides it.', 'React.ReactNode', "'No data yet'"],
        ['image', 'Custom empty-state illustration.', 'React.ReactNode', '-'],
        ['actions', 'Configuration or callback for actions.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
