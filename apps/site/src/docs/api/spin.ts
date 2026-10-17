// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const spinApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Spin',
      rows: [
        ['spinning', '是否显示加载遮罩。', 'boolean', '-'],
        ['delay', '延迟显示加载的毫秒数。', 'number', '0'],
        ['tip', '加载提示。', 'React.ReactNode', '-'],
        ['size', '组件尺寸。', "'small' | 'medium' | 'large'", '-'],
        ['label', '关联控件的标签。', 'React.ReactNode', '-'],
        ['active', '启用加载或骨架动画。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Spin',
      rows: [
        ['spinning', 'Whether to show the loading overlay.', 'boolean', '-'],
        ['delay', 'Delay before showing loading, in milliseconds.', 'number', '0'],
        ['tip', 'Loading message.', 'React.ReactNode', '-'],
        ['size', 'Component size.', "'small' | 'medium' | 'large'", '-'],
        ['label', 'Label for the associated control.', 'React.ReactNode', '-'],
        ['active', 'Enable loading or skeleton animation.', 'boolean', 'true'],
      ],
    },
  ],
};
