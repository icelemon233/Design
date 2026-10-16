// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const descriptionsApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Descriptions',
      rows: [
        ['items', '展示项目。', 'DescriptionItem[]', '-'],
        ['column', '描述内容列数。', 'number', '-'],
        ['bordered', '显示边框。', 'boolean', 'true'],
        ['size', '组件尺寸。', 'CinnaSize', "'medium'"],
      ],
    },
  ],
  en: [
    {
      title: 'Descriptions',
      rows: [
        ['items', 'Items to display.', 'DescriptionItem[]', '-'],
        ['column', 'Number of description columns.', 'number', '-'],
        ['bordered', 'Show the border.', 'boolean', 'true'],
        ['size', 'Component size.', 'CinnaSize', "'medium'"],
      ],
    },
  ],
};
