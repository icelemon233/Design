import { cx } from '../../utils/cx';
import type { ListProps } from './types';
export type { ListProps } from './types';

export function List<T = unknown>({
  dataSource,
  renderItem,
  header,
  footer,
  bordered = true,
  itemLayout = 'horizontal',
  rowKey,
  emptyText = 'No data',
  loading,
  loadMore,
  className,
  ...rest
}: ListProps<T>) {
  return (
    <div
      aria-busy={loading || undefined}
      className={cx(
        'cinna-list',
        `cinna-list--${itemLayout}`,
        !bordered && 'cinna-list--borderless',
        className,
      )}
      {...rest}
    >
      {header && <div className="cinna-list__header">{header}</div>}
      {!loading && !dataSource.length && <div className="cinna-list__empty">{emptyText}</div>}
      {dataSource.map((item, index) => (
        <div key={rowKey?.(item, index) ?? index} className="cinna-list__item">
          {renderItem(item, index)}
        </div>
      ))}
      {loading && (
        <div role="status" className="cinna-list__empty">
          Loading…
        </div>
      )}
      {loadMore}
      {footer && <div className="cinna-list__footer">{footer}</div>}
    </div>
  );
}
