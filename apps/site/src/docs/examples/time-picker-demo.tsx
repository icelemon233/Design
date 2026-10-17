import { TimePicker } from '@cinna-design/react';
export default function TimePanelDemo() {
  return (
    <TimePicker
      defaultValue="09:30"
      minuteStep={15}
      use12Hours
      allowClear
      aria-label="Collection time"
      disabledHours={() => [0, 1, 2, 3, 4, 5, 6, 22, 23]}
    />
  );
}
