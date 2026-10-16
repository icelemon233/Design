// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const resultApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Result',
      rows: [
        ['status', '语义状态及反馈颜色。', "CinnaStatus | '403' | '404' | '500'", "'info'"],
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['subTitle', 'subTitle 的配置或回调。', 'React.ReactNode', '-'],
        ['extra', '额外内容。', 'React.ReactNode', '-'],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Result',
      rows: [
        [
          'status',
          'Semantic status and feedback color.',
          "CinnaStatus | '403' | '404' | '500'",
          "'info'",
        ],
        ['title', 'Title content.', 'React.ReactNode', '-'],
        ['subTitle', 'Configuration or callback for subTitle.', 'React.ReactNode', '-'],
        ['extra', 'Additional content.', 'React.ReactNode', '-'],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
