import React, { useEffect } from 'react';
import { Modal, message, Form, Input, DatePicker } from 'antd';
import { saveServiceSpending, updateServiceSpending } from '../../api';
import TextArea from 'antd/lib/input/TextArea';

export function ServiceSpendingModal({ modalProps, closeModal }) {
  const { actionType, visible, currentServiceSpending } = modalProps;
  const [form] = Form.useForm();
  const dateFormat = 'DD/MM/YYYY';
  const modalTitle =
    actionType === 'save' ? 'Создание записи о затрате' : 'Редактирование записи о затрате';
  const requiredMessage = 'Это поле является обязательным';
  const initialState = {
    date: null,
    name: '',
    price: null,
  };

  useEffect(() => {
    actionType == 'edit'
      ? form.setFieldsValue({
          date: null,
          name: currentServiceSpending.name,
          price: currentServiceSpending.price,
          id: currentServiceSpending.id,
        })
      : form.resetFields();
  }, [actionType, currentServiceSpending, form]);

  const onSaveServiceSpending = () => {
    saveServiceSpending(form.getFieldsValue()).then(() => {
      message.success('Успешно добавлено', { duration: 2 });
      closeModal();
    });
  };

  const onUpdateServiceSpending = () => {
    updateServiceSpending(form.getFieldsValue()).then(() => {
      message.success('Успешно добавлено', { duration: 2 });
      closeModal();
    });
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={actionType == 'edit' ? onUpdateServiceSpending : onSaveServiceSpending}
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
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type={'hidden'} />
        </Form.Item>
        <Form.Item
          label={'Дата'}
          name="date"
          rules={[{ required: true, message: requiredMessage }]}>
          <DatePicker placeholder="Дата" style={{ width: 250 }} format={dateFormat} />
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
