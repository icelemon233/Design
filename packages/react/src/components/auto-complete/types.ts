import React from 'react';
import type { CinnaSize, CinnaStatus } from '../shared';

export type AutoCompleteVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';

export type AutoCompleteSemanticSlot =
  'root' | 'input' | 'clear' | 'popup' | 'list' | 'option' | 'empty';

export interface AutoCompleteOption {
  value: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface AutoCompleteProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'onSelect' | 'children' | 'styles'
> {
  options?: Array<string | AutoCompleteOption>;
  children?: React.ReactElement<React.InputHTMLAttributes<HTMLInputElement>>;
  controlSize?: CinnaSize;
  variant?: AutoCompleteVariant;
  status?: Exclude<CinnaStatus, 'info'>;
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  backfill?: boolean;
  defaultActiveFirstOption?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onChange?: (value: string) => void;
  onSelect?: (value: string, option: AutoCompleteOption) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;
  onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  onPopupScroll?: React.UIEventHandler<HTMLSpanElement>;
  filterOption?: boolean | ((inputValue: string, option: AutoCompleteOption) => boolean);
  notFoundContent?: React.ReactNode;
  popupRender?: (originNode: React.ReactNode) => React.ReactNode;
  popupMatchInputWidth?: boolean | number;
  classNames?: Partial<Record<AutoCompleteSemanticSlot, string>>;
  styles?: Partial<Record<AutoCompleteSemanticSlot, React.CSSProperties>>;
}
