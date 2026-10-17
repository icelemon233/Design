import React from 'react';
import { cx } from '../../utils/cx';
import type { StatisticProps } from './types';
export type { StatisticProps } from './types';

export const Statistic = React.forwardRef<HTMLDivElement, StatisticProps>(
  (
    {
      title,
      value,
      suffix,
      prefix,
      precision,
      valueStyle,
      formatter,
      groupSeparator = ',',
      decimalSeparator = '.',
      loading,
      className,
      ...rest
    },
    ref,
  ) => {
    const numeric =
      typeof value === 'number'
        ? (precision === undefined
            ? String(value)
            : value.toFixed(Math.max(0, Math.min(20, precision)))
          ).split('.')
        : null;
    const formatted = numeric
      ? numeric[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator) +
        (numeric[1] ? decimalSeparator + numeric[1] : '')
      : value;
    const displayValue = formatter ? formatter(value) : formatted;
    return (
      <div ref={ref} className={cx('cinna-statistic', className)} {...rest}>
        {title && <span>{title}</span>}
        <strong style={valueStyle} aria-busy={loading || undefined}>
          {prefix && <small>{prefix}</small>}
          {loading ? (
            <span className="cinna-statistic__loading" aria-label="Loading statistic" />
          ) : (
            displayValue
          )}
          {suffix && <small>{suffix}</small>}
        </strong>
      </div>
    );
  },
);

Statistic.displayName = 'Statistic';
