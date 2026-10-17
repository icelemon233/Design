import type { ApiRow, SiteLanguage } from '../../../types';

export const fallbackApiRows: Record<SiteLanguage, ApiRow[]> = {
  zh: [
    ['className', '自定义 className。', 'string', '-'],
    ['style', '自定义样式。', 'CSSProperties', '-'],
    ['children', '组件内容。', 'ReactNode', '-'],
  ],
  en: [
    ['className', 'Custom className.', 'string', '-'],
    ['style', 'Custom inline styles.', 'CSSProperties', '-'],
    ['children', 'Component content.', 'ReactNode', '-'],
  ],
};
