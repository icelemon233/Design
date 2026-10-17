import React, { useEffect, useState } from 'react';
import { Dialog } from '../../internal/Dialog';
import { cx } from '../../utils/cx';
import type { ImageProps } from './types';
export type { ImageProps } from './types';

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    { caption, fallback, preview, className, onError, onClick, onKeyDown, src: source, ...rest },
    ref,
  ) => {
    const [previewOpen, setPreviewOpen] = useState(false),
      [src, setSrc] = useState(source),
      [scale, setScale] = useState(1),
      [rotation, setRotation] = useState(0);
    useEffect(() => {
      setSrc(source);
    }, [source]);
    const close = () => {
      setPreviewOpen(false);
      setScale(1);
      setRotation(0);
    };
    return (
      <figure className={cx('cinna-image', preview && 'cinna-image--previewable')}>
        <img
          {...rest}
          ref={ref}
          className={className}
          src={src}
          alt={rest.alt ?? ''}
          role={preview ? 'button' : rest.role}
          tabIndex={preview ? 0 : rest.tabIndex}
          aria-label={preview ? 'Preview ' + (rest.alt ?? 'image') : rest['aria-label']}
          onClick={(event) => {
            onClick?.(event);
            if (preview && !event.defaultPrevented) setPreviewOpen(true);
          }}
          onKeyDown={(event) => {
            onKeyDown?.(event);
            if (preview && !event.defaultPrevented && ['Enter', ' '].includes(event.key)) {
              event.preventDefault();
              setPreviewOpen(true);
            }
          }}
          onError={(event) => {
            if (fallback && src !== fallback) setSrc(fallback);
            onError?.(event);
          }}
        />
        {caption && <figcaption>{caption}</figcaption>}
        <Dialog
          open={previewOpen && !!src}
          onDismiss={close}
          maskClassName="cinna-image__preview"
          className="cinna-image__preview-panel"
          aria-label="Image preview"
        >
          <div className="cinna-image__tools">
            <button
              type="button"
              aria-label="Zoom out"
              disabled={scale <= 0.5}
              onClick={() => setScale((value) => Math.max(0.5, value - 0.25))}
            >
              −
            </button>
            <button
              type="button"
              aria-label="Zoom in"
              disabled={scale >= 3}
              onClick={() => setScale((value) => Math.min(3, value + 0.25))}
            >
              +
            </button>
            <button
              type="button"
              aria-label="Rotate image"
              onClick={() => setRotation((value) => value + 90)}
            >
              ↻
            </button>
            <button type="button" aria-label="Close image preview" onClick={close}>
              ×
            </button>
          </div>
          <img
            src={src}
            alt={rest.alt ?? ''}
            style={{ transform: 'scale(' + scale + ') rotate(' + rotation + 'deg)' }}
          />
        </Dialog>
      </figure>
    );
  },
);

Image.displayName = 'Image';
