package com.zjservice.user.mapper.serviceimpl;

import com.zjservice.common.entity.Cascade;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.CascadeUtil;
import com.zjservice.common.utils.IdUtil;
import com.zjservice.common.utils.JsonTreeUtil;
import com.zjservice.user.mapper.MenuMapper;
import com.zjservice.user.pojo.menu.Menu;
import com.zjservice.user.pojo.menu.MenuTree;
import com.zjservice.user.pojo.query.MenuQueryCondition;
import com.zjservice.user.service.MenuService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 18:23
 * @Description
 */
@SuppressWarnings("Duplicates")
@Service
public class MenuServiceImpl implements MenuService {

    @Resource
    private MenuMapper menuMapper;
    /** 使用雪花算法获取唯一18位纯数字ID*/
    private IdUtil idUtil = new IdUtil(1, 1);

    @Override
    public RespResult queryCascade() {
        List<Cascade> cascade = menuMapper.queryCascade();
        List<Cascade> data = CascadeUtil.getCascade(cascade, "0");
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    public RespResult insert(Menu menu) {
        // 对菜单标题和名称进行验重
        int checkName =menuMapper.checkRepeat(menu.getName(), null, null);
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "菜单名称重复，新增失败");
        }
        int checkTitle = menuMapper.checkRepeat(null, menu.getTitle(), null);
        if (checkTitle > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "菜单标题重复，新增失败");
        }
        menu.setMenuId(idUtil.nextId());
        int result = menuMapper.insert(menu);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "新增菜单成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "新增菜单失败");
    }

    @Override
    public RespResult delete(String param) {
        // 获取当前菜单是否存在子菜单
        int child = menuMapper.queryChild(param);
        if (child > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "当前菜单存在下级菜单，不可删除");
        }
        int result = menuMapper.delete(param);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "删除菜单成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "删除菜单失败，当前菜单不可操作");
    }

    @Override
    public RespResult modify(Menu menu) {
        // 对菜单标题和名称进行验重
        int checkName =menuMapper.checkRepeat(menu.getName(), null, String.valueOf(menu.getMenuId()));
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "菜单名称重复，修改失败");
        }
        int checkTitle = menuMapper.checkRepeat(null, menu.getTitle(), String.valueOf(menu.getMenuId()));
        if (checkTitle > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "菜单标题重复，修改失败");
        }
        int result = menuMapper.modify(menu);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "修改菜单成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "修改菜单失败，当前菜单不可操作");
    }

    @Override
    public RespResult query(MenuQueryCondition queryCondition) {
        return null;
    }

    @Override
    public RespResult queryMenuCascade(String menuId) {
        if(!StringUtils.isEmpty(menuId)){
            List<MenuTree> dataList = menuMapper.queryMenuCascade(menuId);
            return new RespResult(RespCode.SUCCESS, dataList);
        }else{
            List<MenuTree> dataList = menuMapper.queryMenuCascade(menuId);
            JsonTreeUtil<MenuTree> util = new JsonTreeUtil<>();
            List<MenuTree> list = util.getTree(dataList, "0");
            return new RespResult(RespCode.SUCCESS, list);
        }
    }

}
