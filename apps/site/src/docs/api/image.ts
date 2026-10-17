// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const imageApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Image',
      rows: [
        ['caption', '图片说明。', 'React.ReactNode', '-'],
        ['fallback', '图片加载失败时的替代地址。', 'string', '-'],
        ['preview', '启用可缩放和旋转的图片预览。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Image',
      rows: [
        ['caption', 'Image caption.', 'React.ReactNode', '-'],
        ['fallback', 'Fallback URL when the image fails to load.', 'string', '-'],
        ['preview', 'Enable image preview with zoom and rotation.', 'boolean', '-'],
      ],
    },
  ],
};
