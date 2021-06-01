import React, { useEffect, useState } from 'react';
import { Descriptions, Badge, Tag } from 'antd';
import { getMyProfile } from '../../api';
import moment from 'moment';
import { dateFormat } from '../../common';

function UserInfo() {
  const [myProfile, setMyProfile] = useState();

  useEffect(() => {
    getMyProfile().then(({ data }) => setMyProfile(data));
  }, []);

  return (
    <Descriptions title="Личный кабинет" bordered>
      <Descriptions.Item label="ФИО">{myProfile?.fullName}</Descriptions.Item>
      <Descriptions.Item label="Телефон">{myProfile?.phone}</Descriptions.Item>
      <Descriptions.Item label="Почтовый адрес">{myProfile?.email}</Descriptions.Item>
      <Descriptions.Item label="Логин">{myProfile?.login}</Descriptions.Item>
      <Descriptions.Item label="Роль">
        <Tag color="geekblue">{myProfile?.roleName}</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="Дата регистрации">
        {moment(myProfile?.registrationDate).format(dateFormat)}
      </Descriptions.Item>
      <Descriptions.Item label="Статус" span={3}>
        <Badge status="processing" text="Активный" />
      </Descriptions.Item>
    </Descriptions>
  );
}

export default UserInfo;
