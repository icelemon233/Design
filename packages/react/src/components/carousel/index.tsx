import React, { useEffect, useState } from 'react';
import { cx } from '../../utils/cx';
import { Icon } from '../icon';
import type { CarouselProps } from './types';
export type { CarouselProps } from './types';

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      items,
      autoplay,
      autoplaySpeed = 2600,
      defaultActiveIndex = 0,
      activeIndex,
      pauseOnHover = true,
      dots = true,
      arrows = true,
      afterChange,
      className,
      onMouseEnter,
      onMouseLeave,
      ...rest
    },
    ref,
  ) => {
    const [inner, setActive] = useState(defaultActiveIndex);
    const [paused, setPaused] = useState(false);
    const count = Math.max(items.length, 1);
    const active = Math.max(0, Math.min(count - 1, activeIndex ?? inner));
    useEffect(() => {
      if (activeIndex === undefined)
        setActive((current) => Math.max(0, Math.min(count - 1, current)));
    }, [count, activeIndex]);
    const go = (next: number) => {
      const normalized = (next + count) % count;
      if (activeIndex === undefined) setActive(normalized);
      afterChange?.(normalized);
    };

    useEffect(() => {
      if (!autoplay || paused || count <= 1) return undefined;
      const timer = window.setInterval(() => {
        go(active + 1);
      }, autoplaySpeed);
      return () => window.clearInterval(timer);
    }, [active, activeIndex, afterChange, autoplay, autoplaySpeed, count, paused]);

    return (
      <div
        ref={ref}
        role="region"
        aria-roledescription="carousel"
        aria-label={rest['aria-label'] ?? 'Carousel'}
        className={cx('cinna-carousel', className)}
        onMouseEnter={(event) => {
          if (pauseOnHover) setPaused(true);
          onMouseEnter?.(event);
        }}
        onMouseLeave={(event) => {
          setPaused(false);
          onMouseLeave?.(event);
        }}
        {...rest}
      >
        <div className="cinna-carousel__viewport">
          <div
            className="cinna-carousel__track"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="cinna-carousel__item"
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${items.length}`}
                aria-hidden={index !== active}
                {...(index !== active ? { inert: '' } : {})}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        {arrows && items.length > 1 && (
          <span className="cinna-carousel__arrows">
            <button type="button" aria-label="Previous slide" onClick={() => go(active - 1)}>
              <Icon name="chevron-left" size={14} />
            </button>
            <button type="button" aria-label="Next slide" onClick={() => go(active + 1)}>
              <Icon name="chevron-right" size={14} />
            </button>
          </span>
        )}
        {dots && items.length > 1 && (
          <span className="cinna-carousel__dots">
            {items.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                className={cx(index === active && 'cinna-carousel__dot--active')}
                onClick={() => go(index)}
              />
            ))}
          </span>
        )}
      </div>
    );
  },
);

Carousel.displayName = 'Carousel';
