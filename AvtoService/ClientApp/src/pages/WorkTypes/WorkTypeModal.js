import React, { useEffect } from 'react';
import { Modal, message, Form, Input, DatePicker } from 'antd';
import { saveWorkType, updateWorkType } from '../../api';
import TextArea from 'antd/lib/input/TextArea';

export function WorkTypeModal({ modalProps, closeModal }) {
  const { actionType, visible, currentWorkType } = modalProps;
  const [form] = Form.useForm();
  const modalTitle = actionType === 'save' ? 'Создание вида работ' : 'Редактирование вида работ';
  const requiredMessage = 'Это поле является обязательным';
  const initialState = {
    name: '',
    description: '',
  };

  useEffect(() => {
    actionType == 'edit' && form.setFieldsValue(currentWorkType);
  }, [actionType, currentWorkType, form]);

  const onSaveWorkType = () => {
    saveWorkType(form.getFieldsValue()).then(() => {
      message.success('Успешно добавлено', { duration: 2 });
      closeModal();
    });
  };

  const onUpdateWorkType = () => {
    updateWorkType(form.getFieldsValue()).then(() => {
      message.success('Успешно обнавлено', { duration: 2 });
      closeModal();
    });
  };

  return (
    <Modal
      title={modalTitle}
      visible={visible}
      onOk={actionType == 'edit' ? onUpdateWorkType : onSaveWorkType}
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
        initialValues={actionType == 'edit' ? currentWorkType : initialState}>
        <Form.Item name="id" style={{ display: 'none' }}>
          <Input type={'hidden'} />
        </Form.Item>
        <Form.Item
          label={'Название вида работ'}
          name="name"
          rules={[{ required: true, message: requiredMessage }]}>
          <Input placeholder={'Стоимость (тг.)'} />
        </Form.Item>
        <Form.Item
          label={'Описание вида работ'}
          name="description"
          rules={[{ required: true, message: requiredMessage }]}>
          <TextArea rows={4} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
