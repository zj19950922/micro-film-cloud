// 引入文件
import request from '../http'


/**
 * 进行用户登录
 * @param {Body} data 
 */
export function login(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/auth/login',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 进行用户注销
 * @param {String} userName 
 */
export function logout(userName) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/auth/logout?userName='+userName,
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 登录时获取菜单
 */
export function queryMenu(menuId) {
    if(menuId && menuId !== null){
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/auth/info?menuId='+menuId,
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }else{
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/auth/info',
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }
}