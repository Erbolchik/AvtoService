import React, { useContext, useEffect, useState } from 'react';
import { Modal, message, Form, Input, Select, DatePicker } from 'antd';
import { saveCar, updateCar, getClients } from '../../api';
import moment from 'moment';

export function CarsModal({ modalProps, closeModal }) {
  const { actionType, visible, currentCar } = modalProps;
  const [clients, setClients] = useState();
  const [form] = Form.useForm();
  const modalTitle =
    actionType === 'save' ? 'Создание автомобили' : 'Редактирование данных сотрудника школы';
  const requiredMessage = 'Это поле является обязательным';
  const initialState = {
    id: undefined,
    governmentNumber: '',
    model: '',
    vin: '',
    yearOfIssue: null,
    clientId: null,
  };

  useEffect(() => {
    getClients().then(({ data }) => setClients(data));
  }, []);

  useEffect(() => {
    actionType == 'edit'
      ? form.setFieldsValue({
          yearOfIssue: moment(`
            ${currentCar.yearOfIssue.split('-')[2].split('T')[0]}.
              ${currentCar.yearOfIssue.split('-')[1]}.
             ${currentCar.yearOfIssue.split('-')[0]}`),
          clientId: currentCar.clientId,
          vin: currentCar.vin,
          model: currentCar.model,
          id: currentCar.id,
          governmentNumber: currentCar.governmentNumber,
        })
      : form.resetFields();
  }, [actionType, currentCar, form]);

  const onUpdateCars = () => {
    updateCar(form.getFieldsValue()).then(() => {
      message.success('Успешно обновлено', { duration: 2 });
      closeModal();
    });
  };

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
      onOk={actionType == 'edit' ? onUpdateCars : onSaveCars}
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
        initialValues={actionType == 'edit' ? currentCar : initialState}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type={'hidden'} />
        </Form.Item>
        <Form.Item
          label={'Гос номер'}
          name="governmentNumber"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Гос номер'} />
        </Form.Item>
        <Form.Item
          label={'Марка'}
          name="model"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Марка'} />
        </Form.Item>
        <Form.Item
          label={'Собственник'}
          name="clientId"
          rules={[{ required: true, message: requiredMessage }]}>
          <Select placeholder={'Собственник'} allowClear={true}>
            {!!clients &&
              clients.map((el) => {
                return (
                  <Select.Option value={el.id} key={el.id}>
                    {el.firstName} {el.lastName} {el?.middleName}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          label={'Год выпуска'}
          name="yearOfIssue"
          rules={[{ required: true, message: requiredMessage }]}>
          <DatePicker picker="year" />
        </Form.Item>
        <Form.Item label={'VIN'} name="vin" rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'VIN'} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
