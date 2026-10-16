import type { ApiSection, SiteLanguage } from '../../../types';

export const breadcrumbApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Breadcrumb',
      rows: [
        ['items', '面包屑节点列表。', 'BreadcrumbItem[]', '[]'],
        [
          'separator',
          '统一设置节点之间的分隔符，单个节点可用 BreadcrumbItem.separator 覆盖。',
          'ReactNode',
          "'/'",
        ],
        [
          'onItemClick',
          '点击带 href 的节点时触发，可在回调中 preventDefault 后执行局部导航。',
          '(event: MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
        [
          'onMenuSelect',
          '选择某个层级下拉菜单项时触发。',
          '(key: string, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
        ['className', '根节点自定义 className。', 'string', '-'],
        ['style', '根节点自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'BreadcrumbItem',
      rows: [
        ['key', '唯一标识；不传时使用节点序号。', 'string', '-'],
        ['title', '节点展示内容，可传入文字或自定义 ReactNode。', 'ReactNode', '-'],
        ['href', '节点链接；传入后渲染为可点击链接。', 'string', '-'],
        ['icon', '展示在当前层级文字前的图标内容。', 'ReactNode', '-'],
        ['menu', '当前层级的下拉菜单项；传入后该层级会展示下拉箭头和菜单浮层。', 'MenuItem[]', '-'],
        [
          'separator',
          '当前层级后方的自定义分隔符，会覆盖 Breadcrumb separator。',
          'ReactNode',
          '-',
        ],
        ['color', '当前层级文字颜色。', 'string', '-'],
        ['fontStyle', '当前层级字体样式。', 'CSSProperties["fontStyle"]', '-'],
        ['fontWeight', '当前层级字重。', 'CSSProperties["fontWeight"]', '-'],
        ['className', '当前层级自定义 className。', 'string', '-'],
        ['style', '当前层级自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'MenuItem',
      rows: [
        ['key', '菜单项唯一标识，会作为 onMenuSelect 的第一个参数返回。', 'string', '-'],
        ['label', '菜单项展示内容。', 'ReactNode', '-'],
        ['type', '设置为 divider 时渲染分割线。', "'item' | 'divider'", "'item'"],
        ['disabled', '是否禁用当前菜单项。', 'boolean', 'false'],
        ['icon', '菜单项左侧图标内容。', 'ReactNode', '-'],
        ['children', '子菜单项列表。', 'MenuItem[]', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Breadcrumb',
      rows: [
        ['items', 'Breadcrumb item list.', 'BreadcrumbItem[]', '[]'],
        [
          'separator',
          'Shared separator between items. Can be overridden by BreadcrumbItem.separator.',
          'ReactNode',
          "'/'",
        ],
        [
          'onItemClick',
          'Fires when a linked item is clicked. Call preventDefault in the callback to run local routing.',
          '(event: MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
        [
          'onMenuSelect',
          'Fires when a menu item on a breadcrumb level is selected.',
          '(key: string, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
        ['className', 'Custom className for the root node.', 'string', '-'],
        ['style', 'Custom inline styles for the root node.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'BreadcrumbItem',
      rows: [
        ['key', 'Unique key. Falls back to the item index when omitted.', 'string', '-'],
        ['title', 'Item label content. Supports plain text or custom ReactNode.', 'ReactNode', '-'],
        ['href', 'Item link. Linked items render as clickable anchors.', 'string', '-'],
        ['icon', 'Icon content rendered before the item title.', 'ReactNode', '-'],
        [
          'menu',
          'Floating menu items for this breadcrumb level. Shows a caret and menu panel when provided.',
          'MenuItem[]',
          '-',
        ],
        [
          'separator',
          'Custom separator after this item. Overrides Breadcrumb separator.',
          'ReactNode',
          '-',
        ],
        ['color', 'Text color for this level.', 'string', '-'],
        ['fontStyle', 'Font style for this level.', 'CSSProperties["fontStyle"]', '-'],
        ['fontWeight', 'Font weight for this level.', 'CSSProperties["fontWeight"]', '-'],
        ['className', 'Custom className for this level.', 'string', '-'],
        ['style', 'Custom inline style for this level.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'MenuItem',
      rows: [
        [
          'key',
          'Unique menu item key. Returned as the first argument of onMenuSelect.',
          'string',
          '-',
        ],
        ['label', 'Menu item label content.', 'ReactNode', '-'],
        ['type', 'Set to divider to render a separator.', "'item' | 'divider'", "'item'"],
        ['disabled', 'Whether this menu item is disabled.', 'boolean', 'false'],
        ['icon', 'Icon content before the menu item label.', 'ReactNode', '-'],
        ['children', 'Nested menu item list.', 'MenuItem[]', '-'],
      ],
    },
  ],
};
