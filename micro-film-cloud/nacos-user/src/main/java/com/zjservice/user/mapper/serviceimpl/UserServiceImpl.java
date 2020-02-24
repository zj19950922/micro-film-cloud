package com.zjservice.user.mapper.serviceimpl;

import com.zjservice.common.entity.BaseSelect;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.IdUtil;
import com.zjservice.common.utils.JsonTreeUtil;
import com.zjservice.common.utils.KemMd5Util;
import com.zjservice.common.utils.PageUtil;
import com.zjservice.user.mapper.UserMapper;
import com.zjservice.user.pojo.menu.MenuTree;
import com.zjservice.user.pojo.query.UserQueryCondition;
import com.zjservice.user.pojo.user.User;
import com.zjservice.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/13 11:58
 * @Description
 */
@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;
    /** 使用雪花算法获取唯一18位纯数字ID*/
    private IdUtil idUtil = new IdUtil(1, 4);

    @Override
    public RespResult insert(User user) {
        // 用户名称验重
        int check = userMapper.checkRepeat(user.getUserName(), null);
        if (check > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "用户名已存在，新增失败");
        }
        user.setUserId(String.valueOf(idUtil.nextId()));
        // 密码MD5加密
        user.setPassword(KemMd5Util.MD5(user.getPassword()));
        int result = userMapper.insert(user);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "用户新增成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "用户新增失败");
    }

    @Override
    public RespResult modify(User user) {
        // 用户名称验重
        int check = userMapper.checkRepeat(user.getUserName(), String.valueOf(user.getUserId()));
        if (check > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "用户名已存在，修改失败");
        }
        if (!StringUtils.isEmpty(user.getPassword())){
            // 密码MD5加密
            user.setPassword(KemMd5Util.MD5(user.getPassword()));
        }
        int result = userMapper.modify(user);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "用户修改成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "用户修改失败，当前用户不可操作");
    }

    @Override
    public RespResult query(UserQueryCondition condition) {
        int total = userMapper.queryTotal(condition);
        List<User> userList = userMapper.query(condition);
        PageUtil data = new PageUtil();
        data.setTotal(total);
        data.setData(userList);
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RespResult deleteUser(String userId) {
        int result = userMapper.deleteUser(userId);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "用户删除成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "用户删除失败，当前用户不可操作");
    }

    @Override
    public RespResult queryUserOfRole(String userId) {
        // 获取当前用户已有的角色集
        List<BaseSelect> data = userMapper.queryUserOfRole(userId);
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RespResult modifyRoleToUser(List<String> list, String userId) {
        // 删除当前用户的全部角色
        userMapper.deleteRoleToUser(userId, null);
        if (list.size() > 0){
            int result = userMapper.insertRoleToUser(list, userId);
            if (result > 0){
                return new RespResult(RespCode.SUCCESS, "用户授权成功");
            }
            return new RespResult(RespCode.CODE_ENUM_FAIL, "用户授权失败");
        }
        return new RespResult(RespCode.SUCCESS, "用户授权成功");
    }

    @Override
    public RespResult queryUserOfMenu(String userId) {
        // 获取当前用户的全部角色
        List<BaseSelect> roleList = userMapper.queryUserOfRole(String.valueOf(userId));
        // 获取角色所拥有的菜单
        List<MenuTree> dataList = new ArrayList<>();
        for (BaseSelect data : roleList){
            List<MenuTree> menuList = userMapper.queryRoleOfMenu(data.getValue());
            dataList.addAll(menuList);
        }
        dataList = new ArrayList<>(new LinkedHashSet<>(dataList));
        JsonTreeUtil<MenuTree> util = new JsonTreeUtil<>();
        List<MenuTree> menuList = util.getTree(dataList, "0");
        return new RespResult(RespCode.SUCCESS, menuList);
    }

    @Override
    public RespResult delete(String param) {
        return null;
    }

    @Override
    public RespResult queryCascade() {
        return null;
    }

}
