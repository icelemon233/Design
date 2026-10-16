// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const modalApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Modal',
      rows: [
        ['open', '受控的打开状态。', 'boolean', '-'],
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['onCancel', '取消或请求关闭时调用。', '(() => void)', '-'],
        ['onOk', '确认操作，可返回 Promise。', '(() => void | Promise<void>)', '-'],
        ['onOkError', '异步确认失败时调用。', '((error: unknown) => void)', '-'],
        ['confirmLoading', '确认按钮的加载状态。', 'boolean', '-'],
        ['keyboard', '允许 Escape 关闭。', 'boolean', 'true'],
        ['closable', '显示关闭按钮。', 'boolean', 'true'],
        ['footer', '页脚内容；Modal 传 null 隐藏页脚。', 'React.ReactNode', '-'],
        ['okText', 'okText 的配置或回调。', 'React.ReactNode', "'OK'"],
        ['cancelText', 'cancelText 的配置或回调。', 'React.ReactNode', "'Cancel'"],
        ['maskClosable', '允许点击遮罩关闭。', 'boolean', 'true'],
        ['width', 'width 的配置或回调。', 'string | number', '-'],
        ['centered', 'centered 的配置或回调。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Modal',
      rows: [
        ['open', 'Controlled open state.', 'boolean', '-'],
        ['title', 'Title content.', 'React.ReactNode', '-'],
        ['onCancel', 'Called on cancel or dismissal.', '(() => void)', '-'],
        ['onOk', 'Confirm action; may return a Promise.', '(() => void | Promise<void>)', '-'],
        [
          'onOkError',
          'Called when asynchronous confirmation fails.',
          '((error: unknown) => void)',
          '-',
        ],
        ['confirmLoading', 'Loading state of the confirm button.', 'boolean', '-'],
        ['keyboard', 'Allow dismissal with Escape.', 'boolean', 'true'],
        ['closable', 'Show a close button.', 'boolean', 'true'],
        ['footer', 'Footer content; null hides the Modal footer.', 'React.ReactNode', '-'],
        ['okText', 'Configuration or callback for okText.', 'React.ReactNode', "'OK'"],
        ['cancelText', 'Configuration or callback for cancelText.', 'React.ReactNode', "'Cancel'"],
        ['maskClosable', 'Allow dismissal by clicking the mask.', 'boolean', 'true'],
        ['width', 'Configuration or callback for width.', 'string | number', '-'],
        ['centered', 'Configuration or callback for centered.', 'boolean', 'true'],
      ],
    },
  ],
};
