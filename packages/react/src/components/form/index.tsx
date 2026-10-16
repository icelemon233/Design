import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react';
import { DisabledContext, useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type {
  FormError,
  FormInstance,
  FormItemProps,
  FormProps,
  FormRule,
  FormValues,
  Store,
} from './types';
export type {
  FormError,
  FormInstance,
  FormItemProps,
  FormProps,
  FormRule,
  FormValues,
} from './types';

function createStore(initialValues: FormValues = {}): Store {
  let initial = { ...initialValues },
    state = { values: { ...initial }, errors: {} as Record<string, string[]> };
  const listeners = new Set<() => void>(),
    fields = new Map<string, FormRule[]>();
  const emit = () => listeners.forEach((fn) => fn());
  const store: Store = {
    submitElement: null,
    subscribe: (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    snapshot: () => state,
    getFieldsValue: () => ({ ...state.values }),
    getFieldValue: (name) => state.values[name],
    initial: (values) => {
      initial = { ...values };
      state = { values: { ...values, ...state.values }, errors: {} };
      emit();
    },
    setFieldsValue: (values) => {
      state = { values: { ...state.values, ...values }, errors: {} };
      emit();
    },
    setValue: (name, value) => {
      const errors = { ...state.errors };
      delete errors[name];
      state = { values: { ...state.values, [name]: value }, errors };
      emit();
    },
    resetFields: () => {
      state = { values: { ...initial }, errors: {} };
      emit();
    },
    register: (name, rules) => {
      fields.set(name, rules);
      return () => {
        fields.delete(name);
      };
    },
    submit: () => store.submitElement?.requestSubmit(),
    validateFields: async () => {
      const source = state.values;
      const values = { ...source },
        errors: Record<string, string[]> = {};
      for (const [name, rules] of [...fields]) {
        for (const rule of rules) {
          const value = values[name];
          const empty =
            value === undefined ||
            value === null ||
            value === false ||
            (typeof value === 'string' && !value.trim()) ||
            (Array.isArray(value) && !value.length);
          let message = '';
          if (rule.required && empty) message = 'This field is required.';
          else if (!empty) {
            const measure = typeof value === 'number' ? value : String(value).length;
            if (
              rule.pattern &&
              !new RegExp(rule.pattern.source, rule.pattern.flags.replace('g', '')).test(
                String(value),
              )
            )
              message = 'Enter a valid value.';
            else if (rule.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value)))
              message = 'Enter a valid email address.';
            else if (
              rule.type === 'number' &&
              (typeof value !== 'number' || !Number.isFinite(value))
            )
              message = 'Enter a number.';
            else if (rule.min !== undefined && measure < rule.min) message = 'Value is too small.';
            else if (rule.max !== undefined && measure > rule.max) message = 'Value is too large.';
          }
          if (!message && rule.validator) {
            try {
              await rule.validator(value, values);
            } catch (error) {
              message = error instanceof Error ? error.message : 'Validation failed.';
            }
          }
          if (message) (errors[name] ??= []).push(rule.message ?? message);
        }
      }
      if (state.values !== source) return store.validateFields();
      state = { ...state, errors };
      emit();
      const errorFields = Object.entries(errors).map(([name, errors]) => ({ name, errors }));
      if (errorFields.length) throw { values, errorFields } satisfies FormError;
      return values;
    },
  };
  return store;
}

export function useForm(): [FormInstance] {
  const [form] = useState(() => createStore());
  return [form];
}

const FormContext = createContext<{
  store: Store;
  disabled?: boolean;
  requiredMark?: boolean | 'optional';
} | null>(null);

const FormBase = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      layout = 'vertical',
      disabled: disabledProp,
      requiredMark = true,
      form,
      initialValues = {},
      onFinish,
      onFinishFailed,
      onValuesChange,
      className,
      children,
      onSubmit,
      onReset,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [local] = useState(() => createStore(initialValues));
    const store = (form ?? local) as Store;
    const initialRef = useRef(initialValues);
    const [submissionError, setSubmissionError] = useState('');
    useEffect(() => {
      store.initial(initialRef.current);
    }, [store]);
    return (
      <FormContext.Provider value={{ store, disabled, requiredMark }}>
        <form
          {...rest}
          ref={(node) => {
            store.submitElement = node;
            if (typeof ref === 'function') ref(node);
            else if (ref) ref.current = node;
          }}
          className={cx(
            'cinna-form',
            'cinna-form--' + layout,
            disabled && 'cinna-form--disabled',
            className,
          )}
          aria-disabled={disabled || undefined}
          noValidate
          onReset={(event) => {
            onReset?.(event);
            if (!event.defaultPrevented) store.resetFields();
          }}
          onSubmit={async (event) => {
            onSubmit?.(event);
            if (event.defaultPrevented || disabled) {
              event.preventDefault();
              return;
            }
            if (!onFinish && !onFinishFailed) return;
            event.preventDefault();
            setSubmissionError('');
            try {
              const values = await store.validateFields();
              await onFinish?.(values);
            } catch (error) {
              if (error && typeof error === 'object' && 'errorFields' in error) {
                onFinishFailed?.(error as FormError);
                const name = (error as FormError).errorFields[0]?.name;
                const field = Array.from(
                  store.submitElement?.querySelectorAll<HTMLElement>('[name]') ?? [],
                ).find((node) => node.getAttribute('name') === name);
                const target = field?.matches('input,select,textarea,button,[tabindex]')
                  ? field
                  : field?.querySelector<HTMLElement>(
                      'input:not([type=hidden]),select,textarea,button,[tabindex]',
                    );
                target?.focus();
              } else
                setSubmissionError(
                  error instanceof Error ? error.message : 'Unable to submit. Try again.',
                );
            }
          }}
        >
          {submissionError && <p role="alert">{submissionError}</p>}
          <DisabledContext.Provider value={disabled}>
            <fieldset disabled={disabled} className="cinna-form__fieldset">
              <FormChangeContext.Provider value={onValuesChange}>
                {children}
              </FormChangeContext.Provider>
            </fieldset>
          </DisabledContext.Provider>
        </form>
      </FormContext.Provider>
    );
  },
);

FormBase.displayName = 'Form';

const FormChangeContext = createContext<FormProps['onValuesChange']>(undefined);

export const Form = Object.assign(FormBase, { useForm });

export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  (
    {
      label,
      help,
      required,
      validateStatus,
      extra,
      name,
      rules = [],
      valuePropName,
      trigger,
      getValueFromEvent,
      htmlFor,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const context = useContext(FormContext),
      onValuesChange = useContext(FormChangeContext);
    const id = useId();
    const store = context?.store;
    const snapshot = useSyncExternalStore(
      store?.subscribe ?? (() => () => {}),
      store?.snapshot ?? (() => emptySnapshot),
      store?.snapshot ?? (() => emptySnapshot),
    );

    useEffect(() => {
      if (!name || !store) return;
      return store.register(
        name,
        required && !rules.some((rule) => rule.required) ? [{ required: true }, ...rules] : rules,
      );
    }, [name, store, required, rules]);
    const errors = name ? snapshot.errors[name] : undefined;
    const status = errors?.length ? 'error' : validateStatus;
    const inputId =
      htmlFor ??
      (React.isValidElement<{ id?: string }>(children) ? children.props.id : undefined) ??
      id;
    let field = children;
    if (React.isValidElement<Record<string, unknown>>(children)) {
      const properties: Record<string, unknown> = {
        id: inputId,
        'aria-invalid': status === 'error' || undefined,
        'aria-labelledby': label ? id + '-label' : undefined,
        'aria-describedby': help || errors?.length ? id + '-help' : undefined,
        disabled: context?.disabled || children.props.disabled,
      };
      if (name && store) {
        properties.name = name;
        const componentName = (children.type as { displayName?: string }).displayName;
        const fieldProp =
          valuePropName ??
          (componentName === 'Upload'
            ? 'fileList'
            : componentName === 'Checkbox' || componentName === 'Switch'
              ? 'checked'
              : 'value');
        const triggerName = trigger ?? (componentName === 'Upload' ? 'onFilesChange' : 'onChange');
        const nativeFile = children.type === 'input' && children.props.type === 'file';
        if (!nativeFile)
          properties[fieldProp] =
            snapshot.values[name] ??
            (fieldProp === 'checked' ? false : fieldProp === 'fileList' ? [] : '');
        const previous = children.props[triggerName] as ((...args: unknown[]) => void) | undefined;
        properties[triggerName] = (...args: unknown[]) => {
          const event = args[0] as { target?: { value?: unknown; checked?: boolean } };
          const next = getValueFromEvent
            ? getValueFromEvent(...args)
            : nativeFile
              ? Array.from((event.target as { files?: FileList })?.files ?? [])
              : event && typeof event === 'object' && event.target
                ? (event.target as Record<string, unknown>)[fieldProp]
                : args[0];
          store.setValue(name, next);
          previous?.(...args);
          onValuesChange?.({ [name]: next }, store.getFieldsValue());
        };
      }
      field = React.cloneElement(children, properties);
    }
    const isRequired = required || rules.some((rule) => rule.required);
    return (
      <div
        {...rest}
        ref={ref}
        className={cx('cinna-form-item', status && 'cinna-form-item--' + status, className)}
      >
        {label && (
          <label id={id + '-label'} htmlFor={inputId}>
            {isRequired && context?.requiredMark !== false && <span aria-hidden="true">*</span>}
            {label}
            {!isRequired && context?.requiredMark === 'optional' && <small> (optional)</small>}
          </label>
        )}
        {field}
        {(errors?.length || help) && (
          <small id={id + '-help'} role={errors?.length ? 'alert' : undefined}>
            {errors?.join(' ') ?? help}
          </small>
        )}
        {extra && <em>{extra}</em>}
      </div>
    );
  },
);

FormItem.displayName = 'FormItem';

const emptySnapshot = { values: {} as FormValues, errors: {} as Record<string, string[]> };
