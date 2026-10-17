import React, { useEffect, useId, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { normalizePopupCssValue } from '../shared';
import type { TabsItem, TabsProps } from './types';
export type { TabsItem, TabsPosition, TabsProps, TabsType, TabsVariant } from './types';

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      activeKey,
      defaultActiveKey,
      onChange,
      tabPosition = 'top',
      type = 'line',
      variant,
      size = 'medium',
      scrollable = true,
      addable = false,
      addIcon = '+',
      closeIcon = <Icon name="close-blue" size={10} />,
      closable = false,
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
      indicatorColor,
      listBackgroundColor,
      listBorderColor,
      panelColor,
      panelFontSize,
      panelBackgroundColor,
      panelBorderColor,
      destroyInactiveTabPanel = true,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const tabId = useId();
    const firstKey = items.find((item) => !item.disabled)?.key;
    const [inner, setInner] = useState(defaultActiveKey ?? firstKey);
    const [dragKey, setDragKey] = useState<string | null>(null);
    const [dragOverKey, setDragOverKey] = useState<string | null>(null);
    const [panelMotionIndex, setPanelMotionIndex] = useState(0);
    const listRef = useRef<HTMLDivElement | null>(null);
    const tabRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activePillStyle, setActivePillStyle] = useState<React.CSSProperties>({});
    const selectedCandidate = activeKey ?? inner ?? firstKey;
    const selected = items.some((item) => item.key === selectedCandidate && !item.disabled)
      ? selectedCandidate
      : firstKey;
    const activeItem = items.find((item) => item.key === selected);
    const resolvedVariant = variant ?? (type === 'card' ? 'bordered' : 'borderless');
    const vertical = tabPosition === 'left' || tabPosition === 'right';
    const controlled = activeKey !== undefined;
    const panelMotionClass =
      resolvedVariant === 'borderless'
        ? `cinna-tabs__panel--motion-${panelMotionIndex % 2}`
        : undefined;
    const tabsStyle = {
      ...(tabFontSize !== undefined
        ? { '--cinna-tabs-tab-font-size': normalizePopupCssValue(tabFontSize) }
        : null),
      ...(tabFontWeight !== undefined ? { '--cinna-tabs-tab-font-weight': tabFontWeight } : null),
      ...(tabColor ? { '--cinna-tabs-tab-color': tabColor } : null),
      ...(activeTabColor ? { '--cinna-tabs-active-color': activeTabColor } : null),
      ...(tabBackgroundColor ? { '--cinna-tabs-tab-bg': tabBackgroundColor } : null),
      ...(activeTabBackgroundColor ? { '--cinna-tabs-active-bg': activeTabBackgroundColor } : null),
      ...(tabBorderColor ? { '--cinna-tabs-tab-border': tabBorderColor } : null),
      ...(activeTabBorderColor ? { '--cinna-tabs-active-border': activeTabBorderColor } : null),
      ...(tabRadius !== undefined
        ? { '--cinna-tabs-tab-radius': normalizePopupCssValue(tabRadius) }
        : null),
      ...(indicatorColor ? { '--cinna-tabs-indicator-color': indicatorColor } : null),
      ...(listBackgroundColor ? { '--cinna-tabs-list-bg': listBackgroundColor } : null),
      ...(listBorderColor ? { '--cinna-tabs-list-border': listBorderColor } : null),
      ...(panelColor ? { '--cinna-tabs-panel-color': panelColor } : null),
      ...(panelFontSize !== undefined
        ? { '--cinna-tabs-panel-font-size': normalizePopupCssValue(panelFontSize) }
        : null),
      ...(panelBackgroundColor ? { '--cinna-tabs-panel-bg': panelBackgroundColor } : null),
      ...(panelBorderColor ? { '--cinna-tabs-panel-border': panelBorderColor } : null),
      ...style,
    } as React.CSSProperties;

    useEffect(() => {
      if (
        !controlled &&
        selectedCandidate &&
        !items.some((item) => item.key === selectedCandidate)
      ) {
        setInner(firstKey);
      }
    }, [controlled, firstKey, items, selectedCandidate]);

    useLayoutEffect(() => {
      if (!selected) {
        setActivePillStyle({});
        return undefined;
      }

      const list = listRef.current;
      const activeTab = tabRefs.current[selected];
      if (!list || !activeTab) {
        setActivePillStyle({});
        return undefined;
      }

      let frame = 0;
      const updatePill = () => {
        window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(() => {
          const nextX = activeTab.offsetLeft;
          const nextY = activeTab.offsetTop;

          setActivePillStyle({
            '--cinna-tabs-active-opacity': '1',
            '--cinna-tabs-active-x': `${nextX}px`,
            '--cinna-tabs-active-y': `${nextY}px`,
            '--cinna-tabs-active-width': `${activeTab.offsetWidth}px`,
            '--cinna-tabs-active-height': `${activeTab.offsetHeight}px`,
          } as React.CSSProperties);
        });
      };

      updatePill();
      window.addEventListener('resize', updatePill);

      const Observer = window.ResizeObserver;
      const observer = Observer ? new Observer(updatePill) : null;
      observer?.observe(list);
      observer?.observe(activeTab);

      return () => {
        window.cancelAnimationFrame(frame);
        window.removeEventListener('resize', updatePill);
        observer?.disconnect();
      };
    }, [items, selected, size, tabPosition]);

    const selectTab = (item: TabsItem) => {
      if (item.disabled) return;
      if (item.key === selected) return;
      if (item.key !== selected) setPanelMotionIndex((index) => index + 1);
      if (!controlled) setInner(item.key);
      onChange?.(item.key);
    };

    const moveTab = (fromKey: string, toKey: string) => {
      if (fromKey === toKey) return;
      const fromIndex = items.findIndex((item) => item.key === fromKey);
      const toIndex = items.findIndex((item) => item.key === toKey);
      if (fromIndex < 0 || toIndex < 0) return;
      const nextItems = [...items];
      const [moving] = nextItems.splice(fromIndex, 1);
      nextItems.splice(toIndex, 0, moving);
      onOrderChange?.(
        nextItems.map((item) => item.key),
        nextItems,
        { fromKey, toKey },
      );
    };

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-tabs',
          `cinna-tabs--${tabPosition}`,
          `cinna-tabs--${type}`,
          `cinna-tabs--${resolvedVariant}`,
          `cinna-tabs--${size}`,
          vertical && 'cinna-tabs--vertical',
          scrollable && 'cinna-tabs--scrollable',
          (addable || onAdd) && 'cinna-tabs--addable',
          draggable && 'cinna-tabs--draggable',
          className,
        )}
        style={tabsStyle}
        {...rest}
      >
        <div ref={listRef} className="cinna-tabs__list">
          <div
            className="cinna-tabs__semantic-list"
            role="tablist"
            aria-label={rest['aria-label'] ?? 'Tabs'}
            aria-orientation={vertical ? 'vertical' : 'horizontal'}
            aria-owns={items.map((item) => tabId + '-tab-' + item.key).join(' ')}
          />
          <span className="cinna-tabs__active-pill" aria-hidden="true" style={activePillStyle} />
          {items.map((item) => (
            <div
              key={item.key}
              ref={(node) => {
                tabRefs.current[item.key] = node;
              }}
              draggable={draggable && !item.disabled}
              className={cx(
                'cinna-tabs__tab',
                selected === item.key && 'cinna-tabs__tab--active',
                item.disabled && 'cinna-tabs__tab--disabled',
                dragKey === item.key && 'cinna-tabs__tab--dragging',
                dragOverKey === item.key && dragKey !== item.key && 'cinna-tabs__tab--drag-over',
                item.className,
              )}
              style={item.style}
              onClick={() => {
                selectTab(item);
              }}
              onKeyDown={(event) => {
                if ((event.target as HTMLElement).getAttribute('role') !== 'tab') return;
                const enabled = items.filter((tab) => !tab.disabled);
                const index = enabled.findIndex((tab) => tab.key === item.key);
                const nextKey = vertical ? 'ArrowDown' : 'ArrowRight';
                const prevKey = vertical ? 'ArrowUp' : 'ArrowLeft';
                let nextIndex =
                  event.key === 'Home'
                    ? 0
                    : event.key === 'End'
                      ? enabled.length - 1
                      : event.key === nextKey
                        ? (index + 1) % enabled.length
                        : event.key === prevKey
                          ? (index - 1 + enabled.length) % enabled.length
                          : -1;
                if (nextIndex >= 0 && enabled[nextIndex]) {
                  event.preventDefault();
                  selectTab(enabled[nextIndex]);
                  tabRefs.current[enabled[nextIndex].key]
                    ?.querySelector<HTMLButtonElement>('[role="tab"]')
                    ?.focus();
                  tabRefs.current[enabled[nextIndex].key]?.scrollIntoView?.({
                    block: 'nearest',
                    inline: 'nearest',
                  });
                }
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  selectTab(item);
                }
              }}
              onDragStart={(event) => {
                if (!draggable || item.disabled) return;
                setDragKey(item.key);
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', item.key);
              }}
              onDragOver={(event) => {
                if (!draggable || !dragKey || dragKey === item.key) return;
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
                setDragOverKey(item.key);
              }}
              onDrop={(event) => {
                if (!draggable || !dragKey) return;
                event.preventDefault();
                moveTab(dragKey, item.key);
                setDragKey(null);
                setDragOverKey(null);
              }}
              onDragEnd={() => {
                setDragKey(null);
                setDragOverKey(null);
              }}
            >
              <button
                type="button"
                className="cinna-tabs__target"
                role="tab"
                id={tabId + '-tab-' + item.key}
                aria-controls={tabId + '-panel-' + item.key}
                aria-selected={selected === item.key}
                disabled={item.disabled}
                aria-disabled={item.disabled || undefined}
                tabIndex={item.disabled ? -1 : selected === item.key ? 0 : -1}
              >
                {item.icon && (
                  <span className="cinna-tabs__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                )}
                <span className="cinna-tabs__label">{item.label}</span>
              </button>
              {(closable || item.closable) && (
                <button
                  type="button"
                  className="cinna-tabs__close"
                  aria-label={typeof item.label === 'string' ? `Close ${item.label}` : 'Close tab'}
                  disabled={item.disabled}
                  onClick={(event) => {
                    event.stopPropagation();
                    onClose?.(item.key, item, event);
                  }}
                >
                  {item.closeIcon ?? closeIcon}
                </button>
              )}
            </div>
          ))}
          {(addable || onAdd) && (
            <button type="button" className="cinna-tabs__add" aria-label="Add tab" onClick={onAdd}>
              {addIcon}
            </button>
          )}
        </div>
        {items.map((item) => (
          <div
            key={item.key}
            id={`${tabId}-panel-${item.key}`}
            aria-labelledby={`${tabId}-tab-${item.key}`}
            hidden={item.key !== selected}
            className={cx('cinna-tabs__panel', item.key === selected && panelMotionClass)}
            role="tabpanel"
            tabIndex={0}
          >
            {(!destroyInactiveTabPanel || item.key === selected) && item.children}
          </div>
        ))}
      </div>
    );
  },
);

Tabs.displayName = 'Tabs';
