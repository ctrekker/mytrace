import React from "react";
import {Modal, Form, Button, Input, Menu, Dropdown} from "antd";
import {PlusOutlined} from '@ant-design/icons';

class Recommendations extends React.Component{
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <>
                <Button type="primary" onClick={this.showModal}>
                    Recommendations
                </Button>
                <Modal
                    title="Recommendations"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Turn off your lights when you are not at home. </p>
                    <p>Opt for biking to work once in a while!</p>
                    <p>Be smart about air conditioning usage.</p>
                </Modal>
            </>
        );
    }
}


export default Recommendations