import React from "react";
import {Form, Input, Layout, Button} from "antd";
import {Link} from "react-router-dom";

const {Header, Content, Footer} = Layout;

function signUp(props){
    return(
        <Layout className="layout" style={{display:"flex", flexFlow:"column", height:"100vh"}}>
            <Header/>
            <Content style={{ position: 'relative' }}>
                <div style={{background: "#fff", display:"flex", justifyContent: 'center', margin: '5%', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

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

                            <Form.Item
                                name="retype"
                                label="Retype Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: 'Retype password!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject('The passwords do not match');
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password/>
                            </Form.Item>
                            <Form.Item style={{ textAlign: 'right' }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
            <Footer style={{background: "#999", textAlign:"center"}}>
                <p>Already have an account: <Link to={"/signIn"}>Sign In</Link></p>
            </Footer>
        </Layout>
    );
}

export default signUp;