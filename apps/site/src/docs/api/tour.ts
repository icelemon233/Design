// Generated from component types. Run pnpm docs:api after changing props.
import type { ApiSection, SiteLanguage } from '../../types';
export const tourApiRows: Record<SiteLanguage, ApiSection[]> = {
  zh: [
    {
      title: 'Tour',
      rows: [
        ['open', '受控的打开状态。', 'boolean', '-'],
        ['current', '受控阶段或页码。', 'number', '-'],
        ['defaultCurrent', '初始阶段或页码。', 'number', '0'],
        ['steps', '引导步骤，可指定目标元素。', 'TourStep[]', '-'],
        ['onChange', '值变更时调用。', '(current: number) => void', '-'],
        ['onClose', '关闭时调用。', '() => void', '-'],
        ['onFinish', '完成时调用。', '() => void', '-'],
      ],
    },
  ],
  en: [
    {
      title: 'Tour',
      rows: [
        ['open', 'Controlled open state.', 'boolean', '-'],
        ['current', 'Controlled step or page.', 'number', '-'],
        ['defaultCurrent', 'Initial step or page.', 'number', '0'],
        ['steps', 'Tour steps with optional target elements.', 'TourStep[]', '-'],
        ['onChange', 'Called when the value changes.', '(current: number) => void', '-'],
        ['onClose', 'Called when closed.', '() => void', '-'],
        ['onFinish', 'Called when finished.', '() => void', '-'],
      ],
    },
  ],
};
