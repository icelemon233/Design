// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const watermarkApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Watermark',
      rows: [
        ['content', '正文内容。', 'string', "'Design'"],
        ['rotate', '水印旋转角度。', 'number', '-18'],
        ['gap', '项目或平铺之间的间距。', 'number', '120'],
        ['opacity', '水印透明度。', 'number', '0.08'],
        ['fontSize', '字号。', 'number', '16'],
      ],
    },
  ],
  en: [
    {
      title: 'Watermark',
      rows: [
        ['content', 'Body content.', 'string', "'Design'"],
        ['rotate', 'Watermark rotation in degrees.', 'number', '-18'],
        ['gap', 'Spacing between items or tiles.', 'number', '120'],
        ['opacity', 'Watermark opacity.', 'number', '0.08'],
        ['fontSize', 'Font size.', 'number', '16'],
      ],
    },
  ],
};
