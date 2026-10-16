// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const timelineApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Timeline',
      rows: [
        ['items', '展示项目。', 'TimelineItem[]', '-'],
        ['mode', '显示或选择模式。', '"right" | "left" | "alternate"', "'left'"],
        ['reverse', '逆序显示。', 'boolean', '-'],
        ['pending', '时间线的待完成内容。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Timeline',
      rows: [
        ['items', 'Items to display.', 'TimelineItem[]', '-'],
        ['mode', 'Display or selection mode.', '"right" | "left" | "alternate"', "'left'"],
        ['reverse', 'Display items in reverse order.', 'boolean', '-'],
        ['pending', 'Pending timeline content.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
