// 引入文件
import request from './http'

/**
 * 进行用户登录
 * @method postLogin
 * @return {[type]}         [description]
 */
export function postLogin(data) {
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        url: '/user/auth/login',
        method: 'post',
        params: data,
    })
}

/**
 * 用户登出
 * @param {*} userName 
 */
export function getLogout(userName) {
    return request({
        url: '/user/auth/logout?loginName='+userName,
        method: 'get',
        params: null,
    })
}

/**
 * 获取左边菜单栏
 * @param {*} userId 
 */
export function getNavLeftMenus(userId) {
    return request({
        url: '/user/auth/menu?userId='+userId,
        method: 'get',
        params: null,
    })
}

/**
 * 添加菜单
 * @method postAddMenu
 * @param {*} data 
 */
export function postAddMenu(data) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/menu',
        method: 'post',
        data: data,
    })
}

/**
 * 获取能作为父级的菜单
 */
export function getParentMenu() {
    return request({
        url: '/user/menu/parent',
        method: 'get',
        params: null,
    })
}

/**
 * 获取详细菜单信息
 * @param {*} menuId 
 */
export function getMenuDetails(menuId){
    if (menuId) {
        return request({
            url: '/user/menu?menuId='+menuId,
            method: 'get',
            params: null,
        })
    }
    return request({
        url: '/user/menu',
        method: 'get',
        params: null,
    })
}

/**
 * 删除菜单
 * @param {*} menuId 
 */
export function deleteMenu(menuId){
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        url: '/user/menu/'+menuId,
        method: 'delete',
        params: null,
    })
}

/**
 * 修改菜单
 * @param {*} userInfo 
 */
export function putModifyMenu(userInfo){
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/menu',
        method: 'put',
        data: userInfo,
    })
}

/**
 * 获取用户基础信息
 * @param {*} userId 
 */
export function getUserInfo(userId){
    if (userId) {
        return request({
            url: '/user/user/0/0?userId='+userId,
            method: 'get',
            params: null,
        })
    }
    return request({
        url: '/user/user/0/0',
        method: 'get',
        params: null,
    })
}

/**
 * 新增用户基础信息
 * @param {*} userInfo 
 */
export function postAddUserBasicInfo(userInfo) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/user',
        method: 'post',
        data: userInfo,
    })
}

/**
 * 删除用户基础信息
 * @param {*} userId 
 */
export function deleteUserBasicInfo(userId){
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        url: '/user/user/'+userId,
        method: 'delete',
        params: null,
    })
}

/**
 * 修改用户基础信息
 * @param {*} userInfo 
 */
export function putModifyUserBasicInfo(userInfo){
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/user',
        method: 'put',
        data: userInfo,
    })
}

/**
 * 获取父级机构
 */
export function getParentOrg(){
    return request({
        url: '/user/org/parent',
        method: 'get',
        params: null,
    })
}

/**
 * 新增机构信息
 * @param {*} orgInfo 
 */
export function postAddOrg(orgInfo) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/org',
        method: 'post',
        data: orgInfo,
    })
}

/**
 * 修改机构信息
 * @param {*} orgInfo 
 */
export function putModifyOrg(orgInfo){
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/org',
        method: 'put',
        data: orgInfo,
    })
}

/**
 * 获取机构信息
 * @param {*} orgId 
 */
export function getOrgInfo(orgId){
    if (orgId) {
        return request({
            url: '/user/org?orgId='+orgId,
            method: 'get',
            params: null,
        })
    }
    return request({
        url: '/user/org',
        method: 'get',
        params: null,
    })
}

/**
 * 删除机构
 * @param {*} orgId 
 */
export function deletOrgInfo(orgId){
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        url: '/user/org/'+orgId,
        method: 'delete',
        params: null,
    })
}

/**
 * 获取角色信息
 * @param {*} roleId 
 */
export function getRoleInfo(roleId){
    if (roleId) {
        return request({
            url: '/user/role/0/0?roleId='+roleId,
            method: 'get',
            params: null,
        })
    }
    return request({
        url: '/user/role/0/0',
        method: 'get',
        params: null,
    })
}

/**
 * 新增角色信息
 * @param {*} roleInfo 
 */
export function postAddRole(roleInfo) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/role',
        method: 'post',
        data: roleInfo,
    })
}

/**
 * 修改角色信息
 * @param {*} roleInfo 
 */
export function putModifyRole(roleInfo){
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/role',
        method: 'put',
        data: roleInfo,
    })
}

/**
 * 删除角色信息
 * @param {*} roleId 
 */
export function deletRoleInfo(roleId){
    return request({
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        url: '/user/role/'+roleId,
        method: 'delete',
        params: null,
    })
}

/**
 * 获取可用权限信息
 */
export function getPowerInfo(roleId){
    if (roleId) {
        return request({
            url: '/user/role/auth/'+roleId,
            method: 'get',
            params: null,
        })
    }
    return request({
        url: '/user/role/auth',
        method: 'get',
        params: null,
    })
}

/**
 * 新增角色权限
 * @param {*} roleOfAuthInfo 
 */
export function postPowerInfo(roleOfAuthInfo) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/role/auth',
        method: 'post',
        data: roleOfAuthInfo,
    })
}

/**
 * 修改角色权限
 * @param {*} roleOfAuthInfo 
 */
export function putPowerInfo(roleOfAuthInfo) {
    return request({
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
        },
        url: '/user/role/auth',
        method: 'put',
        data: roleOfAuthInfo,
    })
}