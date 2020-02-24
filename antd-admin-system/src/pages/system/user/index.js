/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './index.less'
import { Table, Row, Button, Col, Form, Input, Tag, Icon, Divider, Popconfirm, message, notification, Select, Pagination, Switch, Cascader } from 'antd'
import { queryUser, delUser, modifyUser, addUser, getRoleWhenAddUser, queryUserOfRole, modifyUserOfRole } from '../../../axios/api/UserApi';
import { queryOrgCascade } from "../../../axios/api/OrgApi";
import ModalWin from '../../../components/Modal/ModalWin';
// import userData from '../../../resource/mock/userData';

const FormItem = Form.Item;
const { Option } = Select;
const queryCondition = {};
queryCondition.page = 0;
queryCondition.size = 10;

class UserManage extends React.Component{

    constructor(props){
        super(props);
        this.state={
            addUser: false,                     // 添加菜单的弹出层
            loading: false,                     // 加载中
            addOrEdit: null,                    // 新增 or 编辑
            dataSource: [],                     // 数据源
            columns: [],                        // 数据列
            pagination: 0,                      // 分页总数
            requiredC: true,                    // 是否必填项

            userId: null,                       // 用户Id
            userName: null,                     // 用户登录名
            password: null,                     // 用户登录密码
            operation: true,                    // 当前用户是否可操作(0表示可操作)
            status: true,                       // 启用/停用
            remark: null,                       // 备注字段
            orgId: null,                        // 所属机构
            roleIdList: [],                     // 机构ID数组，用于级联回显
            orgName: null,                      // 所属机构名称
            deleteStatus: false,                // 删除状态默认未删除

            roles: [],                          // 用户拥有的角色
            orgList: [],                        // 用户当前所属的机构
            securityBtn: false,                 // 授权弹窗
            rolesData: [],                      // 角色可选择的数据体
        };
    };
    
    UNSAFE_componentWillMount(){
        // 获取table的列数据
        let columns = [
            {title: '用户ID',dataIndex: 'userId',ellipsis: true},
            {title: '用户名称',dataIndex: 'userName',ellipsis: true},
            {title: '用户状态',dataIndex: 'status',ellipsis: true},
            {title: '操作状态',dataIndex: 'operation',ellipsis: true,width:110},
            {title: '所属机构',dataIndex: 'orgName',ellipsis: true},
            {title: '创建/修改时',dataIndex: 'createTime',ellipsis: true},
            {title: '备注',dataIndex: 'remark',ellipsis: true},
            {title: '操作',key: 'operations',ellipsis: true,
                // 判断当前是否可操作，operation为0着显示edit和delete
                render: (text, record)=> {
                    if (record.children || text.operation.props.children === '不可操作') {
                        return ''
                    }
                    return  (<span>
                                <a onClick={()=>this.handleEdit(record.userId)}><Icon type="edit" />编辑</a>
                                <Divider type="virtual" />
                                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.userId)}>
                                    {/* <Button size="small" shape="circle" icon="delete" type='danger' /> */}
                                    <a style={{color: 'red'}}><Icon type="delete" theme="twoTone" twoToneColor="red"/>删除</a>
                                </Popconfirm>
                                <Divider type="virtual" />
                                <a style={{color: 'green'}} onClick={()=>this.handleSecurity(record.userId)}><Icon type="security-scan" theme="twoTone" />授权</a>
                            </span>)
                }
            }
        ];
        // 获取用户显示数据
        queryCondition.userId = null;
        queryCondition.page = 0;
        queryCondition.size = 10;
        this.getUserShowInfo(columns, queryCondition);
    }

    // 用户授权
    handleSecurity = (data) => {
        this.props.form.resetFields();
        this.setState({ securityBtn: true, addUser: false });
        // 获取所有可用角色
        this.getUserRoleInfo();
        // 获取当前用户的全部角色
        this.getUserAllRole(data);
    }

    // 用户信息修改(编辑)
    handleEdit = (data) => {
        // 清空表单上次余留值
        this.props.form.resetFields();
        queryCondition.page = 0;
        queryCondition.userId = data;
        this.getSingleUserInfo(queryCondition);
        this.getOrgCascade();
    }

    // 用户信息删除
    handleDelete = (data) => {
        this.deleteUserBasicInfo(data);
    }

    // 点击新增，展示出弹出层
    showModal = () => {
        // 清空表单上次余留值
        this.props.form.resetFields();
        // 获取所属机构
        this.getOrgCascade();
    };

    // 级联回显
    ShowCascader(arr, orgId, list){
        // console.log(this.state.orgList)
        // var list = [];
        // // 遍历级联 形成回显
        // this.ShowCascader(this.state.orgList, this.state.orgId, list);
        // 使用优化版for循环，效率最高
        var j = 0;
        var len = arr.length;
        for(j,len; j < len; j++) {
            list.push(arr[j]);
            if(arr[j].value === orgId){
                this.setState({
                    roleIdList: list
                })
                break;
            }
            if(arr[j].children){
                this.ShowCascader(arr[j].children, orgId, list)
            };
            // 遍历一轮结束后，没有查到需要的数据，将数组置空，重新获取
            list = [];
        }
    }

    // 所属机构选择值
    selectParentOrg = (value) => {
        this.setState({ orgId: value[value.length - 1]});
    }
    
    // 菜单 新增/修改 数据录入完成后执行提交事件
    handleOk = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                userInfo.orgId = this.state.orgId;
                userInfo.deleteStatus = this.state.deleteStatus;
                if(this.state.addOrEdit === 'edit'){
                    userInfo.userId = this.state.userId;
                    this.setState({loading: true});
                    this.putModifyUserBasicInfo(userInfo);
                }else if(this.state.addOrEdit === 'add'){
                    this.setState({loading: true});
                    this.postAddUserBasicInfo(userInfo);
                }
            }
        })
    };

    handleSecuritySubmit = () => {
        let userOfRoles = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                userOfRoles.userId = this.state.userId;
                this.setState({ loading: true });
                this.modifyUserToRole(userOfRoles);
            }
        })
    }
    
    // 点击‘X’或‘取消’后执行的事件
    handleCancel = () => {
        this.props.form.resetFields();
        this.setState({ addUser: false,securityBtn: false });
    };

    // 数组datasource遍历修改数据
    arrayMap = (value) => {
        return value.map((item)=>{
            return this.returnTag(item.status, item.orgName, item.operation, item); 
        });
    }

    // 生成可选角色列表
    roleArrData = (arr) => {
        return arr.map((item) => {
            return (<Option value={item.value} key={item.value}>{item.label}</Option>)
        })
    }

    // 生成当前用户已有角色
    roleIdData = (arr) => {
        return arr.map((item) => {
            return (item.value)
        })
    }

    // 返回datasource中已修改的数据
    returnTag = (status, orgName, operation, item) => {
        let param1 = null;
        let param2 = null;
        let param3 = null;
        if(operation){
            param3 = <Tag color="red">可操作</Tag>
        }else{
            param3 = <Tag color="green">不可操作</Tag>
        }
        if(status){
            param2 = <Tag color="cyan">启用</Tag>
        }else{
            param2 = <Tag color="">停用</Tag>
        }
        param1 = <Tag color="blue">{orgName}</Tag>
        return {
            ...item,
            orgName: param1,
            status: param2,
            operation: param3,
        }
    };

    // 分页(pageSize)查询
    onPageSizeChange(current, pageSize) {
        queryCondition.page = current-1;
        queryCondition.size = pageSize;
        queryCondition.userId = null;
        this.getUserShowInfo(this.state.columns, queryCondition);
    }

    // 分页(page查询
    onPageChange(page, pageSize){
        queryCondition.page = page-1;
        queryCondition.size = pageSize;
        queryCondition.userId = null;
        this.getUserShowInfo(this.state.columns, queryCondition);
    }

    async modifyUserToRole(userOfRoles){
        await modifyUserOfRole(userOfRoles).then((res) => {
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
        })
    }

    // 获取所属机构
    async getOrgCascade(){
        await queryOrgCascade().then((res)=>{
            if (res && (res.flag === true || res.code === 10000)){
                if(res.data){
                    this.setState({
                        loading: false,
                        addUser: true,
                        securityBtn: false,
                        addOrEdit: 'add',
                        orgList: res.data,
                        requiredC: true
                    });
                } 
            }
        });
    }

    // 获取全部可用角色信息
    async getUserRoleInfo(){
        await getRoleWhenAddUser().then((res) => {
            if (res && (res.flag === true || res.code === 10000) && res.data){
                let dataArr = this.roleArrData(res.data);
                this.setState({
                    rolesData: dataArr,
                });
            }
        })
    }

    // 获取当前用户的全部角色
    async getUserAllRole(userId){
        await queryUserOfRole(userId).then((res) => {
            if (res && (res.flag === true || res.code === 10000) && res.data){
                let dataArr = this.roleIdData(res.data);
                this.setState({
                    roles: dataArr,
                    userId: userId,
                    loading: false,
                });
            }
        })
    }

    // 新增用户数据
    async postAddUserBasicInfo(userInfo){
        await addUser(userInfo).then((res) => {
            if (res && (res.flag === true || res.code === 10000)){
                message.success("添加成功");
                this.setState({addUser: false, loading: false, securityBtn: false});
                queryCondition.userId = null;
                queryCondition.page = 0;
                queryCondition.size = 10;
                this.getUserShowInfo(this.state.columns, queryCondition);
            }else{
                notification.open({
                    message: res?res.msg: "出现错误",
                    description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                    duration: 2,
                    icon: <Icon type="close" style={{ color: 'red' }} />,
                });
                this.setState({ addUserLoading: false, addUser: false, securityBtn: false });
            }
        })
    }

    // 删除用户数据
    async deleteUserBasicInfo(userId){
        await delUser(userId).then((res) => {
            if (res && (res.flag === true || res.code === 10000)){
                message.success("删除成功");
                queryCondition.page = 0;
                queryCondition.userId = null;
                queryCondition.size = 10;
                this.getUserShowInfo(this.state.columns, queryCondition);
            }else{
                notification.open({
                    message: res?res.msg: "出现错误",
                    description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                    duration: 3,
                    icon: <Icon type="close" style={{ color: 'red' }} />,
                });
            }
        });
    }

    // 修改用户基础信息
    async putModifyUserBasicInfo(userInfo){
        await modifyUser(userInfo).then((res) => {
            if (res && (res.flag === true || res.code === 10000)){
                message.success("修改成功");
                this.setState({addUser: false, loading: false,});
                queryCondition.userId = null;
                queryCondition.page = 0;
                queryCondition.size = 10;
                this.getUserShowInfo(this.state.columns, queryCondition);
            }else{
                notification.open({
                    message: res?res.msg: "出现错误",
                    description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                    duration: 3,
                    icon: <Icon type="close" style={{ color: 'red' }} />,
                });
                this.setState({ addUserLoading: false, addUser: false });
            }
        });
    }

    // 获取table表的用户显示的详细数据
    async getUserShowInfo(columns, queryCondition){
        await queryUser(queryCondition).then((res)=>{
            if (res && (res.flag === true || res.code === 10000)){
                if(res.data && res.data.data && res.data.data !== []){
                    let datasources = this.arrayMap(res.data.data);
                    this.setState({
                        dataSource: datasources,
                        columns: columns,
                        pagination: res.data.total
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

    // 获取指定ID的用户数据
    async getSingleUserInfo(queryCondition){
        await queryUser(queryCondition).then((res)=>{
            if (res && (res.flag === true || res.code === 10000)){
                if(res.data.data[0]){
                    this.setState({
                        addUser: true,
                        securityBtn: false,
                        addOrEdit: 'edit', 
                        requiredC: false,                                   // 表示此方法是在进行更新
                        userId: res.data.data[0].userId,                    // 用户Id
                        userName: res.data.data[0].userName,                // 用户登录名
                        password: res.data.data[0].password,                // 用户登录密码
                        operation: res.data.data[0].operation,              // 当前用户是否可操作
                        status: res.data.data[0].status,                    // 用户当前是否已删除(1表示已删除)
                        remark: res.data.data[0].remark,                    // 备注字段
                        orgId: res.data.data[0].orgId,                      // 机构ID
                        orgName: res.data.data[0].orgName,                  // 机构名称
                    })
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
        return (
            <div className="user-contain">
                <Row className="add-button-contain">
                    <Col span={2}>
                        <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
                        {
                            this.state.addUser?
                            <ModalWin visible={this.state.addUser} width={500}
                                title="用户基础信息添加/修改"
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
                                    <FormItem label='用户名' {...formItemLayout}>
                                        {
                                            getFieldDecorator('userName',{
                                                initialValue: this.state.userName,
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请输入用户登录名',
                                                    },
                                                ],
                                            })(
                                                <Input placeholder="请输入用户登录名"></Input>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='登录密码' {...formItemLayout}>
                                        {
                                            getFieldDecorator('password',{
                                                initialValue: this.state.password,
                                                rules: [
                                                    {
                                                        required: this.state.requiredC,
                                                        message: '请输入用户登录密码',
                                                    },
                                                ],
                                            })(
                                                <Input.Password placeholder="请输入用户登录密码"></Input.Password>
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='所属机构' {...formItemLayout}>
                                        {
                                            getFieldDecorator('orgId',{
                                                initialValue: [this.state.orgId],
                                                rules: [
                                                    {
                                                        required: true,
                                                        message: '请选择所属机构',
                                                    },
                                                ],
                                            })(
                                                <Cascader options={this.state.orgList} onChange={this.selectParentOrg} changeOnSelect placeholder="请选择所属机构" />
                                            )
                                        }
                                    </FormItem>
                                    <FormItem label='激活状态' {...formItemLayout}>
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
                                    <FormItem label='备注' {...formItemLayout}>
                                        {
                                            getFieldDecorator('remark',{
                                                initialValue: this.state.remark,
                                            })(
                                                <Input.TextArea allowClear autoSize={{minRows: 2, maxRows: 6}} />
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
                                    <FormItem label='授权角色' {...formItemLayout}>
                                        {
                                            getFieldDecorator('roles',{
                                                initialValue: this.state.roles,
                                            })(
                                                <Select allowClear mode="tags" style={{ width: '100%' }} placeholder="请选择授权角色" onChange={this.getSelectInfo}>
                                                    {this.state.rolesData}
                                                </Select>
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
                    indentSize={10} rowKey={record => record.userId} dataSource={this.state.dataSource} tableLayout='fixed' scrollToFirstRowOnChange={true}
                    columns={this.state.columns} scroll={{ y: 570 }} />
                    <div style={{height: "10px"}}></div>
                    <div style={{float: 'right'}}>
                        <Pagination
                            showSizeChanger
                            onShowSizeChange={this.onPageSizeChange.bind(this)}
                            defaultCurrent={1}
                            total={this.state.pagination}
                            onChange={this.onPageChange.bind(this)}
                        />
                    </div>
                </Row>
            </div>
        )
    }
};
// 将Register传入到Form
export default Form.create()(UserManage);