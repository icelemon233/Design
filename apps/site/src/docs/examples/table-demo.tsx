import { Table } from '@cinna-design/react';
import { useState } from 'react';
const recipes = [
  { key: 1, name: 'Cloud cake', category: 'cake', servings: 8 },
  { key: 2, name: 'Cinnamon tart', category: 'tart', servings: 6 },
  { key: 3, name: 'Blueberry cake', category: 'cake', servings: 4 },
  { key: 4, name: 'Vanilla cloud', category: 'cake', servings: 10 },
];
export default function TableWorkflowDemo() {
  const [selected, setSelected] = useState<Array<string | number>>([]);
  return (
    <>
      <Table
        dataSource={recipes}
        pagination={{ pageSize: 2 }}
        rowSelection={{
          selectedRowKeys: selected,
          onChange: (keys) => setSelected(keys as Array<string | number>),
        }}
        columns={[
          { title: 'Recipe', dataIndex: 'name', sorter: (a, b) => a.name.localeCompare(b.name) },
          {
            title: 'Category',
            dataIndex: 'category',
            filters: [
              { text: 'Cake', value: 'cake' },
              { text: 'Tart', value: 'tart' },
            ],
            onFilter: (value, record) => record.category === value,
          },
          { title: 'Servings', dataIndex: 'servings', sorter: (a, b) => a.servings - b.servings },
        ]}
        expandable={{
          expandedRowRender: (record) => (
            <p>
              Prepare {record.servings} servings of {record.name}.
            </p>
          ),
        }}
      />
      <p role="status">Selected recipes: {selected.length}</p>
    </>
  );
}
