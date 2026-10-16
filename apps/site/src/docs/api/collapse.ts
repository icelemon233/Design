// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const collapseApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Collapse',
      rows: [
        ['items', '展示项目。', 'CollapseItem[]', '-'],
        ['activeKey', 'activeKey 的配置或回调。', 'string | string[]', '-'],
        ['defaultActiveKey', 'defaultActiveKey 的配置或回调。', 'string | string[]', '-'],
        ['accordion', 'accordion 的配置或回调。', 'boolean', '-'],
        ['bordered', '显示边框。', 'boolean', 'true'],
        ['onChange', '值变更时调用。', '((keys: string[]) => void)', '-'],
        ['destroyInactivePanel', '折叠时卸载内容；false 时保留状态。', 'boolean', 'true'],
      ],
    },
  ],
  en: [
    {
      title: 'Collapse',
      rows: [
        ['items', 'Items to display.', 'CollapseItem[]', '-'],
        ['activeKey', 'Configuration or callback for activeKey.', 'string | string[]', '-'],
        [
          'defaultActiveKey',
          'Configuration or callback for defaultActiveKey.',
          'string | string[]',
          '-',
        ],
        ['accordion', 'Configuration or callback for accordion.', 'boolean', '-'],
        ['bordered', 'Show the border.', 'boolean', 'true'],
        ['onChange', 'Called when the value changes.', '((keys: string[]) => void)', '-'],
        [
          'destroyInactivePanel',
          'Unmount collapsed content; false preserves its state.',
          'boolean',
          'true',
        ],
      ],
    },
  ],
};
