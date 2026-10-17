// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const uploadApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Upload',
      rows: [
        ['label', '关联控件的标签。', 'React.ReactNode', "'Choose file'"],
        ['hint', 'hint 的配置或回调。', 'React.ReactNode', '-'],
        ['showUploadList', '显示文件列表。', 'boolean', 'true'],
        ['buttonProps', 'buttonProps 的配置或回调。', 'React.HTMLAttributes<HTMLSpanElement>', '-'],
        ['fileList', '受控文件列表及上传状态。', 'UploadFile[]', '-'],
        ['defaultFileList', '初始文件列表。', 'UploadFile[]', '[]'],
        ['onFilesChange', '文件列表或上传状态变化时调用。', '(files: UploadFile[]) => void', '-'],
        ['action', '上传 POST 目标；未配置时只选择本地文件。', 'string', '-'],
        ['name', '字段名或原生输入 name。', 'string', "'file'"],
        ['headers', 'headers 的配置或回调。', 'Record<string, string>', '-'],
        ['withCredentials', 'withCredentials 的配置或回调。', 'boolean', '-'],
        ['data', 'data 的配置或回调。', 'Record<string, string>', '-'],
        [
          'beforeUpload',
          '上传前校验；返回 false 拒绝文件。',
          '(file: File, files: File[]) => boolean | void | Promise<boolean | void>',
          '-',
        ],
        [
          'onRemove',
          '移除前回调；返回 false 阻止移除。',
          '(file: UploadFile) => boolean | void | Promise<boolean | void>',
          '-',
        ],
        [
          'customRequest',
          '自定义请求，提供进度、成功、失败回调。',
          '(options: UploadRequestOptions) => void | (() => void) | Promise<unknown>',
          '-',
        ],
        ['maxCount', '列表最多保留的文件数；1 时替换文件。', 'number', '-'],
        ['draggable', '允许拖放文件。', 'boolean', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Upload',
      rows: [
        ['label', 'Label for the associated control.', 'React.ReactNode', "'Choose file'"],
        ['hint', 'Configuration or callback for hint.', 'React.ReactNode', '-'],
        ['showUploadList', 'Show the file list.', 'boolean', 'true'],
        [
          'buttonProps',
          'Configuration or callback for buttonProps.',
          'React.HTMLAttributes<HTMLSpanElement>',
          '-',
        ],
        ['fileList', 'Controlled file list and upload status.', 'UploadFile[]', '-'],
        ['defaultFileList', 'Initial file list.', 'UploadFile[]', '[]'],
        [
          'onFilesChange',
          'Called when files or upload states change.',
          '(files: UploadFile[]) => void',
          '-',
        ],
        ['action', 'POST upload URL; without it, files remain local.', 'string', '-'],
        ['name', 'Field name or native input name.', 'string', "'file'"],
        ['headers', 'Configuration or callback for headers.', 'Record<string, string>', '-'],
        ['withCredentials', 'Configuration or callback for withCredentials.', 'boolean', '-'],
        ['data', 'Configuration or callback for data.', 'Record<string, string>', '-'],
        [
          'beforeUpload',
          'Validate before uploading; false rejects the file.',
          '(file: File, files: File[]) => boolean | void | Promise<boolean | void>',
          '-',
        ],
        [
          'onRemove',
          'Before removal; false prevents removal.',
          '(file: UploadFile) => boolean | void | Promise<boolean | void>',
          '-',
        ],
        [
          'customRequest',
          'Custom request with progress, success and error callbacks.',
          '(options: UploadRequestOptions) => void | (() => void) | Promise<unknown>',
          '-',
        ],
        ['maxCount', 'Maximum file count; 1 replaces the existing file.', 'number', '-'],
        ['draggable', 'Allow dropping files.', 'boolean', '-'],
      ],
    },
  ],
};
