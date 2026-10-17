import React, { useId, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { useTabsLayout } from './useTabsLayout';
import { useTabReorder } from './useTabReorder';
import type { TabsItem, TabsProps } from './types';
export type { TabsItem, TabsPosition, TabsProps, TabsVariant } from './types';

const cssLength = (value: number | string) => (typeof value === 'number' ? value + 'px' : value);

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeKey,
      defaultActiveKey,
      onChange,
      tabPosition = 'top',
      variant = 'borderless',
      size = 'medium',
      addable = false,
      addIcon = <Icon name="plus" size={18} />,
      closeIcon = <Icon name="close-blue" size={12} />,
      closable = false,
      disabled: disabledProp,
      draggable = false,
      onAdd,
      onClose,
      onOrderChange,
      tabFontSize,
      tabFontWeight,
      tabColor,
      activeTabColor,
      tabBackgroundColor,
      activeTabBackgroundColor,
      tabBorderColor,
      activeTabBorderColor,
      tabRadius,
      listBackgroundColor,
      panelColor,
      panelFontSize,
      panelBackgroundColor,
      panelBorderColor,
      destroyInactiveTabPanel = true,
      emptyContent = null,
      className,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    const id = useId();
    const disabled = useDisabled(disabledProp);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const previousItems = useRef(items);
    const pendingFocus = useRef<{ removed: string; next?: string; origin: HTMLElement } | null>(
      null,
    );
    const [inner, setInner] = useState(defaultActiveKey);
    const enabled = items.filter((item) => !item.disabled);
    const candidate = activeKey !== undefined ? activeKey : inner;
    const previousIndex = previousItems.current.findIndex((item) => item.key === candidate);
    const fallback =
      items.slice(Math.max(0, previousIndex)).find((item) => !item.disabled) ??
      [...items.slice(0, Math.max(0, previousIndex))].reverse().find((item) => !item.disabled) ??
      enabled[0];
    const selected = enabled.some((item) => item.key === candidate) ? candidate : fallback?.key;
    const vertical = tabPosition === 'left' || tabPosition === 'right';
    const canAdd = addable;
    const canClose = (item: TabsItem) => item.closable ?? closable;
    const reorderable = draggable && !!onOrderChange && !disabled;
    const layout = useTabsLayout({
      items,
      selected,
      variant,
      size,
      tabPosition,
      closable,
      addable,
    });
    const {
      navRef,
      viewportRef,
      listRef,
      addRef,
      buttons,
      wrappers,
      pill,
      closePositions,
      scrollState,
      updateScroll,
      scrollTabs,
      reveal,
    } = layout;
    const reorder = useTabReorder({
      items,
      enabled: reorderable,
      vertical,
      onOrderChange,
      wrappers,
      buttons,
      viewportRef,
      reveal,
    });

    useLayoutEffect(() => {
      previousItems.current = items;
      if (activeKey === undefined && inner !== selected) setInner(selected);
      const pending = pendingFocus.current;
      if (pending && !items.some((item) => item.key === pending.removed)) {
        if (
          document.activeElement === pending.origin ||
          (document.activeElement === document.body && !pending.origin.isConnected)
        ) {
          (
            buttons.current.get(pending.next ?? selected ?? '') ??
            addRef.current ??
            rootRef.current
          )?.focus();
        }
        pendingFocus.current = null;
      }
    }, [items, activeKey, inner, selected]);

    const select = (item: TabsItem) => {
      if (disabled || item.disabled || item.key === selected) return;
      if (activeKey === undefined) setInner(item.key);
      onChange?.(item.key);
    };
    const close = (
      item: TabsItem,
      event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      if (disabled || item.disabled || !canClose(item) || !onClose) return;
      const index = enabled.findIndex((entry) => entry.key === item.key);
      const next =
        item.key === selected ? (enabled[index + 1]?.key ?? enabled[index - 1]?.key) : selected;
      pendingFocus.current = { removed: item.key, next, origin: event.currentTarget };
      onClose?.(item.key, item, event);
    };
    const keyDown = (event: React.KeyboardEvent<HTMLButtonElement>, item: TabsItem) => {
      if (disabled || item.disabled) return;
      const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
      const previousKey = vertical ? 'ArrowUp' : 'ArrowLeft';
      const index = enabled.findIndex((entry) => entry.key === item.key);
      if (event.altKey && reorderable && (event.key === nextKey || event.key === previousKey)) {
        event.preventDefault();
        const next = enabled[index + (event.key === nextKey ? 1 : -1)];
        if (next) reorder.reorder(item.key, next.key);
        return;
      }
      if (event.key === 'Delete' && canClose(item) && onClose) {
        event.preventDefault();
        close(item, event);
        return;
      }
      const nextIndex =
        event.key === 'Home'
          ? 0
          : event.key === 'End'
            ? enabled.length - 1
            : event.key === nextKey
              ? (index + 1) % enabled.length
              : event.key === previousKey
                ? (index - 1 + enabled.length) % enabled.length
                : -1;
      if (nextIndex >= 0 && enabled[nextIndex]) {
        event.preventDefault();
        select(enabled[nextIndex]);
        buttons.current.get(enabled[nextIndex].key)?.focus({ preventScroll: true });
        reveal(enabled[nextIndex].key);
      }
    };
    const styles: React.CSSProperties = { ...style };
    const variables: Record<string, string | number | undefined> = {
      '--cinna-tabs-tab-font-size': tabFontSize === undefined ? undefined : cssLength(tabFontSize),
      '--cinna-tabs-tab-font-weight': tabFontWeight,
      '--cinna-tabs-tab-color': tabColor,
      '--cinna-tabs-active-color': activeTabColor,
      '--cinna-tabs-tab-bg': tabBackgroundColor,
      '--cinna-tabs-active-bg': activeTabBackgroundColor,
      '--cinna-tabs-tab-border': tabBorderColor,
      '--cinna-tabs-active-border': activeTabBorderColor,
      '--cinna-tabs-tab-radius': tabRadius === undefined ? undefined : cssLength(tabRadius),
      '--cinna-tabs-list-bg': listBackgroundColor,
      '--cinna-tabs-panel-color': panelColor,
      '--cinna-tabs-panel-font-size':
        panelFontSize === undefined ? undefined : cssLength(panelFontSize),
      '--cinna-tabs-panel-bg': panelBackgroundColor,
      '--cinna-tabs-panel-border': panelBorderColor,
    };
    for (const [name, value] of Object.entries(variables)) {
      if (value !== undefined) (styles as Record<string, string | number>)[name] = value;
    }
    Object.assign(styles, style);
    return (
      <div
        {...rest}
        ref={(node) => {
          rootRef.current = node;
          if (typeof forwardedRef === 'function') forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        className={cx(
          'cinna-tabs',
          'cinna-tabs--' + variant,
          'cinna-tabs--' + tabPosition,
          'cinna-tabs--' + size,
          draggable && 'cinna-tabs--draggable',
          className,
        )}
        style={styles}
        aria-disabled={disabled || undefined}
        tabIndex={rest.tabIndex ?? (items.length ? undefined : -1)}
      >
        <div ref={navRef} className="cinna-tabs__nav">
          {scrollState.overflow && (
            <button
              type="button"
              className="cinna-tabs__scroll"
              aria-label="Scroll tabs backward"
              disabled={disabled || !scrollState.backward}
              onClick={() => scrollTabs(false)}
            >
              <Icon name={vertical ? 'chevron-up' : 'chevron-left'} size={14} />
            </button>
          )}
          <div ref={viewportRef} className="cinna-tabs__viewport" onScroll={updateScroll}>
            <div className="cinna-tabs__track">
              <div
                ref={listRef}
                className="cinna-tabs__list"
                role={items.length ? 'tablist' : undefined}
                aria-label={items.length ? (rest['aria-label'] ?? 'Tabs') : undefined}
                aria-orientation={items.length ? (vertical ? 'vertical' : 'horizontal') : undefined}
              >
                {variant === 'borderless' && selected && (
                  <span className="cinna-tabs__active-pill" style={pill} aria-hidden="true" />
                )}
                {items.map((item, index) => (
                  <div
                    key={item.key}
                    role="presentation"
                    data-tab-key={item.key}
                    ref={(node) => {
                      if (node) wrappers.current.set(item.key, node);
                      else wrappers.current.delete(item.key);
                    }}
                    {...reorder.itemHandlers(item.key)}
                    className={cx(
                      'cinna-tabs__item',
                      canClose(item) && 'cinna-tabs__item--closable',
                      item.key === selected && 'cinna-tabs__item--active',
                      (disabled || item.disabled) && 'cinna-tabs__item--disabled',
                      reorder.dragKey === item.key && 'cinna-tabs__item--dragging',
                      reorder.dragOver === item.key &&
                        reorder.dragKey !== item.key &&
                        'cinna-tabs__item--drop',
                      item.className,
                    )}
                    style={item.style}
                  >
                    <button
                      type="button"
                      role="tab"
                      className="cinna-tabs__tab"
                      ref={(node) => {
                        if (node) buttons.current.set(item.key, node);
                        else buttons.current.delete(item.key);
                      }}
                      id={id + '-tab-' + index}
                      aria-controls={id + '-panel-' + index}
                      aria-selected={item.key === selected}
                      disabled={disabled || item.disabled}
                      tabIndex={!disabled && !item.disabled && item.key === selected ? 0 : -1}
                      aria-keyshortcuts={
                        reorderable
                          ? vertical
                            ? 'Alt+ArrowUp Alt+ArrowDown'
                            : 'Alt+ArrowLeft Alt+ArrowRight'
                          : undefined
                      }
                      onKeyDown={(event) => keyDown(event, item)}
                      onClick={() => {
                        if (!reorder.consumeClick()) select(item);
                      }}
                    >
                      {reorderable && (
                        <span
                          className="cinna-tabs__grip"
                          aria-hidden="true"
                          {...reorder.gripHandlers(item.key)}
                        >
                          <Icon name="grip" size={12} />
                        </span>
                      )}
                      {item.icon && (
                        <span className="cinna-tabs__icon" aria-hidden="true">
                          {item.icon}
                        </span>
                      )}
                      <span className="cinna-tabs__label">{item.label}</span>
                    </button>
                  </div>
                ))}
              </div>
              <div className="cinna-tabs__edits">
                {items.filter(canClose).map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="cinna-tabs__close"
                    style={closePositions[item.key]}
                    aria-label={
                      typeof item.label === 'string' ? 'Close ' + item.label : 'Close tab'
                    }
                    tabIndex={item.key === selected ? 0 : -1}
                    disabled={disabled || item.disabled || !onClose}
                    onClick={(event) => close(item, event)}
                  >
                    {item.closeIcon ?? closeIcon}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {scrollState.overflow && (
            <button
              type="button"
              className="cinna-tabs__scroll"
              aria-label="Scroll tabs forward"
              disabled={disabled || !scrollState.forward}
              onClick={() => scrollTabs(true)}
            >
              <Icon name={vertical ? 'chevron-down' : 'chevron-right'} size={14} />
            </button>
          )}
          {canAdd && (
            <button
              ref={addRef}
              type="button"
              className="cinna-tabs__add"
              aria-label="Add tab"
              disabled={disabled || !onAdd}
              onClick={onAdd}
            >
              {addIcon}
            </button>
          )}
        </div>
        {!selected && emptyContent && (
          <div className="cinna-tabs__empty" role="status">
            {emptyContent}
          </div>
        )}
        {items.map((item, index) => (
          <div
            key={item.key}
            id={id + '-panel-' + index}
            role="tabpanel"
            aria-labelledby={id + '-tab-' + index}
            tabIndex={0}
            hidden={item.key !== selected}
            className="cinna-tabs__panel"
          >
            {(!destroyInactiveTabPanel || item.key === selected) && item.children}
          </div>
        ))}
      </div>
    );
  },
);
Tabs.displayName = 'Tabs';
