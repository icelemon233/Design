import React from 'react';

export interface TimelineItem {
  children: React.ReactNode;
  color?: 'blue' | 'butter' | 'strawberry' | 'pistachio';
  label?: React.ReactNode;
  dot?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  mode?: 'left' | 'right' | 'alternate';
  reverse?: boolean;
  pending?: React.ReactNode;
}
