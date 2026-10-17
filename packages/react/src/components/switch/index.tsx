import React, { useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { SwitchProps } from './types';
export type { SwitchProps } from './types';

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onChange,
      size = 'medium',
      checkedChildren,
      unCheckedChildren,
      loading,
      className,
      disabled: disabledProp,
      onClick,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState(Boolean(defaultChecked));
    const isChecked = checked ?? inner;
    const toggle = () => {
      if (disabled || loading) return;
      const next = !isChecked;
      setInner(next);
      onChange?.(next);
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-label={rest['aria-label'] ?? 'Toggle'}
        aria-checked={isChecked}
        disabled={disabled || loading}
        className={cx(
          'cinna-switch',
          `cinna-switch--${size}`,
          isChecked && 'cinna-switch--checked',
          loading && 'cinna-switch--loading',
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggle();
        }}
        {...rest}
      >
        <span className="cinna-switch__handle" />
        {(checkedChildren || unCheckedChildren) && (
          <span className="cinna-switch__label">
            {isChecked ? checkedChildren : unCheckedChildren}
          </span>
        )}
      </button>
    );
  },
);

Switch.displayName = 'Switch';
