// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const formApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Form',
      rows: [
        ['layout', '布局方式。', "'vertical' | 'horizontal' | 'inline'", "'vertical'"],
        ['disabled', '禁用用户输入和操作。', 'boolean', '-'],
        ['requiredMark', '必填标记的显示方式。', "boolean | 'optional'", 'true'],
        ['form', '由 useForm 创建的表单实例。', 'FormInstance', '-'],
        ['initialValues', '表单首次挂载时的字段值。', 'FormValues', '{}'],
        ['onFinish', '完成时调用。', '(values: FormValues) => void | Promise<void>', '-'],
        ['onFinishFailed', '校验失败的字段及错误信息。', '(error: FormError) => void', '-'],
        [
          'onValuesChange',
          '字段变化时的增量与全部值。',
          '(changed: FormValues, values: FormValues) => void',
          '-',
        ],
      ],
    },
    {
      title: 'FormItem',
      rows: [
        ['label', '关联控件的标签。', 'React.ReactNode', '-'],
        ['help', '辅助说明；校验错误优先显示。', 'React.ReactNode', '-'],
        ['required', '标记字段为必填。', 'boolean', '-'],
        ['validateStatus', '手动指定校验状态。', "Exclude<CinnaStatus, 'info'>", '-'],
        ['extra', '额外内容。', 'React.ReactNode', '-'],
        ['name', '字段名或原生输入 name。', 'string', '-'],
        ['rules', '必填、格式、范围或异步校验规则。', 'FormRule[]', '[]'],
        ['valuePropName', '接收字段值的属性名。', 'string', '-'],
        ['trigger', '字段值变更事件名。', 'string', '-'],
        ['getValueFromEvent', '从控件事件参数提取字段值。', '(...args: unknown[]) => unknown', '-'],
        ['htmlFor', '关联输入元素的 id。', 'string', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Form',
      rows: [
        ['layout', 'Layout orientation.', "'vertical' | 'horizontal' | 'inline'", "'vertical'"],
        ['disabled', 'Disable user input and interaction.', 'boolean', '-'],
        ['requiredMark', 'Display of required-field marks.', "boolean | 'optional'", 'true'],
        ['form', 'Form instance created with useForm.', 'FormInstance', '-'],
        ['initialValues', 'Field values when the form first mounts.', 'FormValues', '{}'],
        ['onFinish', 'Called when finished.', '(values: FormValues) => void | Promise<void>', '-'],
        [
          'onFinishFailed',
          'Invalid fields and messages after failed validation.',
          '(error: FormError) => void',
          '-',
        ],
        [
          'onValuesChange',
          'Changed fields and all values.',
          '(changed: FormValues, values: FormValues) => void',
          '-',
        ],
      ],
    },
    {
      title: 'FormItem',
      rows: [
        ['label', 'Label for the associated control.', 'React.ReactNode', '-'],
        ['help', 'Help text; validation errors take priority.', 'React.ReactNode', '-'],
        ['required', 'Mark the field as required.', 'boolean', '-'],
        [
          'validateStatus',
          'Manually specify validation status.',
          "Exclude<CinnaStatus, 'info'>",
          '-',
        ],
        ['extra', 'Additional content.', 'React.ReactNode', '-'],
        ['name', 'Field name or native input name.', 'string', '-'],
        ['rules', 'Required, format, range or async validation rules.', 'FormRule[]', '[]'],
        ['valuePropName', 'Property receiving the field value.', 'string', '-'],
        ['trigger', 'Event used to update the field value.', 'string', '-'],
        [
          'getValueFromEvent',
          'Extract the field value from control event arguments.',
          '(...args: unknown[]) => unknown',
          '-',
        ],
        ['htmlFor', 'ID of the associated input element.', 'string', '-'],
      ],
    },
  ],
};
