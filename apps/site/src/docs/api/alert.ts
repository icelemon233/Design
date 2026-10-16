// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const alertApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Alert',
      rows: [
        ['type', 'type 的配置或回调。', 'CinnaStatus', "'info'"],
        ['message', 'message 的配置或回调。', 'React.ReactNode', '-'],
        ['description', '辅助描述内容；false 可隐藏。', 'React.ReactNode', '-'],
        ['closable', '显示关闭按钮。', 'boolean', '-'],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
        ['showIcon', 'showIcon 的配置或回调。', 'boolean', 'true'],
        ['action', '上传 POST 目标；未配置时只选择本地文件。', 'React.ReactNode', '-'],
        ['closeText', 'closeText 的配置或回调。', 'React.ReactNode', '-'],
        ['banner', 'banner 的配置或回调。', 'boolean', '-'],
        ['onClose', '关闭时调用。', '(() => void)', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Alert',
      rows: [
        ['type', 'Configuration or callback for type.', 'CinnaStatus', "'info'"],
        ['message', 'Configuration or callback for message.', 'React.ReactNode', '-'],
        ['description', 'Description; false hides it.', 'React.ReactNode', '-'],
        ['closable', 'Show a close button.', 'boolean', '-'],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
        ['showIcon', 'Configuration or callback for showIcon.', 'boolean', 'true'],
        ['action', 'POST upload URL; without it, files remain local.', 'React.ReactNode', '-'],
        ['closeText', 'Configuration or callback for closeText.', 'React.ReactNode', '-'],
        ['banner', 'Configuration or callback for banner.', 'boolean', '-'],
        ['onClose', 'Called when closed.', '(() => void)', '-'],
      ],
    },
  ],
};
