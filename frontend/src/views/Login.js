import React from 'react'

import { Form, Input, Button, Checkbox } from 'antd';
import { Layout, Menu, Row, Col, Divider } from 'antd';
const { Header, Footer, Sider, Content } = Layout;




function Login(props) {
        return (
        <Layout>
            <Header>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>

                </Menu>
            </Header>
            <Content>

                <Row>
                    <Col span ={8}></Col>
                    <Col span ={8}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[{ required: true, message: 'Please input your username!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span ={8}></Col>
                </Row>

            </Content>

            <Footer style = {{textAlign: 'center'}}>Created by David</Footer>
        </Layout>
    );
}

export default Login;
