import React, { useEffect, useState } from 'react';
import { cx } from '../../utils/cx';
import { Loading } from '../loading';
import type { SpinProps } from './types';
export type { SpinProps } from './types';

export const Spin: React.FC<SpinProps> = ({
  spinning,
  active = true,
  delay = 0,
  tip,
  label,
  children,
  className,
  ...rest
}) => {
  const requested = spinning ?? active;
  const [visible, setVisible] = useState(requested && delay === 0);
  useEffect(() => {
    if (!requested) {
      setVisible(false);
      return;
    }
    if (!delay) {
      setVisible(true);
      return;
    }
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [requested, delay]);
  if (!children)
    return <Loading {...rest} active={visible} className={className} label={tip ?? label} />;
  return (
    <div className={cx('cinna-spin', className)} aria-busy={visible}>
      <div
        className={cx('cinna-spin__content', visible && 'cinna-spin__content--busy')}
        {...(visible ? { inert: '' } : {})}
      >
        {children}
      </div>
      {visible && (
        <div className="cinna-spin__overlay">
          <Loading {...rest} label={tip ?? label} />
        </div>
      )}
    </div>
  );
};

Spin.displayName = 'Spin';
