/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './index.less'
import { Table, Row, Button, Col, Divider, Popconfirm, Form, Radio, Select, Switch, Input, Cascader, message, Tag, Icon, notification, InputNumber } from 'antd'
import { queryMenuCascade, addMenu, delMenu, modifyMenu, queryMenu } from '../../../axios/api/MenuApi';
import ModalWin from '../../../components/Modal/ModalWin';
import menuList from '../../../config/iconConfig';
const FormItem = Form.Item;
const defaultParentMenu = {
    "value": "0",
    "parentId": "0",
    "label": "顶级菜单",
    "children": null
};
const { Option } = Select;
class MenuManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            dataSource: [],                     // 数据源
            columns: [],                        // 数据列
            addMenu: false,                     // 添加菜单的弹出层
            addMenuLoading: false,              // 新增菜单后，提交后进入loading中
            addOrEdit: null,                    // 新增 or 修改
            parentMenuId: null,                 // 父级菜单ID
            parentMenu: [defaultParentMenu],    // 初始化可选的父级菜单
            iconList: [],                       // 图标列表
            requiredC: true,                    // 是否为必要条件
            requiredC1: true,

            menuId: null,                       // 菜单ID
            path: null,                         // 菜单跳转路径
            component: null,                    // 菜单路由组件
            redirect: null,                     // 菜单路由组件
            title: null,                        // 菜单标题
            icon: null,                         // 菜单图标
            noCache: true,                      // 是否缓存
            hidden: false,                      // 菜单是否隐藏
            type: 0,                            // 菜单类型[0目录，1菜单，2资源]
            permission: null,                   // 菜单权限
            sort: 0,                            // 菜单自定义排序
            isFrame: false,                     // 菜单是否外链
            name: null,                         // 菜单名称
            operation: true,                    // 菜单是否可操作
        };
    };
    
    UNSAFE_componentWillMount(){
        // 获取table的列数据
        let columns = [
            {title: '菜单ID',dataIndex: 'value',ellipsis: true, width: 220},
            {title: '菜单标题',dataIndex: 'title',ellipsis: true},
            {title: '菜单名称',dataIndex: 'name',ellipsis: true},
            {title: '菜单路由',dataIndex: 'path',ellipsis: true},
            {title: '菜单组件',dataIndex: 'component',ellipsis: true},
            {title: '重定向路由',dataIndex: 'redirect',ellipsis: true},
            {title: '图标',dataIndex: 'icon',ellipsis: true, width: 65},
            {title: '不缓存',dataIndex: 'noCache',ellipsis: true, width: 85},
            {title: '是否隐藏',dataIndex: 'hidden',ellipsis: true, width: 100},
            {title: '类型',dataIndex: 'type',ellipsis: true, width: 85},
            {title: '菜单权限',dataIndex: 'permission',ellipsis: true, width: 120},
            {title: '是否可操作',dataIndex: 'operation',ellipsis: true, width: 110},
            {title: '是否外链',dataIndex: 'isFrame',ellipsis: true, width: 100},
            {title: '排序值',dataIndex: 'sort',ellipsis: true, width: 80},
            {title: '操作',key: 'operations',fixed: 'right', width: 200,
                // 判断当前是否可操作，operation为0着显示edit和delete
                render: (text, record)=> {
                    if (record.children || text.operation.props.children === '不可操作') {
                        return <span><a onClick={()=>this.handleEdit(record.value)}><Icon type="edit" />编辑</a></span>
                    }
                    return  (<span>
                                {/* <a style={{color: 'green'}} onClick={()=>this.handleEye(record.menuId)}><Icon type="eye" theme="twoTone" twoToneColor="green" />查看</a>
                                <Divider type="virtual" /> */}
                                <a onClick={()=>this.handleEdit(record.value)}><Icon type="edit" />编辑</a>
                                <Divider type="virtual" />
                                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.value)}>
                                    {/* <Button size="small" shape="circle" icon="delete" type='danger' /> */}
                                    <a style={{color: 'red'}}><Icon type="delete" theme="twoTone" twoToneColor="red"/>删除</a>
                                </Popconfirm>
                            </span>)
                }
            }
        ];
        // 获取菜单显示数据
        this.getMenuDetail(columns);
    }

    handleEye = (data) => {
        console.log("查看触发"+data)
    }

    handleEdit = (data) => {
        // 清空表单上次余留值
        this.props.form.resetFields();
        // 获取父级可选项
        this.getParentMenus("edit");
        // 获取指定ID的菜单数据
        this.getSingleMenuInfo(data);
    }

    handleDelete = (data) => {
        this.deletMenuInfo(data);
    }

    // 点击新增，展示出弹出层，同时获取可做父级菜单的选项表
    showModal = () => {
        // 清空表单上次余留值
        this.props.form.resetFields();
        // 获取父级菜单选项
        this.getParentMenus("add");
    };
    
    // 菜单新增/修改的数据录入完成后执行提交事件
    handleOk = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                userInfo.pid = this.state.parentMenuId;
                userInfo.menuId = this.state.menuId;
                this.setState({addMenuLoading: true});
                this.operationMenu(userInfo);
            }
        })
    };
    
    // 点击‘X’或‘取消’后执行的事件
    handleCancel = () => {
        // 清空表单上次余留值
        this.props.form.resetFields();
        this.setState({ addMenu: false });
    };

    // 选择父级菜单
    selectParentMenu = (value) => {
        this.setState({ parentMenuId: value[value.length - 1]});
    };

    // 新增菜单后，触发菜单栏重新获取数据
    onChangeMenu = () => {
        this.props.location.onChangeMenu("update");
    }

    // 数组datasource遍历修改数据
    arrayMap = (value) => {
        return value.map((item)=>{
            return this.returnTag(item.type, item.hidden, item.operation, item.children, item.icon, item.noCache, item.isFrame, item.permission, item); 
        });
    }

    // 返回datasource中已修改的数据
    returnTag = (type, hidden, operation, children, icon, noCache, isFrame, permission, item) => {
        let param0 = null;
        let param1 = null;
        let param2 = null;
        let param3 = null;
        let param4 = null;
        let param5 = null;
        let param6 = null;
        let param7 = null;
        if(icon){
            param0 = <Icon type={icon} />
        }

        if(children){
            param4 = this.arrayMap(item.children)
        }

        if(operation === false){
            param3 = <Tag color="red">不可操作</Tag>
        }else{
            param3 = <Tag color="green">可操作</Tag>
        }

        if(hidden === false){
            param2 = <Tag color="cyan">显示</Tag>
        }else{
            param2 = <Tag color="">隐藏</Tag>
        }

        if(type === 0){
            param1 = <Tag color="blue">目录</Tag>
        }else if(type === 1){
            param1 = <Tag color="volcano">菜单</Tag>
        }else{
            param1 = <Tag color="gold">资源</Tag>
        }

        if(noCache === false){
            param5 = <Tag color="cyan">false</Tag>
        }else{
            param5 = <Tag color="magenta">true</Tag>
        }

        if(isFrame === false){
            param6 = <Tag color="cyan">false</Tag>
        }else{
            param6 = <Tag color="magenta">true</Tag>
        }

        if(permission){
            param7 = <Tag color="magenta">{permission}</Tag>
        }else{
            param7 = null
        }
        

        return {
            ...item,
            icon: param0,
            type: param1,
            hidden: param2,
            operation: param3,
            children: param4,  
            noCache: param5,
            isFrame: param6,
            permission: param7
        }
    }

    // 获取图标库
    getIconList = () => {
        return menuList.map((item) => {
           return <Option value={item} key={item}><span><Icon type={item} />  {item}</span></Option>
        });
    }

    // 当菜单类型改变时，其它必选项发生改变
    requireConditionChange = (e) => {
        if(e && e.target.value === 2){
            this.setState({
                requiredC1: true,
                requiredC: false
            });
        }else if(e && e.target.value === 0){
            this.setState({
                requiredC1: false,
                requiredC: true
            });
        }else{
            this.setState({
                requiredC1: true,
                requiredC: true
            });
        }
    }

    // 获取指定ID的菜单数据
    async getSingleMenuInfo(menuId){
        await queryMenu(menuId).then((res)=>{
            if (res && (res.flag === true || res.code === 200)){
                if(res.data!==[]){
                    let requiredC = true;
                    if(res.data[0].type === 2){
                        requiredC = false;
                    }
                    this.setState({
                        menuId: menuId,
                        path: res.data[0].path,                                 // 菜单跳转路径
                        component: res.data[0].component,                       // 菜单路由组件
                        redirect: res.data[0].redirect,                         // 菜单路由组件
                        name: res.data[0].name,                                 // 菜单名称
                        title: res.data[0].title,                               // 菜单标题
                        icon: res.data[0].icon,                                 // 菜单图标
                        noCache: res.data[0].noCache,                           // 菜单是否缓存
                        hidden: res.data[0].hidden,                             // 菜单是否隐藏
                        type: res.data[0].type,                                 // 菜单类型[0菜单，1资源]
                        permission: res.data[0].permission,                     // 菜单权限
                        sort: res.data[0].sort,                                 // 菜单自定义排序值
                        parentMenuId: res.data[0].parentId,                     // 父级菜单ID
                        isFrame: res.data[0].isFrame,                           // 菜单是否外链
                        operation: res.data[0].operation,                       // 菜单是否可操作
                        requiredC: requiredC,
                    })
                } 
            }
        });
    }

    // 删除菜单
    async deletMenuInfo(menuId){
        await delMenu(menuId).then((res)=>{
            if (res && (res.flag === true || res.code === 200)) {
                message.success(res.msg);
                // 将刷新事件传给父组件，父组件传递给兄弟组件
                this.onChangeMenu();
                // 获取菜单显示数据
                this.getMenuDetail(this.state.columns);
            }else{
                notification.open({
                    message: res?res.msg: "出现错误",
                    description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                    duration: 2,
                    icon: <Icon type="close" style={{ color: 'red' }} />,
                });
            }
        }); 
    }

    // 提交新增/修改的菜单
    async operationMenu(userInfo){
        if (this.state.addOrEdit === "add") {
            await addMenu(userInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 10000)) {
                    message.success(res.msg);
                    // 将刷新事件传给父组件，父组件传递给兄弟组件
                    this.onChangeMenu();
                    // 获取菜单显示数据
                    this.getMenuDetail(this.state.columns);
                    this.setState({ addMenuLoading: false, addMenu: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 2,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                      });
                    this.setState({ addMenuLoading: false, addMenu: false });
                }
            }); 
        }else if(this.state.addOrEdit === "edit"){
            await modifyMenu(userInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 200)) {
                    message.success(res.msg);
                    // 将刷新事件传给父组件，父组件传递给兄弟组件
                    this.onChangeMenu();
                    // 获取菜单显示数据
                    this.getMenuDetail(this.state.columns);
                    this.setState({ addMenuLoading: false, addMenu: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 2,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                      });
                    this.setState({ addMenuLoading: false, addMenu: false });
                }
            }); 
        }   
    }

    // 获取父级可选菜单
    async getParentMenus(data){
        await queryMenuCascade().then((res)=>{
            if (res && (res.flag === true || res.code === 200)){
                if(res.data){
                    let parentMenu = [defaultParentMenu];
                    let iconList = this.getIconList();
                    this.setState({
                        requiredC1: false,
                        requiredC: true,
                        addMenu: true,
                        addOrEdit: data,
                        iconList: iconList,
                        parentMenu: parentMenu.concat(res.data),
                    })
                } 
            }
        });
    }

    // 获取table表的菜单显示的详细数据
    async getMenuDetail(columns){
        await queryMenu(null).then((res)=>{
            if (res && (res.flag === true || res.code === 10000)){
                if(res.data && res.data !== []){
                    let datasources = this.arrayMap(res.data);
                    this.setState({
                        dataSource: datasources,
                        columns: columns,
                    });
                }else{
                    this.setState({
                        dataSource: [],
                        columns: columns,
                    });
                } 
            }
        });
    }

    render(){
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
       const formItemLayout1 = {
            labelCol: { span: 20 },
            wrapperCol: { span: 4 },
       }
        return (
            <div className="menu-contain">
                <Row className="add-button-contain">
                    <Col span={2}>
                        <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
                        <ModalWin visible={this.state.addMenu}
                                title="菜单添加/修改"
                                onCancel={this.handleCancel}
                                centered={true}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>,
                                    <Button key="submit" type="primary" 
                                        loading={this.state.addMenuLoading} 
                                        onClick={this.handleOk}
                                    >
                                        提交
                                    </Button>,
                                ]}
                        >
                            <Form>
                                <FormItem label='菜单类型' {...formItemLayout}>
                                    {
                                        getFieldDecorator('type',{
                                            initialValue: this.state.type,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择菜单类型',
                                                },
                                            ],
                                        })(
                                            <Radio.Group onChange={this.requireConditionChange}>
                                                <Radio value={0}>目录</Radio>
                                                <Radio value={1}>菜单</Radio>
                                                <Radio value={2}>资源</Radio>
                                            </Radio.Group>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单路径' {...formItemLayout}>
                                    {
                                        getFieldDecorator('path',{
                                            initialValue: this.state.path,
                                            rules: [
                                                {
                                                    required: this.state.requiredC,
                                                    message: '请输入菜单跳转路径',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="输入菜单跳转路径" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单组件' {...formItemLayout}>
                                    {
                                        getFieldDecorator('component',{
                                            initialValue: this.state.component,
                                            rules: [
                                                {
                                                    required: this.state.requiredC,
                                                    message: '请输入菜单跳转路径',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="输入菜单路由组件" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='重定向路由' {...formItemLayout}>
                                    {
                                        getFieldDecorator('redirect',{
                                            initialValue: this.state.redirect,
                                            rules: [
                                                {
                                                    required: this.state.requiredC,
                                                    message: '请输入菜单跳转路径',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="输入重定向路径" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单标题' {...formItemLayout}>
                                    {
                                        getFieldDecorator('title',{
                                            initialValue: this.state.title,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入菜单标题',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="输入菜单标题" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单名称' {...formItemLayout}>
                                    {
                                        getFieldDecorator('name',{
                                            initialValue: this.state.name,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入菜单名称',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="请输入菜单名称" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单权限' {...formItemLayout}>
                                    {
                                        getFieldDecorator('permission',{
                                            initialValue: this.state.permission,
                                            rules: [
                                                {
                                                    required: this.state.requiredC1,
                                                    message: '请输入菜单跳转路径',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="设置菜单权限名称" allowClear></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单图标' {...formItemLayout}>
                                    {
                                        getFieldDecorator('icon',{
                                            initialValue: this.state.icon,
                                            rules: [
                                                {
                                                    required: this.state.requiredC,
                                                    message: '请选择菜单图标',
                                                },
                                            ],
                                        })(
                                        <Select placeholder="请选择菜单图标" allowClear>{this.state.iconList}</Select>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='自定义排序' {...formItemLayout}>
                                    {
                                        getFieldDecorator('sort',{
                                            initialValue: this.state.sort,
                                            rules: [
                                                {
                                                    required: this.state.requiredC,
                                                    message: '请输入自定义排序值',
                                                },
                                            ],
                                        })(
                                            <InputNumber min={0} max={1000000000} />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='父级菜单' {...formItemLayout}>
                                    {
                                        getFieldDecorator('pid',{
                                            initialValue: [this.state.parentMenuId],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择父级菜单',
                                                },
                                            ],
                                        })(
                                            <Cascader options={this.state.parentMenu} onChange={this.selectParentMenu} changeOnSelect placeholder="请选择父级菜单" />
                                        )
                                    }
                                </FormItem>
                            </Form>
                            <Form layout="inline">
                                <FormItem label='不缓存' {...formItemLayout1}>
                                    {
                                        getFieldDecorator('noCache',{
                                            valuePropName: "checked",
                                            initialValue: this.state.noCache,
                                        })(
                                            <Switch />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='菜单隐藏' {...formItemLayout1}>
                                    {
                                        getFieldDecorator('hidden',{
                                            valuePropName: "checked",
                                            initialValue: this.state.hidden,
                                        })(
                                            <Switch />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='是否外链' {...formItemLayout1}>
                                    {
                                        getFieldDecorator('isFrame',{
                                            valuePropName: "checked",
                                            initialValue: this.state.isFrame,
                                        })(
                                            <Switch />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='是否可操作' {...formItemLayout1}>
                                    {
                                        getFieldDecorator('operation',{
                                            valuePropName: "checked",
                                            initialValue: this.state.operation,
                                        })(
                                            <Switch />
                                        )
                                    }
                                </FormItem>
                            </Form>
                        </ModalWin>
                    </Col>
                    <Col span={22}>
                        
                    </Col>
                </Row>
                <Row className="table-data">
                    <Table expandRowByClick={true} style={{textAlign: "center"}} pagination={false} bordered={true} 
                    indentSize={10} rowKey={record => record.menuId} dataSource={this.state.dataSource} defaultExpandedRowKeys={this.state.dataSource.map(item => item.value)}
                    columns={this.state.columns} scroll={{ x: 'calc(700px + 50%)', y: 630 }} />
                </Row>
            </div>
        )
    }
};
// 将Register传入到Form
export default Form.create()(MenuManage);