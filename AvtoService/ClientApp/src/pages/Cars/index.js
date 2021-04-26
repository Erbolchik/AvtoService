import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCars } from '../../api';
import moment from 'moment';

function Cars() {
  const [cars, setCars] = useState();

  useEffect(() => {
    getCars().then(({ data }) => setCars(data));
  }, []);

  const columns = [
    {
      title: `Гос. номер`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Марка`,
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: `Собственник`,
      key: 'owner',
      render: (e, e1) => {
        return e1.clients.lastName + ' ' + e1.clients.firstName + ' ' + e1.clients.middleName;
      },
    },
    {
      title: `Телефон`,
      key: 'phoneOwner',
      render: (e, e1) => {
        return e1.clients.phone;
      },
    },
    {
      title: `Год выпуска`,
      dataIndex: 'yearOfIssue',
      key: 'YearOfIssue',
      render: (e) => {
        return moment(e).format('DD.MM.YYYY');
      },
    },
    {
      title: `VIN`,
      dataIndex: 'vin',
      key: 'vin',
    },
    {
      title: `Действия`,
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
      dataSource={cars}
      rowKey="id"
    />
  );
}

export default Cars;
