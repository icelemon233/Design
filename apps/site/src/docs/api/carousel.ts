// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const carouselApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Carousel',
      rows: [
        ['items', '展示项目。', 'React.ReactNode[]', '-'],
        ['autoplay', '自动轮播。', 'boolean', '-'],
        ['autoplaySpeed', '自动轮播间隔，毫秒。', 'number', '2600'],
        ['defaultActiveIndex', '走马灯初始页索引。', 'number', '0'],
        ['activeIndex', '受控的走马灯页索引。', 'number', '-'],
        ['pauseOnHover', '鼠标悬停时暂停轮播。', 'boolean', 'true'],
        ['dots', 'dots 的配置或回调。', 'boolean', 'true'],
        ['arrows', 'arrows 的配置或回调。', 'boolean', 'true'],
        ['afterChange', '轮播页变化时调用。', '(activeIndex: number) => void', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Carousel',
      rows: [
        ['items', 'Items to display.', 'React.ReactNode[]', '-'],
        ['autoplay', 'Advance slides automatically.', 'boolean', '-'],
        ['autoplaySpeed', 'Autoplay interval in milliseconds.', 'number', '2600'],
        ['defaultActiveIndex', 'Initial carousel slide index.', 'number', '0'],
        ['activeIndex', 'Controlled carousel slide index.', 'number', '-'],
        ['pauseOnHover', 'Pause autoplay on hover.', 'boolean', 'true'],
        ['dots', 'Configuration or callback for dots.', 'boolean', 'true'],
        ['arrows', 'Configuration or callback for arrows.', 'boolean', 'true'],
        [
          'afterChange',
          'Called when the active slide changes.',
          '(activeIndex: number) => void',
          '-',
        ],
      ],
    },
  ],
};
