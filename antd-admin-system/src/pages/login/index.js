import React from 'react';
import './index.less';
import { login } from '../../axios/api/LoginApi';
import { Form, Input, Button, message, Icon, Checkbox, notification } from 'antd';
const FormItem = Form.Item;

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            userName: '',         // 用户登录名
            password: '',         // 用户登录密码
            isRemember: false,      // 是否记住密码
        }
    }

    // 登录提交表单事件
    handleSubmit = () =>{
        let history = this.props.history;
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                let loginInfo = {};
                loginInfo.userName = userInfo.userName;
                loginInfo.password = userInfo.password;
                loginInfo.remember = userInfo.remember;
                // 如果记住密码，则将信息存储
                if(userInfo.remember){
                    localStorage.setItem("remember", JSON.stringify(loginInfo));
                }
                // 异步执行登录
                this.userLogin(history, userInfo, loginInfo);
            }
        })
    }

    async userLogin(history, userInfo, loginInfo){
        await login(loginInfo).then((res) => {
            if (res.flag === true || res.code === 200) {
                if(!res.data.status){
                    this.openNotification();
                }else{
                    localStorage.setItem('user', JSON.stringify(res.data));
                    message.success(`用户名 ${userInfo.userName} 登录成功`);
                    // 登录成功，跳转首页
                    history.push("/admin");
                }
            }else{
                message.error(res.msg);
            }
        });   
    }

    openNotification = () => {
        const key = `open${Date.now()}`;
        const btn = (
          <Button type="primary" size="small" onClick={() => notification.close(key)}>
            Confirm
          </Button>
        );
        notification.open({
          message: '用户未激活',
          description:
            '当前用户未激活，请联系管理员',
          btn,
          key,
          duration: 5,
          icon: <Icon type="smile" style={{ color: '#108ee9' }} />,
        });
    };

    // 页面加载后执行
    componentDidMount(){
        let login = localStorage.getItem("remember");
        if(login){
            let loginInfo = JSON.parse(login);
            this.setState({
                userName: loginInfo.userName,
                password: loginInfo.password,
                isRemember: loginInfo.remember,
            });
        }
    }

    render(){
        // js表单属性对象
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <div className='login-header'>
                    微影云后台管理系统
                </div>
                <Form className='login-form'>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('userName',{
                                // 初始化值
                                initialValue: this.state.userName,
                                // 规则
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空',
                                    },
                                    {
                                        min: 5, max:15,
                                        message: '账号长度需5到15位',
                                    },
                                    {
                                        pattern: new RegExp('^\\w+$', 'g'),
                                        message: '用户名必须为字母或者数字',
                                    }
                                ]
                            })(
                                <Input prefix={<Icon type="user" />} placeholder="请输入用户名"></Input>
                            )
                        }
                    </FormItem>
                    <FormItem hasFeedback>
                        {
                            getFieldDecorator('password',{
                                // 初始化值
                                initialValue: this.state.password,
                                // 规则
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空',
                                    }
                                ]
                            })(
                                <Input.Password prefix={<Icon type="lock" />} placeholder="请输入密码"></Input.Password>
                            )
                        }
                    </FormItem>
                    <FormItem>
                        {
                            getFieldDecorator('remember',{
                                valuePropName: 'checked',
                                // 初始化值
                                initialValue: this.state.isRemember,
                            })(
                                <Checkbox className='remember'>记住密码</Checkbox>
                            )
                        }
                        <a className='forget' href='/login'>忘记密码？</a>
                    </FormItem>
                    <FormItem>
                        <Button className='login-form-button' type='primary' onClick={this.handleSubmit}>登录</Button>
                        <a className="login-form-register" href="/#/register">没有账号？去注册</a>
                    </FormItem>
                </Form>
            </div>
        );
    }

}
// 将Login传入到Form
export default Form.create()(Login);