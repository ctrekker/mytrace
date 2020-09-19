import React from 'react'
import 'antd/dist/antd.css';

import { Form, Input, Button, Checkbox } from 'antd';
import { Layout, Menu } from 'antd';
import Navigation from "../components/Navigation";
const { Header, Footer, Content } = Layout;


function Login(props) {
        return (
        <Layout style={{ height: '100vh' }}>
            <Navigation>
                <Content style={{padding: '0 50px'}}>
                    <div style={{display: "flex", height: '80%', alignItems: 'center', justifyContent: 'center' }}>
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

                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Content>
            </Navigation>



            <Footer style = {{textAlign: 'center'}}>Bitwise Boys 2020</Footer>
        </Layout>
    );
}

export default Login;
