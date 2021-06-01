import React, { useEffect, useState } from 'react';
import { Descriptions, Badge } from 'antd';
import { getMyProfile } from '../../api';

function UserInfo() {
  const [myProfile, setMyProfile] = useState();

  useEffect(() => {
    getMyProfile().then(({ data }) => setMyProfile(data));
  }, []);

  return (
    <Descriptions title="Личный кабинет" bordered>
      <Descriptions.Item label="ФИО">{myProfile.fullName}</Descriptions.Item>
      <Descriptions.Item label="Телефон">{myProfile.phone}</Descriptions.Item>
      <Descriptions.Item label="Почтовый адрес">{myProfile.email}</Descriptions.Item>
      <Descriptions.Item label="Логин">{myProfile.login}</Descriptions.Item>
      <Descriptions.Item label="Роль">{'Администратор'}</Descriptions.Item>
      <Descriptions.Item label="Дата регистрации">{myProfile.registrationName}</Descriptions.Item>
      <Descriptions.Item label="Статус" span={3}>
        <Badge status="processing" text="Активный" />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default UserInfo;
