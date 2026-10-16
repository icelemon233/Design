import { Button, Message, Space } from '@cinna-design/react';
export default function MessageQueueDemo() {
  const [api, holder] = Message.useMessage();
  return (
    <>
      {holder}
      <Space wrap>
        <Button
          onClick={() =>
            api.open({
              key: 'recipe',
              type: 'info',
              content: 'Recipe is ready to save.',
              duration: 0,
            })
          }
        >
          Show message
        </Button>
        <Button
          variant="cream"
          onClick={() =>
            api.open({ key: 'recipe', type: 'success', content: 'Recipe saved.', duration: 3 })
          }
        >
          Update same message
        </Button>
        <Button variant="ghost" onClick={() => api.destroy()}>
          Clear messages
        </Button>
      </Space>
    </>
  );
}
