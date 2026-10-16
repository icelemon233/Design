import type { ApiRow, SiteLanguage } from '../../../types';

export const affixApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    ['offsetTop', '吸附到顶部时与滚动容器顶部的距离，单位为 px。', 'number', '-'],
    ['offsetBottom', '吸附到底部时与滚动容器底部的距离，单位为 px。', 'number', '-'],
    ['children', '需要固定展示的内容。', 'ReactNode', '-'],
    ['className', '自定义 className。', 'string', '-'],
    ['style', '自定义样式。', 'CSSProperties', '-'],
  ],
  en: [
    [
      'offsetTop',
      'Distance from the top edge of the scroll container while sticky, in px.',
      'number',
      '-',
    ],
    [
      'offsetBottom',
      'Distance from the bottom edge of the scroll container while sticky, in px.',
      'number',
      '-',
    ],
    ['children', 'Content that should stay fixed within view.', 'ReactNode', '-'],
    ['className', 'Custom className.', 'string', '-'],
    ['style', 'Custom inline styles.', 'CSSProperties', '-'],
  ],
};
