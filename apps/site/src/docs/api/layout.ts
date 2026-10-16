// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { layoutApiRows as curated } from './curated/layout';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Layout',
      rows: [['hasSider', 'hasSider 的配置或回调。', 'boolean', '-']],
    },
    {
      title: 'LayoutHeader',
      rows: [
        ['sticky', 'sticky 的配置或回调。', 'boolean', '-'],
        ['offsetTop', 'offsetTop 的配置或回调。', 'number | string', '0'],
        ['height', 'height 的配置或回调。', 'number | string', '-'],
      ],
    },
    {
      title: 'LayoutSider',
      rows: [
        ['width', 'width 的配置或回调。', 'number | string', '200'],
        ['collapsedWidth', 'collapsedWidth 的配置或回调。', 'number | string', '72'],
        ['collapsed', 'collapsed 的配置或回调。', 'boolean', '-'],
        ['defaultCollapsed', 'defaultCollapsed 的配置或回调。', 'boolean', 'false'],
        ['collapsible', 'collapsible 的配置或回调。', 'boolean', '-'],
        ['trigger', '字段值变更事件名。', 'React.ReactNode | null', '-'],
        ['menu', 'menu 的配置或回调。', 'MenuItem[]', '-'],
        [
          'menuProps',
          'menuProps 的配置或回调。',
          "Omit<MenuProps, 'items' | 'inlineCollapsed'>",
          '-',
        ],
        ['sticky', 'sticky 的配置或回调。', 'boolean', '-'],
        ['offsetTop', 'offsetTop 的配置或回调。', 'number | string', '0'],
        ['placement', 'placement 的配置或回调。', 'LayoutSiderPlacement', "'left'"],
        ['expandOnHover', 'expandOnHover 的配置或回调。', 'boolean', '-'],
        ['onCollapse', 'onCollapse 的配置或回调。', '(collapsed: boolean) => void', '-'],
      ],
    },
    {
      title: 'LayoutFooter',
      rows: [
        ['sticky', 'sticky 的配置或回调。', 'boolean', '-'],
        ['offsetBottom', 'offsetBottom 的配置或回调。', 'number | string', '0'],
        ['height', 'height 的配置或回调。', 'number | string', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Layout',
      rows: [['hasSider', 'Configuration or callback for hasSider.', 'boolean', '-']],
    },
    {
      title: 'LayoutHeader',
      rows: [
        ['sticky', 'Configuration or callback for sticky.', 'boolean', '-'],
        ['offsetTop', 'Configuration or callback for offsetTop.', 'number | string', '0'],
        ['height', 'Configuration or callback for height.', 'number | string', '-'],
      ],
    },
    {
      title: 'LayoutSider',
      rows: [
        ['width', 'Configuration or callback for width.', 'number | string', '200'],
        [
          'collapsedWidth',
          'Configuration or callback for collapsedWidth.',
          'number | string',
          '72',
        ],
        ['collapsed', 'Configuration or callback for collapsed.', 'boolean', '-'],
        ['defaultCollapsed', 'Configuration or callback for defaultCollapsed.', 'boolean', 'false'],
        ['collapsible', 'Configuration or callback for collapsible.', 'boolean', '-'],
        ['trigger', 'Event used to update the field value.', 'React.ReactNode | null', '-'],
        ['menu', 'Configuration or callback for menu.', 'MenuItem[]', '-'],
        [
          'menuProps',
          'Configuration or callback for menuProps.',
          "Omit<MenuProps, 'items' | 'inlineCollapsed'>",
          '-',
        ],
        ['sticky', 'Configuration or callback for sticky.', 'boolean', '-'],
        ['offsetTop', 'Configuration or callback for offsetTop.', 'number | string', '0'],
        ['placement', 'Configuration or callback for placement.', 'LayoutSiderPlacement', "'left'"],
        ['expandOnHover', 'Configuration or callback for expandOnHover.', 'boolean', '-'],
        [
          'onCollapse',
          'Configuration or callback for onCollapse.',
          '(collapsed: boolean) => void',
          '-',
        ],
      ],
    },
    {
      title: 'LayoutFooter',
      rows: [
        ['sticky', 'Configuration or callback for sticky.', 'boolean', '-'],
        ['offsetBottom', 'Configuration or callback for offsetBottom.', 'number | string', '0'],
        ['height', 'Configuration or callback for height.', 'number | string', '-'],
      ],
    },
  ],
};
export const layoutApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
