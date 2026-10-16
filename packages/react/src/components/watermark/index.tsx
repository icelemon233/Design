import React from 'react';
import { cx } from '../../utils/cx';
import type { WatermarkProps } from './types';
export type { WatermarkProps } from './types';

export const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  (
    {
      content = 'Cinna Design',
      rotate = -18,
      gap = 120,
      opacity = 0.08,
      fontSize = 16,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const escape = (value: string) =>
      value.replace(
        /[&<>"']/g,
        (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]!,
      );
    const size = Math.max(80, gap);
    const svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="' +
      size +
      '" height="' +
      size +
      '"><text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="' +
      Math.max(8, fontSize) +
      '" fill="#46332a" transform="rotate(' +
      rotate +
      ' ' +
      size / 2 +
      ' ' +
      size / 2 +
      ')">' +
      escape(content) +
      '</text></svg>';
    return (
      <div {...rest} ref={ref} className={cx('cinna-watermark', className)} style={style}>
        {children}
        <span
          className="cinna-watermark__tile"
          aria-hidden="true"
          style={{
            backgroundImage: 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")',
            opacity: Math.max(0, Math.min(1, opacity)),
          }}
        />
      </div>
    );
  },
);

Watermark.displayName = 'Watermark';
