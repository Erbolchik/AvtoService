import React, { useContext, useEffect, useState } from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import { saveCar, saveEmployees } from '../../api';

export function CarsModal({ modalProps, closeModal }) {
  const { actionType, visible, currentCars } = modalProps;
  const [form] = Form.useForm();
  const modalTitle =
    actionType === 'save' ? 'Создание сотрудника' : 'Редактирование данных сотрудника школы';
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
          label={'Фамилия'}
          name="lastName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Фамилия'} />
        </Form.Item>
        <Form.Item
          label={'Имя'}
          name="firstName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Имя'} />
        </Form.Item>
        <Form.Item
          label={'Отчество'}
          name="middleName"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Отчество'} />
        </Form.Item>
        <Form.Item
          label={'Номер телефона'}
          name="phone"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Номер телефона'} />
        </Form.Item>
        <Form.Item
          label={'Логин пользователя'}
          name="login"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Логин пользователя'} />
        </Form.Item>
        <Form.Item
          label={'Пароль'}
          name="password"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Пароль'} />
        </Form.Item>
        <Form.Item
          label={'Почта'}
          name="email"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Почта'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
