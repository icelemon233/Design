import React, { useRef, useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Checkbox } from '../checkbox';
import type { TreeNodeData } from '../shared';
import type { TreeProps } from './types';
export type { TreeProps } from './types';

const descendants = (node: TreeNodeData): TreeNodeData[] =>
  node.disabled ? [] : [node, ...(node.children ?? []).flatMap(descendants)];

export const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      treeData,
      defaultExpandAll = true,
      defaultExpandedKeys,
      expandedKeys,
      onExpand,
      selectable = true,
      selectedKey,
      defaultSelectedKey,
      onSelect,
      multiple,
      selectedKeys,
      defaultSelectedKeys = [],
      onSelectedKeysChange,
      checkable,
      checkedKeys,
      defaultCheckedKeys = [],
      onCheck,
      disabled: disabledProp,
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [expanded, setExpanded] = useControllable(
      expandedKeys,
      defaultExpandedKeys ??
        (defaultExpandAll
          ? flattenAll(treeData)
              .filter((node) => node.children?.length)
              .map((node) => node.key)
          : []),
      onExpand,
    );
    const controlledSelection =
      selectedKeys ?? (selectedKey !== undefined ? [selectedKey] : undefined);
    const [selection, setSelection] = useControllable(
      controlledSelection,
      defaultSelectedKey ? [defaultSelectedKey] : defaultSelectedKeys,
      onSelectedKeysChange,
    );
    const [rawChecked, setChecked] = useControllable(checkedKeys, defaultCheckedKeys, onCheck);
    const checked = conductChecked(treeData, rawChecked);
    const [focusKey, setFocusKey] = useState<string | undefined>(
      treeData.find((node) => !node.disabled)?.key,
    );
    const elements = useRef<Record<string, HTMLDivElement | null>>({});
    const visible: TreeNodeData[] = [];
    const collect = (nodes: TreeNodeData[]) =>
      nodes.forEach((node) => {
        if (!node.disabled) visible.push(node);
        if (expanded.includes(node.key)) collect(node.children ?? []);
      });
    collect(treeData);
    const toggle = (node: TreeNodeData) => {
      if (disabled || node.disabled) return;
      setExpanded(
        expanded.includes(node.key)
          ? expanded.filter((key) => key !== node.key)
          : [...expanded, node.key],
      );
    };
    const select = (node: TreeNodeData) => {
      if (disabled || node.disabled || !selectable || node.selectable === false) return;
      const next = multiple
        ? selection.includes(node.key)
          ? selection.filter((key) => key !== node.key)
          : [...selection, node.key]
        : [node.key];
      setSelection(next);
      onSelect?.(node.key);
    };
    const check = (node: TreeNodeData) => {
      if (disabled || node.disabled || node.disableCheckbox) return;
      const nodes = descendants(node).filter((item) => !item.disableCheckbox);
      const keys = nodes.map((item) => item.key);
      const all = keys.every((key) => checked.includes(key));
      let next = all
        ? checked.filter((key) => !keys.includes(key))
        : [...new Set([...checked, ...keys])];
      const reconcile = (items: TreeNodeData[]) =>
        items.forEach((item) => {
          reconcile(item.children ?? []);
          const enabled = (item.children ?? []).filter(
            (child) => !child.disabled && !child.disableCheckbox,
          );
          if (enabled.length && !item.disabled && !item.disableCheckbox) {
            const full = enabled.every((child) => next.includes(child.key));
            next = full
              ? [...new Set([...next, item.key])]
              : next.filter((key) => key !== item.key);
          }
        });
      reconcile(treeData);
      setChecked(next);
    };
    const renderNodes = (
      nodes: TreeNodeData[],
      level = 1,
      parent?: TreeNodeData,
    ): React.ReactNode =>
      nodes.map((node) => {
        const hasChildren = !!node.children?.length,
          open = expanded.includes(node.key),
          isDisabled = disabled || node.disabled;
        const checkNodes = descendants(node).filter((item) => !item.disableCheckbox),
          all = checkNodes.length > 0 && checkNodes.every((item) => checked.includes(item.key)),
          some = checkNodes.some((item) => checked.includes(item.key));
        return (
          <div
            key={node.key}
            role="treeitem"
            aria-level={level}
            aria-expanded={hasChildren ? open : undefined}
            aria-selected={selectable ? selection.includes(node.key) : undefined}
            aria-checked={checkable ? (all ? true : some ? 'mixed' : false) : undefined}
            aria-disabled={isDisabled || undefined}
            aria-label={typeof node.title === 'string' ? node.title : undefined}
            tabIndex={
              !isDisabled &&
              (focusKey === node.key ||
                (!visible.some((item) => item.key === focusKey) && visible[0]?.key === node.key))
                ? 0
                : -1
            }
            ref={(element) => {
              elements.current[node.key] = element;
            }}
            className="cinna-tree__node"
            onFocus={(event) => {
              if (event.target === event.currentTarget) setFocusKey(node.key);
            }}
            onKeyDown={(event) => {
              if (event.target !== event.currentTarget || isDisabled) return;
              let target: string | undefined;
              const index = visible.findIndex((item) => item.key === node.key);
              if (event.key === 'ArrowDown') target = visible[index + 1]?.key;
              else if (event.key === 'ArrowUp') target = visible[index - 1]?.key;
              else if (event.key === 'Home') target = visible[0]?.key;
              else if (event.key === 'End') target = visible[visible.length - 1]?.key;
              else if (event.key === 'ArrowRight') {
                if (hasChildren && !open) toggle(node);
                else target = node.children?.find((child) => !child.disabled)?.key;
              } else if (event.key === 'ArrowLeft') {
                if (hasChildren && open) toggle(node);
                else target = parent?.key;
              } else if (event.key === 'Enter') select(node);
              else if (event.key === ' ') {
                if (checkable) check(node);
                else select(node);
              } else return;
              event.preventDefault();
              event.stopPropagation();
              if (target && visible.some((item) => item.key === target && !item.disabled)) {
                setFocusKey(target);
                elements.current[target]?.focus();
              }
            }}
          >
            <div
              className={cx(
                'cinna-tree__row',
                selection.includes(node.key) && 'cinna-tree__row--selected',
                isDisabled && 'cinna-tree__row--disabled',
              )}
            >
              {hasChildren ? (
                <button
                  type="button"
                  tabIndex={-1}
                  disabled={isDisabled}
                  aria-label={
                    (open ? 'Collapse ' : 'Expand ') +
                    (typeof node.title === 'string' ? node.title : 'node')
                  }
                  className="cinna-tree__toggle"
                  onClick={() => toggle(node)}
                >
                  {open ? '⌄' : '›'}
                </button>
              ) : (
                <span className="cinna-tree__spacer" />
              )}
              {checkable && (
                <Checkbox
                  checked={all}
                  indeterminate={!all && some}
                  disabled={isDisabled || node.disableCheckbox}
                  aria-label={'Check ' + (typeof node.title === 'string' ? node.title : 'node')}
                  tabIndex={-1}
                  onChange={() => check(node)}
                />
              )}
              <button
                type="button"
                className={cx(
                  'cinna-tree__label',
                  selection.includes(node.key) && 'cinna-tree__node--selected',
                )}
                tabIndex={-1}
                disabled={isDisabled}
                onClick={() => {
                  setFocusKey(node.key);
                  elements.current[node.key]?.focus();
                  select(node);
                }}
              >
                {node.title}
              </button>
            </div>
            {hasChildren && open && (
              <div role="group" className="cinna-tree__children">
                {renderNodes(node.children!, level + 1, node)}
              </div>
            )}
          </div>
        );
      });
    return (
      <div
        {...rest}
        ref={ref}
        role="tree"
        aria-label={rest['aria-label'] ?? 'Tree'}
        aria-multiselectable={multiple || undefined}
        className={cx('cinna-tree', className)}
      >
        {renderNodes(treeData)}
      </div>
    );
  },
);

Tree.displayName = 'Tree';

function flattenAll(nodes: TreeNodeData[]): TreeNodeData[] {
  return nodes.flatMap((node) => [node, ...flattenAll(node.children ?? [])]);
}

function conductChecked(nodes: TreeNodeData[], keys: string[]): string[] {
  const result = new Set(keys);
  const visit = (node: TreeNodeData, inherited = false) => {
    const selected = !node.disabled && (inherited || keys.includes(node.key));
    if (selected && !node.disableCheckbox) result.add(node.key);
    (node.children ?? []).forEach((child) => visit(child, selected));
    const children = (node.children ?? []).filter(
      (child) => !child.disabled && !child.disableCheckbox,
    );
    if (children.length && !node.disabled && !node.disableCheckbox) {
      if (children.every((child) => result.has(child.key))) result.add(node.key);
      else result.delete(node.key);
    }
  };
  nodes.forEach((node) => visit(node));
  return [...result];
}
