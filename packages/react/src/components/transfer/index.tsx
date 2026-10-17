import React, { useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Checkbox } from '../checkbox';
import type { TransferProps } from './types';
export type { TransferItem, TransferProps } from './types';

export const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      dataSource,
      targetKeys,
      defaultTargetKeys = [],
      onChange,
      titles = ['Source', 'Target'],
      showSearch,
      disabled: disabledProp,
      selectedKeys,
      className,
      onSelectChange,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [targets, setTargets] = useControllable(targetKeys, defaultTargetKeys, onChange);
    const [innerSelected, setInnerSelected] = useState<string[]>([]);
    const selected = selectedKeys ?? innerSelected;
    const [queries, setQueries] = useState(['', '']);
    const setSelection = (next: string[]) => {
      if (selectedKeys === undefined) setInnerSelected(next);
      onSelectChange?.(
        next.filter((key) => !targets.includes(key)),
        next.filter((key) => targets.includes(key)),
      );
    };
    const move = (keys: string[], toTarget: boolean) => {
      if (disabled) return;
      const enabled = keys.filter((key) => !dataSource.find((item) => item.key === key)?.disabled);
      setTargets(
        toTarget
          ? [...new Set([...targets, ...enabled])]
          : targets.filter((key) => !enabled.includes(key)),
      );
      setSelection(selected.filter((key) => !enabled.includes(key)));
    };
    return (
      <div
        {...rest}
        ref={ref}
        className={cx('cinna-transfer', className)}
        aria-disabled={disabled || undefined}
      >
        {[false, true].map((target, index) => {
          const items = dataSource.filter(
            (item) =>
              targets.includes(item.key) === target &&
              item.title.toLowerCase().includes(queries[index].toLowerCase()),
          );
          const available = items.filter((item) => !item.disabled);
          const checked = available.filter((item) => selected.includes(item.key));
          return (
            <section
              key={index}
              className="cinna-transfer__list"
              aria-label={target ? 'Target items' : 'Source items'}
            >
              <strong>
                {titles[index]} <small>{items.length}</small>
              </strong>
              <Checkbox
                label="Select all"
                disabled={disabled || !available.length}
                checked={available.length > 0 && checked.length === available.length}
                indeterminate={checked.length > 0 && checked.length < available.length}
                onChange={(event) =>
                  setSelection(
                    event.target.checked
                      ? [...new Set([...selected, ...available.map((item) => item.key)])]
                      : selected.filter((key) => !available.some((item) => item.key === key)),
                  )
                }
              />
              {showSearch && (
                <input
                  className="cinna-native-input cinna-transfer__search"
                  aria-label={target ? 'Search target' : 'Search source'}
                  placeholder="Search items"
                  disabled={disabled}
                  value={queries[index]}
                  onChange={(event) =>
                    setQueries((current) =>
                      current.map((query, i) => (i === index ? event.target.value : query)),
                    )
                  }
                />
              )}
              {!items.length && <span className="cinna-transfer__empty">Empty</span>}
              {items.map((item) => (
                <div className="cinna-transfer__item" key={item.key}>
                  <Checkbox
                    label={item.title}
                    disabled={disabled || item.disabled}
                    checked={selected.includes(item.key)}
                    onChange={(event) =>
                      setSelection(
                        event.target.checked
                          ? [...selected, item.key]
                          : selected.filter((key) => key !== item.key),
                      )
                    }
                  />
                  <button
                    type="button"
                    aria-label={(target ? 'Remove ' : 'Add ') + item.title}
                    disabled={disabled || item.disabled}
                    onClick={() => move([item.key], !target)}
                  >
                    {target ? '←' : '→'}
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="cinna-transfer__move"
                disabled={disabled || !checked.length}
                onClick={() =>
                  move(
                    checked.map((item) => item.key),
                    !target,
                  )
                }
              >
                {target ? 'Move selected to source' : 'Move selected to target'}
              </button>
            </section>
          );
        })}
      </div>
    );
  },
);

Transfer.displayName = 'Transfer';
