// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const inputApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Input',
      rows: [
        ['size', '组件尺寸。', 'InputSize', "'medium'"],
        ['label', '关联控件的标签。', 'React.ReactNode', '-'],
        ['helperText', 'helperText 的配置或回调。', 'React.ReactNode', '-'],
        ['error', 'error 的配置或回调。', 'React.ReactNode', '-'],
        ['prefix', '前置内容。', 'React.ReactNode', '-'],
        ['suffix', '后置内容。', 'React.ReactNode', '-'],
        ['fullWidth', 'fullWidth 的配置或回调。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Input',
      rows: [
        ['size', 'Component size.', 'InputSize', "'medium'"],
        ['label', 'Label for the associated control.', 'React.ReactNode', '-'],
        ['helperText', 'Configuration or callback for helperText.', 'React.ReactNode', '-'],
        ['error', 'Configuration or callback for error.', 'React.ReactNode', '-'],
        ['prefix', 'Prefix content.', 'React.ReactNode', '-'],
        ['suffix', 'Suffix content.', 'React.ReactNode', '-'],
        ['fullWidth', 'Configuration or callback for fullWidth.', 'boolean', 'true'],
      ],
    },
  ],
};
