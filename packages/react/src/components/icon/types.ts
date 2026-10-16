import React from 'react';
import type { iconSources } from './index';

export type IconName = keyof typeof iconSources;

export interface IconProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  name: IconName;
  size?: number | string;
}
