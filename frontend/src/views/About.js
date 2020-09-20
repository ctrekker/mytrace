import React from 'react';
import Navigation from '../components/Navigation';
import { Row, Col, Typography, Divider, Layout} from 'antd';


const {Content, Footer} = Layout;




function About(props) {

    return (
        <Layout>
            <Content>
                <div>
                    <p>hi</p>
                </div>
            </Content>
            <Footer style = {{textAlign: 'center'}}>Bitwise Boys 2020</Footer>


        </Layout>
    )
}

export default About;