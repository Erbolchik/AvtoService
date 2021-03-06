import React from 'react';
import { Result, Button } from 'antd';

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={
        <Button
          type="primary"
          onClick={() => {
            window.location.href = '/login';
          }}>
          Войти
        </Button>
      }
    />
  );
};

export default NotFound;
