import React from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import './index.less';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            cols: [],
        }
    }

    UNSAFE_componentWillMount(){
        // 数据源
        const data = [
            { month: '1月',city: '重庆',temperature: 7,},
            { month: '1月',city: '江苏',temperature: 3.9,},
            { month: '2月',city: '重庆',temperature: 6.9,},
            { month: '2月',city: '江苏',temperature: 4.2,},
            { month: '3月',city: '重庆',temperature: 9.5,},
            { month: '3月',city: '江苏',temperature: 5.7,},
            { month: '4月',city: '重庆',temperature: 14.5,},
            { month: '4月',city: '江苏',temperature: 8.5,},
            { month: '5月',city: '重庆',temperature: 18.4,},
            { month: '5月',city: '江苏',temperature: 11.9,},
            { month: '6月',city: '重庆',temperature: 21.5,},
            { month: '6月',city: '江苏',temperature: 15.2,},
            { month: '7月',city: '重庆',temperature: 25.2,},
            { month: '7月',city: '江苏',temperature: 17,},
            { month: '8月',city: '重庆',temperature: 26.5,},
            { month: '8月',city: '江苏',temperature: 16.6,},
            { month: '9月',city: '重庆',temperature: 23.3,},
            { month: '9月',city: '江苏',temperature: 14.2,},
            { month: '10月',city: '重庆',temperature: 18.3,},
            { month: '10月',city: '江苏',temperature: 10.3,},
            { month: '11月',city: '重庆',temperature: 13.9,},
            { month: '11月',city: '江苏',temperature: 6.6,},
            { month: '12月',city: '重庆',temperature: 9.6,},
            { month: '12月',city: '江苏',temperature: 4.8,},
          ];
        
        // 定义度量
        const cols = {
            month: {
                range: [0, 1],
            },
        };
        this.setState({
            data: data,
            cols: cols,
        });
    }

    render(){
        return (
            <div className="admin-page">
                <Row className="admin-page-1">
                    <Col span={6} className="admin-page-1-div1">
                        <div className="admin-page-1-div-div">
                            <Statistic title="在线人数" value={112893} />
                        </div>
                    </Col>
                    <Col span={6} className="admin-page-1-div2">
                        <div className="admin-page-1-div-div">
                            <Statistic title="消息" value={112893} />
                        </div>
                    </Col>
                    <Col span={6} className="admin-page-1-div3">
                        <div className="admin-page-1-div-div">
                            <Statistic title="邮件" value={112893} />
                        </div>
                    </Col>
                    <Col span={6} className="admin-page-1-div4">
                        <div className="admin-page-1-div-div">
                            <Statistic title="收藏" value={112893} />
                        </div>
                    </Col>
                </Row>
                <Row className="admin-page-2">
                    <Col span={16}>
                        <Card className="admin-page-2-card1">
                            <div className='admin-page-2-card1-title'>
                                <span>重庆--江苏一年温度变化</span>
                            </div>
                            <Chart height={500} data={this.state.data} scale={this.state.cols} forceFit>
                                <Legend />
                                <Axis name="month" />
                                <Axis
                                    name="temperature"
                                    label={{
                                    formatter: val => `${val}°C`
                                    }}
                                />
                                <Tooltip
                                    crosshairs={{
                                        type: "y"
                                    }}
                                />
                                <Geom
                                    type="line"
                                    position="month*temperature"
                                    size={2}
                                    color={"city"}
                                    shape={"smooth"}
                                />
                                <Geom
                                    type="point"
                                    position="month*temperature"
                                    size={4}
                                    shape={"circle"}
                                    color={"city"}
                                    style={{
                                        stroke: "#fff",
                                        lineWidth: 1
                                    }}
                                />
                            </Chart>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Card className="admin-page-2-card2">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Row>
                        <Row>
                            <Card className="admin-page-2-card2">
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

}