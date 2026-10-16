import type { ApiSection, SiteLanguage } from '../../../types';

export const splitterApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Splitter',
      rows: [
        [
          'orientation',
          '分割方向，horizontal 为左右分割，vertical 为上下分割。',
          "'horizontal' | 'vertical'",
          "'horizontal'",
        ],
        [
          'vertical',
          '快速切换为上下分割；orientation 存在时优先使用 orientation。',
          'boolean',
          'false',
        ],
        ['disabled', '禁用所有分割线拖拽。', 'boolean', 'false'],
        ['lazy', '延迟渲染尺寸变化，拖拽释放后再提交更新。', 'boolean', 'false'],
        [
          'divider',
          '自定义分割线样式，只支持线条展示，不支持文字。',
          'SplitterDividerOptions',
          '-',
        ],
        ['resetOnDoubleClick', '双击分割线时是否恢复初始尺寸。', 'boolean', 'true'],
        ['onResizeStart', '开始拖拽时触发。', '(sizes: number[]) => void', '-'],
        [
          'onResize',
          '尺寸变化时触发；lazy 模式下会在释放后触发。',
          '(sizes: number[]) => void',
          '-',
        ],
        ['onResizeEnd', '拖拽结束时触发。', '(sizes: number[]) => void', '-'],
        ['onDraggerDoubleClick', '双击分割线时触发。', '(index: number) => void', '-'],
        ['children', '建议直接放置 Splitter.Panel。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Splitter.Panel',
      rows: [
        ['defaultSize', '面板初始尺寸，支持数字 px 或百分比字符串。', 'number | string', '-'],
        ['size', '受控尺寸，支持数字 px 或百分比字符串。', 'number | string', '-'],
        ['min', '最小尺寸，避免面板被完全拖没。', 'number | string', '48'],
        ['max', '最大尺寸。', 'number | string', '-'],
        [
          'resizable',
          '是否允许相邻分割线拖拽；任一相邻面板为 false 时该分割线禁用。',
          'boolean',
          'true',
        ],
        ['children', '面板内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'SplitterDividerOptions',
      rows: [
        ['color', '分割线颜色。', 'string', '-'],
        ['dashed', '是否使用虚线样式。', 'boolean', 'true'],
        ['size', '分割线可拖动区域宽度或高度。', 'number | string', '14'],
        ['thickness', '分割线线条厚度。', 'number | string', '1.5'],
        ['className', '分割线自定义 className。', 'string', '-'],
        ['style', '分割线自定义样式。', 'CSSProperties', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Splitter',
      rows: [
        [
          'orientation',
          'Split direction: horizontal for left/right, vertical for top/bottom.',
          "'horizontal' | 'vertical'",
          "'horizontal'",
        ],
        [
          'vertical',
          'Shortcut for vertical splitting; orientation takes priority when both exist.',
          'boolean',
          'false',
        ],
        ['disabled', 'Disables every separator drag interaction.', 'boolean', 'false'],
        ['lazy', 'Defers rendering size updates until the drag is released.', 'boolean', 'false'],
        [
          'divider',
          'Custom separator style. It renders only the line, not text.',
          'SplitterDividerOptions',
          '-',
        ],
        [
          'resetOnDoubleClick',
          'Restores initial sizes when double-clicking the separator.',
          'boolean',
          'true',
        ],
        ['onResizeStart', 'Fires when dragging starts.', '(sizes: number[]) => void', '-'],
        [
          'onResize',
          'Fires when sizes change; in lazy mode it fires after release.',
          '(sizes: number[]) => void',
          '-',
        ],
        ['onResizeEnd', 'Fires when dragging ends.', '(sizes: number[]) => void', '-'],
        [
          'onDraggerDoubleClick',
          'Fires when a separator is double-clicked.',
          '(index: number) => void',
          '-',
        ],
        ['children', 'Direct Splitter.Panel children are recommended.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'Splitter.Panel',
      rows: [
        [
          'defaultSize',
          'Initial panel size, using px numbers or percentage strings.',
          'number | string',
          '-',
        ],
        [
          'size',
          'Controlled panel size, using px numbers or percentage strings.',
          'number | string',
          '-',
        ],
        ['min', 'Minimum size to keep a panel from being fully closed.', 'number | string', '48'],
        ['max', 'Maximum size.', 'number | string', '-'],
        [
          'resizable',
          'Allows the adjacent separator to drag; false on either adjacent panel disables that separator.',
          'boolean',
          'true',
        ],
        ['children', 'Panel content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'SplitterDividerOptions',
      rows: [
        ['color', 'Separator color.', 'string', '-'],
        ['dashed', 'Uses dashed line styling.', 'boolean', 'true'],
        ['size', 'Draggable separator width or height.', 'number | string', '14'],
        ['thickness', 'Separator line thickness.', 'number | string', '1.5'],
        ['className', 'Custom separator className.', 'string', '-'],
        ['style', 'Custom separator inline styles.', 'CSSProperties', '-'],
      ],
    },
  ],
};
