// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const progressApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Progress',
      rows: [
        ['percent', '0–100 的进度值；越界自动限制。', 'number', '0'],
        ['status', '语义状态及反馈颜色。', "Exclude<CinnaStatus, 'info'> | 'normal'", "'normal'"],
        ['showInfo', '显示进度文本。', 'boolean', 'true'],
        ['type', 'type 的配置或回调。', "'line' | 'circle'", "'line'"],
        ['strokeColor', '进度条或圆环颜色。', 'string', '-'],
        ['format', '自定义格式化显示内容。', '(percent: number) => React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Progress',
      rows: [
        ['percent', 'Progress from 0 to 100; out-of-range values are clamped.', 'number', '0'],
        [
          'status',
          'Semantic status and feedback color.',
          "Exclude<CinnaStatus, 'info'> | 'normal'",
          "'normal'",
        ],
        ['showInfo', 'Show progress text.', 'boolean', 'true'],
        ['type', 'Configuration or callback for type.', "'line' | 'circle'", "'line'"],
        ['strokeColor', 'Progress bar or circle color.', 'string', '-'],
        [
          'format',
          'Customize the formatted display content.',
          '(percent: number) => React.ReactNode',
          '-',
        ],
      ],
    },
  ],
};
