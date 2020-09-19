import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import './Navigation.css';
const {Header, Content, Footer} = Layout;

function Navigation(props) {
  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Typography.Title level={2} style={{ margin: 0, paddingRight: '30px' }}>MyTrace</Typography.Title>
        <Menu mode={'horizontal'}>
          <Menu.Item key={1}>Page 1</Menu.Item>
          <Menu.Item key={2}>Page 2</Menu.Item>
          <Menu.Item key={3}>Page 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '50px', height: '100%' }}>
        {props.children}
      </Content>
    </Layout>
  );
}

export default Navigation;