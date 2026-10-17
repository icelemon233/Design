import React from 'react';

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  items: React.ReactNode[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  defaultActiveIndex?: number;
  activeIndex?: number;
  pauseOnHover?: boolean;
  dots?: boolean;
  arrows?: boolean;
  afterChange?: (activeIndex: number) => void;
}
