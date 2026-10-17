import React, { useEffect, useState } from 'react';
import { cx } from '../../utils/cx';
import type { AvatarProps } from './types';
export type { AvatarProps } from './types';

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    { src, alt = '', size = 'medium', shape = 'circle', icon, className, style, children, ...rest },
    ref,
  ) => {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);
    const resolved = typeof size === 'number' ? `${size}px` : undefined;
    return (
      <span
        ref={ref}
        className={cx(
          'cinna-avatar',
          typeof size === 'string' && `cinna-avatar--${size}`,
          `cinna-avatar--${shape}`,
          className,
        )}
        style={{ width: resolved, height: resolved, ...style }}
        {...rest}
      >
        {src && !failed ? (
          <img src={src} alt={alt} onError={() => setFailed(true)} />
        ) : (
          (icon ?? children ?? alt.slice(0, 2))
        )}
      </span>
    );
  },
);
