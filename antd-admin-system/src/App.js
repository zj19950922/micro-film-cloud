import React from 'react'

export default class RoutePage extends React.Component{

    // 根组件，接受存放登录页面，注册页面，主页面等等
    render(){
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

};