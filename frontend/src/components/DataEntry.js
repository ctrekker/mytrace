import React, {useState} from "react";
import {Modal, Form, Button, Input, DatePicker, Cascader} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import "./DataEntry.css"
import Config from "../Config";
import moment from 'moment-es6';

function DataEntry(props) {
    const [visible, setVisible] = useState(false);
    const [formVariant, setFormVariant] = useState();

    const options = ([
        {
            value: 'ELECTRIC',
            label: "Electricity"
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

    async function onOk() {
        if(document.getElementById(formVariant).value.match(/^[0-9]+([.][0-9]+)?$/g) && document.getElementById("date").value.length > 0) {
            Config.sendRequest('/api/metrics', 'POST', {
                source: formVariant,
                metricTimestamp: moment(document.getElementById('date').value).toDate().getTime(),
                data: document.getElementById(formVariant).value
            })
                .then(res => {
                    console.log(res);
                    setVisible(false);
                    setFormVariant(null);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
    function onCancel() {
        setVisible(false);
        setFormVariant(null);
    }

    return (
        <>
            <Button type="primary" shape="circle" onClick={() => setVisible(true)} style={{minHeight:"3em", minWidth:"3em", fontSize:"1.5em"}}>
                <PlusOutlined/>
            </Button>
            <Modal title="Data Input" visible={visible} onOk={onOk} onCancel={onCancel} destroyOnClose={true}>
                <Cascader options={options} onChange={onChange} placeholder="Select One" allowClear={false} style={{display:"flex", alignItems:"center", textAlign:"center", marginBottom:"2%"}} id = "type"/>
                <Form style={{display:"-ms-inline-flexbox", flexDirection:"row", flexWrap:"nowrap"}}>
                    { formVariant === 'ELECTRIC' && (
                        <Form.Item><Input id={"ELECTRIC"} placeholder={"Kilowatt Hours"}/></Form.Item>
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
