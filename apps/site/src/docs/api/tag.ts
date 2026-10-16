// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const tagApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Tag',
      rows: [
        [
          'color',
          'color 的配置或回调。',
          '"butter" | "cream" | "blue" | "strawberry" | "pistachio" | "lavender"',
          "'blue'",
        ],
        ['closable', '显示关闭按钮。', 'boolean', '-'],
        ['onClose', '关闭时调用。', '((event: React.MouseEvent<HTMLButtonElement>) => void)', '-'],
        ['bordered', '显示边框。', 'boolean', 'true'],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Tag',
      rows: [
        [
          'color',
          'Configuration or callback for color.',
          '"butter" | "cream" | "blue" | "strawberry" | "pistachio" | "lavender"',
          "'blue'",
        ],
        ['closable', 'Show a close button.', 'boolean', '-'],
        [
          'onClose',
          'Called when closed.',
          '((event: React.MouseEvent<HTMLButtonElement>) => void)',
          '-',
        ],
        ['bordered', 'Show the border.', 'boolean', 'true'],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
