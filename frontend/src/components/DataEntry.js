import React from "react";
import {Modal, Form, Button, Input, Menu, Dropdown} from "antd";
import {PlusOutlined} from '@ant-design/icons';

class DataEntry extends React.Component{
    state = {
        visible:false,
        confirmLoading: false,
        formContent: <Form.Item label="Test 1"><Input/></Form.Item>
    }

    showModal = () =>{
        this.setState({
            visible:true
        });
    }

    onOk = () =>{
        //TODO submit form
        this.setState({
            visible:false
        });
    }

    onCancel = () =>{
        this.setState({
            visible:false
        });
    }

    render() {
        return(
        <>
            <Button type="primary" shape="circle" onClick={this.showModal}>
                <PlusOutlined/>
            </Button>
            <Modal title="Data Input" visible={this.state.visible} onOk={this.onOk} onCancel={this.onCancel} confirmLoading={this.state.confirmLoading}>
                <Dropdown overlay={
                <Menu>
                    <Menu.Item key="0" onClick={() => {
                        this.setState({
                            formContent: <Form.Item label="Test 1"><Input/></Form.Item>
                        });
                    }}>
                    Test 1
                    </Menu.Item>
                    <Menu.Item key="1" onClick={() => {
                        this.setState({
                            formContent: <Form.Item label="Test 2"><Input/></Form.Item>
                });
                    }}>
                    Test 2
                    </Menu.Item>
                    <Menu.Item key="3" onClick={() => {
                        this.setState({
                            formContent: <Form.Item label="Test 3"><Input/></Form.Item>
                        });
                    }}>
                        Test 3
                    </Menu.Item>
                </Menu>} trigger={"click"}>Test 1</Dropdown>
               <Form>{this.state.formContent}</Form>
            </Modal>
        </>
        );
    }
}

export default DataEntry