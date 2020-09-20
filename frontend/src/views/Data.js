import React, { PureComponent, useEffect, useState } from 'react';
import {Layout, Menu, DatePicker, Space, Modal, Button, Checkbox, Dropdown} from 'antd';

import moment from 'moment-es6';

import{LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip} from "recharts";
import Navigation from "../components/Navigation";
import Recommendations from "../components/Recommendations";
import{DownOutlined} from '@ant-design/icons'
import Config from '../Config';


const { Header, Footer, Sider, Content } = Layout;
const{RangePicker} = DatePicker;


function Data(props) {
    const [personalData, setPersonalData] = useState(true);
    const [regionalData, setRegionalData] = useState(false);
    const [globalData, setGlobalData] = useState(false);


    const [startDate, setStartDate] = useState(moment().subtract(1, 'year'));
    const [endDate, setEndDate] = useState(moment());
    
    const [graphData, setGraphData] = useState([
        {
            time: 1600284503080, personal: 4000, regional: 1000, worldwide: 2000
        },
        {
            time: 1600370903080, personal: 2000, regional: 3000, worldwide: 5000
        },
        {
            time: 1600457303080, personal: 3000, regional: 4000, worldwide: 7000
        }
    ]);

    
    useEffect(() => {
        Config.sendRequest(`/api/metrics/emissions?endDate=${moment().toDate().getTime()}&startDate=${startDate.toDate().getTime()}&mode=sum`, 'GET')
          .then(res => {
              setGraphData(res.map(x => ({
                  time: moment(x.first).toDate().getTime(),
                  personal: x.totalEmissions.toFixed(2)
              })));
          })
          .catch((err) => {
          
          });
    }, [startDate]);
    
    
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`)
    }

    function onRangeChange(dates) {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
    }

    function onTimeChange(slice) {
        return e => {
            setStartDate(slice === 'all' ? moment(0) : moment().subtract(1, 'year'));
        };
    }

    const menu = (
        <Menu>
            <Menu.Item key="0" onClick={onTimeChange('year')}>
                <a>This Year</a>
            </Menu.Item>
            <Menu.Item key="1" onClick={onTimeChange('all')}>All Time</Menu.Item>
        </Menu>
    );

    return (
        <Navigation>
            <Layout>
                <Header>
                    <div>
                        <p style = {{float:'left'}}>Data Visual: select time period </p>
                        <p style = {{float:'right'}}><Recommendations/></p>
                    </div>
                </Header>
                <Layout>
                    <Content>
                        <Space direction = "vertical" size={12}>
                            <RangePicker onChange={onRangeChange}/>
                            <Dropdown overlay={menu} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {startDate.toDate().getTime() === 0 ? 'All Time' : 'This Year'} <DownOutlined />
                                </a>
                            </Dropdown>
                        </Space>
                        <LineChart width={800} height={500} data={graphData} margin={{top:5, right:30, left:20, bottom:5}}>
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