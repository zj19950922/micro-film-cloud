import React from "react"
import './index.less'
import {NavLink} from 'react-router-dom'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom';
const { SubMenu } = Menu

class NavLeft extends React.Component{

    constructor(props){
        super(props);
        let path = this.props.location.pathname;
        this.state={
            menuTreeNode: [], 
            current: path,
            submenu: [path.slice(0,path.lastIndexOf("/"))],
        }
    }

    // 在此生命周期中进行获取父组件传递的参数
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.getMenud(nextProps.menus);
    }

    getMenud = (menus) => {
        const menuTreeNode = this.renderMenu(menus);
        this.setState({
            menuTreeNode: menuTreeNode
        });
    }

    handleClick = e => {
        this.setState({
          current: e.key,
          submenu: [e.key.slice(0,e.key.lastIndexOf("/"))]
        });
      };

    // 左侧菜单栏动态生成和菜单路由跳转
    renderMenu = (data)=> {
        // 对原数据进行遍历，生产新的数组
        return data.map((item)=>{
            // 判断是否有children，有children时一直遍历到最下层
            if(item.children && !item.hidden){
                return (
                    <SubMenu title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} key={item.path}>
                        {this.renderMenu(item.children)}
                    </SubMenu>
                )
            };
            if(!item.hidden){
                // 最下层没有children时返回数据
                // return  (<Menu.Item title={<span><Icon type={item.icon} /><span>{item.title}</span></span>} key={item.path} >
                //     <NavLink to={item.path}>{item.title}</NavLink>
                // </Menu.Item>)
                return  (<Menu.Item key={item.path} >
                    <NavLink to={item.path}><Icon type={item.icon}/><span>{item.title}</span></NavLink>
                </Menu.Item>)
            }else{
                return ''
            }
            
        })
    }

    render(){
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo.jpg" alt=""></img>
                    <h1>CloudFilm</h1>
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={this.state.current} onClick={this.handleClick} defaultOpenKeys={this.state.submenu}>
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        );
    }

};
export default withRouter(NavLeft);