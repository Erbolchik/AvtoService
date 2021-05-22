import React from 'react';
import { Descriptions, Badge } from 'antd';

function UserInfo() {
  return (
    <Descriptions title="Личный кабинет" bordered>
      <Descriptions.Item label="ФИО">Сатыбалдин Ербол Дауренулы</Descriptions.Item>
      <Descriptions.Item label="Телефон">+7 708 887 45 30</Descriptions.Item>
      <Descriptions.Item label="Почтовый адрес">erbol@mail.ru</Descriptions.Item>
      <Descriptions.Item label="Логин">erbol</Descriptions.Item>
      <Descriptions.Item label="Роль">Администратор</Descriptions.Item>
      <Descriptions.Item label="Дата регистрации">05/05/2020 14:38:25</Descriptions.Item>
      <Descriptions.Item label="Статус" span={3}>
        <Badge status="processing" text="Активный" />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default UserInfo;
