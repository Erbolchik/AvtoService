import { Button, Popconfirm, Table, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { getCars } from '../../api';
import moment from 'moment';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { CarsModal } from './CarsModal';

function Cars() {
  const [cars, setCars] = useState();
  const [modalProps, setModalProps] = useState({
    visible: false,
    actionType: null,
    currentEmployee: null,
  });
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
                currentEmployee: cars && cars.find((el) => el.id === id),
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
            // onConfirm={() => confirm(id)}
            okText={'Да'}
            cancelText={'Нет'}>
            <DeleteTwoTone key="delete" twoToneColor="#eb2f96" />
          </Popconfirm>
        </Tooltip>
      ),
    },
  ];

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
      <CarsModal modalProps={modalProps} closeModal={closeModal} />
      <Table columns={columns} dataSource={cars} rowKey="id" footer={TableFotter} />
    </React.Fragment>
  );
}

export default Cars;
