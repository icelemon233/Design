import React from 'react';
import { cx } from '../../utils/cx';
import { Loading } from '../loading';
import { statusIcon } from '../shared';
import type { ResultProps } from './types';
export type { ResultProps } from './types';

export const Result = React.forwardRef<HTMLDivElement, ResultProps>(
  ({ status = 'info', title, subTitle, extra, icon, className, ...rest }, ref) => (
    <div ref={ref} className={cx('cinna-result', `cinna-result--${status}`, className)} {...rest}>
      <div className="cinna-result__icon" aria-hidden="true">
        {icon ??
          (status === '403' || status === '404' || status === '500' ? status : statusIcon(status))}
      </div>
      <div className="cinna-result__title">{title}</div>
      {subTitle && <div className="cinna-result__subtitle">{subTitle}</div>}
      {extra && <div className="cinna-result__extra">{extra}</div>}
    </div>
  ),
);

export { Loading };
