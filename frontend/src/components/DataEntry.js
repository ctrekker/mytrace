import React, {useState} from "react";
import {Modal, Form, Button, Input, DatePicker, Cascader} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import "./DataEntry.css"

function DataEntry(props) {
    const [visible, setVisible] = useState(false);
    const [formVariant, setFormVariant] = useState();
    let conversionRate = 1;

    const options = ([
        {
            value: 'ELECTRICITY',
            label: "Electricty"
        },
        {
                value: "NATURAL_GAS",
                label: "Natural Gas"
        },
        {
                value:"TRANSPORTATION",
                label:"Transportation"
        }

    ]);

    function onChange(value){
        setFormVariant(value.toString());
    }

    function onOk() {
        if(document.getElementById(formVariant).value.match(/^[0-9]+([.][0-9]+)?$/g) && document.getElementById("date").value.length > 0) {
            switch(formVariant){
                case("ELECTRICITY"):{
                    conversionRate = 1.5588;
                    break
                }
                case("NATURAL_GAS"):{
                    conversionRate = 12.1033638;
                    break
                }
                default:
                    conversionRate = 19.59
            }
            setVisible(false);
        }
    }
    function onCancel() {
        setVisible(false);
    }

    return (
        <>
            <Button type="primary" shape="circle" onClick={() => setVisible(true)}>
                <PlusOutlined/>
            </Button>
            <Modal title="Data Input" visible={visible} onOk={onOk} onCancel={onCancel} destroyOnClose={true}>
                <Cascader options={options} onChange={onChange} placeholder="Select One" allowClear={false} style={{display:"flex", alignItems:"center", textAlign:"center", marginBottom:"2%"}} id = "type"/>
                <Form style={{display:"-ms-inline-flexbox", flexDirection:"row", flexWrap:"nowrap"}}>
                    { formVariant === 'ELECTRICITY' && (
                        <Form.Item><Input id={"ELECTRICITY"} placeholder={"Kilowatt Hours"}/></Form.Item>
                    )}
                    { formVariant === 'NATURAL_GAS' && (
                        <Form.Item><Input id={"NATURAL_GAS"} placeholder={"Centum Cubic Feet"}/></Form.Item>
                    )}
                    { formVariant === 'TRANSPORTATION' && (
                        <Form.Item><Input id={"TRANSPORTATION"} placeholder={"Gallon"}/></Form.Item>
                    )}
                    { formVariant != null &&(
                        <DatePicker id = "date" style={{display:"flex"}}/>
                    )}
                </Form>
            </Modal>
            <div>{props.children}</div>
        </>
    );
}

export default DataEntry;
