import React, { useContext, useEffect, useState } from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import { saveCar, saveEmployees } from '../../api';
import TextArea from 'antd/lib/input/TextArea';

export function ServiceSpendingModal({ modalProps, closeModal }) {
  const { actionType, visible, currentServiceSpending } = modalProps;
  const [form] = Form.useForm();
  const modalTitle =
    actionType === 'save' ? 'Создание записи о затрате' : 'Редактирование записи о затрате';
  const requiredMessage = 'Это поле является обязательным';
  const initialState = {
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    login: '',
    email: '',
  };

  useEffect(() => {
    actionType == 'edit' && form.setFieldsValue(currentServiceSpending);
  }, [actionType, currentServiceSpending, form]);

  const onSaveCars = () => {
    saveCar(form.getFieldsValue()).then(() => {
      message.success('Успешно добавлено', { duration: 2 });
      closeModal();
    });
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={onSaveCars}
      onCancel={() => closeModal()}
      okText="Сохранить"
      cancelText="Отменить"
      forceRender={true}
      width={600}>
      <Form
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={actionType == 'edit' ? currentServiceSpending : initialState}>
        <Form.Item
          label={'Дата'}
          name="date"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Фамилия'} />
        </Form.Item>
        <Form.Item
          label={'Статья расходов'}
          name="name"
          rules={[{ required: true, message: requiredMessage }]}>
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={'Стоимость (тг.)'}
          name="price"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Стоимость (тг.)'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
