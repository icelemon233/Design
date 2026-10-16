// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const mentionsApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Mentions',
      rows: [
        [
          'options',
          '可选项数据及禁用配置。',
          '(string | { label: React.ReactNode; value: string; disabled?: boolean; })[]',
          '[]',
        ],
        ['prefix', '前置内容。', 'string', "'@'"],
        ['onSelect', '选中项目时调用。', '((value: string) => void)', '-'],
        ['maxLength', 'maxLength 的配置或回调。', 'number', '-'],
        [
          'autoSize',
          '按内容调整高度，可限制 minRows/maxRows。',
          'boolean | { minRows?: number; maxRows?: number; }',
          '-',
        ],
        ['showCount', '显示当前字符数。', 'boolean', '-'],
        ['status', '语义状态及反馈颜色。', '"success" | "warning" | "error"', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Mentions',
      rows: [
        [
          'options',
          'Available options and per-option disabled state.',
          '(string | { label: React.ReactNode; value: string; disabled?: boolean; })[]',
          '[]',
        ],
        ['prefix', 'Prefix content.', 'string', "'@'"],
        ['onSelect', 'Called when an item is selected.', '((value: string) => void)', '-'],
        ['maxLength', 'Configuration or callback for maxLength.', 'number', '-'],
        [
          'autoSize',
          'Resize to content with optional minRows/maxRows.',
          'boolean | { minRows?: number; maxRows?: number; }',
          '-',
        ],
        ['showCount', 'Show the current character count.', 'boolean', '-'],
        ['status', 'Semantic status and feedback color.', '"success" | "warning" | "error"', '-'],
      ],
    },
  ],
};
