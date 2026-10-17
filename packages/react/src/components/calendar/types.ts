import React from 'react';

export interface CalendarProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue' | 'onSelect'
> {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
  fullscreen?: boolean;
  headerRender?: (date: Date) => React.ReactNode;
  disabledDate?: (date: Date) => boolean;
  cellRender?: (date: Date) => React.ReactNode;
  onSelect?: (date: Date) => void;
}
