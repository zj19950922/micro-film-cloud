package com.zjservice.user.service;

import com.zjservice.common.base.BaseService;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.query.RoleQueryCondition;
import com.zjservice.user.pojo.role.Role;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 19:55
 * @Description
 */
public interface RoleService extends BaseService<Role, RoleQueryCondition> {

    /**
     * 用户获取角色新增/修改
     * @return 统一数据
     */
    RespResult queryRoleForSelect();

    /**
     * 获取当前角色的菜单权限/获取当前可用的全部菜单权限
     * @param roleId 角色ID
     * @return 菜单权限级联表
     */
    RespResult queryAuthToRole(String roleId);

    /**
     * 菜单权限授予角色
     * @param roleId 角色ID
     * @param list 菜单权限集合
     * @return 授权是否成功
     */
    RespResult modifyAuthToRole(List<String> list, String roleId);

}
