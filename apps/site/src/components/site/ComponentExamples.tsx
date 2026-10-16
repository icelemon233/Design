import { Alert, Button, Skeleton } from '@cinna-design/react';
import { buttonExamples } from '../../docs/buttonDocs';
import { useComponentDoc } from '../../hooks/useComponentDoc';
import type { SiteLanguage } from '../../types';
import { ComponentExampleBlock } from './ComponentExampleBlock';
import { DocFrame } from './DocFrame';
export const ComponentExamples = ({
  route,
  language,
}: {
  route: string;
  language: SiteLanguage;
}) => {
  const { config, error, retry } = useComponentDoc(route);
  const examples = route === 'button' ? buttonExamples : (config?.examples ?? []);
  return (
    <DocFrame
      className="demo-section demo-section--merged"
      icon="sample"
      id="basic-title"
      title={language === 'zh' ? '使用示例' : 'Usage'}
    >
      <div className="component-example-list">
        {error ? (
          <Alert
            type="error"
            message={language === 'zh' ? '示例加载失败' : 'Unable to load examples'}
            action={
              <Button size="small" onClick={retry}>
                {language === 'zh' ? '重试' : 'Retry'}
              </Button>
            }
          />
        ) : route !== 'button' && !config ? (
          <Skeleton rows={3} />
        ) : null}
        {examples.map((example) => (
          <ComponentExampleBlock
            key={example.id}
            example={example}
            language={language}
            isButton={route === 'button'}
          />
        ))}
      </div>
    </DocFrame>
  );
};
