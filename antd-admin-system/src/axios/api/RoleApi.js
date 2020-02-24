// 引入文件
import request from '../http'


/**
 * 角色新增
 * @param {Body} data 
 */
export function addRole(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/role/info',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 角色删除
 * @param {String} roleId 
 */
export function delRole(roleId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/role/info?roleId='+roleId,
        method: 'delete',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 角色修改
 * @param {Body} data 
 */
export function modifyRole(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/role/info',
        method: 'put',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 角色分页查询
 * @param {Body} data 
 */
export function queryRole(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/role/info/query',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 获取当前角色的权限菜单   /   也可获取全部可用的权限菜单
 * @param {String} roleId 传空字符串可获取全部可用的权限菜单
 */
export function queryRoleOfMenu(roleId) {
    if(roleId && roleId!==null){
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/role/info/auth?roleId='+roleId,
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }else{
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/role/info/auth',
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }
}
    

/**
 * 修改角色的权限菜单信息
 * @param {Body} data 
 */
export function modifyRoleOfMenu(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/role/info/auth',
        method: 'put',
        data: data,       // 请求体
        // params: {menuId: JSON.stringify(data)}   // 请求参数
    })
}