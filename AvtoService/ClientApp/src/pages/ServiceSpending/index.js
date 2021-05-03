import { Table } from 'antd';
import React from 'react';

function ServiceSpending() {
  const columns = [
    {
      title: `Дата`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Статья расходов`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Стоимость (тг.)`,
      dataIndex: 'model',
      key: 'Model',
    },
  ];
  return (
    <React.Fragment>
      <h1>Расходы сервиса</h1>
      <Table columns={columns}></Table>
    </React.Fragment>
  );
}

export default ServiceSpending;
