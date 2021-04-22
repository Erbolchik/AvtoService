import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Login } from '../../pages';
import NotFound from '../../pages/Error/NotFound';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class RouterApp extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <span>Deshboard</span>
                <Link to="/" />
              </Menu.Item>
              <Menu.Item key="2">
                <span>Meseros</span>
                <Link to="/meseros" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}></Header>
            <Content
              style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Route exact path="/" />
              <Route path="/login" component={Login} />
              <Route path="/mainPage" component={Login} />
              <Route path="/reports" component={Login} />
              <Route path="/userProfile" component={Login} />
              <Route exact={true} path="*" component={NotFound} />
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default RouterApp;
