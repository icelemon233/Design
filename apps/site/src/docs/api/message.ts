// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const messageApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Message',
      rows: [
        ['type', 'type 的配置或回调。', 'CinnaStatus', "'info'"],
        ['content', '正文内容。', 'React.ReactNode', '-'],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
        ['closable', '显示关闭按钮。', 'boolean', '-'],
        ['onClose', '关闭时调用。', '() => void', '-'],
        ['duration', '自动关闭的秒数；0 表示不自动关闭。', 'number', '0'],
      ],
    },
  ],
  en: [
    {
      title: 'Message',
      rows: [
        ['type', 'Configuration or callback for type.', 'CinnaStatus', "'info'"],
        ['content', 'Body content.', 'React.ReactNode', '-'],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
        ['closable', 'Show a close button.', 'boolean', '-'],
        ['onClose', 'Called when closed.', '() => void', '-'],
        ['duration', 'Seconds before dismissal; 0 keeps the notice open.', 'number', '0'],
      ],
    },
  ],
};
