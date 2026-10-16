import React from 'react';
import type { CinnaStatus } from '../shared';

export interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  muted?: boolean;
  compact?: boolean;
}

export type TypographyEllipsis =
  | boolean
  | {
      rows?: number;
      expandable?: boolean;
      defaultExpanded?: boolean;
      moreText?: React.ReactNode;
      lessText?: React.ReactNode;
    };

export type TypographyCopyable =
  | boolean
  | {
      text?: string;
      copyText?: React.ReactNode;
      copiedText?: React.ReactNode;
      onCopy?: (text: string) => void;
    };

export interface TypographyActionOptions {
  children?: React.ReactNode;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
  defaultRows: number;
}

export interface TypographyActionState {
  contentClassName: string;
  contentStyle?: React.CSSProperties;
  actions: React.ReactNode;
  expanded: boolean;
}

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5;
  muted?: boolean;
  disabled?: boolean;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}

export interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
  muted?: boolean;
  disabled?: boolean;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  tone?: 'default' | 'secondary' | 'muted' | CinnaStatus;
  strong?: boolean;
  code?: boolean;
  mark?: boolean;
  delete?: boolean;
  underline?: boolean;
  disabled?: boolean;
  link?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  copyable?: TypographyCopyable;
  ellipsis?: TypographyEllipsis;
}
