import React from 'react';
import type { CinnaSize, CinnaStatus } from '../shared';

export type CascaderOptionValue = string | number;

export type CascaderValue = CascaderOptionValue[];

export type CascaderMultipleValue = CascaderValue[];

export type CascaderRawValue = CascaderOptionValue | CascaderValue | CascaderMultipleValue;

export type CascaderExpandTrigger = 'click' | 'hover';

export type CascaderPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export type CascaderVariant = 'outlined' | 'filled' | 'borderless' | 'underlined';

export type CascaderShowCheckedStrategy = 'SHOW_PARENT' | 'SHOW_CHILD';

export type CascaderSemanticSlot =
  | 'root'
  | 'control'
  | 'prefix'
  | 'content'
  | 'placeholder'
  | 'tag'
  | 'clear'
  | 'suffix'
  | 'popup'
  | 'menus'
  | 'menu'
  | 'option'
  | 'search'
  | 'empty';

export interface CascaderOption {
  label?: React.ReactNode;
  value?: CascaderOptionValue;
  children?: CascaderOption[];
  disabled?: boolean;
  isLeaf?: boolean;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export interface CascaderFieldNames {
  label?: string;
  value?: string;
  children?: string;
  disabled?: string;
  isLeaf?: string;
  loading?: string;
}

export interface CascaderSearchConfig {
  filter?: (inputValue: string, path: CascaderOption[]) => boolean;
  sort?: (a: CascaderOption[], b: CascaderOption[], inputValue: string) => number;
  render?: (inputValue: string, path: CascaderOption[]) => React.ReactNode;
  limit?: number | false;
  matchInputWidth?: boolean;
  searchValue?: string;
  onSearch?: (value: string) => void;
  autoClearSearchValue?: boolean;
  searchIcon?: React.ReactNode;
}

export interface CascaderTagRenderInfo {
  label: React.ReactNode;
  value: CascaderValue;
  option: CascaderOption;
  path: CascaderOption[];
  onClose: () => void;
}

export interface CascaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue' | 'children' | 'prefix'
> {
  options?: CascaderOption[];
  value?: CascaderRawValue;
  defaultValue?: CascaderRawValue;
  multiple?: boolean;
  onChange?: (
    value: CascaderValue | CascaderMultipleValue,
    selectedOptions: CascaderOption[] | CascaderOption[][],
  ) => void;
  placeholder?: React.ReactNode;
  separator?: React.ReactNode;
  allowClear?: boolean | { clearIcon?: React.ReactNode };
  changeOnSelect?: boolean;
  disabled?: boolean;
  displayRender?: (labels: React.ReactNode[], selectedOptions: CascaderOption[]) => React.ReactNode;
  tagRender?: (info: CascaderTagRenderInfo) => React.ReactNode;
  expandTrigger?: CascaderExpandTrigger;
  expandIcon?: React.ReactNode;
  fieldNames?: CascaderFieldNames;
  onLoadError?: (error: unknown, options: CascaderOption[]) => void;
  loadData?: (
    selectedOptions: CascaderOption[],
  ) => void | CascaderOption[] | Promise<void | CascaderOption[]>;
  loadingIcon?: React.ReactNode;
  maxTagCount?: number | 'responsive';
  maxTagPlaceholder?:
    React.ReactNode | ((omittedValues: CascaderTagRenderInfo[]) => React.ReactNode);
  maxTagTextLength?: number;
  notFoundContent?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: CascaderPlacement;
  prefix?: React.ReactNode;
  popupRender?: (menus: React.ReactNode) => React.ReactNode;
  showCheckedStrategy?: CascaderShowCheckedStrategy;
  showSearch?: boolean | CascaderSearchConfig;
  suffixIcon?: React.ReactNode;
  removeIcon?: React.ReactNode;
  controlSize?: CinnaSize;
  size?: CinnaSize;
  status?: Exclude<CinnaStatus, 'info'>;
  variant?: CascaderVariant;
  optionRender?: (option: CascaderOption, path: CascaderOption[]) => React.ReactNode;
  classNames?: Partial<Record<CascaderSemanticSlot, string>>;
  styles?: Partial<Record<CascaderSemanticSlot, React.CSSProperties>>;
}
