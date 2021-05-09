import { Card, Col, Row, Table } from 'antd';
import React from 'react';

function OrderRepair() {
  const commentColumns = [
    {
      title: `№`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Коментарии`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Дата Добавления`,
      dataIndex: 'model',
      key: 'Model',
    },
  ];

  const orderRepairColumns = [
    {
      title: `Дата`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Гос.номер`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Марка`,
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: `Пробег (км)`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Клиент`,
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: `Телефон`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Ответственный сотрудник`,
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: `Сумма запчастей (тг.)`,
      dataIndex: 'governmentNumber',
      key: 'governmentNumber',
    },
    {
      title: `Сумма работ (тг.)`,
      dataIndex: 'model',
      key: 'Model',
    },
    {
      title: `Оплачен`,
      dataIndex: 'model',
      key: 'Model',
    },
  ];
  const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  return (
    <div>
      <Row>
        <Col span={6} order={3}>
          <Table columns={orderRepairColumns}></Table>
        </Col>
        <Col span={6} order={2}>
          <Table columns={commentColumns}></Table>
        </Col>
        <Col span={6} order={1}>
          <Card title="Информация">
            <Card.Grid hoverable={false} style={gridStyle}>
              Марка
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Camry
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Год выпуска
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              2021
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              VIN
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              ААААААААААААААААА
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Собственник
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Ербол
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              Телефон
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              +77088874530
            </Card.Grid>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OrderRepair;
