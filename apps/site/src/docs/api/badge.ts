// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const badgeApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Badge',
      rows: [
        ['count', '星数或计数。', 'React.ReactNode', '-'],
        ['dot', 'dot 的配置或回调。', 'boolean', '-'],
        ['status', '语义状态及反馈颜色。', 'CinnaStatus', '-'],
        ['overflowCount', 'overflowCount 的配置或回调。', 'number', '99'],
        ['showZero', 'showZero 的配置或回调。', 'boolean', '-'],
        ['text', 'text 的配置或回调。', 'React.ReactNode', '-'],
        ['offset', 'offset 的配置或回调。', '[number, number]', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Badge',
      rows: [
        ['count', 'Star count or item count.', 'React.ReactNode', '-'],
        ['dot', 'Configuration or callback for dot.', 'boolean', '-'],
        ['status', 'Semantic status and feedback color.', 'CinnaStatus', '-'],
        ['overflowCount', 'Configuration or callback for overflowCount.', 'number', '99'],
        ['showZero', 'Configuration or callback for showZero.', 'boolean', '-'],
        ['text', 'Configuration or callback for text.', 'React.ReactNode', '-'],
        ['offset', 'Configuration or callback for offset.', '[number, number]', '-'],
      ],
    },
  ],
};
