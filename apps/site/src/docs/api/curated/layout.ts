import type { ApiSection, SiteLanguage } from '../../../types';

export const layoutApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Layout',
      rows: [
        ['hasSider', '声明当前布局包含侧栏，自动形成侧栏 + 主内容两列结构。', 'boolean', 'false'],
        [
          'children',
          '布局内容，可嵌套 LayoutHeader、LayoutSider、LayoutContent、LayoutFooter 或 Layout。',
          'ReactNode',
          '-',
        ],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutHeader',
      rows: [
        ['sticky', '顶栏是否吸附到滚动容器顶部。', 'boolean', 'false'],
        ['offsetTop', '吸顶时距离顶部的偏移，数字按 px 处理。', 'number | string', '0'],
        ['height', '顶栏最小高度。', 'number | string', '-'],
        ['children', '顶栏内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutSider',
      rows: [
        ['width', '侧栏展开宽度，数字按 px 处理。', 'number | string', '200'],
        ['collapsedWidth', '侧栏收起宽度，数字按 px 处理。', 'number | string', '72'],
        ['collapsible', '是否允许侧栏收起，并展示默认收起/展开触发器。', 'boolean', 'false'],
        ['collapsed', '受控收起状态，传入后由外部控制展开收起。', 'boolean', '-'],
        ['defaultCollapsed', '非受控模式下的默认收起状态。', 'boolean', 'false'],
        [
          'trigger',
          '自定义触发器内容；设为 null 时隐藏默认触发器。',
          'ReactNode | null',
          '自动箭头',
        ],
        ['menu', '侧栏导航菜单项；传入后内部复用 Menu，并自动同步收起状态。', 'MenuItem[]', '-'],
        [
          'menuProps',
          '透传给内部 Menu 的参数；items 和 inlineCollapsed 由侧栏接管。',
          "Omit<MenuProps, 'items' | 'inlineCollapsed'>",
          '-',
        ],
        ['onCollapse', '收起状态变化回调。', '(collapsed: boolean) => void', '-'],
        ['sticky', '侧栏是否吸附在滚动容器边缘。', 'boolean', 'false'],
        ['offsetTop', '侧栏吸边时距离顶部的偏移，数字按 px 处理。', 'number | string', '0'],
        ['placement', '侧栏位置，right 会把侧栏排到右侧。', "'left' | 'right'", "'left'"],
        ['expandOnHover', '鼠标移入时自动展开，移出时自动收起。', 'boolean', 'false'],
        ['children', '侧栏内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutContent',
      rows: [
        ['children', '主内容区内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutFooter',
      rows: [
        ['sticky', '页脚是否吸附到滚动容器底部。', 'boolean', 'false'],
        ['offsetBottom', '吸底时距离底部的偏移，数字按 px 处理。', 'number | string', '0'],
        ['height', '页脚最小高度。', 'number | string', '-'],
        ['children', '页脚内容。', 'ReactNode', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Layout',
      rows: [
        [
          'hasSider',
          'Marks the layout as sider + main content and creates two columns.',
          'boolean',
          'false',
        ],
        [
          'children',
          'Layout content; nest LayoutHeader, LayoutSider, LayoutContent, LayoutFooter, or another Layout.',
          'ReactNode',
          '-',
        ],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutHeader',
      rows: [
        [
          'sticky',
          'Whether the header sticks to the top of the scroll container.',
          'boolean',
          'false',
        ],
        [
          'offsetTop',
          'Top offset while sticky; numbers are treated as px.',
          'number | string',
          '0',
        ],
        ['height', 'Minimum header height.', 'number | string', '-'],
        ['children', 'Header content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutSider',
      rows: [
        ['width', 'Expanded sider width; numbers are treated as px.', 'number | string', '200'],
        [
          'collapsedWidth',
          'Collapsed sider width; numbers are treated as px.',
          'number | string',
          '72',
        ],
        [
          'collapsible',
          'Whether the sider can collapse and show the default trigger.',
          'boolean',
          'false',
        ],
        ['collapsed', 'Controlled collapsed state.', 'boolean', '-'],
        ['defaultCollapsed', 'Initial collapsed state in uncontrolled mode.', 'boolean', 'false'],
        [
          'trigger',
          'Custom trigger content; set null to hide the default trigger.',
          'ReactNode | null',
          'Auto arrow',
        ],
        [
          'menu',
          'Sider navigation items. When provided, Sider renders Menu internally and syncs collapsed state.',
          'MenuItem[]',
          '-',
        ],
        [
          'menuProps',
          'Props passed to the internal Menu; items and inlineCollapsed are owned by Sider.',
          "Omit<MenuProps, 'items' | 'inlineCollapsed'>",
          '-',
        ],
        [
          'onCollapse',
          'Callback when the collapsed state changes.',
          '(collapsed: boolean) => void',
          '-',
        ],
        ['sticky', 'Whether the sider sticks to the scroll container edge.', 'boolean', 'false'],
        [
          'offsetTop',
          'Top offset while sticky; numbers are treated as px.',
          'number | string',
          '0',
        ],
        [
          'placement',
          'Sider placement; right moves it to the right side.',
          "'left' | 'right'",
          "'left'",
        ],
        [
          'expandOnHover',
          'Expands on mouse enter and collapses on mouse leave.',
          'boolean',
          'false',
        ],
        ['children', 'Sider content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutContent',
      rows: [
        ['children', 'Main content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'LayoutFooter',
      rows: [
        [
          'sticky',
          'Whether the footer sticks to the bottom of the scroll container.',
          'boolean',
          'false',
        ],
        [
          'offsetBottom',
          'Bottom offset while sticky; numbers are treated as px.',
          'number | string',
          '0',
        ],
        ['height', 'Minimum footer height.', 'number | string', '-'],
        ['children', 'Footer content.', 'ReactNode', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
  ],
};
