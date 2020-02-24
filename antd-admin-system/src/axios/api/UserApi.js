// 引入文件
import request from '../http'


/**
 * 用户新增
 * @param {Body} data 
 */
export function addUser(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/user/info',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 用户删除
 * @param {String} userId 
 */
export function delUser(userId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/user/info?userId='+userId,
        method: 'delete',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 用户修改
 * @param {Body} data 
 */
export function modifyUser(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/user/info',
        method: 'put',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 用户分页查询
 * @param {Body} data 
 */
export function queryUser(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/user/info/query',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 用户新增时获取角色
 */
export function getRoleWhenAddUser() {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/role/info',
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 用户角色查询
 * @param {String} userId 
 */
export function queryUserOfRole(userId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/user/info/auth?userId='+userId,
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 用户角色修改
 * @param {Body} data 
 */
export function modifyUserOfRole(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/user/info/auth',
        method: 'put',
        data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 用户菜单查询
 * @param {String} userId 
 */
export function queryUserOfMenu(userId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/user/info/menu?userId='+userId,
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}