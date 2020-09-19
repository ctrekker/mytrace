import React from 'react';
import Navigation from '../components/Navigation';
import {Row, Col} from 'antd';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';

const data = [
    { name: 'Electricity', value: 300 },
    { name: 'Natural Gas', value: 300 },
    { name: 'Transportation / Gas', value: 200 },
];
const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

function Home(props) {
    return (
        <Navigation>
            <Row>
                <Col span={8}>

                </Col>
                <Col span={8}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', top: '-200px' }}>
                        <PieChart width={600} height={600}>
                            <Pie
                                data={data}
                                cx={300}
                                cy={300}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={(entry) => entry.name}
                            >
                                {
                                    data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                }
                            </Pie>
                        </PieChart>
                    </div>
                </Col>
                <Col span={8}>

                </Col>
            </Row>
        </Navigation>
    )
}

export default Home;