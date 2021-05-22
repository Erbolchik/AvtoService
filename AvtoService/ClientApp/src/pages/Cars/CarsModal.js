import React, { useContext, useEffect, useState } from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import { saveCar, saveEmployees } from '../../api';

export function CarsModal({ modalProps, closeModal }) {
  const { actionType, visible, currentCars } = modalProps;
  const [form] = Form.useForm();
  const modalTitle =
    actionType === 'save' ? 'Создание автомобили' : 'Редактирование данных сотрудника школы';
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
    actionType == 'edit' && form.setFieldsValue(currentCars);
  }, [actionType, currentCars, form]);

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
        initialValues={actionType == 'edit' ? currentCars : initialState}>
        <Form.Item
          label={'Гос номер'}
          name="lastName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Гос номер'} />
        </Form.Item>
        <Form.Item
          label={'Марка'}
          name="firstName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Марка'} />
        </Form.Item>
        <Form.Item
          label={'Собственник'}
          name="middleName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Собственник'} />
        </Form.Item>
        <Form.Item
          label={'Номер телефона'}
          name="phone"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Номер телефона'} />
        </Form.Item>
        <Form.Item
          label={'Год выпуска'}
          name="login"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Год выпуска'} />
        </Form.Item>
        <Form.Item
          label={'VIN'}
          name="login"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Год выпуска'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
