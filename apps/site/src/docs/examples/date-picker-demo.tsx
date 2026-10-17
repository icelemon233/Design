import { DatePicker } from '@cinna-design/react';
export default function CalendarPanelDemo() {
  return (
    <DatePicker
      defaultValue="2026-10-17"
      min="2026-10-01"
      max="2026-12-31"
      allowClear
      aria-label="Delivery date"
      disabledDate={(date) => date.getDay() === 0}
    />
  );
}
