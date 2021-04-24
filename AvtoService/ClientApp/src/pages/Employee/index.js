import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getEmployees } from '../../api';

function Employees() {
  const [employees, setEmployees] = useState();

  useEffect(() => {
    getEmployees().then(({ data }) => setEmployees(data));
  }, []);

  const columns = [
    {
      title: `Фамилия`,
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: `Имя`,
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: `Отчество`,
      dataIndex: 'middleName',
      key: 'middleName',
    },
    {
      title: `Номер телефона`,
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: `Логин пользователя`,
      dataIndex: 'login',
      key: 'login',
    },
    {
      title: `Почта`,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: `Действия `,
      key: 'action',
      width: 100,
      fixed: 'right',
    },
  ];
  return (
    <Table
      style={{ marginTop: 24 }}
      scroll={{ x: 1300 }}
      columns={columns}
      dataSource={employees}
      rowKey="id"
    />
  );
}

export default Employees;
