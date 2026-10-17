import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { cx } from '../../utils/cx';
import type { TextAreaProps } from './types';
export type { TextAreaProps } from './types';

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { autoSize, showCount, maxLength, status, className, value, defaultValue, onChange, ...rest },
    ref,
  ) => {
    const [inner, setInner] = useState(String(defaultValue ?? ''));
    const current = String(value ?? inner);
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    useLayoutEffect(() => {
      if (!autoSize || !inputRef.current) return;
      const node = inputRef.current;
      const css = getComputedStyle(node);
      const line = parseFloat(css.lineHeight) || 22;
      const padding =
        parseFloat(css.paddingTop) +
        parseFloat(css.paddingBottom) +
        parseFloat(css.borderTopWidth) +
        parseFloat(css.borderBottomWidth);
      const config = typeof autoSize === 'object' ? autoSize : {};
      const min = (config.minRows ?? 2) * line + padding;
      const max = (config.maxRows ?? Infinity) * line + padding;
      node.style.height = 'auto';
      node.style.height =
        Math.max(
          min,
          Math.min(
            max,
            node.scrollHeight + parseFloat(css.borderTopWidth) + parseFloat(css.borderBottomWidth),
          ),
        ) + 'px';
      node.style.overflowY = node.scrollHeight > max ? 'auto' : 'hidden';
    }, [current, autoSize]);
    return (
      <label
        className={cx('cinna-textarea-wrap', status && `cinna-textarea-wrap--${status}`, className)}
      >
        <textarea
          ref={(node) => {
            inputRef.current = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          aria-label={rest['aria-label'] ?? rest.placeholder ?? 'Text input'}
          className={cx('cinna-textarea', autoSize && 'cinna-textarea--auto')}
          value={current}
          maxLength={maxLength}
          onChange={(event) => {
            setInner(event.currentTarget.value);
            onChange?.(event);
          }}
          {...rest}
        />
        {showCount && (
          <span className="cinna-textarea__count">
            {current.length}
            {maxLength ? ` / ${maxLength}` : null}
          </span>
        )}
      </label>
    );
  },
);

TextArea.displayName = 'TextArea';
