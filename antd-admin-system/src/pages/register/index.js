import React from 'react';
import { Card, Form, Input, Radio, InputNumber, Select, Switch, DatePicker, Upload, message, Icon, Checkbox, Button, Modal } from 'antd';
import './index.less';

const { Option } = Select;
const FormItem = Form.Item;

// 爱好集合
const hobbyArr = [];
// 状态集合
const statusArr = [];

class Register extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            status: [],                 // 状态
            imageUrl: '',               // 图片地址
            loading: false,             // 加载图标
            imageList: [],              // 图片列表
            checked: false,             // 是否已阅读xxx协议
            confirmDirty: false,        // 判断两次密码是否一致
            visible: false,             // 弹出层，默认不弹出
        };
    }

    UNSAFE_componentWillMount(){

        let arrOfHobby = ["爬山","攀岩","打酱油","划水","摸鱼","敲代码","揪头发","砸键盘"];
        let arrOfStatus = ["多线划水","在线摸鱼","勇于加班"];
        // 爱好,多标签选取
        for (let i =  0; i < arrOfHobby.length; i++) {
            hobbyArr.push(<Option key={arrOfHobby[i]}>{arrOfHobby[i]}</Option>);
        }
        // 状态选取
        for (let i =  0; i < arrOfStatus.length; i++) {
            statusArr.push(<Option key={arrOfStatus[i]}>{arrOfStatus[i]}</Option>);
        }

    }

    // 记录第一次输入密码
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // 确认密码失去焦点
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    
    // 比较两次密码
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
          callback('两次密码不一致');
        } else {
          callback();
        }
    };

    // 创建个人信息按钮
    handleCreateUserInfo = () => {
        this.setState({ 
            visible: true 
        });
    }

    // 处理是否已阅读xxx协议
    handleCheckbox = (e) =>{
        this.setState({
            checked: e.target.checked,
        });
    }

    // 取消弹出层
    handleCancel = () => {
        this.setState({ 
            visible: false 
        });
    };

    // 弹出层数据创建
    handleCreate = () => {
        this.setState({ visible: false });
    };

    // 图片上传前的逻辑
    beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('只能上传JPG/PNG文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片必须小于2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    // 将图片转成base64
    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    // 执行图片上传
    handleUpload = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl: imageUrl,
                    loading: false,
                }),
            );
        }
    };

    // 注册表单提交
    handleSubmitOfRegist = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                // let login = {};
                // login.userName = userInfo.userName;
                // login.password = userInfo.password;
                // login.remember = userInfo.remember;
                // localStorage.setItem('login', JSON.stringify(login));
                console.log(userInfo);
                // message.success(`用户名：${userInfo.userName}，密码${userInfo.password}，是否记住密码${userInfo.remember}`);
                // 登录成功，跳转首页
                // history.push('/admin/home');
            }
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        // form的列表
        const formItemLayout = {
            labelCol:{
                xs:24,
                sm:4,
            },
            wrapperCol:{
                xs:24,
                sm:20,
            }
        };
        // 偏移量
        const offsetLayout = {
            wrapperCol:{
                xs:24,
                sm:{
                    span: 12,
                    // 右偏移4列
                    offset: 4
                }
            }
        };
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div>Upload</div>
            </div>
        );
        return (
            <div className='register'>
                <div className='register-header'></div>
                <Card title='注册页面' className='reagister-card'>
                    <Form layout='horizontal' className='reagister-card-form'>
                        <FormItem label='用户名' {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('userName',{
                                    // 规则
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空',
                                        },
                                        {
                                            min: 5, max:12,
                                            message: '账号长度需5到12位',
                                        },
                                        {
                                            pattern: new RegExp('^\\w+$', 'g'),
                                            message: '用户名必须为字母或者数字',
                                        }
                                    ]
                                })(
                                    <Input allowClear placeholder="请输入用户名"></Input>
                                )
                            }
                        </FormItem>
                        <FormItem label='密码' {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('password',{                             
                                    // 规则
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空',
                                        },
                                        {
                                            validator: this.validateToNextPassword,
                                        },
                                    ]
                                })(
                                    <Input.Password allowClear placeholder="请输入密码"></Input.Password>
                                )
                            }
                        </FormItem>
                        <FormItem label='确认密码' {...formItemLayout} hasFeedback>
                            {
                                getFieldDecorator('confirm',{
                                    // 规则
                                    rules: [
                                        {
                                            required: true,
                                            message: '请确认密码',
                                        },
                                        {
                                            validator: this.compareToFirstPassword,
                                        },
                                    ]
                                })(
                                    <Input.Password allowClear placeholder="请再次输入密码" onBlur={this.handleConfirmBlur}></Input.Password>
                                )
                            }
                        </FormItem>
                        
                        <FormItem label='个人信息' {...formItemLayout}>
                            <Button style={{width: '100%'}} onClick={this.handleCreateUserInfo}>创建</Button>
                        </FormItem>
                        <Modal
                            visible={this.state.visible}
                            title="个人信息填写"
                            okText="Create"
                            onCancel={this.handleCancel}
                            onOk={this.handleCreate}
                        >
                            <Form layout="horizontal">
                                <FormItem label='头像' {...formItemLayout}>
                                    {
                                        getFieldDecorator('userImg',{
                                            initialValue: null
                                        })(
                                            <Upload 
                                                listType="picture-card"
                                                showUploadList={false}
                                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                                beforeUpload={this.beforeUpload}
                                                onChange={this.handleUpload}
                                                fileList={this.state.imageList}
                                            >
                                                {this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                            </Upload>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='真实姓名' {...formItemLayout} hasFeedback>
                                    {
                                        getFieldDecorator('realName',{
                                            initialValue: ''
                                        })(
                                            <Input placeholder="请输入真实姓名"></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='性别' {...formItemLayout}>
                                    {
                                        getFieldDecorator('sex',{
                                            initialValue: null
                                        })(
                                            <Radio.Group>
                                                <Radio value={0}>男</Radio>
                                                <Radio value={1}>女</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='年龄' {...formItemLayout}>
                                    {
                                        getFieldDecorator('age',{
                                            initialValue: null
                                        })(
                                            <InputNumber />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='当前状态' {...formItemLayout}>
                                    {
                                        getFieldDecorator('status',{
                                            initialValue: ''
                                        })(
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="状态选择"
                                            >
                                                {statusArr}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='爱好' {...formItemLayout}>
                                    {
                                        getFieldDecorator('hobby',{
                                            initialValue: []
                                        })(
                                            <Select
                                                mode="tags"
                                                style={{ width: '100%' }}
                                                placeholder="爱好选择"
                                                tokenSeparators={[',']}
                                                allowClear
                                            >
                                                {hobbyArr}
                                            </Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='是否已婚' {...formItemLayout}>
                                    {
                                        getFieldDecorator('isMarried',{
                                            valuePropName: "checked",
                                            initialValue: false,
                                        })(
                                            <Switch />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='生日' {...formItemLayout}>
                                    {
                                        getFieldDecorator('birthday', {
                                            initialValue: null
                                        })(
                                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='地址' {...formItemLayout}>
                                    {
                                        getFieldDecorator('address',{
                                            initialValue: '',
                                        })(
                                            <Input.TextArea allowClear autoSize={{minRows: 2, maxRows: 6}} />
                                        )
                                    }
                                </FormItem>
                            </Form>
                        </Modal>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('check')(
                                    <Checkbox checked={this.state.checked} onChange={this.handleCheckbox}>我已阅读过<a href="/login">xxx协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button disabled={!this.state.checked} type="primary" onClick={this.handleSubmitOfRegist}>注册</Button>
                            <a className='is-exist' href='/#/login'>已有账号？去登陆</a>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
};
// 将Register传入到Form
export default Form.create()(Register);
