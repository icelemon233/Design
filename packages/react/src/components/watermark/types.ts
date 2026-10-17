import React from 'react';

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  content?: string;
  rotate?: number;
  gap?: number;
  opacity?: number;
  fontSize?: number;
}
