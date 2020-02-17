package com.zjservice.user.mapper;

import com.zjservice.common.base.BaseMapper;
import com.zjservice.common.entity.BaseSelect;
import com.zjservice.common.entity.Cascade;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.pojo.org.OrgTree;
import com.zjservice.user.pojo.query.OrgQueryCondition;
import com.zjservice.user.pojo.query.RoleQueryCondition;
import com.zjservice.user.pojo.role.Role;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/12 13:14
 * @Description
 */
@Mapper
public interface RoleMapper extends BaseMapper<Role, RoleQueryCondition> {

    /**
     * 角色名称验重
     * @param name 角色名称
     * @param roleId 角色Id
     * @return 验重结果
     */
    int checkRepeat(@Param("name") String name, @Param("roleId") String roleId);

    /**
     * 用户新增/修改时获取角色
     * @return 结果集
     */
    List<BaseSelect> queryRoleForSelect();

    /**
     * 获取当前角色的菜单权限
     * @param roleId 角色ID
     * @return 菜单权限级联表
     */
    List<Cascade> queryAuthToRole(String roleId);

    /**
     * 获取当前可用的全部菜单权限
     * @return 菜单权限级联表
     */
    List<Cascade> queryAllMenuAuth();

    /**
     * 菜单权限授予角色
     * @param roleId 角色ID
     * @param list 菜单权限集合
     * @return 授权是否成功
     */
    int insertAuthToRole(@Param("list") List<String> list, @Param("roleId") String roleId);

    /**
     * 删除对应角色的全部菜单权限
     * @param roleId 角色ID
     * @param menuId 菜单ID
     * @return 权限删除是否成功
     */
    int deleteAuthToRole(@Param("roleId") String roleId, @Param("menuId") String menuId);

}
