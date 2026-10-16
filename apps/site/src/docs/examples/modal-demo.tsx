import { Button, ConfigProvider, Form, FormItem, Modal, Select } from '@cinna-design/react';
import { useState } from 'react';

export default function ModalFormDemo() {
  const [open, setOpen] = useState(false);
  return (
    <ConfigProvider theme={{ primary: '#9bdce8' }}>
      <Button onClick={() => setOpen(true)}>Open recipe editor</Button>
      <Modal open={open} title="Edit recipe" footer={null} onCancel={() => setOpen(false)}>
        <Form onFinish={() => setOpen(false)}>
          <FormItem
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Choose a category.' }]}
          >
            <Select
              showSearch
              placeholder="Choose a category"
              options={[
                { value: 'cake', label: 'Cake' },
                { value: 'tart', label: 'Tart' },
              ]}
            />
          </FormItem>
          <Button htmlType="submit">Save category</Button>
        </Form>
      </Modal>
    </ConfigProvider>
  );
}
