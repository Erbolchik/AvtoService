import React, { useState, useEffect } from 'react';
import { deleteWorkType, getWorkTypes } from '../../api';
import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { WorkTypeModal } from './WorkTypeModal';

function WorkTypes() {
  const [workTypes, setWorkTypes] = useState();
  const [modalProps, setModalProps] = useState({
    visible: false,
    actionType: null,
    currentWorkType: null,
  });

  useEffect(() => {
    getWorkTypes().then(({ data }) => {
      setWorkTypes(data);
    });
  }, [modalProps]);

  const columns = [
    {
      title: `Название работы`,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `Описание работы`,
      dataIndex: 'description',
      key: 'description',
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
                currentWorkType: workTypes && workTypes.find((el) => el.id === id),
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
    deleteWorkType(id);
    setModalProps({ visible: false, actionType: null, currentWorkType: null });
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
      <h1>Виды работ</h1>
      <WorkTypeModal modalProps={modalProps} closeModal={closeModal} />
      <Table columns={columns} dataSource={workTypes} key="id" footer={TableFotter} />
    </React.Fragment>
  );
}

export default WorkTypes;
