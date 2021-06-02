import { Button, message, Popconfirm, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { getClients, deleteClient } from '../../api';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { ClientsModal } from './ClientsModal';

function Clients() {
  const [clients, setClients] = useState();
  const [modalProps, setModalProps] = useState({
    visible: false,
    actionType: null,
    currentClients: null,
  });
  useEffect(() => {
    getClients().then(({ data }) => setClients(data));
  }, [modalProps]);

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
      render: (_, u) => u.users.phone,
    },
    {
      title: `Логин пользователя`,
      dataIndex: 'login',
      key: 'login',
      render: (_, u) => u.users.login,
    },
    {
      title: `Почта`,
      dataIndex: 'email',
      key: 'email',
      render: (_, u) => u.users.email,
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
                currentClients: clients && clients.find((el) => el.id === id),
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
    deleteClient(id).then(() => {
      setModalProps({ visible: false, actionType: null, currentClients: null });
      message.success('Успешно удалено', { duration: 5 });
    });
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
      <h1>Клиенты</h1>
      <ClientsModal modalProps={modalProps} closeModal={closeModal} />
      <Table
        style={{ marginTop: 24 }}
        scroll={{ x: 1300 }}
        columns={columns}
        dataSource={clients}
        rowKey="id"
        footer={TableFotter}
      />
    </React.Fragment>
  );
}

export default Clients;
