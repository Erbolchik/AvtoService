import React, { useContext, useEffect, useState } from 'react';
import { Modal, message, Form, Input, Select } from 'antd';
import { saveEmployees, updateEmployee } from '../../api';
import MaskedInput from 'antd-mask-input';

export function EmployeeModal({ modalProps, closeModal }) {
  const { actionType, visible, currentEmployee } = modalProps;
  const [form] = Form.useForm();
  const modalTitle =
    actionType === 'save' ? 'Создание сотрудника' : 'Редактирование данных сотрудника';
  const requiredMessage = 'Это поле является обязательным';
  const initialState = {
    id: undefined,
    lastName: '',
    firstName: '',
    middleName: '',
    phone: '',
    login: '',
    email: '',
  };

  useEffect(() => {
    actionType == 'edit'
      ? form.setFieldsValue({
          id: currentEmployee.id,
          lastName: currentEmployee.lastName,
          firstName: currentEmployee.firstName,
          middleName: currentEmployee.middleName,
          login: currentEmployee.users.login,
          password: currentEmployee.users.password,
          phone: currentEmployee.users.phone,
          email: currentEmployee.users.email,
        })
      : form.resetFields();
  }, [actionType, currentEmployee, form]);

  const onSaveEmployee = () => {
    saveEmployees({
      lastName: form.getFieldsValue().lastName,
      firstName: form.getFieldsValue().firstName,
      middleName: form.getFieldsValue().middleName,
      users: {
        login: form.getFieldsValue().login,
        password: form.getFieldsValue().password,
        phone: form.getFieldsValue().phone,
        email: form.getFieldsValue().email,
      },
    }).then(() => {
      message.success('Успешно добавлено', { duration: 2 });
      closeModal();
    });
  };

  const onUpdateEmployee = () => {
    updateEmployee({
      id: currentEmployee.id,
      lastName: form.getFieldsValue().lastName,
      firstName: form.getFieldsValue().firstName,
      middleName: form.getFieldsValue().middleName,
      userId: currentEmployee.userId,
      users: {
        login: form.getFieldsValue().login,
        password: form.getFieldsValue().password,
        phone: form.getFieldsValue().phone,
        email: form.getFieldsValue().email,
      },
    }).then(() => {
      message.success('Успешно обновлено', { duration: 5 });
      closeModal();
    });
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={actionType == 'edit' ? onUpdateEmployee : onSaveEmployee}
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
        initialValues={actionType == 'edit' ? currentEmployee : initialState}>
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
          <MaskedInput mask="+7 (111) 111-11-11" placeholder="+7 (___) ___-__-__" />
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
          <Input.Password placeholder={'Пароль'} />
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
