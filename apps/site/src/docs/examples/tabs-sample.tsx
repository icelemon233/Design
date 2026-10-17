import {
  Checkbox,
  Icon,
  Tabs,
  type TabsPosition,
  type TabsProps,
  type TabsVariant,
} from '@cinna-design/react';
import { useRef, useState } from 'react';

export default function TabsSample({ language = 'en' }: { language?: 'zh' | 'en' }) {
  const zh = language === 'zh';
  const [variant, setVariant] = useState<TabsVariant>('bordered');
  const [position, setPosition] = useState<TabsPosition>('top');
  const [size, setSize] = useState<NonNullable<TabsProps['size']>>('medium');
  const [active, setActive] = useState<string | undefined>('overview');
  const [keys, setKeys] = useState(['overview', 'activity', 'settings']);
  const [editable, setEditable] = useState(false);
  const [drag, setDrag] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [keep, setKeep] = useState(true);
  const [tint, setTint] = useState(false);
  const counter = useRef(1);
  const names: Record<string, string> = {
    overview: 'Overview',
    activity: 'Activity',
    settings: 'Settings',
  };
  const icons = { overview: 'grid', activity: 'activity', settings: 'settings' } as const;
  const many = keys.some((key) => key.startsWith('extra-'));
  const items = keys.map((key) => ({
    key,
    label: names[key] ?? (key.startsWith('extra-') ? 'Tab ' + key.slice(6) : 'New ' + key.slice(4)),
    icon: <Icon name={icons[key as keyof typeof icons] ?? 'grid'} size={18} />,
    children: (
      <div className="sample-panel-content">
        <p>
          {zh ? '当前标签：' : 'Current tab: '}
          {names[key] ?? key}
        </p>
        <label>
          {zh ? '笔记' : 'Notes'}
          <input
            className="sample-note"
            aria-label={'Notes for ' + key}
            defaultValue=""
            placeholder={
              zh
                ? '输入后切换标签，检查内容是否保留'
                : 'Type, then switch tabs to check preservation'
            }
          />
        </label>
      </div>
    ),
  }));
  return (
    <div className="sample-lab" data-sample="tabs">
      <div
        className="sample-controls"
        role="group"
        aria-label={zh ? '配置 Tabs' : 'Configure tabs'}
      >
        <label>
          {zh ? '样式' : 'Variant'}
          <select
            value={variant}
            onChange={(event) => setVariant(event.target.value as TabsVariant)}
          >
            <option value="borderless">{zh ? '胶囊' : 'Pill'}</option>
            <option value="bordered">{zh ? '连体卡片' : 'Connected card'}</option>
          </select>
        </label>
        <label>
          {zh ? '位置' : 'Position'}
          <select
            value={position}
            onChange={(event) => setPosition(event.target.value as TabsPosition)}
          >
            {(['top', 'bottom', 'left', 'right'] as const).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          {zh ? '尺寸' : 'Size'}
          <select
            value={size}
            onChange={(event) => setSize(event.target.value as NonNullable<TabsProps['size']>)}
          >
            {(['small', 'medium', 'large'] as const).map((value) => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <Checkbox
          label={zh ? '允许增删' : 'Editable'}
          checked={editable}
          onChange={(event) => setEditable(event.target.checked)}
        />
        <Checkbox
          label={zh ? '允许排序' : 'Reorderable'}
          checked={drag}
          onChange={(event) => setDrag(event.target.checked)}
        />
        <Checkbox
          label={zh ? '整体禁用' : 'Disabled'}
          checked={disabled}
          onChange={(event) => setDisabled(event.target.checked)}
        />
        <Checkbox
          label={zh ? '很多标签' : 'Many tabs'}
          checked={many}
          onChange={(event) => {
            const next = event.target.checked
              ? [...keys, ...Array.from({ length: 12 }, (_, index) => 'extra-' + (index + 1))]
              : keys.filter((key) => !key.startsWith('extra-'));
            setKeys(next);
            if (!event.target.checked && active?.startsWith('extra-')) setActive(next[0]);
          }}
        />
        <Checkbox
          label={zh ? '标签栏底色' : 'Tint tab strip'}
          checked={tint}
          onChange={(event) => setTint(event.target.checked)}
        />
        <Checkbox
          label={zh ? '保留内容状态' : 'Preserve panel state'}
          checked={keep}
          onChange={(event) => setKeep(event.target.checked)}
        />
      </div>
      <p className="sample-help">
        {zh
          ? '用方向键切换；Delete 关闭当前标签。启用排序后，可拖动圆点手柄，或按 Alt + 方向键调整顺序。'
          : 'Use arrow keys to switch and Delete to close. Drag the dot handle or press Alt + an arrow key to reorder.'}
      </p>
      <Tabs
        aria-label="Sample tabs"
        variant={variant}
        tabPosition={position}
        size={size}
        items={items}
        activeKey={active}
        onChange={setActive}
        disabled={disabled}
        listBackgroundColor={tint ? '#f0fafe' : undefined}
        draggable={drag}
        destroyInactiveTabPanel={!keep}
        addable={editable}
        closable={editable}
        emptyContent={zh ? '没有打开的标签，可以新增一个。' : 'No open tabs. Add one to continue.'}
        onAdd={
          editable
            ? () => {
                const key = 'new-' + counter.current++;
                setKeys((current) => [...current, key]);
                setActive(key);
              }
            : undefined
        }
        onClose={(key) => {
          const index = keys.indexOf(key),
            next = keys.filter((value) => value !== key);
          setKeys(next);
          if (active === key) setActive(next[index] ?? next[index - 1]);
        }}
        onOrderChange={(_, nextItems) => {
          setKeys(nextItems.map((item) => item.key));
        }}
      />
      <output className="sample-output">
        {zh ? '当前 key：' : 'Active key: '}
        {active ?? 'none'}
      </output>
    </div>
  );
}
