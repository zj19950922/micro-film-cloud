package com.zjservice.user.service;

import com.zjservice.common.base.BaseService;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.menu.Menu;
import com.zjservice.user.pojo.query.MenuQueryCondition;

/**
 * @author zj
 * @date 2020/2/11 19:55
 * @Description
 */
public interface MenuService extends BaseService<Menu, MenuQueryCondition> {

    /**
     * 查询级联的菜单信息
     * @param menuId 菜单ID
     * @return 级联表
     */
    RespResult queryMenuCascade(String menuId);

}
