import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useEscapeLayer } from '../../hooks/useEscapeLayer';
import { useResponsiveTagCount } from '../../hooks/useResponsiveTagCount';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type {
  CascaderFieldNames,
  CascaderMultipleValue,
  CascaderOption,
  CascaderOptionValue,
  CascaderProps,
  CascaderRawValue,
  CascaderSearchConfig,
  CascaderShowCheckedStrategy,
  CascaderTagRenderInfo,
  CascaderValue,
} from './types';
export type {
  CascaderExpandTrigger,
  CascaderFieldNames,
  CascaderMultipleValue,
  CascaderOption,
  CascaderOptionValue,
  CascaderPlacement,
  CascaderProps,
  CascaderRawValue,
  CascaderSearchConfig,
  CascaderSemanticSlot,
  CascaderShowCheckedStrategy,
  CascaderTagRenderInfo,
  CascaderValue,
  CascaderVariant,
} from './types';

const cascaderDefaultFieldNames = {
  label: 'label',
  value: 'value',
  children: 'children',
  disabled: 'disabled',
  isLeaf: 'isLeaf',
  loading: 'loading',
};

const getCascaderFields = (fieldNames?: CascaderFieldNames) => ({
  ...cascaderDefaultFieldNames,
  ...fieldNames,
});

const getCascaderOptionValue = (
  option: CascaderOption,
  fields: ReturnType<typeof getCascaderFields>,
) => option[fields.value] as CascaderOptionValue | undefined;

const getCascaderOptionLabel = (
  option: CascaderOption,
  fields: ReturnType<typeof getCascaderFields>,
) => (option[fields.label] ?? getCascaderOptionValue(option, fields)) as React.ReactNode;

const getCascaderChildren = (
  option: CascaderOption,
  fields: ReturnType<typeof getCascaderFields>,
) => option[fields.children] as CascaderOption[] | undefined;

const getCascaderDisabled = (
  option: CascaderOption,
  fields: ReturnType<typeof getCascaderFields>,
) => Boolean(option[fields.disabled]);

const getCascaderLoading = (option: CascaderOption, fields: ReturnType<typeof getCascaderFields>) =>
  Boolean(option[fields.loading]);

const getCascaderIsLeaf = (
  option: CascaderOption,
  fields: ReturnType<typeof getCascaderFields>,
) => {
  const children = getCascaderChildren(option, fields);
  if (children?.length) return false;
  return option[fields.isLeaf] !== false;
};

const isCascaderPathValue = (value: unknown): value is CascaderValue =>
  Array.isArray(value) && !Array.isArray(value[0]);

const isCascaderMultipleValue = (value: unknown): value is CascaderMultipleValue =>
  Array.isArray(value) && Array.isArray(value[0]);

const getCascaderPathKey = (value: CascaderValue) =>
  value.map((item) => String(item)).join('__cinna__');

const isSameCascaderPath = (a: CascaderValue, b: CascaderValue) =>
  a.length === b.length && a.every((item, index) => item === b[index]);

const getCascaderPathLabels = (
  path: CascaderOption[],
  fields: ReturnType<typeof getCascaderFields>,
) => path.map((option) => getCascaderOptionLabel(option, fields));

const getCascaderPathValue = (
  path: CascaderOption[],
  fields: ReturnType<typeof getCascaderFields>,
) =>
  path
    .map((option) => getCascaderOptionValue(option, fields))
    .filter((value): value is CascaderOptionValue => value !== undefined);

function findCascaderPathByValue(
  options: CascaderOption[],
  value: CascaderValue | CascaderOptionValue | undefined,
  fields: ReturnType<typeof getCascaderFields>,
  parent: CascaderOption[] = [],
): CascaderOption[] {
  if (value === undefined || value === null) return [];
  const targetPath = Array.isArray(value) ? value : undefined;
  for (const option of options) {
    const optionValue = getCascaderOptionValue(option, fields);
    const path = [...parent, option];
    const pathValue = getCascaderPathValue(path, fields);
    if (targetPath ? isSameCascaderPath(pathValue, targetPath) : optionValue === value) return path;
    const childPath = findCascaderPathByValue(
      getCascaderChildren(option, fields) ?? [],
      value,
      fields,
      path,
    );
    if (childPath.length) return childPath;
  }
  return [];
}

function flattenCascaderPaths(
  options: CascaderOption[],
  fields: ReturnType<typeof getCascaderFields>,
  includeParents = false,
  parent: CascaderOption[] = [],
): CascaderOption[][] {
  return options.flatMap((option) => {
    const path = [...parent, option];
    const children = getCascaderChildren(option, fields) ?? [];
    const childPaths = children.length
      ? flattenCascaderPaths(children, fields, includeParents, path)
      : [];
    return includeParents || !children.length ? [path, ...childPaths] : childPaths;
  });
}

function normalizeCascaderValue(
  value: CascaderRawValue | undefined,
  options: CascaderOption[],
  fields: ReturnType<typeof getCascaderFields>,
  multiple: boolean,
): CascaderValue | CascaderMultipleValue {
  if (value === undefined || value === null || (Array.isArray(value) && value.length === 0))
    return [];
  if (multiple) {
    if (isCascaderMultipleValue(value)) return value.filter((path) => path.length > 0);
    if (isCascaderPathValue(value)) return [value];
    const path = findCascaderPathByValue(options, value as CascaderOptionValue, fields);
    return path.length ? [getCascaderPathValue(path, fields)] : [];
  }
  if (isCascaderMultipleValue(value)) return value[0] ?? [];
  if (isCascaderPathValue(value)) return value;
  return getCascaderPathValue(
    findCascaderPathByValue(options, value as CascaderOptionValue, fields),
    fields,
  );
}

function getCascaderPathFromValue(
  value: CascaderValue,
  options: CascaderOption[],
  fields: ReturnType<typeof getCascaderFields>,
) {
  return findCascaderPathByValue(options, value, fields);
}

function getCascaderColumns(
  options: CascaderOption[],
  activeValue: CascaderValue,
  fields: ReturnType<typeof getCascaderFields>,
) {
  const columns: CascaderOption[][] = [options];
  let current = options;
  activeValue.forEach((value) => {
    const selected = current.find((option) => getCascaderOptionValue(option, fields) === value);
    const children = selected ? getCascaderChildren(selected, fields) : undefined;
    if (children?.length) {
      columns.push(children);
      current = children;
    }
  });
  return columns;
}

function updateCascaderOptionAtPath(
  options: CascaderOption[],
  targetValue: CascaderValue,
  fields: ReturnType<typeof getCascaderFields>,
  updater: (option: CascaderOption) => CascaderOption,
  parentValue: CascaderValue = [],
): CascaderOption[] {
  let changed = false;
  const nextOptions = options.map((option) => {
    const optionValue = getCascaderOptionValue(option, fields);
    const pathValue = optionValue === undefined ? parentValue : [...parentValue, optionValue];

    if (isSameCascaderPath(pathValue, targetValue)) {
      changed = true;
      return updater(option);
    }

    const children = getCascaderChildren(option, fields);
    if (!children?.length) return option;

    const nextChildren = updateCascaderOptionAtPath(
      children,
      targetValue,
      fields,
      updater,
      pathValue,
    );
    if (nextChildren === children) return option;

    changed = true;
    return { ...option, [fields.children]: nextChildren };
  });

  return changed ? nextOptions : options;
}

const isCascaderLoadPromise = (value: unknown): value is Promise<void | CascaderOption[]> =>
  Boolean(value && typeof (value as Promise<void | CascaderOption[]>).then === 'function');

function getCascaderSearchConfig(
  showSearch: CascaderProps['showSearch'],
): CascaderSearchConfig | null {
  if (!showSearch) return null;
  return showSearch === true ? {} : showSearch;
}

const emptyCascaderOptions: CascaderOption[] = [];
const CascaderBase = React.forwardRef<HTMLDivElement, CascaderProps>(
  (
    {
      options = emptyCascaderOptions,
      value,
      defaultValue,
      multiple = false,
      onChange,
      placeholder = 'Select path',
      separator = ' / ',
      allowClear = true,
      changeOnSelect = false,
      disabled: disabledProp = false,
      displayRender,
      tagRender,
      expandTrigger = 'click',
      expandIcon = <Icon name="chevron-right" size={12} />,
      fieldNames,
      loadData,
      onLoadError,
      loadingIcon = <span className="cinna-cascader__loading" role="status" aria-label="Loading" />,
      maxTagCount,
      maxTagPlaceholder,
      maxTagTextLength,
      notFoundContent = 'Not Found',
      open,
      defaultOpen = false,
      onOpenChange,
      placement = 'bottomLeft',
      prefix,
      popupRender,
      showCheckedStrategy = 'SHOW_PARENT',
      showSearch,
      suffixIcon = <Icon name="chevron-down" size={13} />,
      removeIcon = <Icon name="close-blue" size={10} />,
      controlSize,
      size,
      status,
      variant = 'outlined',
      optionRender,
      classNames,
      styles,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [loadError, setLoadError] = useState('');
    const optionsEpoch = useRef(0),
      optionsReference = useRef(options),
      alive = useRef(true);
    const requests = useRef(new Map<string, number>()),
      requestSequence = useRef(0);
    if (optionsReference.current !== options) {
      optionsReference.current = options;
      optionsEpoch.current++;
      requests.current.clear();
    }
    useEffect(() => {
      alive.current = true;
      return () => {
        alive.current = false;
        optionsEpoch.current++;
        requests.current.clear();
      };
    }, []);
    const fields = useMemo(() => getCascaderFields(fieldNames), [fieldNames]);
    const resolvedSize = controlSize ?? size ?? 'medium';
    const rootRef = useRef<HTMLDivElement | null>(null);
    const [asyncOptions, setAsyncOptions] = useState<CascaderOption[]>(options);
    const [innerOpen, setInnerOpen] = useState(defaultOpen);
    const isOpenControlled = open !== undefined;
    const actualOpen = !disabled && (isOpenControlled ? Boolean(open) : innerOpen);
    const isValueControlled = value !== undefined;
    const [innerValue, setInnerValue] = useState<CascaderValue | CascaderMultipleValue>(() =>
      normalizeCascaderValue(defaultValue, options, fields, multiple),
    );
    const mergedOptions = asyncOptions;
    const selectedValue = (
      isValueControlled
        ? normalizeCascaderValue(value, mergedOptions, fields, multiple)
        : normalizeCascaderValue(innerValue as CascaderRawValue, mergedOptions, fields, multiple)
    ) as CascaderValue | CascaderMultipleValue;
    const selectedValues = multiple ? (selectedValue as CascaderMultipleValue) : [];
    const selectedSingleValue = multiple ? [] : (selectedValue as CascaderValue);
    const initialActive = multiple ? (selectedValues[0] ?? []) : selectedSingleValue;
    const [activeValue, setActiveValue] = useState<CascaderValue>(initialActive);
    const searchConfig = getCascaderSearchConfig(showSearch);
    const isSearchControlled = searchConfig?.searchValue !== undefined;
    const [innerSearch, setInnerSearch] = useState('');
    const searchValue = isSearchControlled ? String(searchConfig?.searchValue ?? '') : innerSearch;
    const selectedPath = getCascaderPathFromValue(selectedSingleValue, mergedOptions, fields);
    const selectableSearchPaths = useMemo(
      () => flattenCascaderPaths(mergedOptions, fields, changeOnSelect || multiple),
      [changeOnSelect, fields, multiple, mergedOptions],
    );
    const columns = getCascaderColumns(mergedOptions, activeValue, fields);
    const popupId = useId();

    useEffect(() => {
      setAsyncOptions(options);
      setLoadError('');
    }, [options]);

    const setRootRef = (node: HTMLDivElement | null) => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    const setPopupOpen = (nextOpen: boolean) => {
      const next = disabled ? false : nextOpen;
      if (!isOpenControlled) setInnerOpen(next);
      if (actualOpen !== next) onOpenChange?.(next);
      if (!next && !isSearchControlled) setInnerSearch('');
    };

    useEscapeLayer(actualOpen, rootRef, () => {
      setPopupOpen(false);
      rootRef.current?.querySelector<HTMLElement>('[role=combobox]')?.focus();
    });
    const valueSignature = JSON.stringify(value);
    useEffect(() => {
      if (isValueControlled)
        setActiveValue(multiple ? (selectedValues[0] ?? []) : selectedSingleValue);
    }, [isValueControlled, valueSignature, multiple]);
    const commitValue = (
      nextValue: CascaderValue | CascaderMultipleValue,
      selectedOptions: CascaderOption[] | CascaderOption[][],
    ) => {
      if (disabled) return;
      if (!isValueControlled) setInnerValue(nextValue);
      onChange?.(nextValue, selectedOptions);
    };

    const updateSearch = (next: string) => {
      if (!isSearchControlled) setInnerSearch(next);
      searchConfig?.onSearch?.(next);
    };

    const displaySingle = () => {
      if (!selectedPath.length) return null;
      const labels = getCascaderPathLabels(selectedPath, fields);
      return displayRender
        ? displayRender(labels, selectedPath)
        : labels.map((label, index) => (
            <React.Fragment key={index}>
              {index > 0 ? separator : null}
              {label}
            </React.Fragment>
          ));
    };

    const getTagInfos = (): CascaderTagRenderInfo[] =>
      selectedValues
        .map((pathValue) => {
          const path = getCascaderPathFromValue(pathValue, mergedOptions, fields);
          const option = path[path.length - 1] ?? {};
          const labels = getCascaderPathLabels(path, fields);
          let label: React.ReactNode = displayRender
            ? displayRender(labels, path)
            : labels.map((item) => String(item)).join(String(separator));
          if (maxTagTextLength && typeof label === 'string' && label.length > maxTagTextLength)
            label = `${label.slice(0, maxTagTextLength)}...`;
          return {
            label,
            value: pathValue,
            option,
            path,
            onClose: () => selectPath(path, false),
          };
        })
        .filter((info) => info.path.length > 0);

    const visibleTagInfos = () => {
      const infos = getTagInfos();
      if (showCheckedStrategy === 'SHOW_CHILD')
        return infos.filter(
          (info) =>
            !infos.some(
              (other) =>
                other !== info &&
                isSameCascaderPath(info.value, other.value.slice(0, info.value.length)),
            ),
        );
      if (showCheckedStrategy === 'SHOW_PARENT')
        return infos.filter(
          (info) =>
            !infos.some(
              (other) =>
                other !== info &&
                isSameCascaderPath(other.value, info.value.slice(0, other.value.length)),
            ),
        );
      return infos;
    };

    const selectPath = (path: CascaderOption[], closeOnLeaf = true) => {
      if (disabled || path.some((option) => getCascaderDisabled(option, fields))) return;
      const nextPathValue = getCascaderPathValue(path, fields);
      if (!nextPathValue.length) return;
      const option = path[path.length - 1];
      const leaf = getCascaderIsLeaf(option, fields);

      if (multiple) {
        const leaves = flattenCascaderPaths(mergedOptions, fields, false).filter(
          (item) =>
            item.every((option) => !getCascaderDisabled(option, fields)) &&
            getCascaderIsLeaf(item[item.length - 1], fields),
        );
        const leafValues = leaves.map((item) => getCascaderPathValue(item, fields));
        const selectedLeaves = leafValues.filter((item) =>
          selectedValues.some((selected) =>
            isSameCascaderPath(selected, item.slice(0, selected.length)),
          ),
        );
        const branch = leafValues.filter((item) =>
          isSameCascaderPath(nextPathValue, item.slice(0, nextPathValue.length)),
        );
        if (!branch.length) return;
        const fullySelected = branch.every((item) =>
          selectedLeaves.some((selected) => isSameCascaderPath(item, selected)),
        );
        let next = fullySelected
          ? selectedLeaves.filter(
              (item) => !branch.some((selected) => isSameCascaderPath(item, selected)),
            )
          : [
              ...selectedLeaves,
              ...branch.filter(
                (item) => !selectedLeaves.some((selected) => isSameCascaderPath(item, selected)),
              ),
            ];
        const parents = flattenCascaderPaths(mergedOptions, fields, true).filter(
          (item) =>
            !getCascaderIsLeaf(item[item.length - 1], fields) &&
            item.every((option) => !getCascaderDisabled(option, fields)),
        );
        for (const parent of parents) {
          const parentValue = getCascaderPathValue(parent, fields);
          const children = leafValues.filter((item) =>
            isSameCascaderPath(parentValue, item.slice(0, parentValue.length)),
          );
          if (
            children.length &&
            children.every((item) => next.some((selected) => isSameCascaderPath(item, selected)))
          )
            next.push(parentValue);
        }
        const nextOptions = next.map((item) =>
          getCascaderPathFromValue(item, mergedOptions, fields),
        );
        commitValue(next, nextOptions);
        if (searchConfig?.autoClearSearchValue !== false) updateSearch('');
        return;
      }

      if (leaf || changeOnSelect) {
        commitValue(nextPathValue, path);
        if (leaf && closeOnLeaf) setPopupOpen(false);
      }
    };

    const updateAsyncOption = (
      pathValue: CascaderValue,
      updater: (option: CascaderOption) => CascaderOption,
    ) => {
      setAsyncOptions((current) => updateCascaderOptionAtPath(current, pathValue, fields, updater));
    };

    const setPathLoading = (pathValue: CascaderValue, nextLoading: boolean) => {
      updateAsyncOption(pathValue, (option) => ({ ...option, [fields.loading]: nextLoading }));
    };

    const finishLoadingPath = (pathValue: CascaderValue, children?: CascaderOption[]) => {
      updateAsyncOption(pathValue, (option) => ({
        ...option,
        [fields.loading]: false,
        ...(children ? { [fields.children]: children } : {}),
      }));
    };

    const triggerLoadData = (path: CascaderOption[]) => {
      if (!loadData || disabled) return;
      const pathValue = getCascaderPathValue(path, fields),
        key = getCascaderPathKey(pathValue);
      if (!pathValue.length || requests.current.has(key)) return;
      const epoch = optionsEpoch.current,
        request = ++requestSequence.current;
      requests.current.set(key, request);
      setPathLoading(pathValue, true);
      setLoadError('');
      const valid = () =>
        alive.current && epoch === optionsEpoch.current && requests.current.get(key) === request;
      const finish = (children?: CascaderOption[]) => {
        if (!valid()) return;
        requests.current.delete(key);
        finishLoadingPath(pathValue, children);
      };
      const fail = (error: unknown) => {
        if (!valid()) return;
        finish();
        setLoadError(error instanceof Error ? error.message : 'Unable to load options. Try again.');
        onLoadError?.(error, path);
      };
      try {
        const result = loadData(path);
        if (Array.isArray(result)) finish(result);
        else if (isCascaderLoadPromise(result))
          result.then((children) => finish(Array.isArray(children) ? children : undefined), fail);
        else finish();
      } catch (error) {
        fail(error);
      }
    };

    const activateOption = (path: CascaderOption[], shouldSelect: boolean) => {
      if (disabled) return;
      const option = path[path.length - 1];
      if (!option || getCascaderDisabled(option, fields)) return;
      const pathValue = getCascaderPathValue(path, fields);
      const loading = getCascaderLoading(option, fields);
      setActiveValue(pathValue);
      if (loading) return;
      if (
        !getCascaderIsLeaf(option, fields) &&
        loadData &&
        !getCascaderChildren(option, fields)?.length
      )
        triggerLoadData(path);
      if (shouldSelect && (getCascaderIsLeaf(option, fields) || changeOnSelect || multiple))
        selectPath(path, true);
    };

    const clearValue = (event?: React.MouseEvent) => {
      event?.stopPropagation();
      commitValue(multiple ? [] : [], multiple ? [] : []);
      setActiveValue([]);
      updateSearch('');
      setPopupOpen(false);
    };

    const defaultSearchFilter = (input: string, path: CascaderOption[]) => {
      const lower = input.toLowerCase();
      return getCascaderPathLabels(path, fields).some((label) =>
        String(label).toLowerCase().includes(lower),
      );
    };

    const searchResults = useMemo(() => {
      if (!searchConfig || !searchValue) return [];
      const filter = searchConfig.filter ?? defaultSearchFilter;
      let results = selectableSearchPaths.filter((path) => filter(searchValue, path));
      if (searchConfig.sort)
        results = [...results].sort((a, b) => searchConfig.sort?.(a, b, searchValue) ?? 0);
      if (typeof searchConfig.limit === 'number') results = results.slice(0, searchConfig.limit);
      else if (searchConfig.limit !== false) results = results.slice(0, 50);
      return results;
    }, [searchConfig, searchValue, selectableSearchPaths]);

    useEffect(() => {
      if (!actualOpen) return;
      const close = (event: PointerEvent | KeyboardEvent) => {
        if (event instanceof KeyboardEvent && event.key !== 'Escape') return;
        if (event.type === 'pointerdown' && rootRef.current?.contains(event.target as Node)) return;
        setPopupOpen(false);
        if (event instanceof KeyboardEvent)
          rootRef.current?.querySelector<HTMLElement>('[role=combobox]')?.focus();
      };
      document.addEventListener('pointerdown', close, true);
      return () => {
        document.removeEventListener('pointerdown', close, true);
      };
    }, [actualOpen, disabled, isOpenControlled, onOpenChange]);

    const responsiveTagCount = useResponsiveTagCount(
      rootRef,
      visibleTagInfos().map((info) => info.label),
      maxTagCount === 'responsive',
    );
    const content = multiple ? (
      <span className={cx('cinna-cascader__tags', classNames?.content)} style={styles?.content}>
        {visibleTagInfos()
          .slice(0, maxTagCount === 'responsive' ? responsiveTagCount : maxTagCount)
          .map((info) =>
            tagRender ? (
              <React.Fragment key={getCascaderPathKey(info.value)}>
                {tagRender(info)}
              </React.Fragment>
            ) : (
              <span
                key={getCascaderPathKey(info.value)}
                className={cx('cinna-cascader__tag', classNames?.tag)}
                style={styles?.tag}
              >
                {info.label}
                <button
                  type="button"
                  disabled={disabled}
                  aria-label="Remove selected path"
                  onClick={(event) => {
                    event.stopPropagation();
                    info.onClose();
                  }}
                >
                  {removeIcon}
                </button>
              </span>
            ),
          )}
        {(() => {
          const infos = visibleTagInfos();
          const limit = maxTagCount === 'responsive' ? responsiveTagCount : maxTagCount;
          const omitted = typeof limit === 'number' ? infos.slice(limit) : [];
          if (!omitted.length) return null;
          const label =
            typeof maxTagPlaceholder === 'function'
              ? maxTagPlaceholder(omitted)
              : (maxTagPlaceholder ?? `+${omitted.length}`);
          return <span className="cinna-cascader__tag cinna-cascader__tag--omitted">{label}</span>;
        })()}
        {!visibleTagInfos().length && (
          <span
            className={cx('cinna-cascader__placeholder', classNames?.placeholder)}
            style={styles?.placeholder}
          >
            {placeholder}
          </span>
        )}
      </span>
    ) : (
      <span
        className={cx(
          'cinna-cascader__content',
          classNames?.content,
          !selectedPath.length && 'cinna-cascader__placeholder',
        )}
        style={selectedPath.length ? styles?.content : styles?.placeholder}
      >
        {selectedPath.length ? displaySingle() : placeholder}
      </span>
    );

    const renderOptionContent = (option: CascaderOption, path: CascaderOption[]) =>
      optionRender?.(option, path) ?? getCascaderOptionLabel(option, fields);
    const renderMenuOption = (option: CascaderOption, path: CascaderOption[]) => {
      const pathValue = getCascaderPathValue(path, fields);
      const active = isSameCascaderPath(activeValue.slice(0, pathValue.length), pathValue);
      const checked = multiple
        ? selectedValues.some((item) => isSameCascaderPath(item, pathValue.slice(0, item.length)))
        : isSameCascaderPath(selectedSingleValue, pathValue);
      const hasChildren = !getCascaderIsLeaf(option, fields);
      const disabledOption = getCascaderDisabled(option, fields);
      const loadingOption = getCascaderLoading(option, fields);
      const eventHandlers = {
        onMouseEnter:
          expandTrigger === 'hover' && hasChildren && !disabledOption && !loadingOption
            ? () => activateOption(path, false)
            : undefined,
        onClick: () => activateOption(path, true),
        onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
          const column = event.currentTarget.parentElement;
          const options = Array.from(
            column?.querySelectorAll<HTMLButtonElement>('button[role="option"]:not(:disabled)') ??
              [],
          );
          const index = options.indexOf(event.currentTarget);
          const next =
            event.key === 'ArrowDown'
              ? options[(index + 1) % options.length]
              : event.key === 'ArrowUp'
                ? options[(index - 1 + options.length) % options.length]
                : event.key === 'Home'
                  ? options[0]
                  : event.key === 'End'
                    ? options[options.length - 1]
                    : undefined;
          if (next) {
            event.preventDefault();
            next.focus();
          }
          if (event.key === 'ArrowRight' && hasChildren) {
            event.preventDefault();
            activateOption(path, false);
            requestAnimationFrame(() => {
              const columns = Array.from(
                rootRef.current?.querySelectorAll<HTMLElement>('.cinna-cascader__menu') ?? [],
              );
              columns[columns.indexOf(column as HTMLElement) + 1]
                ?.querySelector<HTMLButtonElement>('button:not(:disabled)')
                ?.focus();
            });
          }
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const columns = Array.from(
              rootRef.current?.querySelectorAll<HTMLElement>('.cinna-cascader__menu') ?? [],
            );
            columns[columns.indexOf(column as HTMLElement) - 1]
              ?.querySelector<HTMLButtonElement>('.cinna-cascader__option--active')
              ?.focus();
          }
        },
      };

      return (
        <button
          key={getCascaderPathKey(pathValue)}
          type="button"
          role="option"
          aria-selected={checked}
          disabled={disabledOption}
          className={cx(
            'cinna-cascader__option',
            active && 'cinna-cascader__option--active',
            checked && 'cinna-cascader__option--checked',
            disabledOption && 'cinna-cascader__option--disabled',
            loadingOption && 'cinna-cascader__option--loading',
            option.className,
            classNames?.option,
          )}
          style={{ ...styles?.option, ...option.style }}
          aria-busy={loadingOption || undefined}
          {...eventHandlers}
        >
          {multiple && (
            <span className="cinna-cascader__check" aria-hidden="true">
              {checked ? '✓' : ''}
            </span>
          )}
          <span>{renderOptionContent(option, path)}</span>
          {loadingOption ? (
            <small className="cinna-cascader__loading-icon">{loadingIcon}</small>
          ) : hasChildren ? (
            <small className="cinna-cascader__expand-icon">{expandIcon}</small>
          ) : null}
        </button>
      );
    };

    const menus =
      searchConfig && searchValue ? (
        <span className="cinna-cascader__search-results" role="listbox">
          {searchResults.length ? (
            searchResults.map((path) => {
              const value = getCascaderPathValue(path, fields);
              const contentNode = searchConfig.render
                ? searchConfig.render(searchValue, path)
                : getCascaderPathLabels(path, fields).map((label, index) => (
                    <React.Fragment key={index}>
                      {index > 0 ? separator : null}
                      {label}
                    </React.Fragment>
                  ));
              return (
                <button
                  key={getCascaderPathKey(value)}
                  type="button"
                  role="option"
                  aria-selected={
                    multiple
                      ? selectedValues.some((item) => isSameCascaderPath(item, value))
                      : isSameCascaderPath(selectedSingleValue, value)
                  }
                  disabled={path.some((option) => getCascaderDisabled(option, fields))}
                  className={cx('cinna-cascader__option', classNames?.option)}
                  style={styles?.option}
                  onClick={() => {
                    setActiveValue(value);
                    selectPath(path, true);
                  }}
                >
                  <span>{contentNode}</span>
                </button>
              );
            })
          ) : (
            <span className={cx('cinna-cascader__empty', classNames?.empty)} style={styles?.empty}>
              {notFoundContent}
            </span>
          )}
        </span>
      ) : (
        <span
          className={cx('cinna-cascader__menus', classNames?.menus)}
          role="listbox"
          style={styles?.menus}
        >
          {columns.map((column, columnIndex) => (
            <span
              key={columnIndex}
              className={cx('cinna-cascader__menu', classNames?.menu)}
              style={styles?.menu}
            >
              {column.length ? (
                column.map((option) => {
                  const parentPath = activeValue.slice(0, columnIndex);
                  return renderMenuOption(option, [
                    ...getCascaderPathFromValue(parentPath, mergedOptions, fields).slice(
                      0,
                      columnIndex,
                    ),
                    option,
                  ]);
                })
              ) : (
                <span
                  className={cx('cinna-cascader__empty', classNames?.empty)}
                  style={styles?.empty}
                >
                  {notFoundContent}
                </span>
              )}
            </span>
          ))}
        </span>
      );

    const popup = (
      <FloatingPanel anchor={rootRef} placement={placement}>
        <span
          className={cx(
            'cinna-cascader__popup',
            `cinna-cascader__popup--${placement}`,
            classNames?.popup,
          )}
          style={styles?.popup}
        >
          {searchConfig && (
            <label
              className={cx('cinna-cascader__search', classNames?.search)}
              style={styles?.search}
            >
              {searchConfig.searchIcon && <span>{searchConfig.searchIcon}</span>}
              <input
                value={searchValue}
                placeholder="Search path"
                onChange={(event) => updateSearch(event.currentTarget.value)}
              />
            </label>
          )}
          {loadError && (
            <span className="cinna-cascader__error" role="alert">
              {loadError}
            </span>
          )}
          {popupRender ? popupRender(menus) : menus}
        </span>
      </FloatingPanel>
    );

    const hasValue = multiple ? selectedValues.length > 0 : selectedSingleValue.length > 0;
    const clearIcon =
      allowClear && typeof allowClear === 'object' ? (
        (allowClear.clearIcon ?? <Icon name="close-blue" size={11} />)
      ) : (
        <Icon name="close-blue" size={11} />
      );

    return (
      <div
        ref={setRootRef}
        className={cx(
          'cinna-cascader',
          `cinna-cascader--${resolvedSize}`,
          `cinna-cascader--${variant}`,
          `cinna-cascader--${placement}`,
          status && `cinna-cascader--${status}`,
          actualOpen && 'cinna-cascader--open',
          multiple && 'cinna-cascader--multiple',
          disabled && 'cinna-cascader--disabled',
          classNames?.root,
          className,
        )}
        style={{ ...styles?.root, ...style }}
        {...rest}
      >
        <div
          role="combobox"
          aria-label={
            rest['aria-label'] ?? (typeof placeholder === 'string' ? placeholder : 'Select path')
          }
          tabIndex={disabled ? -1 : 0}
          className={cx('cinna-cascader__control', classNames?.control)}
          style={styles?.control}
          aria-disabled={disabled || undefined}
          aria-haspopup="listbox"
          aria-expanded={actualOpen}
          aria-controls={actualOpen ? popupId : undefined}
          onClick={() => setPopupOpen(!actualOpen)}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget || disabled) return;
            if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
              event.preventDefault();
              setPopupOpen(true);
              if (event.key === 'ArrowDown')
                requestAnimationFrame(() =>
                  rootRef.current
                    ?.querySelector<HTMLButtonElement>('[role=option]:not(:disabled)')
                    ?.focus(),
                );
            }
          }}
        >
          {prefix && (
            <span
              className={cx('cinna-cascader__prefix', classNames?.prefix)}
              style={styles?.prefix}
            >
              {prefix}
            </span>
          )}
          {content}
          {allowClear && hasValue && !disabled && (
            <span
              role="button"
              tabIndex={0}
              aria-label="Clear cascader"
              className={cx('cinna-cascader__clear', classNames?.clear)}
              style={styles?.clear}
              onClick={clearValue}
              onKeyDown={(event) => {
                if (['Enter', ' '].includes(event.key)) {
                  event.preventDefault();
                  event.stopPropagation();
                  clearValue();
                }
              }}
            >
              {clearIcon}
            </span>
          )}
          <span
            className={cx('cinna-cascader__suffix', classNames?.suffix)}
            style={styles?.suffix}
            aria-hidden="true"
          >
            {suffixIcon}
          </span>
        </div>
        {actualOpen && <span id={popupId}>{popup}</span>}
      </div>
    );
  },
);

CascaderBase.displayName = 'Cascader';

export const Cascader = Object.assign(CascaderBase, {
  SHOW_PARENT: 'SHOW_PARENT' as CascaderShowCheckedStrategy,
  SHOW_CHILD: 'SHOW_CHILD' as CascaderShowCheckedStrategy,
});
