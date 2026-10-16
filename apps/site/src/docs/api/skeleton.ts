// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const skeletonApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Skeleton',
      rows: [
        ['rows', '段落占位行数。', 'number', '3'],
        ['loading', '展示加载状态。', 'boolean', 'true'],
        ['avatar', 'avatar 的配置或回调。', 'boolean', '-'],
        ['active', '启用加载或骨架动画。', 'boolean', 'true'],
        ['title', '标题内容。', 'boolean', 'true'],
        ['round', 'round 的配置或回调。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Skeleton',
      rows: [
        ['rows', 'Number of paragraph placeholder rows.', 'number', '3'],
        ['loading', 'Show the loading state.', 'boolean', 'true'],
        ['avatar', 'Configuration or callback for avatar.', 'boolean', '-'],
        ['active', 'Enable loading or skeleton animation.', 'boolean', 'true'],
        ['title', 'Title content.', 'boolean', 'true'],
        ['round', 'Configuration or callback for round.', 'boolean', '-'],
      ],
    },
  ],
};
