import React from 'react';
import type { CinnaStatus } from '../shared';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  showCount?: boolean;
  maxLength?: number;
  status?: Exclude<CinnaStatus, 'info'>;
}
