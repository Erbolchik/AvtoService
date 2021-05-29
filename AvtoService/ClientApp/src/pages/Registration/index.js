import { Input, Form } from 'antd';
import React from 'react';

function Registration() {
  const [form] = Form.useForm();

  return (
    <Form>
      <Form.Item label="Фамилия" name="size">
        <Input />
      </Form.Item>
      <Form.Item label="Имя" name="size">
        <Input />
      </Form.Item>
      <Form.Item label="Отчество" name="size">
        <Input />
      </Form.Item>
    </Form>
  );
}

export default Registration;
