import React, { useMemo, useState } from 'react';
import { cx } from '../../utils/cx';
import { Checkbox } from '../checkbox';
import { Pagination } from '../pagination';
import { renderCell } from '../shared';
import type { TableColumn, TableProps } from './types';
export type { TableColumn, TablePagination, TableProps } from './types';

export function Table<T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  dataSource,
  rowKey,
  bordered,
  size = 'medium',
  emptyText = 'No data',
  rowSelection,
  loading,
  pagination = false,
  scroll,
  onSortChange,
  onFilterChange,
  expandable,
  onRow,
  className,
  ...rest
}: TableProps<T>) {
  const [sortState, setSortState] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(
      null,
    ),
    [filters, setFilters] = useState<Record<string, string>>({}),
    [selected, setSelected] = useState<React.Key[]>([]),
    [innerPage, setPage] = useState(
      typeof pagination === 'object' ? (pagination.defaultCurrent ?? 1) : 1,
    ),
    [expanded, setExpanded] = useState<React.Key[]>(expandable?.defaultExpandedRowKeys ?? []);
  const keyOf = (record: T, index: number): React.Key => {
    const raw =
      typeof rowKey === 'function'
        ? rowKey(record, index)
        : rowKey
          ? record[rowKey]
          : (record.key ?? index);
    return typeof raw === 'string' || typeof raw === 'number' ? raw : index;
  };
  const activeSelected = rowSelection?.selectedRowKeys ?? selected,
    activeExpanded = expandable?.expandedRowKeys ?? expanded;
  const columnKey = (column: TableColumn<T>, index: number) =>
    column.key ?? String(column.dataIndex ?? index);
  const controlledSort = columns.findIndex((column) => column.sortOrder !== undefined);
  const activeSort =
    controlledSort < 0
      ? sortState
      : columns[controlledSort].sortOrder
        ? {
            key: columnKey(columns[controlledSort], controlledSort),
            direction: columns[controlledSort].sortOrder!,
          }
        : null;
  const sorted = useMemo(() => {
    let entries = dataSource.map((record, index) => ({ record, index, key: keyOf(record, index) }));
    columns.forEach((column, index) => {
      const filter = column.filteredValue ?? filters[columnKey(column, index)];
      if (filter && column.onFilter)
        entries = entries.filter((entry) => column.onFilter!(filter, entry.record));
    });
    if (activeSort) {
      const column = columns.find((column, index) => columnKey(column, index) === activeSort.key);
      if (column?.sorter)
        entries = [...entries].sort((a, b) =>
          activeSort.direction === 'asc'
            ? column.sorter!(a.record, b.record)
            : column.sorter!(b.record, a.record),
        );
    }
    return entries;
  }, [columns, dataSource, rowKey, filters, activeSort?.key, activeSort?.direction]);
  const config = typeof pagination === 'object' ? pagination : {};
  const pageSize = Math.max(1, config.pageSize ?? 10),
    pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
  const page = Math.max(1, Math.min(pageCount, config.current ?? innerPage));
  const rows = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;
  const selectable = rows.filter(
    (entry) => !rowSelection?.getCheckboxProps?.(entry.record).disabled,
  );
  const allSelected =
      selectable.length > 0 && selectable.every((entry) => activeSelected.includes(entry.key)),
    someSelected = selectable.some((entry) => activeSelected.includes(entry.key));
  const selectionChange = (next: React.Key[]) => {
    if (rowSelection?.selectedRowKeys === undefined) setSelected(next);
    rowSelection?.onChange?.(
      next,
      dataSource.filter((record, index) => next.includes(keyOf(record, index))),
    );
  };
  const colSpan = Math.max(1, columns.length + (rowSelection ? 1 : 0) + (expandable ? 1 : 0));
  return (
    <div
      {...rest}
      className={cx(
        'cinna-table',
        'cinna-table--' + size,
        bordered && 'cinna-table--bordered',
        className,
      )}
      aria-busy={loading || undefined}
    >
      {loading && (
        <div className="cinna-table__loading" role="status">
          Loading…
        </div>
      )}
      <div className="cinna-table__scroll" style={{ overflow: 'auto', maxHeight: scroll?.y }}>
        <table style={{ minWidth: scroll?.x }}>
          <thead>
            <tr>
              {expandable && <th aria-label="Expand rows" />}
              {rowSelection && (
                <th className="cinna-table__selection">
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allSelected}
                    indeterminate={!allSelected && someSelected}
                    disabled={!selectable.length}
                    onChange={(event) =>
                      selectionChange(
                        event.target.checked
                          ? [
                              ...new Set([
                                ...activeSelected,
                                ...selectable.map((entry) => entry.key),
                              ]),
                            ]
                          : activeSelected.filter(
                              (key) => !selectable.some((entry) => entry.key === key),
                            ),
                      )
                    }
                  />
                </th>
              )}
              {columns.map((column, index) => {
                const key = columnKey(column, index);
                return (
                  <th
                    key={key}
                    style={{ textAlign: column.align, width: column.width }}
                    aria-sort={
                      column.sorter
                        ? activeSort?.key === key
                          ? activeSort.direction === 'asc'
                            ? 'ascending'
                            : 'descending'
                          : 'none'
                        : undefined
                    }
                  >
                    {column.sorter ? (
                      <button
                        type="button"
                        className="cinna-table__sorter"
                        onClick={() => {
                          const next =
                            activeSort?.key !== key
                              ? { key, direction: 'asc' as const }
                              : activeSort.direction === 'asc'
                                ? { key, direction: 'desc' as const }
                                : null;
                          if (controlledSort < 0) setSortState(next);
                          onSortChange?.(next);
                        }}
                      >
                        {column.title}
                        <span aria-hidden="true">
                          {activeSort?.key === key
                            ? activeSort.direction === 'asc'
                              ? '↑'
                              : '↓'
                            : '↕'}
                        </span>
                      </button>
                    ) : (
                      column.title
                    )}
                    {column.filters && (
                      <select
                        className="cinna-table__filter"
                        aria-label={
                          'Filter ' + (typeof column.title === 'string' ? column.title : key)
                        }
                        value={column.filteredValue ?? filters[key] ?? ''}
                        onChange={(event) => {
                          const next = { ...filters, [key]: event.target.value };
                          setFilters(next);
                          setPage(1);
                          onFilterChange?.(next);
                        }}
                      >
                        <option value="">All</option>
                        {column.filters.map((filter) => (
                          <option key={filter.value} value={filter.value}>
                            {filter.text}
                          </option>
                        ))}
                      </select>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map(({ record, index, key }, rowIndex) => {
                const rowProps = onRow?.(record, index);
                return (
                  <React.Fragment key={key}>
                    <tr
                      {...rowProps}
                      className={cx(
                        activeSelected.includes(key) && 'cinna-table__row--selected',
                        rowProps?.className,
                      )}
                    >
                      {expandable && (
                        <td>
                          <button
                            type="button"
                            aria-label={'Expand row ' + (rowIndex + 1)}
                            aria-expanded={activeExpanded.includes(key)}
                            onClick={() => {
                              const next = activeExpanded.includes(key)
                                ? activeExpanded.filter((item) => item !== key)
                                : [...activeExpanded, key];
                              if (expandable.expandedRowKeys === undefined) setExpanded(next);
                              expandable.onExpandedRowsChange?.(next);
                            }}
                          >
                            {activeExpanded.includes(key) ? '−' : '+'}
                          </button>
                        </td>
                      )}
                      {rowSelection && (
                        <td className="cinna-table__selection">
                          <Checkbox
                            aria-label={'Select row ' + (rowIndex + 1)}
                            disabled={rowSelection.getCheckboxProps?.(record).disabled}
                            checked={activeSelected.includes(key)}
                            onChange={(event) =>
                              selectionChange(
                                event.target.checked
                                  ? [...new Set([...activeSelected, key])]
                                  : activeSelected.filter((item) => item !== key),
                              )
                            }
                          />
                        </td>
                      )}
                      {columns.map((column, columnIndex) => {
                        const value = column.dataIndex ? record[column.dataIndex] : undefined;
                        return (
                          <td
                            key={columnKey(column, columnIndex)}
                            style={{ textAlign: column.align }}
                          >
                            {column.render
                              ? column.render(value, record, index)
                              : renderCell(value)}
                          </td>
                        );
                      })}
                    </tr>
                    {expandable && activeExpanded.includes(key) && (
                      <tr>
                        <td colSpan={colSpan}>{expandable.expandedRowRender(record, index)}</td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <tr>
                <td className="cinna-table__empty" colSpan={colSpan}>
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div className="cinna-table__pagination">
          <Pagination
            current={page}
            total={sorted.length}
            pageSize={pageSize}
            onChange={(next) => {
              if (config.current === undefined) setPage(next);
              config.onChange?.(next, pageSize);
            }}
          />
        </div>
      )}
    </div>
  );
}
