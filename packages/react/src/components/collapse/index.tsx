import React, { useId } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { cx } from '../../utils/cx';
import { toArray } from '../shared';
import type { CollapseProps } from './types';
export type { CollapseItem, CollapseProps } from './types';

export const Collapse = React.forwardRef<HTMLDivElement, CollapseProps>(
  (
    {
      items,
      activeKey,
      defaultActiveKey,
      accordion,
      bordered = true,
      onChange,
      destroyInactivePanel = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const [keys, setKeys] = useControllable(
      activeKey === undefined ? undefined : toArray(activeKey),
      toArray(defaultActiveKey),
      onChange,
    );
    const active = accordion ? keys.slice(0, 1) : keys;
    const toggle = (key: string) =>
      setKeys(
        active.includes(key)
          ? active.filter((item) => item !== key)
          : accordion
            ? [key]
            : [...active, key],
      );
    return (
      <div
        {...rest}
        ref={ref}
        className={cx('cinna-collapse', !bordered && 'cinna-collapse--borderless', className)}
      >
        {items.map((item) => (
          <div
            key={item.key}
            className={cx(
              'cinna-collapse__item',
              item.disabled && 'cinna-collapse__item--disabled',
            )}
          >
            <div className="cinna-collapse__header">
              <button
                id={id + '-header-' + item.key}
                type="button"
                disabled={item.disabled}
                aria-expanded={active.includes(item.key)}
                aria-controls={id + '-panel-' + item.key}
                onClick={() => toggle(item.key)}
              >
                <span>{item.label}</span>
                <span aria-hidden="true">{active.includes(item.key) ? '−' : '+'}</span>
              </button>
              {item.extra && <span className="cinna-collapse__extra">{item.extra}</span>}
            </div>
            {(!destroyInactivePanel || active.includes(item.key)) && (
              <div
                id={id + '-panel-' + item.key}
                className="cinna-collapse__body"
                role="region"
                aria-labelledby={id + '-header-' + item.key}
                hidden={!active.includes(item.key)}
              >
                {item.children}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  },
);

Collapse.displayName = 'Collapse';
