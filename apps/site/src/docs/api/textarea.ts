// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const textareaApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'TextArea',
      rows: [
        [
          'autoSize',
          '按内容调整高度，可限制 minRows/maxRows。',
          'boolean | { minRows?: number; maxRows?: number }',
          '-',
        ],
        ['showCount', '显示当前字符数。', 'boolean', '-'],
        ['maxLength', 'maxLength 的配置或回调。', 'number', '-'],
        ['status', '语义状态及反馈颜色。', "Exclude<CinnaStatus, 'info'>", '-'],
      ],
    },
  ],
  en: [
    {
      title: 'TextArea',
      rows: [
        [
          'autoSize',
          'Resize to content with optional minRows/maxRows.',
          'boolean | { minRows?: number; maxRows?: number }',
          '-',
        ],
        ['showCount', 'Show the current character count.', 'boolean', '-'],
        ['maxLength', 'Configuration or callback for maxLength.', 'number', '-'],
        ['status', 'Semantic status and feedback color.', "Exclude<CinnaStatus, 'info'>", '-'],
      ],
    },
  ],
};
