import React from 'react';
import type { CinnaStatus } from '../shared';

export type FormValues = Record<string, unknown>;

export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  type?: 'email' | 'number';
  validator?: (value: unknown, values: FormValues) => void | Promise<void>;
}

export interface FormError {
  values: FormValues;
  errorFields: Array<{ name: string; errors: string[] }>;
}

export interface FormInstance {
  getFieldsValue: () => FormValues;
  getFieldValue: (name: string) => unknown;
  setFieldsValue: (values: FormValues) => void;
  resetFields: () => void;
  validateFields: () => Promise<FormValues>;
  submit: () => void;
}

export interface Store extends FormInstance {
  subscribe: (fn: () => void) => () => void;
  snapshot: () => { values: FormValues; errors: Record<string, string[]> };
  register: (name: string, rules: FormRule[]) => () => void;
  initial: (values: FormValues) => void;
  setValue: (name: string, value: unknown) => void;
  submitElement: HTMLFormElement | null;
}

export interface FormProps extends Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  'onFinish' | 'onChange'
> {
  layout?: 'vertical' | 'horizontal' | 'inline';
  disabled?: boolean;
  requiredMark?: boolean | 'optional';
  form?: FormInstance;
  initialValues?: FormValues;
  onFinish?: (values: FormValues) => void | Promise<void>;
  onFinishFailed?: (error: FormError) => void;
  onValuesChange?: (changed: FormValues, values: FormValues) => void;
}

export interface FormItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  help?: React.ReactNode;
  required?: boolean;
  validateStatus?: Exclude<CinnaStatus, 'info'>;
  extra?: React.ReactNode;
  name?: string;
  rules?: FormRule[];
  valuePropName?: string;
  trigger?: string;
  getValueFromEvent?: (...args: unknown[]) => unknown;
  htmlFor?: string;
}
