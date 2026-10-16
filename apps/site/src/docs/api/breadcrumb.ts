// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
import { breadcrumbApiRows as curated } from './curated/breadcrumb';
import { mergeApiSections } from './merge';
const generated: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Breadcrumb',
      rows: [
        ['items', '展示项目。', 'BreadcrumbItem[]', '-'],
        ['separator', 'separator 的配置或回调。', 'React.ReactNode', "'/'"],
        [
          'onItemClick',
          'onItemClick 的配置或回调。',
          '( event: React.MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number, ) => void',
          '-',
        ],
        [
          'onMenuSelect',
          'onMenuSelect 的配置或回调。',
          '(key: string, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
      ],
    },
  ],
  en: [
    {
      title: 'Breadcrumb',
      rows: [
        ['items', 'Items to display.', 'BreadcrumbItem[]', '-'],
        ['separator', 'Configuration or callback for separator.', 'React.ReactNode', "'/'"],
        [
          'onItemClick',
          'Configuration or callback for onItemClick.',
          '( event: React.MouseEvent<HTMLAnchorElement>, item: BreadcrumbItem, index: number, ) => void',
          '-',
        ],
        [
          'onMenuSelect',
          'Configuration or callback for onMenuSelect.',
          '(key: string, item: BreadcrumbItem, index: number) => void',
          '-',
        ],
      ],
    },
  ],
};
export const breadcrumbApiRows = {
  zh: mergeApiSections(curated.zh, generated.zh),
  en: mergeApiSections(curated.en, generated.en),
};
