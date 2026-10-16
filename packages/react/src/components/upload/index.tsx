import React, { useEffect, useRef, useState } from 'react';
import { useDisabled } from '../../internal/DisabledContext';
import { cx } from '../../utils/cx';
import type { UploadFile, UploadProps, UploadRequestOptions } from './types';
export type { UploadFile, UploadProps, UploadRequestOptions } from './types';

let fileId = 0;

export const Upload = React.forwardRef<HTMLInputElement, UploadProps>(
  (
    {
      label = 'Choose file',
      hint,
      showUploadList = true,
      className,
      onChange,
      buttonProps,
      fileList,
      defaultFileList = [],
      onFilesChange,
      action,
      name = 'file',
      headers,
      withCredentials,
      data,
      beforeUpload,
      onRemove,
      customRequest,
      maxCount,
      draggable,
      disabled: disabledProp,
      multiple,
      accept,
      ...rest
    },
    ref,
  ) => {
    const disabled = useDisabled(disabledProp);
    const [inner, setInner] = useState(defaultFileList),
      [error, setError] = useState(''),
      [dragOver, setDragOver] = useState(false);
    const files = fileList ?? inner;
    const current = useRef(files),
      aborts = useRef(new Map<string, () => void>()),
      mounted = useRef(true),
      disabledRef = useRef(disabled);
    current.current = files;
    disabledRef.current = disabled;
    useEffect(() => {
      mounted.current = true;
      return () => {
        mounted.current = false;
        aborts.current.forEach((abort) => abort());
      };
    }, []);
    const commit = (next: UploadFile[]) => {
      if (!mounted.current) return;
      current.current = next;
      if (fileList === undefined) setInner(next);
      onFilesChange?.(next);
    };
    const update = (uid: string, patch: Partial<UploadFile>) => {
      if (!current.current.some((file) => file.uid === uid)) return;
      commit(current.current.map((file) => (file.uid === uid ? { ...file, ...patch } : file)));
    };
    const upload = (item: UploadFile) => {
      if (!mounted.current || disabledRef.current) return;
      const file = item.originFileObj;
      if (!file || (!action && !customRequest)) return;
      update(item.uid, { status: 'uploading', percent: 0, error: undefined });
      let finished = false;
      const finish = (patch: Partial<UploadFile>) => {
        if (finished) return;
        finished = true;
        aborts.current.delete(item.uid);
        update(item.uid, patch);
      };
      const options: UploadRequestOptions = {
        file,
        onProgress: (percent) => update(item.uid, { percent: Math.max(0, Math.min(100, percent)) }),
        onSuccess: (response) => finish({ status: 'done', percent: 100, response }),
        onError: (failure) => finish({ status: 'error', error: failure.message }),
      };
      if (customRequest) {
        try {
          const result = customRequest(options);
          if (typeof result === 'function') aborts.current.set(item.uid, result);
          else if (result && typeof result.then === 'function')
            result.then(
              (response) => options.onSuccess(response),
              (failure) =>
                options.onError(failure instanceof Error ? failure : new Error(String(failure))),
            );
        } catch (failure) {
          options.onError(failure instanceof Error ? failure : new Error(String(failure)));
        }
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open('POST', action!);
      xhr.withCredentials = !!withCredentials;
      Object.entries(headers ?? {}).forEach(([key, value]) => xhr.setRequestHeader(key, value));
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) options.onProgress((event.loaded / event.total) * 100);
      };
      xhr.onload = () =>
        xhr.status >= 200 && xhr.status < 300
          ? options.onSuccess(xhr.response)
          : options.onError(new Error('Upload failed (' + xhr.status + ').'));
      xhr.onerror = () => options.onError(new Error('Network error.'));
      xhr.onabort = () => {
        finished = true;
      };
      const body = new FormData();
      body.append(name, file);
      Object.entries(data ?? {}).forEach(([key, value]) => body.append(key, value));
      aborts.current.set(item.uid, () => xhr.abort());
      xhr.send(body);
    };
    const matches = (file: File) =>
      !accept ||
      accept.split(',').some((pattern) => {
        const rule = pattern.trim().toLowerCase();
        return rule.startsWith('.')
          ? file.name.toLowerCase().endsWith(rule)
          : rule.endsWith('/*')
            ? file.type.startsWith(rule.slice(0, -1))
            : file.type === rule;
      });
    const add = async (selected: File[]) => {
      if (disabled) return;
      if (!multiple) selected = selected.slice(0, 1);
      setError('');
      const accepted: UploadFile[] = [];
      for (const file of selected) {
        try {
          if (!matches(file)) {
            setError('File type is not accepted.');
            continue;
          }
          if ((await beforeUpload?.(file, selected)) === false) continue;
          if (!mounted.current || disabledRef.current) return;
          accepted.push({
            uid: 'cinna-upload-' + ++fileId,
            name: file.name,
            status: 'ready',
            originFileObj: file,
          });
        } catch (failure) {
          setError(failure instanceof Error ? failure.message : 'File validation failed.');
        }
      }
      if (!mounted.current || disabledRef.current) return;
      let next = [...current.current, ...accepted];
      if (maxCount !== undefined) {
        if (maxCount === 1)
          next = accepted.length ? [accepted[accepted.length - 1]] : current.current;
        else next = next.slice(0, Math.max(0, maxCount));
      }
      const kept = new Set(next.map((file) => file.uid));
      current.current
        .filter((file) => !kept.has(file.uid))
        .forEach((file) => aborts.current.get(file.uid)?.());
      commit(next);
      accepted.filter((file) => kept.has(file.uid)).forEach(upload);
    };
    const remove = async (file: UploadFile) => {
      if (disabled) return;
      try {
        if ((await onRemove?.(file)) === false || !mounted.current || disabledRef.current) return;
        aborts.current.get(file.uid)?.();
        aborts.current.delete(file.uid);
        commit(current.current.filter((item) => item.uid !== file.uid));
      } catch (failure) {
        setError(failure instanceof Error ? failure.message : 'Unable to remove file.');
      }
    };
    return (
      <div
        className={cx(
          'cinna-upload',
          draggable && 'cinna-upload--drag',
          dragOver && 'cinna-upload--drag-over',
          disabled && 'cinna-upload--disabled',
          className,
        )}
        onDragOver={(event) => {
          if (draggable && !disabled) {
            event.preventDefault();
            setDragOver(true);
          }
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          if (draggable && !disabled) {
            event.preventDefault();
            setDragOver(false);
            void add(Array.from(event.dataTransfer.files));
          }
        }}
      >
        <label className="cinna-upload__trigger">
          <input
            {...rest}
            ref={ref}
            type="file"
            name={name}
            disabled={disabled}
            multiple={multiple}
            accept={accept}
            aria-label={rest['aria-label'] ?? (typeof label === 'string' ? label : 'Choose file')}
            onChange={(event) => {
              const selected = Array.from(event.currentTarget.files ?? []);
              onChange?.(event);
              void add(selected);
              event.currentTarget.value = '';
            }}
          />
          <span {...buttonProps}>{label}</span>
        </label>
        {hint && <small>{hint}</small>}
        {error && <small role="alert">{error}</small>}
        {showUploadList && files.length > 0 && (
          <ul className="cinna-upload__list">
            {files.map((file) => (
              <li
                key={file.uid}
                className={'cinna-upload__file cinna-upload__file--' + file.status}
              >
                <span>{file.name}</span>
                <small role="status">
                  {file.status === 'uploading'
                    ? Math.round(file.percent ?? 0) + '%'
                    : file.status === 'error'
                      ? (file.error ?? 'Upload failed')
                      : file.status === 'done'
                        ? 'Uploaded'
                        : 'Ready'}
                </small>
                {file.status === 'uploading' && (
                  <progress
                    aria-label={'Upload ' + file.name}
                    value={file.percent ?? 0}
                    max={100}
                  />
                )}
                {file.status === 'error' && (
                  <button
                    type="button"
                    disabled={disabled}
                    aria-label={'Retry ' + file.name}
                    onClick={() => upload(file)}
                  >
                    Retry
                  </button>
                )}
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={'Remove ' + file.name}
                  onClick={() => void remove(file)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

Upload.displayName = 'Upload';
