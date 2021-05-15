import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Input, message } from 'antd';
import { login } from '../../api';
import { Context } from '../../common';
import styled from 'styled-components';

const PageWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background: #851772;
`;

const FormTitle = styled.h1`
  font-weight: 500;
  font-size: 16px;
  color: #393939;
  margin: 1rem auto 0 auto;
  margin-bottom: 50px;
`;

const LoginButton = styled(Button)`
  margin: 15px 0 0 0;
`;

const CenteredPane = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Card = styled.div`
  background: white;
  width: 100%;
  padding: 2.25rem 1.5rem;
  text-align: center;
  border-radius: 5px;
  max-width: 380px;
`;

const Img = styled.img`
  width: ${(p) => p.width ?? 54}px;
  height: ${(p) => p.height ?? 27}px;
  display: inline-block;
`;

function Logo(p) {
  return (
    <Img
      {...p}
      src="data:image/png;base64,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"
    />
  );
}

function CenteredTemplate({ children }) {
  return <CenteredPane>{children}</CenteredPane>;
}

function Template({ children }) {
  return (
    <PageWrapper>
      <CenteredTemplate>
        <Card>{children}</Card>
      </CenteredTemplate>
    </PageWrapper>
  );
}

const Login = () => {
  const history = useHistory();
  const { setToken } = useContext(Context);

  const onFinish = (values) => {
    message.loading({ content: `Загрузка...`, key: 'updatable' });
    login(values)
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
          setToken(res.token);
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
    <Template>
      <FormTitle>Автосервис Erfa.</FormTitle>
      <Form
        name="basic"
        initialValues={{ remember: true }}
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
    </Template>
  );
};

export default Login;
