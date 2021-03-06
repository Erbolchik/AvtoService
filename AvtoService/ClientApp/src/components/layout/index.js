import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu, PageHeader } from 'antd';
import {
  Login,
  MainPage,
  Reports,
  UserProfile,
  Employees,
  Clients,
  Cars,
  OrderRepair,
  ServiceSpending,
  WorkTypes,
  Registration,
} from '../../pages';
import NotFound from '../../pages/Error/NotFound';
import {
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  CarOutlined,
  TeamOutlined,
  ToolOutlined,
  FileDoneOutlined,
  HomeOutlined,
  CreditCardOutlined,
} from '@ant-design/icons';
import './index.css';
import PrivateRoute from './PrivateRoute';

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(e) => setCollapsed(!collapsed)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <span>Главная</span>
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <span>Личный кабинет</span>
              <Link to="/userProfile" />
            </Menu.Item>
            <Menu.Item key="3" icon={<CarOutlined />}>
              <span>Автомобили</span>
              <Link to="/cars" />
            </Menu.Item>
            <Menu.Item key="4" icon={<ToolOutlined />}>
              <span>Заказ-наряд</span>
              <Link to="/orderRepair" />
            </Menu.Item>
            <Menu.Item key="5" icon={<CreditCardOutlined />}>
              <span>Расходы сервиса</span>
              <Link to="/spendingService" />
            </Menu.Item>
            <Menu.Item key="6" icon={<FileDoneOutlined />}>
              <span>Отчеты</span>
              <Link to="/reports" />
            </Menu.Item>
            <Menu.Item key="7" icon={<TeamOutlined />}>
              <span>Сотрудники</span>
              <Link to="/employees" />
            </Menu.Item>
            <Menu.Item key="8" icon={<TeamOutlined />}>
              <span>Клиенты</span>
              <Link to="/clients" />
            </Menu.Item>
            <Menu.Item key="9" icon={<TeamOutlined />}>
              <span>Виды работ</span>
              <Link to="/workTypes" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Menu theme="dark">
            <PageHeader className="site-page-header" title="Автосервис Erfa" />
          </Menu>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact={true} path="/" component={MainPage} />
              <PrivateRoute path="/cars" component={Cars} />
              <PrivateRoute path="/orderRepair" component={OrderRepair} />
              <PrivateRoute path="/reports" component={Reports} />
              <PrivateRoute path="/spendingService" component={ServiceSpending} />
              <PrivateRoute path="/userProfile" component={UserProfile} />
              <PrivateRoute path="/employees" component={Employees} />
              <PrivateRoute path="/clients" component={Clients} />
              <PrivateRoute path="/workTypes" component={WorkTypes} />
              <Route exact={true} path="*" component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Автосервис Erfa 2021</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default BaseLayout;
