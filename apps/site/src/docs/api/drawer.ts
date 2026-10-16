// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const drawerApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Drawer',
      rows: [
        ['open', '受控的打开状态。', 'boolean', '-'],
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['placement', 'placement 的配置或回调。', "'left' | 'right' | 'top' | 'bottom'", "'right'"],
        ['onClose', '关闭时调用。', '() => void', '-'],
        ['extra', '额外内容。', 'React.ReactNode', '-'],
        ['width', 'width 的配置或回调。', 'number | string', '-'],
        ['height', 'height 的配置或回调。', 'number | string', '-'],
        ['maskClosable', '允许点击遮罩关闭。', 'boolean', 'true'],
        ['keyboard', '允许 Escape 关闭。', 'boolean', 'true'],
        ['closable', '显示关闭按钮。', 'boolean', 'true'],
        ['footer', '页脚内容；Modal 传 null 隐藏页脚。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Drawer',
      rows: [
        ['open', 'Controlled open state.', 'boolean', '-'],
        ['title', 'Title content.', 'React.ReactNode', '-'],
        [
          'placement',
          'Configuration or callback for placement.',
          "'left' | 'right' | 'top' | 'bottom'",
          "'right'",
        ],
        ['onClose', 'Called when closed.', '() => void', '-'],
        ['extra', 'Additional content.', 'React.ReactNode', '-'],
        ['width', 'Configuration or callback for width.', 'number | string', '-'],
        ['height', 'Configuration or callback for height.', 'number | string', '-'],
        ['maskClosable', 'Allow dismissal by clicking the mask.', 'boolean', 'true'],
        ['keyboard', 'Allow dismissal with Escape.', 'boolean', 'true'],
        ['closable', 'Show a close button.', 'boolean', 'true'],
        ['footer', 'Footer content; null hides the Modal footer.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
