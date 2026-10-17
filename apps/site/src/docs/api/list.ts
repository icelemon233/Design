// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const listApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'List',
      rows: [
        ['dataSource', '数据记录。', 'T[]', '-'],
        ['renderItem', '每项数据的渲染函数。', '(item: T, index: number) => React.ReactNode', '-'],
        ['header', 'header 的配置或回调。', 'React.ReactNode', '-'],
        ['footer', '页脚内容；Modal 传 null 隐藏页脚。', 'React.ReactNode', '-'],
        ['bordered', '显示边框。', 'boolean', 'true'],
        ['rowKey', '记录的稳定唯一键。', '(item: T, index: number) => React.Key', '-'],
        ['emptyText', '没有数据时显示的内容。', 'React.ReactNode', "'No data'"],
        ['loading', '展示加载状态。', 'boolean', '-'],
        ['loadMore', '列表底部的加载操作。', 'React.ReactNode', '-'],
        ['itemLayout', 'itemLayout 的配置或回调。', "'horizontal' | 'vertical'", "'horizontal'"],
      ],
    },
  ],
  en: [
    {
      title: 'List',
      rows: [
        ['dataSource', 'Data records.', 'T[]', '-'],
        [
          'renderItem',
          'Render function for each record.',
          '(item: T, index: number) => React.ReactNode',
          '-',
        ],
        ['header', 'Configuration or callback for header.', 'React.ReactNode', '-'],
        ['footer', 'Footer content; null hides the Modal footer.', 'React.ReactNode', '-'],
        ['bordered', 'Show the border.', 'boolean', 'true'],
        [
          'rowKey',
          'Stable unique key for each record.',
          '(item: T, index: number) => React.Key',
          '-',
        ],
        ['emptyText', 'Content displayed when there is no data.', 'React.ReactNode', "'No data'"],
        ['loading', 'Show the loading state.', 'boolean', '-'],
        ['loadMore', 'Load-more action at the bottom of the list.', 'React.ReactNode', '-'],
        [
          'itemLayout',
          'Configuration or callback for itemLayout.',
          "'horizontal' | 'vertical'",
          "'horizontal'",
        ],
      ],
    },
  ],
};
