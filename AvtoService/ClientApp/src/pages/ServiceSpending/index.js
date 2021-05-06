import React, { useState, useEffect } from 'react';
import { deleteServiceSpending, getServiceSpending } from '../../api';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { ServiceSpendingModal } from './ServiceSpendingModal';
import moment from 'moment';

function ServiceSpending() {
  const [serviceSpending, setServiceSpending] = useState();
  const [modalProps, setModalProps] = useState({
    visible: false,
    actionType: null,
    currentServiceSpending: null,
  });

  useEffect(() => {
    getServiceSpending().then(({ data }) => {
      setServiceSpending(data);
    });
  }, [modalProps]);

  const columns = [
    {
      title: `Дата`,
      dataIndex: 'date',
      key: 'date',
      render: (e) => {
        return moment(e).format('DD.MM.YYYY');
      },
    },
    {
      title: `Статья расходов`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `Стоимость (тг.)`,
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: `Действие`,
      key: 'action',
      width: 150,
      fixed: 'right',
      align: 'center',
      render: ({ id }) => (
        <Tooltip placement="top" title={'Редактирование'}>
          <EditTwoTone
            key="edit"
            onClick={() => {
              setModalProps({
                visible: !modalProps.visible,
                actionType: 'edit',
                currentServiceSpending:
                  serviceSpending && serviceSpending.find((el) => el.id === id),
              });
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: `Действие`,
      key: 'action',
      width: 250,
      fixed: 'right',
      align: 'center',
      render: ({ id }) => (
        <Tooltip placement="top" title={'Удалить'}>
          <Popconfirm
            placement="bottom"
            title={'Вы точно хотите удалить ?'}
            onConfirm={() => confirm(id)}
            okText={'Да'}
            cancelText={'Нет'}>
            <DeleteTwoTone key="delete" twoToneColor="#eb2f96" />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

  const confirm = (id) => {
    deleteServiceSpending(id);
    setModalProps({ visible: false, actionType: null, currentServiceSpending: null });
  };

  function closeModal() {
    return setModalProps({ visible: false });
  }

  function TableFotter() {
    return (
      <Button
        type="primary"
        size="large"
        onClick={() => setModalProps({ visible: !modalProps.visible, actionType: 'save' })}>
        Добавить
      </Button>
    );
  }

  return (
    <React.Fragment>
      <h1>Расходы сервиса</h1>
      <ServiceSpendingModal modalProps={modalProps} closeModal={closeModal} />
      <Table columns={columns} dataSource={serviceSpending} key="id" footer={TableFotter} />
    </React.Fragment>
  );
}

export default ServiceSpending;
