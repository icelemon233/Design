// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { splitterApiRows as curated } from './curated/splitter';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'SplitterPanel',
      rows: [
        ['defaultSize', 'defaultSize 的配置或回调。', 'number | string', '48'],
        ['size', '组件尺寸。', 'number | string', '-'],
        ['min', 'min 的配置或回调。', 'number | string', '24'],
        ['max', 'max 的配置或回调。', 'number | string', '76'],
        ['resizable', 'resizable 的配置或回调。', 'boolean', '-'],
      ],
    },
    {
      title: 'Splitter',
      rows: [
        ['children', '组件内容。', 'React.ReactNode', '-'],
        ['first', 'first 的配置或回调。', 'React.ReactNode', '-'],
        ['second', 'second 的配置或回调。', 'React.ReactNode', '-'],
        ['orientation', 'orientation 的配置或回调。', 'SplitterOrientation', '-'],
        ['vertical', 'vertical 的配置或回调。', 'boolean', '-'],
        ['defaultSize', 'defaultSize 的配置或回调。', 'number', '48'],
        ['min', 'min 的配置或回调。', 'number', '24'],
        ['max', 'max 的配置或回调。', 'number', '76'],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['lazy', 'lazy 的配置或回调。', 'boolean', '-'],
        ['divider', 'divider 的配置或回调。', 'SplitterDividerOptions', '-'],
        ['resetOnDoubleClick', 'resetOnDoubleClick 的配置或回调。', 'boolean', 'true'],
        ['onResizeStart', 'onResizeStart 的配置或回调。', '(sizes: number[]) => void', '-'],
        ['onResize', 'onResize 的配置或回调。', '(sizes: number[]) => void', '-'],
        ['onResizeEnd', 'onResizeEnd 的配置或回调。', '(sizes: number[]) => void', '-'],
        [
          'onDraggerDoubleClick',
          'onDraggerDoubleClick 的配置或回调。',
          '(index: number) => void',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'SplitterPanel',
      rows: [
        ['defaultSize', 'Configuration or callback for defaultSize.', 'number | string', '48'],
        ['size', 'Component size.', 'number | string', '-'],
        ['min', 'Configuration or callback for min.', 'number | string', '24'],
        ['max', 'Configuration or callback for max.', 'number | string', '76'],
        ['resizable', 'Configuration or callback for resizable.', 'boolean', '-'],
      ],
    },
    {
      title: 'Splitter',
      rows: [
        ['children', 'Component content.', 'React.ReactNode', '-'],
        ['first', 'Configuration or callback for first.', 'React.ReactNode', '-'],
        ['second', 'Configuration or callback for second.', 'React.ReactNode', '-'],
        ['orientation', 'Configuration or callback for orientation.', 'SplitterOrientation', '-'],
        ['vertical', 'Configuration or callback for vertical.', 'boolean', '-'],
        ['defaultSize', 'Configuration or callback for defaultSize.', 'number', '48'],
        ['min', 'Configuration or callback for min.', 'number', '24'],
        ['max', 'Configuration or callback for max.', 'number', '76'],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['lazy', 'Configuration or callback for lazy.', 'boolean', '-'],
        ['divider', 'Configuration or callback for divider.', 'SplitterDividerOptions', '-'],
        [
          'resetOnDoubleClick',
          'Configuration or callback for resetOnDoubleClick.',
          'boolean',
          'true',
        ],
        [
          'onResizeStart',
          'Configuration or callback for onResizeStart.',
          '(sizes: number[]) => void',
          '-',
        ],
        ['onResize', 'Configuration or callback for onResize.', '(sizes: number[]) => void', '-'],
        [
          'onResizeEnd',
          'Configuration or callback for onResizeEnd.',
          '(sizes: number[]) => void',
          '-',
        ],
        [
          'onDraggerDoubleClick',
          'Configuration or callback for onDraggerDoubleClick.',
          '(index: number) => void',
          '-',
        ],
      ],
    },
  ],
};
export const splitterApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
