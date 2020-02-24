// 引入文件
import request from '../http'


/**
 * 获取上级菜单级联表
 */
export function queryMenuCascade() {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/menu/parent/cascade',
        method: 'get',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 新增菜单
 * @param {Body} data 
 */
export function addMenu(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/menu/info',
        method: 'post',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 删除菜单
 * @param {String} menuId 
 */
export function delMenu(menuId) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        url: '/menu/info?menuId='+menuId,
        method: 'delete',
        // data: data,       // 请求体
        params: null   // 请求参数
    })
}

/**
 * 修改菜单
 * @param {Body} data 
 */
export function modifyMenu(data) {
    return request({
        headers: {
            "Content-Type": "application/json",
        },
        url: '/menu/info',
        method: 'put',
        data: data,       // 请求体
        // params: null   // 请求参数
    })
}

/**
 * 查询菜单
 */
export function queryMenu(menuId) {
    if(menuId && menuId !== null){
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/menu/info?menuId='+menuId,
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }else{
        return request({
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            url: '/menu/info',
            method: 'get',
            // data: data,       // 请求体
            params: null   // 请求参数
        })
    }
}

