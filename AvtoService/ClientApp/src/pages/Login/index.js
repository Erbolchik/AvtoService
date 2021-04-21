import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd';

const Login = () => {
  const history = useHistory();

  const onFinish = (values) => {
    message.loading({ content: `Загрузка...`, key: 'updatable' });

    alert(values)
      .then((res) => res.json())
      .then((res) => {
        if (!res.token) {
          setTimeout(() => {
            message.error({
              content: `Ошибка`,
              key: 'updatable',
              duration: 2,
            });
          }, 1000);
        } else {
          localStorage.setItem('token', res.token);
          setTimeout(() => {
            message.success({
              content: `Успех`,
              key: 'updatable',
              duration: 2,
            });
            history.push('/');
          }, 1000);
        }
      });
  };

  const onFinishFailed = () => {
    message.error({
      content: `Успех`,
      key: 'updatable',
      duration: 2,
    });
  };

  return (
    <div>
      <Form
        // {...layout}
        name="basic"
        initialValues={{ remember: true }}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 10,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label={'Имя пользователя '}
          name="login"
          rules={[
            {
              required: true,
              message: `Не правильное имя пользователя`,
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label={'Пароль'}
          name="password"
          rules={[
            {
              required: true,
              message: `Не правильный пароль`,
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item label=".">
          <Button type="primary" htmlType="submit">
            {'Войти'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
