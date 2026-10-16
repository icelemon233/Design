import React, { useEffect, useRef, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { ButtonRippleEffect } from '../button/ripple';
import { renderButtonRipples, useButtonRipple } from '../button/ripple';
import { Icon } from '../icon';
import { clampNumber, normalizePopupCssValue } from '../shared';
import type {
  PaginationButtonProps,
  PaginationItemType,
  PaginationProps,
  PaginationToken,
} from './types';
export type {
  PaginationAlign,
  PaginationItemType,
  PaginationProps,
  PaginationSimple,
  PaginationSize,
} from './types';

const paginationButtonRippleEffects: ButtonRippleEffect[] = ['inner'];

const PaginationButton = ({
  className,
  children,
  disabled,
  onMouseDown,
  ...rest
}: PaginationButtonProps) => {
  const { activeRippleEffects, ripples, triggerButtonRipple } = useButtonRipple({
    enabled: true,
    disabled,
    effects: paginationButtonRippleEffects,
  });

  return (
    <button
      className={cx('cinna-pagination__item', className)}
      disabled={disabled}
      onMouseDown={(event) => {
        triggerButtonRipple(event);
        onMouseDown?.(event);
      }}
      {...rest}
    >
      <span className="cinna-pagination__item-content">{children}</span>
      {renderButtonRipples(ripples, activeRippleEffects)}
    </button>
  );
};

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      current,
      defaultCurrent = 1,
      total = 0,
      pageSize,
      defaultPageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      onChange,
      onShowSizeChange,
      simple,
      size = 'medium',
      responsive = false,
      align = 'start',
      disabled: disabledProp = false,
      hideOnSinglePage = false,
      showLessItems = false,
      showAllPages = false,
      showQuickJumper = false,
      showSizeChanger,
      totalBoundaryShowSizeChanger = 50,
      showTitle = true,
      prevIcon = <Icon name="chevron-left" size={13} />,
      nextIcon = <Icon name="chevron-right" size={13} />,
      itemRender,
      showTotal,
      pageFontSize,
      pageFontWeight,
      pageColor,
      pageBorderColor,
      pageBorderWidth,
      pageBorderStyle,
      pageRadius,
      activePageColor,
      activePageBackgroundColor,
      activePageBorderColor,
      activePageUnderline,
      activePageUnderlineColor,
      activePageUnderlineWidth,
      activePageUnderlineHeight,
      activePageUnderlineRadius,
      activePageUnderlineBottom,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState(defaultCurrent);
    const [innerPageSize, setInnerPageSize] = useState(defaultPageSize);
    const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
    const sizeChangerRef = useRef<HTMLSpanElement | null>(null);
    const activePageSize = Math.max(1, pageSize ?? innerPageSize);
    const pages = Math.max(1, Math.ceil(total / activePageSize));
    const active = clampNumber(current ?? inner, 1, pages);
    const [quickJumpValue, setQuickJumpValue] = useState(String(active));
    const pageList = buildPaginationPageList(active, pages, showLessItems, showAllPages);
    const shouldShowSizeChanger = showSizeChanger ?? total > totalBoundaryShowSizeChanger;
    const simpleReadOnly = typeof simple === 'object' && simple.readOnly;
    const jumperConfig = typeof showQuickJumper === 'object' ? showQuickJumper : {};

    useEffect(() => {
      setQuickJumpValue(String(active));
    }, [active]);

    useEffect(() => {
      if (!sizeMenuOpen) return;

      const closeSizeMenu = (event: PointerEvent | KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
        if (event.type === 'pointerdown' && sizeChangerRef.current?.contains(event.target as Node))
          return;
        setSizeMenuOpen(false);
      };

      document.addEventListener('pointerdown', closeSizeMenu, true);
      document.addEventListener('keydown', closeSizeMenu);

      return () => {
        document.removeEventListener('pointerdown', closeSizeMenu, true);
        document.removeEventListener('keydown', closeSizeMenu);
      };
    }, [sizeMenuOpen]);

    useEffect(() => {
      if (disabled) setSizeMenuOpen(false);
    }, [disabled]);

    if (hideOnSinglePage && pages <= 1) return null;

    const setPage = (page: number, nextPageSize = activePageSize) => {
      if (disabled) return;
      const next = clampNumber(page, 1, pages);
      setInner(next);
      onChange?.(next, nextPageSize);
    };
    const changePageSize = (nextPageSize: number) => {
      if (disabled) return;
      const nextPages = Math.max(1, Math.ceil(total / nextPageSize));
      const nextPage = clampNumber(active, 1, nextPages);
      if (pageSize === undefined) setInnerPageSize(nextPageSize);
      setInner(nextPage);
      setSizeMenuOpen(false);
      onShowSizeChange?.(nextPage, nextPageSize);
      onChange?.(nextPage, nextPageSize);
    };
    const jumpToInputPage = () => {
      const next = Number.parseInt(quickJumpValue, 10);
      if (Number.isFinite(next)) setPage(next);
      else setQuickJumpValue(String(active));
    };
    const range: [number, number] =
      total === 0
        ? [0, 0]
        : [
            Math.min(total, (active - 1) * activePageSize + 1),
            Math.min(total, active * activePageSize),
          ];
    const paginationStyle = {
      ...(pageFontSize !== undefined
        ? { '--cinna-pagination-font-size': normalizePopupCssValue(pageFontSize) }
        : null),
      ...(pageFontWeight !== undefined
        ? { '--cinna-pagination-font-weight': pageFontWeight }
        : null),
      ...(pageColor ? { '--cinna-pagination-color': pageColor } : null),
      ...(pageBorderColor ? { '--cinna-pagination-border-color': pageBorderColor } : null),
      ...(pageBorderWidth !== undefined
        ? { '--cinna-pagination-border-width': normalizePopupCssValue(pageBorderWidth) }
        : null),
      ...(pageBorderStyle ? { '--cinna-pagination-border-style': pageBorderStyle } : null),
      ...(pageRadius !== undefined
        ? { '--cinna-pagination-radius': normalizePopupCssValue(pageRadius) }
        : null),
      ...(activePageColor ? { '--cinna-pagination-active-color': activePageColor } : null),
      ...(activePageBackgroundColor
        ? { '--cinna-pagination-active-bg': activePageBackgroundColor }
        : null),
      ...(activePageBorderColor
        ? { '--cinna-pagination-active-border': activePageBorderColor }
        : null),
      ...(activePageUnderlineColor
        ? { '--cinna-pagination-active-underline-color': activePageUnderlineColor }
        : null),
      ...(activePageUnderlineWidth !== undefined
        ? {
            '--cinna-pagination-active-underline-width':
              normalizePopupCssValue(activePageUnderlineWidth),
          }
        : null),
      ...(activePageUnderlineHeight !== undefined
        ? {
            '--cinna-pagination-active-underline-height':
              normalizePopupCssValue(activePageUnderlineHeight),
          }
        : null),
      ...(activePageUnderlineRadius !== undefined
        ? {
            '--cinna-pagination-active-underline-radius':
              normalizePopupCssValue(activePageUnderlineRadius),
          }
        : null),
      ...(activePageUnderlineBottom !== undefined
        ? {
            '--cinna-pagination-active-underline-bottom':
              normalizePopupCssValue(activePageUnderlineBottom),
          }
        : null),
      ...style,
    } as React.CSSProperties;
    const renderItemContent = (
      page: number,
      type: PaginationItemType,
      originalElement: React.ReactNode,
    ) => itemRender?.(page, type, originalElement) ?? originalElement;

    return (
      <div
        ref={ref}
        className={cx(
          'cinna-pagination',
          `cinna-pagination--${size}`,
          `cinna-pagination--align-${align}`,
          responsive && 'cinna-pagination--responsive',
          disabled && 'cinna-pagination--disabled',
          simple && 'cinna-pagination--simple',
          activePageUnderline === false && 'cinna-pagination--no-active-underline',
          className,
        )}
        style={paginationStyle}
        aria-disabled={disabled || undefined}
        {...rest}
      >
        {showTotal && <span className="cinna-pagination__total">{showTotal(total, range)}</span>}
        <div className="cinna-pagination__list" role="navigation" aria-label="Pagination">
          <PaginationButton
            type="button"
            className="cinna-pagination__nav"
            disabled={disabled || active <= 1}
            title={showTitle ? 'Previous page' : undefined}
            aria-label="Previous page"
            onClick={() => setPage(active - 1)}
          >
            {renderItemContent(Math.max(1, active - 1), 'prev', prevIcon)}
          </PaginationButton>
          {simple ? (
            <span className="cinna-pagination__simple-control">
              {simpleReadOnly ? (
                <span className="cinna-pagination__simple-current">{active}</span>
              ) : (
                <input
                  value={quickJumpValue}
                  disabled={disabled}
                  inputMode="numeric"
                  aria-label="Current page"
                  onChange={(event) => setQuickJumpValue(event.currentTarget.value)}
                  onBlur={jumpToInputPage}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') jumpToInputPage();
                  }}
                />
              )}
              <span>/ {pages}</span>
            </span>
          ) : (
            pageList.map((token, index) => {
              if (token === 'jump-prev' || token === 'jump-next') {
                const target =
                  token === 'jump-prev' ? Math.max(1, active - 5) : Math.min(pages, active + 5);
                const type = token;
                return (
                  <PaginationButton
                    key={`${token}-${index}`}
                    type="button"
                    className="cinna-pagination__jump"
                    disabled={disabled}
                    title={
                      showTitle
                        ? token === 'jump-prev'
                          ? 'Jump backward'
                          : 'Jump forward'
                        : undefined
                    }
                    aria-label={token === 'jump-prev' ? 'Jump backward' : 'Jump forward'}
                    onClick={() => setPage(target)}
                  >
                    {renderItemContent(target, type, '•••')}
                  </PaginationButton>
                );
              }

              return (
                <PaginationButton
                  key={token}
                  type="button"
                  className={cx(
                    'cinna-pagination__page',
                    token === active && 'cinna-pagination__page--active',
                  )}
                  disabled={disabled}
                  title={showTitle ? `${token}` : undefined}
                  aria-current={token === active ? 'page' : undefined}
                  onClick={() => setPage(token)}
                >
                  {renderItemContent(token, 'page', token)}
                </PaginationButton>
              );
            })
          )}
          <PaginationButton
            type="button"
            className="cinna-pagination__nav"
            disabled={disabled || active >= pages}
            title={showTitle ? 'Next page' : undefined}
            aria-label="Next page"
            onClick={() => setPage(active + 1)}
          >
            {renderItemContent(Math.min(pages, active + 1), 'next', nextIcon)}
          </PaginationButton>
        </div>
        {shouldShowSizeChanger && (
          <span
            ref={sizeChangerRef}
            className={cx(
              'cinna-pagination__size-wrap',
              sizeMenuOpen && 'cinna-pagination__size-wrap--open',
            )}
          >
            <button
              type="button"
              className="cinna-pagination__size-changer"
              disabled={disabled}
              aria-label="Page size"
              aria-haspopup="listbox"
              aria-expanded={sizeMenuOpen}
              onClick={() => setSizeMenuOpen((open) => !open)}
            >
              <span>{activePageSize} / page</span>
              <Icon name="chevron-down" size={12} />
            </button>
            {sizeMenuOpen && (
              <span
                className="cinna-pagination__size-menu"
                role="listbox"
                aria-label="Page size options"
              >
                {pageSizeOptions.map((option) => {
                  const selected = option === activePageSize;
                  return (
                    <button
                      key={option}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      className={cx(
                        'cinna-pagination__size-option',
                        selected && 'cinna-pagination__size-option--selected',
                      )}
                      onClick={() => changePageSize(option)}
                    >
                      <span className="cinna-pagination__size-check" aria-hidden="true">
                        {selected ? '✓' : ''}
                      </span>
                      <span>{option} / page</span>
                    </button>
                  );
                })}
              </span>
            )}
          </span>
        )}
        {showQuickJumper && !simple && (
          <span className="cinna-pagination__jumper">
            <span>Go to</span>
            <input
              value={quickJumpValue}
              disabled={disabled}
              inputMode="numeric"
              aria-label="Jump to page"
              onChange={(event) => setQuickJumpValue(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') jumpToInputPage();
              }}
            />
            {jumperConfig.goButton !== undefined ? (
              <PaginationButton type="button" disabled={disabled} onClick={jumpToInputPage}>
                {jumperConfig.goButton}
              </PaginationButton>
            ) : (
              <span>page</span>
            )}
          </span>
        )}
      </div>
    );
  },
);

Pagination.displayName = 'Pagination';

function buildPaginationPageList(
  current: number,
  pages: number,
  showLessItems: boolean,
  showAllPages: boolean,
): PaginationToken[] {
  if (pages <= 0) return [];
  if (showAllPages) return Array.from({ length: pages }, (_, index) => index + 1);

  const siblingCount = showLessItems ? 0 : 1;
  const compactLimit = showLessItems ? 5 : 7;
  if (pages <= compactLimit) return Array.from({ length: pages }, (_, index) => index + 1);

  const edgeWindow = 3 + siblingCount;
  let left = Math.max(2, current - siblingCount);
  let right = Math.min(pages - 1, current + siblingCount);

  if (current <= edgeWindow) {
    left = 2;
    right = Math.min(pages - 1, edgeWindow + siblingCount);
  } else if (current >= pages - edgeWindow + 1) {
    left = Math.max(2, pages - edgeWindow - siblingCount + 1);
    right = pages - 1;
  }

  const result: PaginationToken[] = [1];
  if (left > 2) {
    result.push('jump-prev');
  } else {
    for (let page = 2; page < left; page += 1) result.push(page);
  }

  for (let page = left; page <= right; page += 1) result.push(page);

  if (right < pages - 1) {
    result.push('jump-next');
  } else {
    for (let page = right + 1; page < pages; page += 1) result.push(page);
  }

  result.push(pages);
  return result;
}
