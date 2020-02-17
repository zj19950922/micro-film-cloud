package com.zjservice.user.mapper;

import com.zjservice.common.base.BaseMapper;
import com.zjservice.user.pojo.menu.Menu;
import com.zjservice.user.pojo.menu.MenuTree;
import com.zjservice.user.pojo.query.MenuQueryCondition;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 17:19
 * @Description 菜单管理mapper层
 */
@Mapper
public interface MenuMapper extends BaseMapper<Menu, MenuQueryCondition> {

    /**
     * 菜单名称验重
     * @param name 菜单名称
     * @param title 菜单标题
     * @param menuId 菜单ID
     * @return 验重结果
     */
    int checkRepeat(@Param("name") String name, @Param("title") String title, @Param("menuId") String menuId);

    /**
     * 查询菜单级联
     * @return 菜单级联
     */
    List<MenuTree> queryMenuCascade();

}
