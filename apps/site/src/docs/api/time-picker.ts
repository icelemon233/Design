// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const timePickerApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'TimePicker',
      rows: [
        ['controlSize', '控件尺寸。', 'CinnaSize', "'medium'"],
        ['status', '语义状态及反馈颜色。', "Exclude<CinnaStatus, 'info'>", '-'],
        ['allowClear', '显示清除操作。', 'boolean', '-'],
        ['hourStep', '小时选项的步长。', 'number', '1'],
        ['minuteStep', '分钟选项的步长。', 'number', '1'],
        ['use12Hours', '时间面板以 12 小时显示；值保留 24 小时格式。', 'boolean', '-'],
        ['disabledHours', '禁止选择的小时。', '() => number[]', '-'],
        ['disabledMinutes', '指定小时下禁止选择的分钟。', '(hour: number) => number[]', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'TimePicker',
      rows: [
        ['controlSize', 'Control size.', 'CinnaSize', "'medium'"],
        ['status', 'Semantic status and feedback color.', "Exclude<CinnaStatus, 'info'>", '-'],
        ['allowClear', 'Show a clear action.', 'boolean', '-'],
        ['hourStep', 'Hour option interval.', 'number', '1'],
        ['minuteStep', 'Minute option interval.', 'number', '1'],
        ['use12Hours', 'Display 12-hour options; values remain in 24-hour format.', 'boolean', '-'],
        ['disabledHours', 'Hours that cannot be selected.', '() => number[]', '-'],
        [
          'disabledMinutes',
          'Unavailable minutes for the selected hour.',
          '(hour: number) => number[]',
          '-',
        ],
      ],
    },
  ],
};
