import React, { useId, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { RadioGroupProps, RadioProps } from './types';
export type { RadioGroupOption, RadioGroupProps, RadioProps } from './types';

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...rest }, ref) => (
    <label className={cx('cinna-radio', className)}>
      <input ref={ref} type="radio" {...rest} />
      <span className="cinna-radio__dot" aria-hidden="true" />
      {label && <span className="cinna-radio__label">{label}</span>}
    </label>
  ),
);

Radio.displayName = 'Radio';

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      options,
      value,
      defaultValue,
      name,
      onChange,
      direction = 'horizontal',
      optionType = 'default',
      size = 'medium',
      disabled: disabledProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const generatedName = useId();
    const [inner, setInner] = useState(defaultValue);
    const selected = value ?? inner;
    const groupName = name ?? generatedName;

    return (
      <div
        ref={ref}
        role="radiogroup"
        aria-disabled={disabled || undefined}
        className={cx(
          'cinna-radio-group',
          `cinna-radio-group--${direction}`,
          `cinna-radio-group--${optionType}`,
          `cinna-radio-group--${size}`,
          className,
        )}
        {...rest}
      >
        {options.map((option) => (
          <Radio
            key={option.value}
            name={groupName}
            value={option.value}
            checked={selected === option.value}
            disabled={disabled || option.disabled}
            label={option.label}
            onChange={() => {
              setInner(option.value);
              onChange?.(option.value);
            }}
          />
        ))}
      </div>
    );
  },
);

RadioGroup.displayName = 'RadioGroup';
