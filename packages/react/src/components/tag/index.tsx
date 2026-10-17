import React, { useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { TagProps } from './types';
export type { TagProps } from './types';

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    { color = 'blue', closable, onClose, bordered = true, icon, className, children, ...rest },
    ref,
  ) => {
    const [visible, setVisible] = useState(true);
    if (!visible) return null;
    return (
      <span
        ref={ref}
        className={cx(
          'cinna-tag',
          `cinna-tag--${color}`,
          !bordered && 'cinna-tag--borderless',
          className,
        )}
        {...rest}
      >
        {icon && <span className="cinna-tag__icon">{icon}</span>}
        {children}
        {closable && (
          <button
            className="cinna-tag__close"
            type="button"
            aria-label="Close tag"
            onClick={(event) => {
              onClose?.(event);
              if (!event.defaultPrevented) setVisible(false);
            }}
          >
            <Icon name="close-blue" size={10} />
          </button>
        )}
      </span>
    );
  },
);

Tag.displayName = 'Tag';
