import React, {PureComponent, useState} from 'react';

import moment from 'moment-es6';

import {Layout, Menu, DatePicker, Space, Modal, Button, Checkbox} from 'antd';
import{LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip} from "recharts";
import Navigation from "../components/Navigation";
import Recommendations from "../components/Recommendations";


const { Header, Footer, Sider, Content } = Layout;
const{RangePicker} = DatePicker;
const data = [
    {
        time: 1600284503080, personal: 4000, regional: 1000, worldwide: 2000
    },
    {
        time: 1600370903080, personal: 2000, regional: 3000, worldwide: 5000
    },
    {
        time: 1600457303080, personal: 3000, regional: 4000, worldwide: 7000
    },

];



function Data(props) {
    const [personalData, setPersonalData] = useState(true);
    const [regionalData, setRegionalData] = useState(false);
    const [globalData, setGlobalData] = useState(false);

    function onChange(e) {
        console.log(`checked = ${e.target.checked}`)
    }

    console.log(personalData);

    return (
        <Navigation>
            <Layout>
                <Header>
                    <div style={{textAlign:'right'}}>
                        <Recommendations/>
                    </div>
                </Header>
                <Layout>
                    <Content>
                        <Space direction = "vertical" size={12}>
                            <RangePicker />
                        </Space>
                        <LineChart width={800} height={500} data={data} margin={{top:5, right:30, left:20, bottom:5}}>
                            <CartesianGrid strokeDasharray = "3 3"/>
                            <XAxis dataKey="time" tickFormatter={timeStr => moment(timeStr).format("MMM Do")}/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            {personalData && <Line type="monotone" dataKey="personal" stroke="#8884d8" activeDot={{r:8}}/>}
                            {regionalData && <Line type="monotone" dataKey="regional" stroke="#82ca9d" activeDot={{r:8}}/>}
                            {globalData && <Line type="monotone" dataKey="worldwide" stroke="#C12846" activeDot={{r:8}}/>}
                        </LineChart>
                    </Content>
                    <Sider theme="light">
                        <div style={{display: "flex", flexDirection: "column", height: '80%', alignItems: 'center', justifyContent: 'center' }}>
                            <Checkbox onChange={() => setPersonalData(!personalData)} checked={personalData}>Personal Data</Checkbox>
                            <Checkbox onChange={() => setRegionalData(!regionalData)} checked={regionalData}>Regional Data</Checkbox>
                            <Checkbox onChange={() => setGlobalData(!globalData)} checked={globalData}>Global Data</Checkbox>
                        </div>
                    </Sider>
                </Layout>
            </Layout>


        </Navigation>
    )
}

export default Data;