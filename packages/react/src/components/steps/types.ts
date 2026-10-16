import React from 'react';
import type { CinnaSize } from '../shared';

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'loading';

export type StepsDirection = 'horizontal' | 'vertical';

export type StepsLabelPlacement = 'right' | 'bottom' | 'horizontal' | 'vertical';

export type StepsType = 'default' | 'minimal';

export type StepsMarkerShape = 'circle' | 'rounded';

export interface StepItem {
  key?: string | number;
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  description?: React.ReactNode;
  content?: React.ReactNode;
  status?: StepStatus;
  icon?: React.ReactNode;
  logo?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (index: number, event: React.MouseEvent<HTMLElement>) => void;
}

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: StepItem[];
  current?: number;
  defaultCurrent?: number;
  direction?: StepsDirection;
  size?: CinnaSize;
  status?: StepStatus;
  labelPlacement?: StepsLabelPlacement;
  type?: StepsType;
  clickable?: boolean;
  underline?: boolean;
  markerShape?: StepsMarkerShape;
  connector?: React.ReactNode;
  connectorCount?: number;
  connectorColor?: string;
  markerFontSize?: number | string;
  markerFontWeight?: React.CSSProperties['fontWeight'];
  markerColor?: string;
  markerBackgroundColor?: string;
  markerBorderColor?: string;
  titleFontSize?: number | string;
  titleFontWeight?: React.CSSProperties['fontWeight'];
  titleColor?: string;
  subTitleFontSize?: number | string;
  subTitleColor?: string;
  descriptionFontSize?: number | string;
  descriptionColor?: string;
  onChange?: (current: number, item: StepItem, event: React.MouseEvent<HTMLElement>) => void;
}
