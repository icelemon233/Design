import React, { useMemo, useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { CalendarProps } from './types';
export type { CalendarProps } from './types';

export const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onSelect,
      disabledDate,
      cellRender,
      fullscreen,
      headerRender,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selected, setSelected] = useState(defaultValue ?? value ?? new Date());
    const active = value ?? selected;
    const days = useMemo(() => buildCalendarDays(active), [active]);
    const monthLabel = active.toLocaleString(undefined, { month: 'long', year: 'numeric' });
    const changeMonth = (offset: number) => {
      const next = new Date(active.getFullYear(), active.getMonth() + offset, 1);
      const lastDay = new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate();
      next.setDate(Math.min(active.getDate(), lastDay));
      setSelected(next);
      onChange?.(next);
    };

    return (
      <div
        ref={ref}
        className={cx('cinna-calendar', fullscreen && 'cinna-calendar--fullscreen', className)}
        {...rest}
      >
        <div className="cinna-calendar__header">
          {headerRender ? (
            headerRender(active)
          ) : (
            <>
              <button type="button" aria-label="Previous month" onClick={() => changeMonth(-1)}>
                <Icon name="chevron-left" size={13} />
              </button>
              <strong>{monthLabel}</strong>
              <button type="button" aria-label="Next month" onClick={() => changeMonth(1)}>
                <Icon name="chevron-right" size={13} />
              </button>
            </>
          )}
        </div>
        <div className="cinna-calendar__grid">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <strong key={`${day}-${index}`}>{day}</strong>
          ))}
          {days.map((day, index) => (
            <button
              key={index}
              type="button"
              aria-label={day.date.toLocaleDateString()}
              aria-pressed={sameDay(day.date, active)}
              disabled={disabledDate?.(day.date)}
              className={cx(
                !day.inMonth && 'cinna-calendar__day--muted',
                sameDay(day.date, active) && 'cinna-calendar__day--active',
                sameDay(day.date, new Date()) && 'cinna-calendar__day--today',
              )}
              onClick={() => {
                setSelected(day.date);
                onChange?.(day.date);
                onSelect?.(day.date);
              }}
            >
              {cellRender ? cellRender(day.date) : day.date.getDate()}
            </button>
          ))}
        </div>
      </div>
    );
  },
);

Calendar.displayName = 'Calendar';

function buildCalendarDays(value: Date) {
  const year = value.getFullYear();
  const month = value.getMonth();
  const first = new Date(year, month, 1);
  const start = new Date(year, month, 1 - first.getDay());

  return Array.from({ length: 42 }).map((_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return { date, inMonth: date.getMonth() === month };
  });
}

function sameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}
