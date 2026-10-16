// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { autoCompleteApiRows as curated } from './curated/auto-complete';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'AutoComplete',
      rows: [
        ['options', '可选项数据及禁用配置。', '(string | AutoCompleteOption)[]', '[]'],
        [
          'children',
          '组件内容。',
          'React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>, string | React.JSXElementConstructor<any>>',
          '-',
        ],
        ['controlSize', '控件尺寸。', 'CinnaSize', "'medium'"],
        ['variant', 'variant 的配置或回调。', 'AutoCompleteVariant', "'outlined'"],
        ['status', '语义状态及反馈颜色。', '"success" | "warning" | "error"', '-'],
        ['allowClear', '显示清除操作。', 'boolean | { clearIcon?: React.ReactNode; }', '-'],
        ['backfill', 'backfill 的配置或回调。', 'boolean', 'false'],
        ['defaultActiveFirstOption', 'defaultActiveFirstOption 的配置或回调。', 'boolean', 'true'],
        ['open', '受控的打开状态。', 'boolean', '-'],
        ['defaultOpen', '初始打开状态。', 'boolean', 'false'],
        ['onOpenChange', '打开状态变化时调用。', '((open: boolean) => void)', '-'],
        ['onChange', '值变更时调用。', '((value: string) => void)', '-'],
        [
          'onSelect',
          '选中项目时调用。',
          '((value: string, option: AutoCompleteOption) => void)',
          '-',
        ],
        ['onSearch', 'onSearch 的配置或回调。', '((value: string) => void)', '-'],
        ['onClear', 'onClear 的配置或回调。', '(() => void)', '-'],
        [
          'onInputKeyDown',
          'onInputKeyDown 的配置或回调。',
          'React.KeyboardEventHandler<HTMLInputElement>',
          '-',
        ],
        [
          'onPopupScroll',
          'onPopupScroll 的配置或回调。',
          'React.UIEventHandler<HTMLSpanElement>',
          '-',
        ],
        [
          'filterOption',
          'filterOption 的配置或回调。',
          'boolean | ((inputValue: string, option: AutoCompleteOption) => boolean)',
          'true',
        ],
        ['notFoundContent', '没有匹配选项时显示的内容。', 'React.ReactNode', 'null'],
        [
          'popupRender',
          'popupRender 的配置或回调。',
          '((originNode: React.ReactNode) => React.ReactNode)',
          '-',
        ],
        ['popupMatchInputWidth', 'popupMatchInputWidth 的配置或回调。', 'number | boolean', 'true'],
        [
          'classNames',
          'classNames 的配置或回调。',
          'Partial<Record<AutoCompleteSemanticSlot, string>>',
          '-',
        ],
        [
          'styles',
          'styles 的配置或回调。',
          'Partial<Record<AutoCompleteSemanticSlot, React.CSSProperties>>',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'AutoComplete',
      rows: [
        [
          'options',
          'Available options and per-option disabled state.',
          '(string | AutoCompleteOption)[]',
          '[]',
        ],
        [
          'children',
          'Component content.',
          'React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>, string | React.JSXElementConstructor<any>>',
          '-',
        ],
        ['controlSize', 'Control size.', 'CinnaSize', "'medium'"],
        ['variant', 'Configuration or callback for variant.', 'AutoCompleteVariant', "'outlined'"],
        ['status', 'Semantic status and feedback color.', '"success" | "warning" | "error"', '-'],
        ['allowClear', 'Show a clear action.', 'boolean | { clearIcon?: React.ReactNode; }', '-'],
        ['backfill', 'Configuration or callback for backfill.', 'boolean', 'false'],
        [
          'defaultActiveFirstOption',
          'Configuration or callback for defaultActiveFirstOption.',
          'boolean',
          'true',
        ],
        ['open', 'Controlled open state.', 'boolean', '-'],
        ['defaultOpen', 'Initial open state.', 'boolean', 'false'],
        ['onOpenChange', 'Called when the open state changes.', '((open: boolean) => void)', '-'],
        ['onChange', 'Called when the value changes.', '((value: string) => void)', '-'],
        [
          'onSelect',
          'Called when an item is selected.',
          '((value: string, option: AutoCompleteOption) => void)',
          '-',
        ],
        ['onSearch', 'Configuration or callback for onSearch.', '((value: string) => void)', '-'],
        ['onClear', 'Configuration or callback for onClear.', '(() => void)', '-'],
        [
          'onInputKeyDown',
          'Configuration or callback for onInputKeyDown.',
          'React.KeyboardEventHandler<HTMLInputElement>',
          '-',
        ],
        [
          'onPopupScroll',
          'Configuration or callback for onPopupScroll.',
          'React.UIEventHandler<HTMLSpanElement>',
          '-',
        ],
        [
          'filterOption',
          'Configuration or callback for filterOption.',
          'boolean | ((inputValue: string, option: AutoCompleteOption) => boolean)',
          'true',
        ],
        ['notFoundContent', 'Content displayed when no options match.', 'React.ReactNode', 'null'],
        [
          'popupRender',
          'Configuration or callback for popupRender.',
          '((originNode: React.ReactNode) => React.ReactNode)',
          '-',
        ],
        [
          'popupMatchInputWidth',
          'Configuration or callback for popupMatchInputWidth.',
          'number | boolean',
          'true',
        ],
        [
          'classNames',
          'Configuration or callback for classNames.',
          'Partial<Record<AutoCompleteSemanticSlot, string>>',
          '-',
        ],
        [
          'styles',
          'Configuration or callback for styles.',
          'Partial<Record<AutoCompleteSemanticSlot, React.CSSProperties>>',
          '-',
        ],
      ],
    },
  ],
};
export const autoCompleteApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
