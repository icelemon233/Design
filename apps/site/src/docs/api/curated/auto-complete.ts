import type { ApiSection, SiteLanguage } from '../../../types';

export const autoCompleteApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: '自动完成',
      rows: [
        [
          'options',
          '候选项列表；字符串会自动转换为同名 label 和 value。',
          'Array<string | AutoCompleteOption>',
          '[]',
        ],
        ['value', '输入框当前值，传入后进入受控模式。', 'string', '-'],
        ['defaultValue', '非受控模式下的初始输入值。', 'string', "''"],
        ['onChange', '输入值变化或选中候选项时触发。', '(value: string) => void', '-'],
        [
          'onSelect',
          '选中候选项时触发，返回 value 和完整选项。',
          '(value: string, option: AutoCompleteOption) => void',
          '-',
        ],
        ['onSearch', '用户输入搜索内容时触发。', '(value: string) => void', '-'],
        ['placeholder', '输入框占位文案。', 'string', '-'],
        ['disabled', '禁用输入和弹层交互。', 'boolean', 'false'],
        ['readOnly', '输入只读，并阻止弹层展开。', 'boolean', 'false'],
      ],
    },
    {
      title: '弹层与筛选',
      rows: [
        ['open', '弹层是否展开，传入后进入受控模式。', 'boolean', '-'],
        ['defaultOpen', '非受控模式下的初始展开状态。', 'boolean', 'false'],
        ['onOpenChange', '弹层展开状态变化时触发。', '(open: boolean) => void', '-'],
        [
          'filterOption',
          '筛选逻辑；设为 false 时不做本地筛选。',
          'boolean | ((inputValue, option) => boolean)',
          'true',
        ],
        [
          'notFoundContent',
          '无匹配候选项时展示的内容；为 null 时不展示空弹层。',
          'ReactNode',
          'null',
        ],
        ['popupRender', '自定义弹层内容包裹。', '(originNode: ReactNode) => ReactNode', '-'],
        [
          'popupMatchInputWidth',
          '弹层宽度是否匹配输入框，也可传入固定宽度。',
          'boolean | number',
          'true',
        ],
        ['onPopupScroll', '弹层列表滚动时触发。', 'UIEventHandler', '-'],
      ],
    },
    {
      title: '交互',
      rows: [
        [
          'allowClear',
          '展示清除按钮；对象形式可自定义 clearIcon。',
          'boolean | { clearIcon?: ReactNode }',
          'false',
        ],
        ['onClear', '点击清除按钮时触发。', '() => void', '-'],
        ['defaultActiveFirstOption', '弹层展开时默认高亮第一个可用候选项。', 'boolean', 'true'],
        ['backfill', '使用键盘移动高亮项时临时回填输入框。', 'boolean', 'false'],
        [
          'onInputKeyDown',
          '输入框键盘事件回调，会在内置键盘逻辑前触发。',
          'KeyboardEventHandler<HTMLInputElement>',
          '-',
        ],
        ['children', '自定义输入元素，会被注入自动完成所需的交互属性。', 'ReactElement', '-'],
      ],
    },
    {
      title: '样式',
      rows: [
        ['controlSize', '输入框高度。', "'small' | 'medium' | 'large'", "'medium'"],
        [
          'variant',
          '输入框视觉形态。',
          "'outlined' | 'filled' | 'borderless' | 'underlined'",
          "'outlined'",
        ],
        ['status', '输入状态。', "'success' | 'warning' | 'error'", '-'],
        ['className / style', '根节点自定义 className 和样式。', 'string / CSSProperties', '-'],
        [
          'classNames',
          '按语义节点设置 className。',
          'Partial<Record<AutoCompleteSemanticSlot, string>>',
          '-',
        ],
        [
          'styles',
          '按语义节点设置内联样式。',
          'Partial<Record<AutoCompleteSemanticSlot, CSSProperties>>',
          '-',
        ],
      ],
    },
    {
      title: '候选项与语义节点',
      rows: [
        ['AutoCompleteOption.value', '候选项值，也是默认匹配字段。', 'string', '-'],
        ['AutoCompleteOption.label', '候选项展示内容。', 'ReactNode', 'value'],
        ['AutoCompleteOption.description', '候选项右侧或辅助说明。', 'ReactNode', '-'],
        ['AutoCompleteOption.disabled', '禁用当前候选项。', 'boolean', 'false'],
        [
          'AutoCompleteOption.className / style',
          '单个候选项自定义样式。',
          'string / CSSProperties',
          '-',
        ],
        [
          'AutoCompleteSemanticSlot',
          '可定制的语义节点。',
          "'root' | 'input' | 'clear' | 'popup' | 'list' | 'option' | 'empty'",
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
          'Suggestion list. Strings are converted to matching label and value.',
          'Array<string | AutoCompleteOption>',
          '[]',
        ],
        ['value', 'Current input value. Enables controlled mode when provided.', 'string', '-'],
        ['defaultValue', 'Initial input value in uncontrolled mode.', 'string', "''"],
        [
          'onChange',
          'Fires when the input value changes or an option is selected.',
          '(value: string) => void',
          '-',
        ],
        [
          'onSelect',
          'Fires when an option is selected with value and full option data.',
          '(value: string, option: AutoCompleteOption) => void',
          '-',
        ],
        ['onSearch', 'Fires when the user types search text.', '(value: string) => void', '-'],
        ['placeholder', 'Input placeholder.', 'string', '-'],
        ['disabled', 'Disables input and popup interaction.', 'boolean', 'false'],
        ['readOnly', 'Makes input read-only and prevents popup opening.', 'boolean', 'false'],
      ],
    },
    {
      title: 'Popup And Filtering',
      rows: [
        [
          'open',
          'Whether the popup is open. Enables controlled mode when provided.',
          'boolean',
          '-',
        ],
        ['defaultOpen', 'Initial popup open state in uncontrolled mode.', 'boolean', 'false'],
        ['onOpenChange', 'Fires when popup open state changes.', '(open: boolean) => void', '-'],
        [
          'filterOption',
          'Filtering logic. Set to false to disable local filtering.',
          'boolean | ((inputValue, option) => boolean)',
          'true',
        ],
        [
          'notFoundContent',
          'Content shown when no options match. Null hides the empty popup.',
          'ReactNode',
          'null',
        ],
        [
          'popupRender',
          'Wraps or customizes popup content.',
          '(originNode: ReactNode) => ReactNode',
          '-',
        ],
        [
          'popupMatchInputWidth',
          'Whether popup width matches the input, or a fixed width.',
          'boolean | number',
          'true',
        ],
        ['onPopupScroll', 'Fires when the popup list scrolls.', 'UIEventHandler', '-'],
      ],
    },
    {
      title: 'Interaction',
      rows: [
        [
          'allowClear',
          'Shows a clear button. Object form customizes clearIcon.',
          'boolean | { clearIcon?: ReactNode }',
          'false',
        ],
        ['onClear', 'Fires when the clear button is clicked.', '() => void', '-'],
        [
          'defaultActiveFirstOption',
          'Highlights the first enabled option when popup opens.',
          'boolean',
          'true',
        ],
        [
          'backfill',
          'Temporarily fills the input while moving active option by keyboard.',
          'boolean',
          'false',
        ],
        [
          'onInputKeyDown',
          'Input keyboard callback fired before the built-in keyboard logic.',
          'KeyboardEventHandler<HTMLInputElement>',
          '-',
        ],
        [
          'children',
          'Custom input element injected with auto-complete interaction props.',
          'ReactElement',
          '-',
        ],
      ],
    },
    {
      title: 'Style',
      rows: [
        ['controlSize', 'Input height.', "'small' | 'medium' | 'large'", "'medium'"],
        [
          'variant',
          'Input visual variant.',
          "'outlined' | 'filled' | 'borderless' | 'underlined'",
          "'outlined'",
        ],
        ['status', 'Input status.', "'success' | 'warning' | 'error'", '-'],
        [
          'className / style',
          'Custom className and style for the root node.',
          'string / CSSProperties',
          '-',
        ],
        [
          'classNames',
          'Custom classNames by semantic slot.',
          'Partial<Record<AutoCompleteSemanticSlot, string>>',
          '-',
        ],
        [
          'styles',
          'Custom inline styles by semantic slot.',
          'Partial<Record<AutoCompleteSemanticSlot, CSSProperties>>',
          '-',
        ],
      ],
    },
    {
      title: 'Option And Slots',
      rows: [
        ['AutoCompleteOption.value', 'Option value and default matching field.', 'string', '-'],
        ['AutoCompleteOption.label', 'Option display content.', 'ReactNode', 'value'],
        ['AutoCompleteOption.description', 'Option side note or helper text.', 'ReactNode', '-'],
        ['AutoCompleteOption.disabled', 'Disables this option.', 'boolean', 'false'],
        [
          'AutoCompleteOption.className / style',
          'Custom className and style for this option.',
          'string / CSSProperties',
          '-',
        ],
        [
          'AutoCompleteSemanticSlot',
          'Customizable semantic slots.',
          "'root' | 'input' | 'clear' | 'popup' | 'list' | 'option' | 'empty'",
          '-',
        ],
      ],
    },
  ],
};
