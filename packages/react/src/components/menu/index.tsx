import React, { useEffect, useRef, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import { Popup } from '../popup';
import { normalizePopupCssValue } from '../shared';
import type {
  MenuClickInfo,
  MenuItem,
  MenuMode,
  MenuProps,
  MenuRenderOptions,
  MenuSelectInfo,
  MenuSemanticSlot,
} from './types';
export type {
  MenuClassNames,
  MenuClickInfo,
  MenuExpandIcon,
  MenuItem,
  MenuMode,
  MenuPopupRender,
  MenuProps,
  MenuSelectInfo,
  MenuSemanticSlot,
  MenuStyles,
  MenuTheme,
  MenuTriggerSubMenuAction,
} from './types';

function findTopLevelMenuActiveTarget(root: HTMLDivElement) {
  const topLevelItems = Array.from(root.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && !child.classList.contains('cinna-menu__active-pill'),
  );

  for (const child of topLevelItems) {
    if (child.classList.contains('cinna-menu__item--active')) return child;

    if (child.classList.contains('cinna-menu__submenu')) {
      const title = Array.from(child.children).find(
        (node): node is HTMLElement =>
          node instanceof HTMLElement &&
          node.classList.contains('cinna-menu__submenu-title') &&
          (node.classList.contains('cinna-menu__item--active') ||
            node.classList.contains('cinna-menu__item--child-active')),
      );
      if (title) return title;
    }
  }

  return null;
}

function findInlineMenuActiveTarget(root: HTMLDivElement) {
  return root.querySelector<HTMLElement>(
    [
      '.cinna-menu__item--active:not(.cinna-menu__item--title-only)',
      '.cinna-menu__submenu-title.cinna-menu__item--active:not(.cinna-menu__item--title-only)',
      '.cinna-menu__submenu-title.cinna-menu__item--child-active:not(.cinna-menu__item--title-only)',
    ].join(', '),
  );
}

function findMenuActiveTarget(root: HTMLDivElement, mode: MenuMode) {
  return mode === 'inline' ? findInlineMenuActiveTarget(root) : findTopLevelMenuActiveTarget(root);
}

export const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  const {
    items,
    selectedKey,
    defaultSelectedKey,
    selectedKeys,
    defaultSelectedKeys,
    openKeys,
    defaultOpenKeys,
    mode = 'vertical',
    theme = 'light',
    inlineCollapsed = false,
    collapsedWidth = 80,
    selectable = true,
    multiple = false,
    triggerSubMenuAction = 'hover',
    expandIcon,
    forceSubMenuRender = false,
    subMenuOpenDelay = 0,
    subMenuCloseDelay = 0.1,
    tooltip,
    popupRender,
    classNames,
    styles,
    onClick,
    onSelect,
    onDeselect,
    onOpenChange,
    inlineIndent = 24,
    className,
    style,
    ...rest
  } = props;
  const controlledSelectedKeys =
    selectedKeys ?? (selectedKey !== undefined ? [selectedKey] : undefined);
  const defaultKeys =
    defaultSelectedKeys ?? (defaultSelectedKey !== undefined ? [defaultSelectedKey] : []);
  const [innerSelectedKeys, setInnerSelectedKeys] = useState(defaultKeys);
  const [innerOpenKeys, setInnerOpenKeys] = useState(defaultOpenKeys ?? []);
  const openTimerRef = useRef<Record<string, number | undefined>>({});
  const closeTimerRef = useRef<Record<string, number | undefined>>({});
  const menuRootRef = useRef<HTMLDivElement | null>(null);
  const [activePillStyle, setActivePillStyle] = useState<React.CSSProperties>({});
  const activeKeys = controlledSelectedKeys ?? innerSelectedKeys;
  const activeOpenKeys = openKeys ?? innerOpenKeys;
  const collapsed = mode === 'inline' && inlineCollapsed;
  const semanticClassNames = resolveMenuSemanticMap(classNames, props);
  const semanticStyles = resolveMenuSemanticMap(styles, props);
  const activeKeySignature = activeKeys.join('\u0001');

  const setMenuRoot = (node: HTMLDivElement | null) => {
    menuRootRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  useEffect(() => {
    return () => {
      Object.values(openTimerRef.current).forEach((timer) => timer && window.clearTimeout(timer));
      Object.values(closeTimerRef.current).forEach((timer) => timer && window.clearTimeout(timer));
    };
  }, []);

  useLayoutEffect(() => {
    if (collapsed || !activeKeys.length) {
      setActivePillStyle({});
      return undefined;
    }

    const root = menuRootRef.current;
    const activeItem = root ? findMenuActiveTarget(root, mode) : null;
    if (!root || !activeItem) {
      setActivePillStyle({});
      return undefined;
    }

    let frame = 0;
    const updatePill = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rootRect = root.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();
        const nextX = itemRect.left - rootRect.left + root.scrollLeft;
        const nextY = itemRect.top - rootRect.top + root.scrollTop;

        setActivePillStyle({
          '--cinna-menu-active-opacity': '1',
          '--cinna-menu-active-x': `${nextX}px`,
          '--cinna-menu-active-y': `${nextY}px`,
          '--cinna-menu-active-width': `${itemRect.width}px`,
          '--cinna-menu-active-height': `${itemRect.height}px`,
        } as React.CSSProperties);
      });
    };

    updatePill();
    window.addEventListener('resize', updatePill);

    const Observer = window.ResizeObserver;
    const observer = Observer ? new Observer(updatePill) : null;
    observer?.observe(root);
    observer?.observe(activeItem);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', updatePill);
      observer?.disconnect();
    };
  }, [activeKeySignature, activeKeys.length, activeOpenKeys, collapsed, items, mode]);

  const setSelected = (nextKeys: string[]) => {
    if (!controlledSelectedKeys) setInnerSelectedKeys(nextKeys);
  };

  const setOpen = (nextKeys: string[]) => {
    if (!openKeys) setInnerOpenKeys(nextKeys);
    onOpenChange?.(nextKeys);
  };

  const openSubMenu = (key: string) => {
    if (activeOpenKeys.includes(key)) return;
    setOpen([...activeOpenKeys, key]);
  };

  const closeSubMenu = (key: string) => {
    if (!activeOpenKeys.includes(key)) return;
    setOpen(activeOpenKeys.filter((item) => item !== key));
  };

  const scheduleOpen = (key: string) => {
    window.clearTimeout(closeTimerRef.current[key]);
    window.clearTimeout(openTimerRef.current[key]);
    openTimerRef.current[key] = window.setTimeout(
      () => openSubMenu(key),
      Math.max(0, subMenuOpenDelay) * 1000,
    );
  };

  const scheduleClose = (key: string) => {
    window.clearTimeout(openTimerRef.current[key]);
    window.clearTimeout(closeTimerRef.current[key]);
    closeTimerRef.current[key] = window.setTimeout(
      () => closeSubMenu(key),
      Math.max(0, subMenuCloseDelay) * 1000,
    );
  };

  const toggleSubMenu = (
    item: MenuItem,
    keyPath: string[],
    event: React.MouseEvent<HTMLElement>,
  ) => {
    if (item.type === 'divider' || item.type === 'group' || item.disabled || !item.children?.length)
      return;
    item.onTitleClick?.({ key: item.key, keyPath, domEvent: event });
    const nextOpen = activeOpenKeys.includes(item.key)
      ? activeOpenKeys.filter((key) => key !== item.key)
      : [...activeOpenKeys, item.key];
    setOpen(nextOpen);
  };

  const select = (item: MenuItem, keyPath: string[], event: React.MouseEvent<HTMLElement>) => {
    if (item.type === 'divider' || item.type === 'group' || item.disabled || item.children?.length)
      return;
    const clickInfo: MenuClickInfo = { key: item.key, keyPath, domEvent: event };
    onClick?.(clickInfo);
    if (!selectable) return;

    const exists = activeKeys.includes(item.key);
    const nextKeys = multiple
      ? exists
        ? activeKeys.filter((key) => key !== item.key)
        : [...activeKeys, item.key]
      : [item.key];
    const selectInfo: MenuSelectInfo = { ...clickInfo, selectedKeys: nextKeys };
    setSelected(nextKeys);
    if (multiple && exists) onDeselect?.(item.key, selectInfo);
    else onSelect?.(item.key, selectInfo);
  };

  const rootStyle = {
    ...(collapsed
      ? { '--cinna-menu-collapsed-width': normalizePopupCssValue(collapsedWidth) }
      : null),
    ...semanticStyles.root,
    ...style,
  } as React.CSSProperties;

  return (
    <div
      ref={setMenuRoot}
      className={cx(
        'cinna-menu',
        `cinna-menu--${mode}`,
        `cinna-menu--${theme}`,
        collapsed && 'cinna-menu--collapsed',
        !selectable && 'cinna-menu--not-selectable',
        semanticClassNames.root,
        className,
      )}
      role="menu"
      style={rootStyle}
      {...rest}
    >
      <span className="cinna-menu__active-pill" aria-hidden="true" style={activePillStyle} />
      {renderMenuItems(items, {
        mode,
        theme,
        inlineIndent,
        collapsed,
        selectedKeys: activeKeys,
        openKeys: activeOpenKeys,
        triggerSubMenuAction,
        forceSubMenuRender,
        tooltip,
        expandIcon,
        popupRender,
        semanticClassNames,
        semanticStyles,
        onItemSelect: select,
        onSubMenuToggle: toggleSubMenu,
        onSubMenuOpen: scheduleOpen,
        onSubMenuClose: scheduleClose,
      })}
    </div>
  );
});

function resolveMenuSemanticMap<T extends string | React.CSSProperties>(
  map:
    | Partial<Record<MenuSemanticSlot, T>>
    | ((info: { props: MenuProps }) => Partial<Record<MenuSemanticSlot, T>>)
    | undefined,
  props: MenuProps,
) {
  if (!map) return {};
  return typeof map === 'function' ? map({ props }) : map;
}

function isMenuDivider(item: MenuItem): item is Extract<MenuItem, { type: 'divider' }> {
  return item.type === 'divider';
}

function isMenuGroup(item: MenuItem): item is Extract<MenuItem, { type: 'group' }> {
  return item.type === 'group';
}

function menuHasSelectedChild(item: MenuItem, selectedKeys: string[]): boolean {
  if (isMenuDivider(item) || !item.children?.length) return false;
  return item.children.some(
    (child) =>
      !isMenuDivider(child) &&
      !isMenuGroup(child) &&
      (selectedKeys.includes(child.key) || menuHasSelectedChild(child, selectedKeys)),
  );
}

function renderMenuItems(
  items: MenuItem[],
  options: MenuRenderOptions,
  level = 0,
  parentKeys: string[] = [],
): React.ReactNode {
  return items.map((item, index) => {
    if (isMenuDivider(item)) {
      return (
        <span
          key={item.key ?? `divider-${index}`}
          className={cx(
            'cinna-menu__divider',
            item.dashed && 'cinna-menu__divider--dashed',
            item.className,
            options.semanticClassNames.divider,
          )}
          role="separator"
          style={{ ...options.semanticStyles.divider, ...item.style }}
        />
      );
    }

    if (isMenuGroup(item)) {
      return (
        <div
          key={item.key ?? `group-${index}`}
          className={cx('cinna-menu__group', item.className, options.semanticClassNames.group)}
          role="group"
          style={{ ...options.semanticStyles.group, ...item.style }}
        >
          <span
            className={cx('cinna-menu__group-title', options.semanticClassNames.groupTitle)}
            style={options.semanticStyles.groupTitle}
          >
            {item.label}
          </span>
          <div className="cinna-menu__group-list">
            {renderMenuItems(item.children, options, level + 1, parentKeys)}
          </div>
        </div>
      );
    }

    const hasChildren = Boolean(item.children?.length);
    const keyPath = [item.key, ...parentKeys];
    const open = hasChildren && options.openKeys.includes(item.key);
    const selected = options.selectedKeys.includes(item.key);
    const childSelected = menuHasSelectedChild(item, options.selectedKeys);
    const itemTheme = item.theme ?? options.theme;
    const popupSubMenu = hasChildren && (options.mode !== 'inline' || options.collapsed);
    const titleOnly = options.collapsed && options.mode === 'inline';
    const itemPadding =
      !options.collapsed && options.mode === 'inline'
        ? { paddingLeft: level ? 14 + level * options.inlineIndent : undefined }
        : undefined;
    const expandIcon = hasChildren
      ? typeof options.expandIcon === 'function'
        ? options.expandIcon({ item, open, mode: options.mode, level })
        : (options.expandIcon ?? <Icon name="chevron-down" size={12} />)
      : null;

    const content = (
      <button
        key={item.key}
        type="button"
        role="menuitem"
        disabled={item.disabled}
        aria-haspopup={hasChildren || undefined}
        aria-expanded={hasChildren ? open : undefined}
        title={
          typeof item.title === 'string'
            ? item.title
            : typeof item.label === 'string'
              ? item.label
              : undefined
        }
        className={cx(
          hasChildren ? 'cinna-menu__submenu-title' : 'cinna-menu__item',
          selected && 'cinna-menu__item--active',
          childSelected && 'cinna-menu__item--child-active',
          open && 'cinna-menu__item--open',
          item.danger && 'cinna-menu__item--danger',
          item.disabled && 'cinna-menu__item--disabled',
          titleOnly && 'cinna-menu__item--title-only',
          item.className,
          hasChildren ? options.semanticClassNames.subMenuTitle : options.semanticClassNames.item,
        )}
        style={{
          ...itemPadding,
          ...(hasChildren ? options.semanticStyles.subMenuTitle : options.semanticStyles.item),
          ...item.style,
        }}
        onClick={(event) => {
          if (hasChildren) {
            if (
              options.mode === 'inline' ||
              options.collapsed ||
              options.triggerSubMenuAction === 'click'
            ) {
              options.onSubMenuToggle(item, keyPath, event);
            } else {
              item.onTitleClick?.({ key: item.key, keyPath, domEvent: event });
            }
            return;
          }
          options.onItemSelect(item, keyPath, event);
        }}
      >
        {item.icon && (
          <span
            className={cx('cinna-menu__icon', options.semanticClassNames.itemIcon)}
            style={options.semanticStyles.itemIcon}
          >
            {item.icon}
          </span>
        )}
        {!titleOnly && (
          <span
            className={cx('cinna-menu__content', options.semanticClassNames.itemContent)}
            style={options.semanticStyles.itemContent}
          >
            {item.label}
          </span>
        )}
        {!titleOnly && item.extra && (
          <span
            className={cx('cinna-menu__extra', options.semanticClassNames.itemExtra)}
            style={options.semanticStyles.itemExtra}
          >
            {item.extra}
          </span>
        )}
        {hasChildren && !titleOnly && (
          <span className="cinna-menu__expand-icon" aria-hidden="true">
            {expandIcon}
          </span>
        )}
      </button>
    );

    const maybeWithTooltip =
      !hasChildren && titleOnly && options.tooltip !== false ? (
        <Popup
          mode="tooltip"
          title={item.title ?? item.label}
          placement={options.tooltip?.placement ?? 'right'}
          styles={options.tooltip?.styles}
        >
          {content}
        </Popup>
      ) : (
        content
      );

    if (!hasChildren) return maybeWithTooltip;

    const list = (
      <div
        className={cx(
          'cinna-menu__submenu-list',
          `cinna-menu__submenu-list--${itemTheme}`,
          open && 'cinna-menu__submenu-list--open',
          options.semanticClassNames.subMenuList,
        )}
        role="menu"
        style={options.semanticStyles.subMenuList}
      >
        {renderMenuItems(item.children ?? [], options, popupSubMenu ? 0 : level + 1, keyPath)}
      </div>
    );
    const renderedListContent =
      (item.popupRender ?? options.popupRender)?.(list, { item, keyPath }) ?? list;
    const popupStyle = {
      ...(item.popupOffset
        ? {
            '--cinna-menu-popup-offset-x': normalizePopupCssValue(item.popupOffset[0]),
            '--cinna-menu-popup-offset-y': normalizePopupCssValue(item.popupOffset[1]),
          }
        : null),
      ...options.semanticStyles.popup,
    } as React.CSSProperties;
    const renderedList = popupSubMenu ? (
      <div
        className={cx(
          'cinna-menu__submenu-popup',
          `cinna-menu__submenu-popup--${itemTheme}`,
          open && 'cinna-menu__submenu-popup--open',
          item.popupClassName,
          options.semanticClassNames.popup,
        )}
        style={popupStyle}
      >
        {renderedListContent}
      </div>
    ) : (
      renderedListContent
    );

    return (
      <div
        key={item.key}
        className={cx(
          'cinna-menu__submenu',
          popupSubMenu && 'cinna-menu__submenu--popup',
          open && 'cinna-menu__submenu--open',
          childSelected && 'cinna-menu__submenu--child-active',
          `cinna-menu__submenu--${itemTheme}`,
        )}
        onMouseEnter={
          popupSubMenu && options.triggerSubMenuAction === 'hover' && !item.disabled
            ? () => options.onSubMenuOpen(item.key)
            : undefined
        }
        onMouseLeave={
          popupSubMenu && options.triggerSubMenuAction === 'hover' && !item.disabled
            ? () => options.onSubMenuClose(item.key)
            : undefined
        }
      >
        {titleOnly && options.tooltip !== false ? (
          <Popup
            mode="tooltip"
            title={item.title ?? item.label}
            placement={options.tooltip?.placement ?? 'right'}
            styles={options.tooltip?.styles}
          >
            {content}
          </Popup>
        ) : (
          content
        )}
        {(open || options.forceSubMenuRender || !popupSubMenu) && renderedList}
      </div>
    );
  });
}
