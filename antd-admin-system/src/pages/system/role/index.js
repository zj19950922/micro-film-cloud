/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './index.less';
import { Table, Row, Button, Col, Form, Input, Tag, Icon, Divider, Popconfirm, message, notification, TreeSelect, Pagination, Select, Switch } from 'antd'
import { queryRole, addRole, modifyRole, delRole, queryRoleOfMenu, modifyRoleOfMenu } from '../../../axios/api/RoleApi';
import ModalWin from '../../../components/Modal/ModalWin';

const { Option } = Select
const FormItem = Form.Item;
const { SHOW_ALL } = TreeSelect;
const queryCondition = {};
queryCondition.page = 0;
queryCondition.size = 10;

class RoleManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            modalBtn: false,                    // 新增按钮的弹出层
            securityBtn: false,                 // 授权按钮
            loading: false,                     // 加载中
            addOrEdit: null,                    // 新增 or 编辑
            dataSource: [],                     // 数据源
            pagination: 1,
            columns: [],                        // 数据列

            roleName: null,                     // 角色名称
            roleId: null,                       // 角色ID
            dataPermission: null,               // 角色数据权限
            operation: true,                    // 操作状态
            status: true,                       // 角色状态
            remark: null,                       // 备注字段
            createTime: null,                   // 创建/修改时间

            menuList: [],                       // 授权菜单集合
            treeDataMenu: [],                   // 可选菜单
        };
    };

    UNSAFE_componentWillMount(){
        // 获取table的列数据
        let columns = [
            {title: '角色ID',dataIndex: 'roleId',ellipsis: true},
            {title: '角色名称',dataIndex: 'roleName',ellipsis: true},
            {title: '角色状态',dataIndex: 'status',ellipsis: true,width:110},
            {title: '操作状态',dataIndex: 'operation',ellipsis: true,width:110},
            {title: '数据权限',dataIndex: 'dataPermission',ellipsis: true,width:110},
            {title: '创建/修改时间',dataIndex: 'createTime',ellipsis: true},
            {title: '备注',dataIndex: 'remark',ellipsis: true},
            {title: '操作',key: 'operations',ellipsis: true,
                // 判断当前是否可操作，operation为0着显示edit和delete
                render: (text, record)=> {
                    if (record.children || text.operation.props.children === '不可操作') {
                        return ""
                    }
                    return  (<span>
                                <a onClick={()=>this.handleEdit(record.roleId)}><Icon type="edit" />编辑</a>
                                <Divider type="virtual" />
                                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.roleId)}>
                                    <a style={{color: 'red'}}><Icon type="delete" theme="twoTone" twoToneColor="red"/>删除</a>
                                </Popconfirm>
                                <Divider type="virtual" />
                                <a style={{color: 'green'}} onClick={()=>this.handleSecurity(record.roleId)}><Icon type="security-scan" theme="twoTone" />授权</a>
                            </span>)
                }
            }
        ];
       
        // 获取角色显示数据
        this.getRoleShowInfo(columns, queryCondition);
    }

    // 角色信息查询修改(编辑)
    handleEdit = (data) => {
        this.setState({ modalBtn: true });
        // 清空表单上次余留值
        this.props.form.resetFields();
        // 获取指定ID的角色数据
        queryCondition.roleId = data 
        this.getSingleRoleInfo(queryCondition);
    }

    // 角色信息删除
    handleDelete = (data) => {
        this.deletRoleInfo(data);
    }

    // 角色授权
    handleSecurity = (data) => {
        this.setState({ securityBtn: true, roleId: data });
        // 清空表单上次余留值
        this.props.form.resetFields();
        // 获取当前角色拥有的权限
        this.getRoleShowAuth(data);
        // 获取可选择权限
        this.getPowerInfo();
    }

     // 点击‘X’或‘取消’后执行的事件
     handleCancel = () => {
        this.setState({ modalBtn: false, securityBtn: false });
    };

    // 角色新增数据录入完成后执行提交事件
    handleOk = () => {
        let roleInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                roleInfo.roleId = this.state.roleId;
                this.setState({ loading: true });
                this.operationRole(roleInfo);
            }
        })
    };

    handleSecuritySubmit = () => {
        let roleOfAuthInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            let roleInfo = {}
            // 表单检查通过
            if(!err){
                let menus = [];
                roleOfAuthInfo.menuList.map((item) => {
                    menus.push(item.value)
                })
                roleInfo.menuId = menus;
                roleInfo.roleId = this.state.roleId
                this.setState({ loading: true });
                this.postPowerInfo(roleInfo);
            }
        })
    }

    // 显示弹出层
    showModal = () => {
        this.setState({
            modalBtn: true,
            addOrEdit: "add",
        });
    }

    // 数组datasource遍历修改数据
    arrayMap = (value) => {
        return value.map((item)=>{
            return this.returnTag(item.operation, item.status, item.dataPermission, item.children, item); 
        });
    }

    // 返回datasource中已修改的数据
    returnTag = (operation, status, dataPermission, children, item) => {
        let param0 = null;
        let param1 = null;
        let param2 = null;
        let param3 = null;
        if(children){
            param1 = this.arrayMap(item.children)
        }

        if(!operation){
            param0 = <Tag color="red">不可操作</Tag>
        }else{
            param0 = <Tag color="green">可操作</Tag>
        }

        if(status){
            param2 = <Tag color="red">启用</Tag>
        }else{
            param2 = <Tag color="green">停用</Tag>
        }

        if(dataPermission === 0){
            param3 = <Tag color="red">全部</Tag>
        }else{
            param3 = <Tag color="green">本级</Tag>
        }

        return {
            ...item,
            operation: param0,
            children: param1,  
            status: param2,
            dataPermission: param3
        }
    };

    onShowSizeChange(current, pageSize) {
        queryCondition.page = current-1;
        queryCondition.size = pageSize;
        this.getRoleShowInfo(this.state.columns, queryCondition);
    }

    onPageSizeChange(page, pageSize){
        queryCondition.page = page-1;
        queryCondition.size = pageSize;
        this.getRoleShowInfo(this.state.columns, queryCondition);
    }

    // 获取角色权限数据展示
    async getRoleShowAuth (data){
        await queryRoleOfMenu(data).then((res) => {
            if (res && (res.flag === true || res.code === 10000) && res.data!==[]) {
                this.setState({
                    menuList: res.data,                       // 授权菜单集合
                });
            }
       }); 
    }

    // 提交授权信息
    async postPowerInfo(roleInfo){
        await modifyRoleOfMenu(roleInfo).then((res) => {
            if (res && (res.flag === true || res.code === 10000)) {
                this.setState({ 
                    loading: false, 
                    securityBtn: false 
                });
                message.success(res.msg);
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

    // 获取可用权限信息(菜单和权限)
    async getPowerInfo(){
        await queryRoleOfMenu().then((res) => {
            if (res && (res.flag === true || res.code === 200)) {
                this.setState({
                    treeDataMenu: res.data,
                });
            }
       }); 
    }

    // 删除角色信息
    async deletRoleInfo(roleId){
        await delRole(roleId).then((res)=>{
            if (res && (res.flag === true || res.code === 200)) {
                message.success(res.msg);
                // 获取角色显示数据，从第0页开始
                queryCondition.page = 0
                this.getRoleShowInfo(this.state.columns, queryCondition);
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

    // 增加 or 修改角色信息
    async operationRole(roleInfo){
        if (this.state.addOrEdit === "add") {
            await addRole(roleInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 10000)) {
                    message.success(res.msg);
                    // 获取角色显示数据
                    queryCondition.page = 0;
                    this.getRoleShowInfo(this.state.columns, queryCondition);
                    this.setState({ loading: false, modalBtn: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 3,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                    });
                    this.setState({ loading: false, modalBtn: false });
                }
            }); 
        }else if(this.state.addOrEdit === "edit"){
            await modifyRole(roleInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 10000)) {
                    message.success(res.msg);
                    // 获取机构显示数据
                    queryCondition.page = 0;
                    queryCondition.roleId = null;
                    this.getRoleShowInfo(this.state.columns, queryCondition);
                    this.setState({ loading: false, modalBtn: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 3,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                    });
                    this.setState({ loading: false, modalBtn: false });
                }
            }); 
        } 
    }

    // 获取table表的角色显示的详细数据
    async getRoleShowInfo(columns, queryCondition){
        // 获取角色详细数据
        await queryRole(queryCondition).then((res) => {
            if (res && (res.flag === true || res.code === 10000) && res.data.data!==[]){
                let datasource = this.arrayMap(res.data.data);
                this.setState({
                    dataSource: datasource,
                    columns: columns,
                    pagination: res.data.total
                });
            }else{
                this.setState({
                    dataSource: [],
                    columns: columns,
                });  
            }
        });
    }

    // 获取指定ID的角色数据
    async getSingleRoleInfo(queryCondition){
        await queryRole(queryCondition).then((res)=>{
            if (res && (res.flag === true || res.code === 10000) && res.data.data!==[]){
                if(res.data){
                    this.setState({
                        roleName: res.data.data[0].roleName,                     // 角色名称
                        roleId: res.data.data[0].roleId,                         // 角色ID
                        createName: res.data.data[0].createTime,                 // 创建人名称
                        operation: res.data.data[0].operation,                   // 是否可操作
                        remark: res.data.data[0].remark,                         // 备注字段
                        status: res.data.data[0].status, 
                        dataPermission: res.data.data[0].dataPermission, 
                        addOrEdit: 'edit',                                       // 编辑 or 新增
                    })
                } 
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;
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
        const tProps = {
            treeCheckable: true,
            showCheckedStrategy: SHOW_ALL,
            treeDefaultExpandAll: true,
        };
        return (
            <div className="role-contain">
                <Row className="add-button-contain">
                    <Col span={2}>
                        <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
                        {
                            this.state.modalBtn?
                            <ModalWin visible={this.state.modalBtn} width={500}
                                title="角色信息添加/修改"
                                onCancel={this.handleCancel}
                                centered={true}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>,
                                    <Button key="submit" type="primary" 
                                        loading={this.state.loading} 
                                        onClick={this.handleOk}
                                    >
                                        提交
                                    </Button>,
                                ]}
                            >
                                <Form>
                                    <FormItem label='角色名称' {...formItemLayout}>
                                        {
                                            getFieldDecorator('roleName',{
                                                initialValue: this.state.roleName,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入角色名称',
                                                    },
                                                ],
                                            })(
                                                <Input placeholder="请输入角色名称" allowClear></Input>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='数据权限' {...formItemLayout}>
                                        {
                                            getFieldDecorator('dataPermission',{
                                                initialValue: this.state.dataPermission,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择数据权限',
                                                    },
                                                ],
                                            })(
                                            <Select placeholder="请选择数据权限" allowClear>
                                                <Option key={0} value={0}>全部</Option>
                                                <Option key={1} value={1}>本级</Option>
                                            </Select>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='备注' {...formItemLayout}>
                                        {
                                            getFieldDecorator('remark',{
                                                initialValue: this.state.remark,
                                            })(
                                                <Input.TextArea allowClear autoSize={{minRows: 2, maxRows: 6}} />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='角色状态' {...formItemLayout}>
                                        {
                                            getFieldDecorator('status',{
                                                valuePropName: "checked",
                                                initialValue: this.state.status,
                                            })(
                                                <Switch />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='操作状态' {...formItemLayout}>
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
                            </ModalWin>:
                            <ModalWin visible={this.state.securityBtn} width={500}
                                title="角色授权"
                                onCancel={this.handleCancel}
                                centered={true}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                        取消
                                    </Button>,
                                    <Button key="submit" type="primary" 
                                        loading={this.state.loading} 
                                        onClick={this.handleSecuritySubmit}
                                    >
                                        提交
                                    </Button>,
                                ]}
                            >
                                <Form>
                                    <FormItem label='授权菜单' {...formItemLayout}>
                                        {
                                            getFieldDecorator('menuList',{
                                                initialValue: this.state.menuList,
                                            })(
                                                <TreeSelect treeCheckStrictly={true} searchPlaceholder='请选择授权菜单' allowClear treeData={this.state.treeDataMenu} {...tProps} />
                                            )
                                        }
                                    </FormItem>
                                </Form>
                            </ModalWin>
                        }                       
                    </Col>
                    <Col span={22}>
                        
                    </Col>
                </Row>
                <Row className="table-data">
                    <Table expandRowByClick={true} style={{textAlign: "center"}} bordered={true} pagination={false}
                    indentSize={10} rowKey={record => record.roleId} dataSource={this.state.dataSource} tableLayout='fixed' scrollToFirstRowOnChange={true}
                    columns={this.state.columns} scroll={{ y: 570 }} />
                    <div style={{height: "10px"}}></div>
                    <div style={{float: 'right'}}>
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={this.onShowSizeChange.bind(this)}
                            defaultCurrent={1}
                            total={this.state.pagination}
                            onChange={this.onPageSizeChange.bind(this)}
                        />
                    </div>
                </Row>
            </div>
        )
    }
};
// 将Register传入到Form
export default Form.create()(RoleManage);