import { Upload } from '@cinna-design/react';
export default function UploadRequestDemo() {
  return (
    <Upload
      label="Upload a sample"
      accept=".txt,.md"
      draggable
      maxCount={2}
      hint="Demo request. Choose a text or Markdown file; no file leaves your browser."
      beforeUpload={(file) => {
        if (file.size > 1024 * 1024) throw new Error('Choose a file smaller than 1 MB.');
      }}
      customRequest={({ onProgress, onSuccess }) => {
        onProgress(50);
        const timer = setTimeout(() => onSuccess({ demo: true }), 600);
        return () => clearTimeout(timer);
      }}
    />
  );
}
