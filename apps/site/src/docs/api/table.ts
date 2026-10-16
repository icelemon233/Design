// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const tableApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Table',
      rows: [
        ['columns', '列定义，支持渲染、排序与筛选。', 'TableColumn<T>[]', '-'],
        ['dataSource', '数据记录。', 'T[]', '-'],
        [
          'rowKey',
          '记录的稳定唯一键。',
          'keyof T | ((record: T, index: number) => React.Key)',
          '-',
        ],
        ['bordered', '显示边框。', 'boolean', '-'],
        ['size', '组件尺寸。', 'CinnaSize', "'medium'"],
        ['emptyText', '没有数据时显示的内容。', 'React.ReactNode', "'No data'"],
        ['loading', '展示加载状态。', 'boolean', '-'],
        [
          'pagination',
          '客户端分页；可设置页码、页容量及回调。',
          'boolean | TablePagination',
          'false',
        ],
        [
          'scroll',
          '表格横向最小宽度和纵向最大高度。',
          '{ x?: number | string; y?: number | string }',
          '-',
        ],
        [
          'onSortChange',
          'onSortChange 的配置或回调。',
          "(sort: { key: string; direction: 'asc' | 'desc' } | null) => void",
          '-',
        ],
        [
          'onFilterChange',
          'onFilterChange 的配置或回调。',
          '(filters: Record<string, string>) => void',
          '-',
        ],
        [
          'rowSelection',
          '受控行选择、禁用规则及变化回调。',
          '{ selectedRowKeys?: React.Key[]; onChange?: (keys: React.Key[], rows: T[]) => void; getCheckboxProps?: (record: T) => { disabled?: boolean }; }',
          '-',
        ],
        [
          'expandable',
          '展开行内容及受控展开状态。',
          '{ expandedRowKeys?: React.Key[]; defaultExpandedRowKeys?: React.Key[]; expandedRowRender: (record: T, index: number) => React.ReactNode; onExpandedRowsChange?: (keys: React.Key[]) => void; }',
          '-',
        ],
        [
          'onRow',
          'onRow 的配置或回调。',
          '(record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'Table',
      rows: [
        [
          'columns',
          'Column definitions with rendering, sorting and filtering.',
          'TableColumn<T>[]',
          '-',
        ],
        ['dataSource', 'Data records.', 'T[]', '-'],
        [
          'rowKey',
          'Stable unique key for each record.',
          'keyof T | ((record: T, index: number) => React.Key)',
          '-',
        ],
        ['bordered', 'Show the border.', 'boolean', '-'],
        ['size', 'Component size.', 'CinnaSize', "'medium'"],
        ['emptyText', 'Content displayed when there is no data.', 'React.ReactNode', "'No data'"],
        ['loading', 'Show the loading state.', 'boolean', '-'],
        [
          'pagination',
          'Client-side pagination with page, page size and callback.',
          'boolean | TablePagination',
          'false',
        ],
        [
          'scroll',
          'Table minimum horizontal width and maximum vertical height.',
          '{ x?: number | string; y?: number | string }',
          '-',
        ],
        [
          'onSortChange',
          'Configuration or callback for onSortChange.',
          "(sort: { key: string; direction: 'asc' | 'desc' } | null) => void",
          '-',
        ],
        [
          'onFilterChange',
          'Configuration or callback for onFilterChange.',
          '(filters: Record<string, string>) => void',
          '-',
        ],
        [
          'rowSelection',
          'Row selection, disabled rules and change callback.',
          '{ selectedRowKeys?: React.Key[]; onChange?: (keys: React.Key[], rows: T[]) => void; getCheckboxProps?: (record: T) => { disabled?: boolean }; }',
          '-',
        ],
        [
          'expandable',
          'Expanded row content and controlled expansion.',
          '{ expandedRowKeys?: React.Key[]; defaultExpandedRowKeys?: React.Key[]; expandedRowRender: (record: T, index: number) => React.ReactNode; onExpandedRowsChange?: (keys: React.Key[]) => void; }',
          '-',
        ],
        [
          'onRow',
          'Configuration or callback for onRow.',
          '(record: T, index: number) => React.HTMLAttributes<HTMLTableRowElement>',
          '-',
        ],
      ],
    },
  ],
};
