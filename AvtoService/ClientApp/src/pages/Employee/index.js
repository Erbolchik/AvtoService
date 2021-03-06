import { Button, Input, message, Popconfirm, Space, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { deleteEmployee, getEmployees } from '../../api';
import { EmployeeModal } from './EmployeeModal';
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons';

function Employees() {
  const [employees, setEmployees] = useState();
  const [modalProps, setModalProps] = useState({
    visible: false,
    actionType: null,
    currentEmployee: null,
  });

  useEffect(() => {
    getEmployees().then(({ data }) => setEmployees(data));
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
                currentEmployee: employees && employees.find((el) => el.id === id),
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
    deleteEmployee(id).then(() => {
      setModalProps({ visible: false, actionType: null, currentEmployee: null });
      message.success('Успешно удалено', { duration: 5 });
    });
  };

  function TableFotter() {
    return (
      <Button
        type="primary"
        size="large"
        onClick={() =>
          setModalProps({
            visible: !modalProps.visible,
            actionType: 'save',
          })
        }>
        Добавить
      </Button>
    );
  }

  function closeModal() {
    return setModalProps({ visible: false });
  }

  return (
    <React.Fragment>
      <h1>Сотрудники</h1>
      <EmployeeModal modalProps={modalProps} closeModal={closeModal} />
      <Table columns={columns} dataSource={employees} rowKey="id" footer={TableFotter} />
    </React.Fragment>
  );
}

export default Employees;
