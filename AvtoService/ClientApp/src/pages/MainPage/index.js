import Layout, { Content } from 'antd/lib/layout/layout';
import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

function index() {
  return (
    <Layout>
      <Content>
        <Typography>
          <Title>Добро пожаловать в CRM Систему Автосервиса</Title>
          <h3>Данная система умеет:</h3>
          <Paragraph>
            <ul>
              <li>Вести базу клиентов и их автомобилей</li>
              <li>Вести базу расходов автосервиса</li>
              <li>Вести учет проделанных работ</li>
              <li>Вести учет сотрудников</li>
              <li>Вести детальный учет о проделанной работе</li>
            </ul>
          </Paragraph>
        </Typography>
      </Content>
    </Layout>
  );
}

export default index;
