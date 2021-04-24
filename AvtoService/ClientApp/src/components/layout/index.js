import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Login, MainPage, Reports, UserProfile, Employees } from '../../pages';
import NotFound from '../../pages/Error/NotFound';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
  LinkOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

const BaseLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(e) => setCollapsed(!collapsed)}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<MailOutlined />}>
              <span>Личный кабинет</span>
              <Link to="/userProfile" />
            </Menu.Item>
            <Menu.Item key="2" icon={<MailOutlined />}>
              <span>Автомобили</span>
              <Link to="/mainPage" />
            </Menu.Item>
            <Menu.Item key="3" icon={<MailOutlined />}>
              <span>Login</span>
              <Link to="/login" />
            </Menu.Item>
            <Menu.Item key="4" icon={<MailOutlined />}>
              <span>Отчеты</span>
              <Link to="/reports" />
            </Menu.Item>
            <Menu.Item key="5" icon={<MailOutlined />}>
              <span>Сотрудники</span>
              <Link to="/employees" />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
            {collapsed ? (
              <MenuFoldOutlined onClick={() => setCollapsed(!collapsed)} />
            ) : (
              <MenuUnfoldOutlined onClick={() => setCollapsed(!collapsed)} />
            )}
            <span style={{ marginLeft: 50 }}>Автосервис у Ербола</span>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <Switch>
              <Route exact={true} path="/" component={MainPage} />
              <Route path="/login" component={Login} />
              <Route path="/mainPage" component={MainPage} />
              <Route path="/reports" component={Reports} />
              <Route path="/userProfile" component={UserProfile} />
              <Route path="/employees" component={Employees} />
              <Route exact={true} path="*" component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Сатыбалдин Ербол 2021</Footer>
        </Layout>
      </Layout>
    </Router>
  );
};

export default BaseLayout;
