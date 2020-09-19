import React from "react";
import {Form, Input, Layout, Button} from "antd";

const {Header, Content, Footer} = Layout;

function signUp(props){
    return(
        <Layout className="layout" style={{display:"flex", flexFlow:"column", height:"100vh"}}>
            <Header/>
            <Content style={{ padding: '0 50px' }}>
                <div style={{background: "#fff", padding: "24px", flex:"1", overflow:"auto", alignContent:"center", justifyContent:"center"}}>
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

                        <Form.Item >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{background: "#999"}}/>
        </Layout>
    );
}

export default signUp;