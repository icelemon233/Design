// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const avatarApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Avatar',
      rows: [
        ['src', 'src 的配置或回调。', 'string', '-'],
        ['alt', 'alt 的配置或回调。', 'string', "''"],
        ['size', '组件尺寸。', 'CinnaSize | number', "'medium'"],
        ['shape', 'shape 的配置或回调。', "'circle' | 'square'", "'circle'"],
        ['icon', '自定义图标。', 'React.ReactNode', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Avatar',
      rows: [
        ['src', 'Configuration or callback for src.', 'string', '-'],
        ['alt', 'Configuration or callback for alt.', 'string', "''"],
        ['size', 'Component size.', 'CinnaSize | number', "'medium'"],
        ['shape', 'Configuration or callback for shape.', "'circle' | 'square'", "'circle'"],
        ['icon', 'Custom icon.', 'React.ReactNode', '-'],
      ],
    },
  ],
};
