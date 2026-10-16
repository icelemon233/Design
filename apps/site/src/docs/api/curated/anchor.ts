import type { ApiSection, SiteLanguage } from '../../../types';

export const anchorApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Anchor',
      rows: [
        ['items', '锚点数据列表。', 'AnchorItem[]', '[]'],
        ['direction', '锚点排布方向。', "'vertical' | 'horizontal'", "'vertical'"],
        ['affix', '是否固定吸附；false 时随页面内容一起滚动。', 'boolean', 'false'],
        ['offsetTop', '锚点容器 sticky 时距离顶部的位置，也会作为默认滚动偏移。', 'number', '0'],
        ['targetOffset', '点击锚点后，目标距离滚动容器顶部的默认偏移。', 'number', 'offsetTop'],
        [
          'getContainer',
          '指定需要滚动的容器；不传时使用 window。',
          '() => HTMLElement | Window | null',
          'window',
        ],
        ['defaultActiveHref', '默认高亮的锚点 href。', 'string', '首个 items.href'],
        ['onItemClick', '点击锚点项时触发。', '(event, item) => void', '-'],
        ['onChange', '当前高亮锚点变化时触发。', '(activeHref: string) => void', '-'],
        ['className', '自定义 className。', 'string', '-'],
        ['style', '自定义样式。', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'AnchorItem',
      rows: [
        ['key', '唯一标识。', 'string', '-'],
        ['href', '锚点链接和高亮标识；未设置 anchorTarget 时会用它寻找目标。', 'string', '-'],
        ['title', '锚点显示内容。', 'ReactNode', '-'],
        [
          'anchorTarget',
          '自定义锚定点，支持 CSS 选择器、元素或返回元素的函数。',
          'string | Element | (() => Element | null)',
          '-',
        ],
        ['targetOffset', '当前锚点的滚动偏移，会覆盖 Anchor 的 targetOffset。', 'number', '-'],
      ],
    },
    {
      title: 'AnchorTarget',
      rows: [
        ['string', '使用 CSS 选择器在 getContainer 返回的容器内查找目标。', 'string', '-'],
        ['Element', '直接指定需要滚动到的目标元素。', 'Element', '-'],
        [
          'function',
          '点击时动态返回目标元素，适合内容延迟渲染或目标引用变化的场景。',
          '() => Element | null',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'Anchor',
      rows: [
        ['items', 'Anchor data list.', 'AnchorItem[]', '[]'],
        ['direction', 'Anchor layout direction.', "'vertical' | 'horizontal'", "'vertical'"],
        [
          'affix',
          'Whether the anchor sticks while scrolling; false keeps it in normal document flow.',
          'boolean',
          'false',
        ],
        [
          'offsetTop',
          'Sticky top offset for the anchor container. Also used as the default scroll offset.',
          'number',
          '0',
        ],
        [
          'targetOffset',
          'Default offset from the scroll container top after clicking an anchor.',
          'number',
          'offsetTop',
        ],
        [
          'getContainer',
          'Returns the scroll container; window is used when omitted.',
          '() => HTMLElement | Window | null',
          'window',
        ],
        ['defaultActiveHref', 'Default highlighted anchor href.', 'string', 'first items.href'],
        ['onItemClick', 'Fires when an anchor item is clicked.', '(event, item) => void', '-'],
        ['onChange', 'Fires when the active anchor changes.', '(activeHref: string) => void', '-'],
        ['className', 'Custom className.', 'string', '-'],
        ['style', 'Custom inline styles.', 'CSSProperties', '-'],
      ],
    },
    {
      title: 'AnchorItem',
      rows: [
        ['key', 'Unique key.', 'string', '-'],
        [
          'href',
          'Anchor link and active identity. Used to find the target when anchorTarget is omitted.',
          'string',
          '-',
        ],
        ['title', 'Anchor label content.', 'ReactNode', '-'],
        [
          'anchorTarget',
          'Custom anchor target as a CSS selector, element, or element getter.',
          'string | Element | (() => Element | null)',
          '-',
        ],
        ['targetOffset', 'Per-item scroll offset. Overrides Anchor targetOffset.', 'number', '-'],
      ],
    },
    {
      title: 'AnchorTarget',
      rows: [
        [
          'string',
          'Finds the target with a CSS selector inside the container returned by getContainer.',
          'string',
          '-',
        ],
        ['Element', 'Uses the provided element as the scroll target.', 'Element', '-'],
        [
          'function',
          'Returns the target element at click time, useful for delayed rendering or changing refs.',
          '() => Element | null',
          '-',
        ],
      ],
    },
  ],
};
