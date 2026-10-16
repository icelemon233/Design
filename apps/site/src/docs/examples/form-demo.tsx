import { Button, Form, FormItem, Input, Space } from '@cinna-design/react';
import { useState } from 'react';
export default function ValidatedForm() {
  const [form] = Form.useForm();
  const [saved, setSaved] = useState('');
  return (
    <Form
      form={form}
      initialValues={{ name: 'Cloud cake' }}
      onFinish={(values) => setSaved(String(values.name))}
    >
      <FormItem
        name="name"
        label="Recipe name"
        rules={[
          { required: true, message: 'Enter a recipe name.' },
          { min: 3, message: 'Use at least three characters.' },
        ]}
      >
        <Input placeholder="Recipe name" />
      </FormItem>
      <Space wrap>
        <Button htmlType="submit">Save recipe</Button>
        <Button
          variant="cream"
          onClick={() => {
            form.resetFields();
            setSaved('');
          }}
        >
          Reset recipe
        </Button>
      </Space>
      {saved && <p role="status">Saved: {saved}</p>}
    </Form>
  );
}
