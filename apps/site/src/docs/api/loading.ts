// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const loadingApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Loading',
      rows: [
        ['size', '组件尺寸。', '"small" | "medium" | "large"', "'medium'"],
        ['label', '关联控件的标签。', 'React.ReactNode', "'Loading'"],
        ['active', '启用加载或骨架动画。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Loading',
      rows: [
        ['size', 'Component size.', '"small" | "medium" | "large"', "'medium'"],
        ['label', 'Label for the associated control.', 'React.ReactNode', "'Loading'"],
        ['active', 'Enable loading or skeleton animation.', 'boolean', 'true'],
      ],
    },
  ],
};
