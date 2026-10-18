import React from 'react';
import plus from '../../assets/icons/cinna-plus.png';
import grid from '../../assets/icons/cinna-grid.png';
import activity from '../../assets/icons/cinna-activity.png';
import settings from '../../assets/icons/cinna-settings.png';
import users from '../../assets/icons/cinna-users.png';
import grip from '../../assets/icons/cinna-grip.png';
import { default as arrowTailDownLeft } from '../../assets/icons/cinna-arrow-tail-down-left.png';
import { default as arrowTailDownRight } from '../../assets/icons/cinna-arrow-tail-down-right.png';
import { default as arrowTailDown } from '../../assets/icons/cinna-arrow-tail-down.png';
import { default as arrowTailLeft } from '../../assets/icons/cinna-arrow-tail-left.png';
import { default as arrowTailRight } from '../../assets/icons/cinna-arrow-tail-right.png';
import { default as arrowTailUpLeft } from '../../assets/icons/cinna-arrow-tail-up-left.png';
import { default as arrowTailUpRight } from '../../assets/icons/cinna-arrow-tail-up-right.png';
import { default as arrowTailUp } from '../../assets/icons/cinna-arrow-tail-up.png';
import { default as chevronDown } from '../../assets/icons/cinna-chevron-down.png';
import { default as chevronLeft } from '../../assets/icons/cinna-chevron-left.png';
import { default as chevronRight } from '../../assets/icons/cinna-chevron-right.png';
import { default as chevronUp } from '../../assets/icons/cinna-chevron-up.png';
import { default as closeBlue } from '../../assets/icons/cinna-close-blue.png';
import { default as closeRed } from '../../assets/icons/cinna-close-red.png';
import { cx } from '../../utils/cx';
import type { IconProps } from './types';
export type { IconName, IconProps } from './types';

export const iconSources = {
  plus,
  grid,
  activity,
  settings,
  users,
  grip,
  'arrow-tail-up': arrowTailUp,
  'arrow-tail-up-right': arrowTailUpRight,
  'arrow-tail-right': arrowTailRight,
  'arrow-tail-down-right': arrowTailDownRight,
  'arrow-tail-down': arrowTailDown,
  'arrow-tail-down-left': arrowTailDownLeft,
  'arrow-tail-left': arrowTailLeft,
  'arrow-tail-up-left': arrowTailUpLeft,
  'chevron-up': chevronUp,
  'chevron-right': chevronRight,
  'chevron-down': chevronDown,
  'chevron-left': chevronLeft,
  'close-blue': closeBlue,
  'close-red': closeRed,
} as const;

const normalizeIconSize = (size: number | string | undefined) => {
  if (typeof size === 'number') return `${size}px`;
  return size;
};

export const Icon = React.forwardRef<HTMLImageElement, IconProps>(
  ({ name, size = 16, alt = '', className, style, ...rest }, ref) => {
    const normalizedSize = normalizeIconSize(size);

    return (
      <img
        ref={ref}
        src={iconSources[name]}
        alt={alt}
        aria-hidden={alt ? rest['aria-hidden'] : true}
        className={cx('cinna-icon', `cinna-icon--${name}`, className)}
        draggable={false}
        style={{
          width: normalizedSize,
          height: normalizedSize,
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Icon.displayName = 'Icon';
