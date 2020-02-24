/* eslint-disable array-callback-return */
import React from 'react';
import { Row, Col, message } from 'antd';
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";
import "./style/common.less";
import { withRouter } from 'react-router-dom';
import { queryMenu } from './axios/api/LoginApi';
import { queryUserOfMenu } from './axios/api/UserApi';
const SUPER_MANAGER = "超级管理员"
class Admin extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            userName: null,
            menus: [],
            userId: null,
        };
    }

    componentDidMount(){
        this.queryUserOfRole();
    }

    // 登录后根据userId
    async getMenu(userId, userName){
        await queryUserOfMenu(userId).then((res)=>{
            if (res && (res.flag === true || res.code === 200)) {
                this.setState({
                    userId: userId,
                    userName: userName,
                    menus: res.data,
                })
            }
        }) 
    }

    // 获取菜单
    async getMenus(userName, userId){
        let _this = this;
        await queryMenu(null).then(res => {
            if (res && (res.flag === true || res.code === 200)) {
                _this.setState({
                    userId: userId,
                    userName: userName,
                    menus: res.data,
                });
            }
        });
    }

    // 获取子组件传递的改变菜单栏的值
    async onChangeMenu(value){
        console.log("接收到值"+value)
        if(value === 'update'){
            this.queryUserOfRole();
        }
    }

    // 查询用户的角色
    queryUserOfRole(){
        let history = this.props.history;
        let user = localStorage.getItem('user');
        if(user != null){
            let loginData = JSON.parse(user);
            // 获取用户角色
            let roles = loginData.roleList;
            let userName = loginData.userName;
            let userId = loginData.userId;
            let flag = true;
            if(roles!==[]){
                // 判断是否有超级管理员角色
                var j = 0;
                var len = roles.length;
                for(j,len; j < len; j++) {
                    if(roles[j].label === SUPER_MANAGER){
                        console.log("超级管理员")
                        flag = false
                        this.getMenus(userName, userId);
                        break;
                    }
                }
            }
            if(flag){
                this.getMenu(userId, userName);
            }
        }else{
            message.warning('用户未登录');
            history.push("/login");
        }
    }

    componentWillUnmount(){
        localStorage.removeItem("menus");
        localStorage.removeItem("user");
    }

    render(){
        // 在渲染子组件时，传递方法onChangeMenu到子组件；在子组件更新时将此方法的返回值传递回来,以此来触发兄弟组件的更新
        this.props.location.onChangeMenu = this.onChangeMenu.bind(this);
        return (
            <Row className="container">
                <Col span={3} className="nav-left">
                    <NavLeft menus={this.state.menus} />
                </Col>
                <Col span={21} className="main">
                    <Header userName={this.state.userName} />
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        );
    }

};
export default withRouter(Admin)