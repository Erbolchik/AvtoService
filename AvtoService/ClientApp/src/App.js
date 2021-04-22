import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import Navbar from './pages/Menu';
// import './custom.css';
import Login from './pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from 'antd';
import { PieChartOutlined, DesktopOutlined, ContainerOutlined } from '@ant-design/icons';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline" theme="dark">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Личный кабинет
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Главная
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Сотрудники
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Сотрудники
          </Menu.Item>
          <Menu.Item key="3" icon={<ContainerOutlined />}>
            Сотрудники
          </Menu.Item>
        </Menu>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
