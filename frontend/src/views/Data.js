import React from 'react';
import {Layout, Menu, DatePicker, Space} from 'antd';
import{LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip} from "recharts";
import Navigation from "../components/Navigation";

const { Header, Footer, Sider, Content } = Layout;
const{RangePicker} = DatePicker;


function Data(props) {
    return (
        <Navigation>
            <Content>
                <Space direction = "vertical" size={12}>
                    <RangePicker />
                </Space>
                <LineChart width={500} height={300} margin={{top:5, right:30, left:20, bottom:5}}>
                    <XAxis/>
                    <YAxis/>
                </LineChart>
            </Content>
        </Navigation>
    )
}

export default Data;