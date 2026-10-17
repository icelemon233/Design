// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const notificationApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Notification',
      rows: [
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['actions', 'actions 的配置或回调。', 'React.ReactNode', '-'],
        ['content', '正文内容。', 'React.ReactNode', '-'],
        ['type', 'type 的配置或回调。', 'CinnaStatus', "'info'"],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
        ['closable', '显示关闭按钮。', 'boolean', '-'],
        ['onClose', '关闭时调用。', '() => void', '-'],
        ['duration', '自动关闭的秒数；0 表示不自动关闭。', 'number', '0'],
      ],
    },
  ],
  en: [
    {
      title: 'Notification',
      rows: [
        ['title', 'Title content.', 'React.ReactNode', '-'],
        ['actions', 'Configuration or callback for actions.', 'React.ReactNode', '-'],
        ['content', 'Body content.', 'React.ReactNode', '-'],
        ['type', 'Configuration or callback for type.', 'CinnaStatus', "'info'"],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
        ['closable', 'Show a close button.', 'boolean', '-'],
        ['onClose', 'Called when closed.', '() => void', '-'],
        ['duration', 'Seconds before dismissal; 0 keeps the notice open.', 'number', '0'],
      ],
    },
  ],
};
