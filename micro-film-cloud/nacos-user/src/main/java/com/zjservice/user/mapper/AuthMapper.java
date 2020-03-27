package com.zjservice.user.mapper;

import com.zjservice.common.entity.BaseSelect;
import com.zjservice.user.pojo.auth.AuthLogin;
import com.zjservice.user.pojo.auth.LoginResponse;
import com.zjservice.user.pojo.menu.MenuTree;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * @author zj
 * @date 2020/2/13 20:41
 * @Description
 */
@Mapper
public interface AuthMapper {

    /**
     * 登录验证
     * @param authLogin 登录信息
     * @return 登录验证
     */
    LoginResponse checkLogin(AuthLogin authLogin);

    /**
     * 查询当前用户已有的角色
     * @param userId 用户名称
     * @return 角色集
     */
    List<BaseSelect> queryUserOfRole(String userId);

    /**
     * 获取当前角色的菜单权限
     * @param roleId 角色ID
     * @return 菜单权限级联表
     */
    List<MenuTree> queryAuthToRole(String roleId);

    /**
     * 查询菜单级联
     * @param menuId 菜单ID
     * @return 菜单级联
     */
    List<MenuTree> queryMenuCascade(String menuId);

    /**
     * 获取指定用户ID的全部权限
     * @param userId 用户ID
     * @return 用户权限集合
     */
    Set<String> queryUserOfPermission(String userId);
}
