import React, { useId, useRef, useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Icon } from '../icon';
import type { TransferLocale, TransferProps } from './types';
export type { TransferItem, TransferLocale, TransferProps } from './types';

const english: TransferLocale = {
  sourceTitle: 'Source',
  targetTitle: 'Target',
  selectAll: 'Select all',
  searchPlaceholder: 'Search items',
  empty: 'No items',
  noResults: 'No matching items',
  moveToTarget: 'Move selected to target',
  moveToSource: 'Move selected to source',
};

export const Transfer = React.forwardRef<HTMLDivElement, TransferProps>(
  (
    {
      dataSource,
      targetKeys,
      defaultTargetKeys = [],
      onChange,
      titles,
      showSearch = false,
      disabled: disabledProp,
      selectedKeys,
      defaultSelectedKeys = [],
      onSelectChange,
      locale: localeProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const disabled = useDisabled(disabledProp);
    const locale = { ...english };
    for (const key of Object.keys(english) as (keyof TransferLocale)[]) {
      locale[key] = localeProp?.[key] ?? english[key];
    }
    const labels = titles ?? [locale.sourceTitle, locale.targetTitle];
    const [targets, setTargets] = useControllable(targetKeys, defaultTargetKeys);
    const [innerSelected, setInnerSelected] = useState(defaultSelectedKeys);
    const [queries, setQueries] = useState<[string, string]>(['', '']);
    const sections = useRef<Array<HTMLElement | null>>([]);
    const keys = new Set(dataSource.map((item) => item.key));
    const targetSet = new Set(targets);
    const selected = [...new Set(selectedKeys ?? innerSelected)].filter((key) => keys.has(key));
    const selectedSet = new Set(selected);
    const lists = [false, true].map((target) =>
      dataSource.filter((item) => targetSet.has(item.key) === target),
    );
    const eligible = lists.map((items) =>
      items.filter((item) => !item.disabled && selectedSet.has(item.key)),
    );

    const setSelection = (next: string[], nextTargets = targets) => {
      const unique = [...new Set(next)].filter((key) => keys.has(key));
      if (selectedKeys === undefined) setInnerSelected(unique);
      const targetKeysSet = new Set(nextTargets);
      onSelectChange?.(
        unique.filter((key) => !targetKeysSet.has(key)),
        unique.filter((key) => targetKeysSet.has(key)),
      );
    };
    const move = (toTarget: boolean, keyboard: boolean) => {
      if (disabled) return;
      const moving = eligible[toTarget ? 0 : 1].map((item) => item.key);
      if (!moving.length) return;
      const movingSet = new Set(moving);
      const next = toTarget
        ? [...new Set([...targets, ...moving])]
        : targets.filter((key) => !movingSet.has(key));
      setTargets(next);
      onChange?.(next, toTarget ? 'toTarget' : 'toSource', moving);
      setSelection(
        selected.filter((key) => !movingSet.has(key)),
        next,
      );
      if (keyboard)
        window.requestAnimationFrame(() => {
          const section = sections.current[toTarget ? 1 : 0];
          const focusable = section?.querySelector<HTMLInputElement>('input:not(:disabled)');
          (focusable ?? section)?.focus();
        });
    };
    return (
      <div
        {...rest}
        ref={ref}
        className={cx('cinna-transfer', className)}
        aria-disabled={disabled || undefined}
      >
        <div className="cinna-transfer__layout">
          {lists.map((allItems, index) => {
            const query = queries[index].trim().toLocaleLowerCase();
            const visible =
              showSearch && query
                ? allItems.filter((item) => item.title.toLocaleLowerCase().includes(query))
                : allItems;
            const available = visible.filter((item) => !item.disabled);
            const checked = available.filter((item) => selectedSet.has(item.key));
            const selectedCount = allItems.filter((item) => selectedSet.has(item.key)).length;
            return (
              <React.Fragment key={index}>
                {index === 1 && (
                  <div className="cinna-transfer__actions">
                    {[true, false].map((toTarget) => (
                      <Button
                        key={String(toTarget)}
                        aria-label={toTarget ? locale.moveToTarget : locale.moveToSource}
                        title={toTarget ? locale.moveToTarget : locale.moveToSource}
                        disabled={disabled || !eligible[toTarget ? 0 : 1].length}
                        onClick={(event) => move(toTarget, event.detail === 0)}
                      >
                        <span
                          className="cinna-transfer__action-icon cinna-transfer__action-icon--wide"
                          aria-hidden="true"
                        >
                          <Icon
                            name={toTarget ? 'arrow-tail-right' : 'arrow-tail-left'}
                            size={22}
                          />
                        </span>
                        <span
                          className="cinna-transfer__action-icon cinna-transfer__action-icon--stacked"
                          aria-hidden="true"
                        >
                          <Icon name={toTarget ? 'arrow-tail-down' : 'arrow-tail-up'} size={22} />
                        </span>
                      </Button>
                    ))}
                  </div>
                )}
                <section
                  ref={(node) => {
                    sections.current[index] = node;
                  }}
                  className="cinna-transfer__list"
                  aria-labelledby={id + '-title-' + index}
                  tabIndex={-1}
                >
                  <div className="cinna-transfer__header">
                    <h4 id={id + '-title-' + index}>{labels[index]}</h4>
                    <span className="cinna-transfer__count" aria-live="polite">
                      {selectedCount > 0
                        ? selectedCount + ' / ' + allItems.length
                        : allItems.length}
                    </span>
                  </div>
                  <div className="cinna-transfer__tools">
                    <Checkbox
                      label={locale.selectAll}
                      disabled={disabled || !available.length}
                      checked={available.length > 0 && checked.length === available.length}
                      indeterminate={checked.length > 0 && checked.length < available.length}
                      onChange={(event) =>
                        setSelection(
                          event.target.checked
                            ? [...selected, ...available.map((item) => item.key)]
                            : selected.filter((key) => !available.some((item) => item.key === key)),
                        )
                      }
                    />
                    {showSearch && (
                      <input
                        className="cinna-transfer__search"
                        aria-label={
                          (typeof labels[index] === 'string'
                            ? labels[index]
                            : index
                              ? locale.targetTitle
                              : locale.sourceTitle) +
                          ': ' +
                          locale.searchPlaceholder
                        }
                        placeholder={locale.searchPlaceholder}
                        disabled={disabled}
                        value={queries[index]}
                        onChange={(event) =>
                          setQueries((current) =>
                            index === 0
                              ? [event.target.value, current[1]]
                              : [current[0], event.target.value],
                          )
                        }
                      />
                    )}
                  </div>
                  <div
                    className={cx(
                      'cinna-transfer__items',
                      !visible.length && 'cinna-transfer__items--empty',
                    )}
                  >
                    {!visible.length && (
                      <p className="cinna-transfer__empty">
                        {allItems.length ? locale.noResults : locale.empty}
                      </p>
                    )}
                    {visible.map((item) => (
                      <div
                        key={item.key}
                        className={cx(
                          'cinna-transfer__item',
                          selectedSet.has(item.key) && 'cinna-transfer__item--selected',
                          item.disabled && 'cinna-transfer__item--disabled',
                        )}
                      >
                        <Checkbox
                          label={item.title}
                          disabled={disabled || item.disabled}
                          checked={selectedSet.has(item.key)}
                          onChange={(event) =>
                            setSelection(
                              event.target.checked
                                ? [...selected, item.key]
                                : selected.filter((key) => key !== item.key),
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </section>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);
Transfer.displayName = 'Transfer';
