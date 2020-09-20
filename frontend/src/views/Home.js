import React, {useEffect, useState} from 'react';
import Navigation from '../components/Navigation';
import { Row, Col, Typography, Divider } from 'antd';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import Config from "../Config";
import moment from "moment-es6";

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

function Fact({ title, children }) {
    return (
      <div style={{ marginBottom: '50px' }}>
        <Divider orientation={'left'}>{title}</Divider>
        <Typography.Text style={{ fontSize: '16pt', display: 'block', marginTop: '20px' }}>{children}</Typography.Text>
      </div>
    );
}

function Home(props) {
    const [graphData, setGraphData] = useState([
        { name: 'Electricity', value: 1 },
        { name: 'Natural Gas', value: 1 },
        { name: 'Transportation / Gas', value: 1 }
    ]);

    useEffect(() => {
        Config.sendRequest(`/api/metrics/aggregate?endDate=${moment().toDate().getTime()}&startDate=${moment().subtract(1, 'month').toDate().getTime()}&mode=sum`, 'GET')
            .then(res => {
                setGraphData(res.map(x => ({
                    name: {
                        ELECTRIC: 'Electricity',
                        NATURAL_GAS: 'Natural Gas',
                        TRANSPORTATION: 'Transportation'
                    }[x._id],
                    value: x.total
                })));
            })
            .catch(err => {
                console.log(err);
            });
    }, [setGraphData]);

    return (
        <Navigation>
            <Row>
                <Col span={8}>
                    <Fact title={'Global Fact'}>Our UI Design mockups were built in MS Paint!</Fact>
                    <Fact title={'Global Emissions'}>Up by 9000%</Fact>
                </Col>
                <Col span={8}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', top: '-150px' }}>
                        <PieChart width={600} height={600}>
                            <Pie
                                data={graphData}
                                cx={270}
                                cy={270}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={(entry) => entry.name}
                            >
                                {
                                    graphData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </Col>
                <Col span={8}>
                    <Fact title={'Personalized Fact'}>You have decreased your CO^2 emissions by <b>6%</b></Fact>
                    <Fact title={'Personal Emissions'}>This should be your personal emissions</Fact>
                </Col>
            </Row>
        </Navigation>
    )
}

export default Home;