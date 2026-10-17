import React from 'react';
import { cx } from '../../utils/cx';
import { clamp } from '../shared';
import type { ProgressProps } from './types';
export type { ProgressProps } from './types';

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      percent = 0,
      status = 'normal',
      showInfo = true,
      type = 'line',
      strokeColor,
      format,
      className,
      ...rest
    },
    ref,
  ) => {
    const safePercent = clamp(percent, 0, 100);
    const progressText = format ? format(safePercent) : `${safePercent}%`;
    return (
      <div
        ref={ref}
        className={cx(
          'cinna-progress',
          `cinna-progress--${status}`,
          `cinna-progress--${type}`,
          className,
        )}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safePercent}
        aria-label={rest['aria-label'] ?? 'Progress'}
        {...rest}
      >
        <div
          className="cinna-progress__track"
          style={
            {
              '--cinna-progress-percent': safePercent,
              ...(strokeColor ? { '--cinna-progress-color': strokeColor } : {}),
            } as React.CSSProperties
          }
        >
          <div
            className="cinna-progress__bar"
            style={{
              width: type === 'line' ? `${safePercent}%` : undefined,
              ['--cinna-progress-percent' as string]: safePercent,
              background: strokeColor,
            }}
          />
        </div>
        {showInfo && <span className="cinna-progress__text">{progressText}</span>}
      </div>
    );
  },
);

Progress.displayName = 'Progress';
