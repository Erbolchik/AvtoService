import React from 'react';
import { Result, Button } from 'antd';

const UnAuthorize = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle={`Вы не зашли в систему`}
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

export default UnAuthorize;
