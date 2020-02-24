package com.zjservice.user.mapper;

import com.zjservice.common.base.BaseMapper;
import com.zjservice.common.entity.BaseSelect;
import com.zjservice.user.pojo.menu.MenuTree;
import com.zjservice.user.pojo.query.UserQueryCondition;
import com.zjservice.user.pojo.user.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/13 11:17
 * @Description
 */
@Mapper
public interface UserMapper extends BaseMapper<User, UserQueryCondition> {

    /**
     * 用户名称验重
     * @param name 用户名称
     * @param userId 用户ID
     * @return 验重结果
     */
    int checkRepeat(@Param("name") String name, @Param("userId") String userId);

    /**
     * 逻辑删除用户
     * @param userId 用户ID
     * @return 是否删除成功
     */
    int deleteUser(String userId);

    /**
     * 查询当前用户已有的角色
     * @param userId 用户名称
     * @return 角色集
     */
    List<BaseSelect> queryUserOfRole(String userId);

    /**
     * 用户赋予角色
     * @param list 角色列表
     * @param userId 用户ID
     * @return 是否成功
     */
    int insertRoleToUser(@Param("list") List<String> list, @Param("userId") String userId);

    /**
     * 删除当前用户的全部角色
     * @param userId 用户ID
     * @param roleId 角色ID
     * @return 是否成功
     */
    int deleteRoleToUser(@Param("userId") String userId, @Param("roleId") String roleId);

    /**
     * 查询用户拥有的菜单
     * @param roleId 用户ID
     * @return 数据
     */
    List<MenuTree> queryRoleOfMenu(String roleId);
}
