import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu, PageHeader } from 'antd';
import { Login, MainPage, Reports, UserProfile, Employees, Clients } from '../../pages';
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
} from '@ant-design/icons';
import './index.css';

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(e) => setCollapsed(!collapsed)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <span>Личный кабинет</span>
              <Link to="/userProfile" />
            </Menu.Item>
            <Menu.Item key="2" icon={<CarOutlined />}>
              <span>Автомобили</span>
              <Link to="/mainPage" />
            </Menu.Item>
            <Menu.Item key="3" icon={<MailOutlined />}>
              <span>Login</span>
              <Link to="/login" />
            </Menu.Item>
            <Menu.Item key="4" icon={<FileDoneOutlined />}>
              <span>Отчеты</span>
              <Link to="/reports" />
            </Menu.Item>
            <Menu.Item key="5" icon={<ToolOutlined />}>
              <span>Сотрудники</span>
              <Link to="/employees" />
            </Menu.Item>
            <Menu.Item key="6" icon={<TeamOutlined />}>
              <span>Клиенты</span>
              <Link to="/clients" />
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
              <Route path="/login" component={Login} />
              <Route path="/mainPage" component={MainPage} />
              <Route path="/reports" component={Reports} />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/employees" component={Employees} />
              <Route path="/clients" component={Clients} />
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
