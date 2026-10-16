import { FloatingPanel } from '../../internal/FloatingPanel';
import React, { useId, useRef, useState } from 'react';
import { useControllable } from '../../hooks/useControllable';
import { useOutside } from '../../hooks/useOutside';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { TreeNodeData } from '../shared';
import { Tree } from '../tree';
import type { TreeSelectProps } from './types';
export type { TreeSelectProps } from './types';

export const TreeSelect = React.forwardRef<HTMLDivElement, TreeSelectProps>(
  (
    {
      treeData,
      placeholder = 'Select node',
      value,
      defaultValue = '',
      onChange,
      allowClear,
      disabled: disabledProp,
      showSearch,
      defaultExpandedKeys = [],
      className,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [selected, setSelected] = useControllable(value, defaultValue, onChange);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const root = useRef<HTMLDivElement | null>(null),
      control = useRef<HTMLButtonElement>(null);
    const id = useId();
    const flatten = (nodes: TreeNodeData[]): TreeNodeData[] =>
      nodes.flatMap((node) => [node, ...flatten(node.children ?? [])]);
    const nodes = flatten(treeData);
    const label = nodes.find((node) => node.key === selected)?.title ?? placeholder;
    const filter = (items: TreeNodeData[]): TreeNodeData[] =>
      items.flatMap((node) => {
        const children = filter(node.children ?? []);
        return String(typeof node.title === 'string' ? node.title : node.key)
          .toLowerCase()
          .includes(query.toLowerCase()) || children.length
          ? [{ ...node, children: children.length ? children : node.children }]
          : [];
      });
    const filtered = query ? filter(treeData) : treeData;
    useOutside(root, open, () => setOpen(false));
    return (
      <div
        {...rest}
        ref={(node) => {
          root.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cx(
          'cinna-select',
          'cinna-tree-select',
          open && !disabled && 'cinna-select--open',
          className,
        )}
      >
        <button
          ref={control}
          type="button"
          className="cinna-select__control"
          aria-labelledby={rest['aria-labelledby']}
          disabled={disabled}
          aria-label={rest['aria-label'] ?? placeholder}
          aria-haspopup="tree"
          aria-expanded={open && !disabled}
          aria-controls={open ? id : undefined}
          onClick={() => setOpen(!open)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpen(true);
              requestAnimationFrame(() =>
                root.current?.querySelector<HTMLElement>('[role=treeitem]')?.focus(),
              );
            }
          }}
        >
          <span className={cx(!selected && 'cinna-select__placeholder')}>{label}</span>
          <Icon name="chevron-down" size={13} />
        </button>
        {allowClear && selected && (
          <button
            type="button"
            className="cinna-select__clear"
            aria-label="Clear selection"
            disabled={disabled}
            onClick={() => setSelected('')}
          >
            <Icon name="close-blue" size={12} />
          </button>
        )}
        {open && !disabled && (
          <FloatingPanel anchor={root} matchWidth>
            <div
              id={id}
              className="cinna-select__popup"
              onKeyDown={(event) => {
                if (event.key === 'Escape') {
                  event.stopPropagation();
                  setOpen(false);
                  control.current?.focus();
                }
              }}
            >
              {showSearch && (
                <input
                  autoFocus
                  data-cinna-autofocus
                  aria-label="Search nodes"
                  className="cinna-select__search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              )}
              {filtered.length ? (
                <Tree
                  treeData={filtered}
                  defaultExpandedKeys={defaultExpandedKeys}
                  expandedKeys={
                    query
                      ? nodes.filter((node) => node.children?.length).map((node) => node.key)
                      : undefined
                  }
                  selectedKey={selected}
                  selectable
                  onSelect={(key) => {
                    setSelected(key);
                    setOpen(false);
                    control.current?.focus();
                  }}
                />
              ) : (
                <span role="status">No options</span>
              )}
            </div>
          </FloatingPanel>
        )}
      </div>
    );
  },
);

TreeSelect.displayName = 'TreeSelect';
