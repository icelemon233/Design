import React from 'react';

export interface UploadFile {
  uid: string;
  name: string;
  status: 'ready' | 'uploading' | 'done' | 'error';
  percent?: number;
  response?: unknown;
  error?: string;
  originFileObj?: File;
}

export interface UploadRequestOptions {
  file: File;
  onProgress: (percent: number) => void;
  onSuccess: (response?: unknown) => void;
  onError: (error: Error) => void;
}

export interface UploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  showUploadList?: boolean;
  buttonProps?: React.HTMLAttributes<HTMLSpanElement>;
  fileList?: UploadFile[];
  defaultFileList?: UploadFile[];
  onFilesChange?: (files: UploadFile[]) => void;
  action?: string;
  name?: string;
  headers?: Record<string, string>;
  withCredentials?: boolean;
  data?: Record<string, string>;
  beforeUpload?: (file: File, files: File[]) => boolean | void | Promise<boolean | void>;
  onRemove?: (file: UploadFile) => boolean | void | Promise<boolean | void>;
  customRequest?: (options: UploadRequestOptions) => void | (() => void) | Promise<unknown>;
  maxCount?: number;
  draggable?: boolean;
}
