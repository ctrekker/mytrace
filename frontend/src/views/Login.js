import React, { useRef, useState } from 'react'
import 'antd/dist/antd.css';

import { Form, Input, Button, Checkbox } from 'antd';
import { Layout, Menu } from 'antd';
import Navigation from "../components/Navigation";
import Config from '../Config';
import { Link } from 'react-router-dom';

const { Header, Footer, Content } = Layout;


function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function signIn() {
        setLoading(true);
        try {
            const user = await Config.sendRequest('/api/users/signIn', 'POST', {email, password});
            window.location.href = '/';
        }
        catch(e) {
        
        }
        setLoading(false);
    }
    
    return (
        <Layout style={{ height: '100vh' }}>
            <Content style={{padding: '0 50px'}}>
                <div style={{display: "flex", height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
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

                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item style={{ textAlign: 'right' }}>
                            <Link to={'/signup'} style={{ marginRight: '10px' }}>Don't have an account? Sign Up</Link>
                            <Button type="primary" onClick={signIn}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            
            <Footer style = {{textAlign: 'center'}}>Bitwise Boys 2020</Footer>
        </Layout>
    );
}

export default Login;
