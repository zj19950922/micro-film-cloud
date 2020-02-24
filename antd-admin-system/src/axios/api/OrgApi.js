// 引入文件
import request from '../http'


/**
 * 获取上级机构级联表
 */
export function queryOrgCascade() {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/org/parent/cascade',
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 新增机构
 * @param {Body} data 
 */
export function addOrg(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/org/info',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 删除机构
 * @param {String} orgId 
 */
export function delOrg(orgId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/org/info?orgId='+orgId,
        method: 'delete',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 修改机构
 * @param {Body} data 
 */
export function modifyOrg(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/org/info',
        method: 'put',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 查询机构
 */
export function queryOrg(orgId) {
    if(orgId && orgId!==null){
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/org/info?orgId='+orgId,
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/org/info',
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

