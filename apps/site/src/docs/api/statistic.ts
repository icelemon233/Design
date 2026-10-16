// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const statisticApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Statistic',
      rows: [
        ['title', '标题内容。', 'React.ReactNode', '-'],
        ['value', '受控值；变更后由父组件更新。', 'React.ReactNode', '-'],
        ['suffix', '后置内容。', 'React.ReactNode', '-'],
        ['prefix', '前置内容。', 'React.ReactNode', '-'],
        ['precision', '保留的小数位数。', 'number', '-'],
        ['valueStyle', 'valueStyle 的配置或回调。', 'React.CSSProperties', '-'],
        ['formatter', '自定义数值显示。', '((value: React.ReactNode) => React.ReactNode)', '-'],
        ['groupSeparator', '数字分组分隔符。', 'string', "','"],
        ['decimalSeparator', '小数分隔符。', 'string', "'.'"],
        ['loading', '展示加载状态。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Statistic',
      rows: [
        ['title', 'Title content.', 'React.ReactNode', '-'],
        ['value', 'Controlled value; update it from the parent.', 'React.ReactNode', '-'],
        ['suffix', 'Suffix content.', 'React.ReactNode', '-'],
        ['prefix', 'Prefix content.', 'React.ReactNode', '-'],
        ['precision', 'Number of decimal places.', 'number', '-'],
        ['valueStyle', 'Configuration or callback for valueStyle.', 'React.CSSProperties', '-'],
        [
          'formatter',
          'Custom value display.',
          '((value: React.ReactNode) => React.ReactNode)',
          '-',
        ],
        ['groupSeparator', 'Digit group separator.', 'string', "','"],
        ['decimalSeparator', 'Decimal separator.', 'string', "'.'"],
        ['loading', 'Show the loading state.', 'boolean', '-'],
      ],
    },
  ],
};
