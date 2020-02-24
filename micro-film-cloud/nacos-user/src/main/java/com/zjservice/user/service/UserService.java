package com.zjservice.user.service;

import com.zjservice.common.base.BaseService;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.query.UserQueryCondition;
import com.zjservice.user.pojo.user.User;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 19:55
 * @Description
 */
public interface UserService extends BaseService<User, UserQueryCondition> {

    /**
     * 逻辑删除用户
     * @param userId 用户ID
     * @return 是否删除成功
     */
    RespResult deleteUser(String userId);

    /**
     * 查询当前用户已有的角色
     * @param userId 用户名称
     * @return 角色集
     */
    RespResult queryUserOfRole(String userId);

    /**
     * 用户赋予角色
     * @param list 角色列表
     * @param userId 用户ID
     * @return 是否成功
     */
    RespResult modifyRoleToUser(List<String> list, String userId);

    /**
     * 查询用户拥有的菜单
     * @param userId 用户ID
     * @return 数据
     */
    RespResult queryUserOfMenu(String userId);
}
