// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const switchApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Switch',
      rows: [
        ['checked', 'checked 的配置或回调。', 'boolean', '-'],
        ['defaultChecked', 'defaultChecked 的配置或回调。', 'boolean', '-'],
        ['onChange', '值变更时调用。', '(checked: boolean) => void', '-'],
        ['size', '组件尺寸。', 'CinnaSize', "'medium'"],
        ['checkedChildren', 'checkedChildren 的配置或回调。', 'React.ReactNode', '-'],
        ['unCheckedChildren', 'unCheckedChildren 的配置或回调。', 'React.ReactNode', '-'],
        ['loading', '展示加载状态。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Switch',
      rows: [
        ['checked', 'Configuration or callback for checked.', 'boolean', '-'],
        ['defaultChecked', 'Configuration or callback for defaultChecked.', 'boolean', '-'],
        ['onChange', 'Called when the value changes.', '(checked: boolean) => void', '-'],
        ['size', 'Component size.', 'CinnaSize', "'medium'"],
        [
          'checkedChildren',
          'Configuration or callback for checkedChildren.',
          'React.ReactNode',
          '-',
        ],
        [
          'unCheckedChildren',
          'Configuration or callback for unCheckedChildren.',
          'React.ReactNode',
          '-',
        ],
        ['loading', 'Show the loading state.', 'boolean', '-'],
      ],
    },
  ],
};
