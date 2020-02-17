package com.zjservice.user.mapper.serviceimpl;

import com.zjservice.common.entity.BaseSelect;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.JsonTreeUtil;
import com.zjservice.common.utils.JwtUtil;
import com.zjservice.common.utils.KemMd5Util;
import com.zjservice.user.mapper.AuthMapper;
import com.zjservice.user.pojo.auth.AuthLogin;
import com.zjservice.user.pojo.auth.UserLoginInfo;
import com.zjservice.user.pojo.menu.MenuTree;
import com.zjservice.user.service.AuthService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * @author zj
 * @date 2020/2/12 13:14
 * @Description
 */
@Service
public class AuthServiceImpl implements AuthService {

    @Resource
    private AuthMapper authMapper;
    @Resource
    private RedisTemplate<String, UserLoginInfo> redisTemplate;

    @Override
    public RespResult login(AuthLogin authLogin) {
        authLogin.setPassword(KemMd5Util.MD5(authLogin.getPassword()));
        String userId = authMapper.checkLogin(authLogin);
        if (StringUtils.isEmpty(userId)){
            return new RespResult(RespCode.LOGIN_ERROR);
        }
        // 生成token
        String token = JwtUtil.generateToken(authLogin.getUserName(), authLogin.getPassword());

        // 获取当前用户的全部角色
        List<BaseSelect> roleList = authMapper.queryUserOfRole(userId);

        // 获取角色所拥有的菜单
        List<MenuTree> dataList = new ArrayList<>();
        for (BaseSelect data : roleList){
            List<MenuTree> menuList = authMapper.queryAuthToRole(data.getValue());
            dataList.addAll(menuList);
        }
        dataList = new ArrayList<>(new LinkedHashSet<>(dataList));
        JsonTreeUtil<MenuTree> util = new JsonTreeUtil<>();
        List<MenuTree> menuList = util.getTree(dataList, "0");

        UserLoginInfo userInfo = new UserLoginInfo();
        userInfo.setUserName(authLogin.getUserName());
        userInfo.setUserId(userId);
        userInfo.setRoleList(roleList);
        userInfo.setMenuList(menuList);
        userInfo.setToken(token);
        // 将数据存入redis中
        redisTemplate.opsForValue().set(authLogin.getUserName()+"_info", userInfo, 30, TimeUnit.MINUTES);
        return new RespResult(RespCode.LOGIN, userInfo);
    }

    @Override
    public RespResult logout(String userName) {
        redisTemplate.expire(userName + "_info", 0, TimeUnit.MINUTES);
        return new RespResult(RespCode.LOGOUT);
    }

}
