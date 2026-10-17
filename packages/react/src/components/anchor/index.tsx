import React, { useState } from 'react';
import { cx } from '../../utils/cx';
import type { AnchorItem, AnchorProps } from './types';
export type { AnchorDirection, AnchorItem, AnchorProps, AnchorTarget } from './types';

const queryAnchorTarget = (selector: string, container: HTMLElement | Window) => {
  const root = container instanceof Window ? document : container;
  return root.querySelector(selector);
};

const getAnchorTargetElement = (href: string, container: HTMLElement | Window) => {
  if (!href.startsWith('#')) return null;
  const id = href.slice(1);
  if (!id) return null;
  if (container instanceof Window) return document.getElementById(id);
  return container.querySelector(`[id="${id.replace(/"/g, '\\"')}"]`);
};

const resolveAnchorTarget = (item: AnchorItem, container: HTMLElement | Window) => {
  if (typeof item.anchorTarget === 'function') return item.anchorTarget();
  if (typeof item.anchorTarget === 'string') return queryAnchorTarget(item.anchorTarget, container);
  if (item.anchorTarget) return item.anchorTarget;
  return getAnchorTargetElement(item.href, container);
};

const scrollAnchorContainer = (
  container: HTMLElement | Window,
  target: Element,
  offset: number,
) => {
  const targetRect = target.getBoundingClientRect();
  if (container instanceof Window) {
    container.scrollTo?.({ top: targetRect.top + container.scrollY - offset, behavior: 'smooth' });
    return;
  }

  const containerRect = container.getBoundingClientRect();
  container.scrollTo?.({
    top: container.scrollTop + targetRect.top - containerRect.top - offset,
    behavior: 'smooth',
  });
};

export const Anchor = React.forwardRef<HTMLElement, AnchorProps>(
  (
    {
      items,
      offsetTop = 0,
      targetOffset,
      direction = 'vertical',
      affix = false,
      getContainer,
      defaultActiveHref,
      onItemClick,
      onChange,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const [activeHref, setActiveHref] = useState(defaultActiveHref ?? items[0]?.href ?? '');

    const activate = (href: string) => {
      setActiveHref(href);
      onChange?.(href);
    };

    return (
      <nav
        ref={ref}
        className={cx(
          'cinna-anchor',
          `cinna-anchor--${direction}`,
          affix && 'cinna-anchor--affix',
          className,
        )}
        style={{ top: offsetTop, ...style }}
        {...rest}
      >
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            className={cx(activeHref === item.href && 'cinna-anchor__item--active')}
            aria-current={activeHref === item.href ? 'true' : undefined}
            onClick={(event) => {
              onItemClick?.(event, item);
              if (event.defaultPrevented) return;
              const container = getContainer?.() ?? window;
              const target = container ? resolveAnchorTarget(item, container) : null;
              if (!target) return;
              event.preventDefault();
              scrollAnchorContainer(
                container,
                target,
                item.targetOffset ?? targetOffset ?? offsetTop,
              );
              activate(item.href);
            }}
          >
            {item.title}
          </a>
        ))}
      </nav>
    );
  },
);

Anchor.displayName = 'Anchor';
