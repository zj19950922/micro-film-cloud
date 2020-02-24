import React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import App from '../App'
import Admin from '../admin';
import Home from '../pages/home';
import Browser from '../pages/browser';
import Login from '../pages/login/index';
import Register from '../pages/register/index';
import MenuManage from '../pages/system/menu/index';
import UserManage from '../pages/system/user/index';
import OrgManage from '../pages/system/org/index';
import RoleManage from '../pages/system/role/index';
import NoMatchPage from '../pages/404/NoMatchPage';
import Monitor from '../pages/monitor';

export default class RoutePage extends React.Component{

    render(){
        return (
            <Router>
                <App>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/monitor" component={Monitor} />
                    <Route path="/admin" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin" exact component={Browser} /> 
                                <Route path="/admin/home" component={Home} />
                                <Route path="/admin/system/menu" component={MenuManage} />
                                <Route path="/admin/system/user" component={UserManage} />
                                <Route path="/admin/system/org" component={OrgManage} />
                                <Route path="/admin/system/role" component={RoleManage} />
                                <Route path="/login" component={Login} />
                                {/** 没有路径的匹配到404页面*/}
                                <Route component={NoMatchPage}></Route>
                            </Switch>
                        </Admin>
                    } />                  
                </App>
            </Router>
        );
    }

};
