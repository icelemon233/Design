import React from 'react';

export interface StatisticProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'title' | 'prefix'
> {
  title?: React.ReactNode;
  value: React.ReactNode;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  precision?: number;
  valueStyle?: React.CSSProperties;
  formatter?: (value: React.ReactNode) => React.ReactNode;
  groupSeparator?: string;
  decimalSeparator?: string;
  loading?: boolean;
}
