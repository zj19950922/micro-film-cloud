import React from "react";
import { Row, Col, Badge, Avatar, message, Breadcrumb, Tooltip } from 'antd';
import './index.less';
import Util from '../../utils/util';
import Axios from '../../axios';
import { withRouter } from 'react-router-dom';
import { logout } from '../../axios/api/LoginApi';

class Header extends React.Component{
    constructor(props){
        super(props);
        this.state={
            sysTime: null,                              // 当前时间
            userName: '',                               // 用户名（缩减）
            userNameReal: "",                           // 真实用户名
            openMenu: 'none',                           // 是否打开头像菜单
            msg: 100,                                     // 用户未读消息 
            path: this.props.location.pathname,         // 面包屑路径
        }
    }
    
    UNSAFE_componentWillMount(){
        // 获取当前时间，1s获取一次
        this.interval = setInterval(()=>{
            let time = Util.formateDate();
            this.setState({
                sysTime: time
            })
        },1000);
        //this.getWeatherAPIData();

    }
    
    componentDidMount(){
        let _this = this;
        window.addEventListener('popstate', function(event) {
            let path = event.path[0].location.hash;
            _this.setState({
                path: path.substring(2),
            })
        })
    }

    getWeatherAPIData(){
        let city = '镇江';
        Axios.jsonp({
            url:"http://api.map.baidu.com/telematics/v3/weather?location="+encodeURIComponent(city)+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        }).then((res)=>{
            if(res.status === "success"){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather,
                    temperature: data.temperature,
                    city: res.results[0].currentCity
                });
            }
        })
    }

    // 在此生命周期中进行获取父组件传递的参数
    UNSAFE_componentWillReceiveProps(nextProps) {
        let userName = this.strLengthNum(nextProps.userName);
        this.setState({
            userName: userName,
            userNameReal: nextProps.userName,
        });
    }

    // 控制字符串显示的长度
    strLengthNum = (str) => {
        if(str.length > 6){
            str = str.substring(0,6) + '...';//控制显示5个字符+....；
        }
        return str;
    }

    // eslint-disable-next-line no-dupe-class-members
    componentWillUnmount(){
        this.interval && clearInterval(this.interval)
        this.interval = false
    }

    // 鼠标悬停事件
    mouserOver = () => {
        this.setState({
            openMenu: 'block',
        });
    }

    // 鼠标移出事件
    mouserOut = () => {
        this.setState({
            openMenu: 'none',
        });
    }

    // 悬浮菜单的显示
    mouserUserOver = () => {
        this.setState({
            openMenu: 'block',
        });
    }

    // 个人中心
    center = () => {
        this.props.history.push('/admin/user/center');
    }

    // 账号设置
    userAccount = () => {
        
    }

    // 注销登录
    logout = () => {
        localStorage.removeItem("menus");
        localStorage.removeItem("user");
        this.getLogout(this.state.userNameReal);
        message.success("注销成功");
        this.props.history.push('/login');
    }

    async getLogout(userName){
        await logout(userName);
    }

    // 面包屑
    generateBreadcrumbs = () => {
        let path = this.state.path;
        let urls = path.split('/');
        return urls.map((item, key) => {
            if(item){
                return (<Breadcrumb.Item href="/#/admin/home" key={key}>{item}</Breadcrumb.Item>);
            }
            return ''
        })
    }

    render(){
        return (
            <div className="header">
                <Row className="header-top">
                    <div className='header-right'>
                        <div className='header-menu'
                            onMouseOver={this.mouserOver} 
                            onMouseLeave={this.mouserOut}
                        >
                            <span className='header-avatar'>
                                <Badge count={this.state.msg}>
                                    <Avatar size="large" style={{ backgroundColor: '#87d068' }} icon="user" />
                                </Badge>
                            </span>
                            <Tooltip placement="topLeft" mouseLeaveDelay={0.05} title={this.state.userNameReal}>
                                <span className='header-name'>{this.state.userName}</span>
                            </Tooltip>
                            
                        </div>
                        <div className="folderMenu"
                            style={{display:this.state.openMenu}}
                            onMouseOver={this.mouserUserOver}
                            onMouseLeave={this.mouserOut}
                        >
                            <ul className="ul">
                                <li onClick={this.userCenter}>个人中心</li>
                                <li onClick={this.userAccount}>我的消息({this.state.msg})</li>
                                <li onClick={this.logout}>注销登录</li>
                            </ul>
                        </div>
                    </div>
                </Row>
                <Row className="breadcrumb">
                    <Col span={12} className="breadcrumb-title">
                        <Breadcrumb className='breadcrumb-title-path' separator=">">
                            {this.generateBreadcrumbs(this.state.path)}
                        </Breadcrumb>
                    </Col>
                    <Col span={12} className="weather">
                        <span className="date">{this.state.sysTime}</span> 
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""></img>
                        </span>
                        <span className="weather-detail">
                            {this.state.city}  {this.state.weather}  {this.state.temperature}
                        </span> 
                    </Col>
                </Row>
            </div>
        );
    }

};
export default withRouter(Header);