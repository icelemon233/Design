import { Checkbox, Transfer } from '@cinna-design/react';
import { useState } from 'react';

export default function TransferSample({ language = 'en' }: { language?: 'zh' | 'en' }) {
  const zh = language === 'zh';
  const [targets, setTargets] = useState(['docs']);
  const [selected, setSelected] = useState<string[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [search, setSearch] = useState(true);
  const [narrow, setNarrow] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [long, setLong] = useState(false);
  const [controlledSelection, setControlledSelection] = useState(false);
  const [lastMove, setLastMove] = useState('');
  const data = [
    { key: 'docs', title: 'Docs' },
    { key: 'tokens', title: 'Tokens' },
    { key: 'icons', title: 'Icons' },
    { key: 'react', title: 'React components' },
    { key: 'locked', title: 'Archived item', disabled: true },
    {
      key: 'guide',
      title: long
        ? 'A long item name that must remain readable inside a narrow list without pushing the move controls off screen'
        : 'Development guide',
    },
  ];
  return (
    <div className="sample-lab" data-sample="transfer">
      <div
        className="sample-controls"
        role="group"
        aria-label={zh ? '配置 Transfer' : 'Configure transfer'}
      >
        <Checkbox
          label={zh ? '显示搜索' : 'Search'}
          checked={search}
          onChange={(event) => setSearch(event.target.checked)}
        />
        <Checkbox
          label={zh ? '整体禁用' : 'Disabled'}
          checked={disabled}
          onChange={(event) => setDisabled(event.target.checked)}
        />
        <Checkbox
          label={zh ? '窄容器' : 'Narrow container'}
          checked={narrow}
          onChange={(event) => setNarrow(event.target.checked)}
        />
        <Checkbox
          label={zh ? '空数据' : 'Empty data'}
          checked={empty}
          onChange={(event) => setEmpty(event.target.checked)}
        />
        <Checkbox
          label={zh ? '长名称' : 'Long names'}
          checked={long}
          onChange={(event) => setLong(event.target.checked)}
        />
        <Checkbox
          label={zh ? '受控勾选' : 'Controlled selection'}
          checked={controlledSelection}
          onChange={(event) => setControlledSelection(event.target.checked)}
        />
      </div>
      <p className="sample-help">
        {zh
          ? '勾选后通过中间按钮移动。全选作用于当前搜索结果，禁用项目保留在原列表。'
          : 'Select items, then use the middle buttons. Select all applies to the current search results; disabled items stay in their list.'}
      </p>
      <div style={{ maxWidth: narrow ? 360 : undefined }}>
        <Transfer
          dataSource={empty ? [] : data}
          targetKeys={targets}
          showSearch={search}
          disabled={disabled}
          selectedKeys={controlledSelection ? selected : undefined}
          onSelectChange={(source, target) => setSelected([...source, ...target])}
          onChange={(next, direction, moved) => {
            setTargets(next);
            setLastMove(direction + ': ' + moved.join(', '));
          }}
          locale={
            zh
              ? {
                  sourceTitle: '待选项目',
                  targetTitle: '已选项目',
                  selectAll: '全选',
                  searchPlaceholder: '搜索项目',
                  empty: '暂无项目',
                  noResults: '没有匹配项目',
                  moveToTarget: '移入已选项目',
                  moveToSource: '移回待选项目',
                }
              : undefined
          }
        />
      </div>
      <output className="sample-output" role="status">
        {zh ? '目标 key：' : 'Target keys: '}
        {targets.join(', ') || 'none'}
        {lastMove ? ' · ' + lastMove : ''}
      </output>
    </div>
  );
}
