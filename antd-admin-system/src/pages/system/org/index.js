/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './index.less';
import { Table, Row, Button, Col, Form, Input, Tag, Icon, Divider, Popconfirm, message, notification, Cascader, Switch, InputNumber } from 'antd'
import { queryOrgCascade, addOrg, modifyOrg, queryOrg, delOrg } from '../../../axios/api/OrgApi';
import ModalWin from '../../../components/Modal/ModalWin';
// import orgData from '../../../resource/mock/orgData';

const FormItem = Form.Item;
const defaultParentOrg = [{
    "value": "0",
    "label": "顶级机构",
    "children": null
}];
class OrgManage extends React.Component{
    constructor(props){
        super(props);
        this.state={
            addMenu: false,                     // 添加菜单的弹出层
            loading: false,                     // 加载中
            addOrEdit: null,                    // 新增 or 编辑
            dataSource: [],                     // 数据源
            columns: [],                        // 数据列

            orgPid: null,                       // 父级菜单ID
            orgPname: null,                     // 父机构名称
            orgPnameList: [],                   // 初始化可选的父级菜单

            orgId: null,                        // 机构Id
            orgName: null,                      // 机构名称
            status: true,                       // 机构状态
            operation: true,                    // 当前机构是否可操作
            sort: 0,                            // 自定义排序值
        };
    };

    UNSAFE_componentWillMount(){
        // 获取table的列数据
        let columns = [
            {title: '机构ID',dataIndex: 'value',ellipsis: true},
            {title: '机构名称',dataIndex: 'orgName',ellipsis: true},
            {title: '机构状态',dataIndex: 'status',ellipsis: true,width:110},
            {title: '是否可操作',dataIndex: 'operation',ellipsis: true,width:110},
            {title: '排序值',dataIndex: 'sort',ellipsis: true},
            {title: '创建/修改时间',dataIndex: 'createTime',ellipsis: true},
            {title: '操作',key: 'operations',ellipsis: true,
                // 判断当前是否可操作，operation为0着显示edit和delete
                render: (text, record)=> {
                    if (record.children || text.operation.props.children === '不可操作') {
                        return <span><a onClick={()=>this.handleEdit(record.value)}><Icon type="edit" />编辑</a></span>
                    }
                    return  (<span>
                                <a onClick={()=>this.handleEdit(record.value)}><Icon type="edit" />编辑</a>
                                <Divider type="virtual" />
                                <Popconfirm title="确定删除？" onConfirm={() => this.handleDelete(record.value)}>
                                    {/* <Button size="small" shape="circle" icon="delete" type='danger' /> */}
                                    <a style={{color: 'red'}}><Icon type="delete" theme="twoTone" twoToneColor="red"/>删除</a>
                                </Popconfirm>
                                {/* <Divider type="virtual" />
                                <a style={{color: 'green'}} onClick={()=>this.handleSecurity(record.userId)}><Icon type="security-scan" theme="twoTone" />授权</a> */}
                            </span>)
                }
            }
        ];
        // 获取机构显示数据
        this.getOrgShowInfo(columns);
    }

    // 机构信息查询修改(编辑)
    handleEdit = (data) => {
        this.getParentOrg("edit");
        // 获取指定ID的机构数据
        this.getSingleOrgInfo(data);
    }

    // 机构信息删除
    handleDelete = (data) => {
        this.deletOrgInfo(data);
    }

     // 点击‘X’或‘取消’后执行的事件
     handleCancel = () => {
        this.setState({ addMenu: false });
    };

    // 机构新增数据录入完成后执行提交事件
    handleOk = () => {
        let orgInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            // 表单检查通过
            if(!err){
                orgInfo.orgPid = this.state.orgPid;
                orgInfo.orgId = this.state.orgId;
                this.setState({ loading: true });
                this.operationOrg(orgInfo);
            }
        })
    };

    // 显示弹出层
    showModal = () => {
        // 获取上级机构
        this.getParentOrg("add");
    }

    // 数组datasource遍历修改数据
    arrayMap = (value) => {
        return value.map((item)=>{
            return this.returnTag(item.operation, item.status, item.children, item); 
        });
    }

    // 返回datasource中已修改的数据
    returnTag = (operation, status, children, item) => {
        let param0 = null;
        let param1 = null;
        let param2 = null;
        if(children){
            param1 = this.arrayMap(item.children)
        }

        if(!operation){
            param0 = <Tag color="red">不可操作</Tag>
        }else{
            param0 = <Tag color="green">可操作</Tag>
        }

        if(!status){
            param2 = <Tag color="red">停用</Tag>
        }else{
            param2 = <Tag color="green">启用</Tag>
        }
        return {
            ...item,
            operation: param0,
            children: param1,  
            status: param2
        }
    }

    // 上级机构选择
    selectParentOrg = (value) => {
        this.setState({ orgPid: value[value.length - 1]});
    }

    // 删除机构信息
    async deletOrgInfo(orgId){
        await delOrg(orgId).then((res)=>{
            if (res && (res.flag === true || res.code === 10000)) {
                message.success(res.msg);
                // 获取菜单显示数据
                this.getOrgShowInfo(this.state.columns);
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

    // 增加 or 修改机构信息
    async operationOrg(orgInfo){
        if (this.state.addOrEdit === "add") {
            await addOrg(orgInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 200)) {
                    message.success(res.msg);
                    // 获取机构显示数据
                    this.getOrgShowInfo(this.state.columns);
                    this.setState({ loading: false, addMenu: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 2,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                    });
                    this.setState({ loading: false, addMenu: false });
                }
            }); 
        }else if(this.state.addOrEdit === "edit"){
            await modifyOrg(orgInfo).then((res)=>{
                if (res && (res.flag === true || res.code === 10000)) {
                    message.success(res.msg);
                    // 获取机构显示数据
                    this.getOrgShowInfo(this.state.columns);
                    this.setState({ loading: false, addMenu: false });
                }else{
                    notification.open({
                        message: res?res.msg: "出现错误",
                        description: res?(res.data?(res.data.description?res.data.description:res.msg):res.msg): "未知原因",
                        duration: 2,
                        icon: <Icon type="close" style={{ color: 'red' }} />,
                    });
                    this.setState({ loading: false, addMenu: false });
                }
            }); 
        } 
    }

    // 获取上级机构
    async getParentOrg(data){
        await queryOrgCascade().then((res)=>{
            if (res && (res.flag === true || res.code === 200)){
                if(res.data){
                    this.setState({
                        addMenu: true,
                        addOrEdit: data,
                        orgPnameList: defaultParentOrg.concat(res.data),
                    });
                } 
            }
        });
    }

    // 获取table表的机构显示的详细数据
    async getOrgShowInfo(columns){
        // mock数据
        // 获取机构详细数据
        await queryOrg().then((res) => {
            if (res && (res.flag === true || res.code === 200)){
                let datasource = this.arrayMap(res.data);
                this.setState({
                    dataSource: datasource,
                    columns: columns,
                });
            }
        });
    }

    // 获取指定ID的菜单数据
    async getSingleOrgInfo(orgId){
        await queryOrg(orgId).then((res)=>{
            if (res && (res.flag === true || res.code === 10000)){
                if(res.data && res.data !== []){
                    this.setState({
                        orgPid: res.data[0].parentId,                           // 父级菜单ID
                        orgId: res.data[0].value,                               // 机构Id
                        orgName: res.data[0].orgName,                           // 机构名称
                        status: res.data[0].status,                             // 机构状态
                        operation: res.data[0].operation,                       // 操作状态
                        sort: res.data[0].sort,                                 // 自定义排序值
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
            <div className="org-contain">
                <Row className="add-button-contain">
                    <Col span={2}>
                        <Button type="primary" icon="plus" onClick={this.showModal}>新增</Button>
                        <ModalWin visible={this.state.addMenu} width={500}
                                title="机构信息添加/修改"
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
                                <FormItem label='机构名称' {...formItemLayout}>
                                    {
                                        getFieldDecorator('orgName',{
                                            initialValue: this.state.orgName,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入机构名称',
                                                },
                                            ],
                                        })(
                                            <Input placeholder="请输入机构名称"></Input>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='上级机构' {...formItemLayout}>
                                    {
                                        getFieldDecorator('orgPid',{
                                            initialValue: [this.state.orgPid],
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请选择上级机构',
                                                },
                                            ],
                                        })(
                                            <Cascader options={this.state.orgPnameList} onChange={this.selectParentOrg} changeOnSelect placeholder="请选择上级机构" />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='排序值' {...formItemLayout}>
                                    {
                                        getFieldDecorator('sort',{
                                            initialValue: this.state.sort,
                                            rules: [
                                                {
                                                    required: true,
                                                    message: '请输入自定义排序值',
                                                },
                                            ],
                                        })(
                                            <InputNumber min={0} max={1000000000} />
                                        )
                                    }
                                </FormItem>
                                <FormItem label='机构状态' {...formItemLayout}>
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
                        </ModalWin>
                    </Col>
                    <Col span={22}>
                        
                    </Col>
                </Row>
                <Row className="table-data">
                    <Table expandRowByClick={true} style={{textAlign: "center"}} bordered={true}
                    indentSize={10} rowKey={record => record.orgId} dataSource={this.state.dataSource} tableLayout='fixed' scrollToFirstRowOnChange={true}
                    columns={this.state.columns} scroll={{ y: 630 }} />
                </Row>
            </div>
        )
    }
};
// 将Register传入到Form
export default Form.create()(OrgManage);