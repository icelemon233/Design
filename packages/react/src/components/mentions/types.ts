import React from 'react';
import { type TextAreaProps } from '../textarea';

export interface MentionsProps extends Omit<TextAreaProps, 'onSelect'> {
  options?: Array<string | { label: React.ReactNode; value: string; disabled?: boolean }>;
  prefix?: string;
  onSelect?: (value: string) => void;
}
