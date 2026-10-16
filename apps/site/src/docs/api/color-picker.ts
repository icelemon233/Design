// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const colorPickerApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'ColorPicker',
      rows: [
        ['presets', '可选的预设颜色。', 'string[]', '[]'],
        ['showText', '显示颜色值。', 'boolean', '-'],
        ['onChange', '值变更时调用。', '(value: string) => void', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'ColorPicker',
      rows: [
        ['presets', 'Preset color options.', 'string[]', '[]'],
        ['showText', 'Show the color value.', 'boolean', '-'],
        ['onChange', 'Called when the value changes.', '(value: string) => void', '-'],
      ],
    },
  ],
};
