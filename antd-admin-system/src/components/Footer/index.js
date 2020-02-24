import React from "react"
import './index.less'
import { Divider } from "antd";

export default class Footer extends React.Component{

    render(){
        return (
            <div className="footer">
                <Divider />
                <div>
                    版权所有：zj，邮箱：1550633719@qq.com,推荐使用chrome
                </div>
            </div>
        );
    }

}