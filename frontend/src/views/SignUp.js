import React, { useState } from 'react';
import { Form, Input, Layout, Button, Typography } from 'antd';
import {Link} from "react-router-dom";
import Config from '../Config';

const { Content, Footer} = Layout;

function SignUp(props){
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    async function signUp() {
      try {
        const user = await Config.sendRequest('/api/users', 'POST', {name, email, password});
        if(user.error) {
          throw new Error(user.message);
        }
        const userSignIn = await Config.sendRequest('/api/users/signIn', 'POST', {email, password});
        window.location.href = '/';
      }
      catch(e) {
        setError(e.message);
      }
    }
  
    return (
        <Layout className="layout" style={{display:"flex", flexFlow:"column", height:"100vh"}}>
            <Content style={{ position: 'relative' }}>
                <div style={{background: "#fff", display:"flex", justifyContent: 'center', margin: '5%', position: 'absolute', left: 0, right: 0, bottom: 0, top: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={signUp}
                        >
                            <Form.Item
                              label="Name"
                              name="name"
                              rules={[{ required: true, message: 'Please input your first and last name!' }]}
                            >
                                <Input value={name} onChange={e => setName(e.target.value)}/>
                            </Form.Item>
                          
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
                                <Input value={email} onChange={e => setEmail(e.target.value)}/>
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password value={password} onChange={e => setPassword(e.target.value)}/>
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
                          <Form.Item>
                            <Typography.Text type="danger">{error}</Typography.Text>
                          </Form.Item>
                            <Form.Item style={{ textAlign: 'right' }}>
                                <Link to={"/login"} style={{ marginRight: '10px' }}>Already have an account? Sign In</Link>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </Content>
        </Layout>
    );
}

export default SignUp;