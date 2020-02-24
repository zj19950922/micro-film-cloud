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
 * @Description 用户登录注销逻辑
 */
@SuppressWarnings("Duplicates")
@Service
public class AuthServiceImpl implements AuthService {

    @Resource
    private AuthMapper authMapper;
    @Resource
    private RedisTemplate<String, UserLoginInfo> redisTemplate;

    @Override
    public RespResult login(AuthLogin authLogin) {
        authLogin.setPassword(KemMd5Util.MD5(authLogin.getPassword()));
        Map<String, Object> userMap = authMapper.checkLogin(authLogin);
        if (userMap == null){
            return new RespResult(RespCode.LOGIN_ERROR);
        }
        Long userId = StringUtils.isEmpty(userMap.get("userId"))?null: (long) userMap.get("userId");
        boolean status = !StringUtils.isEmpty(userMap.get("status")) && (boolean) userMap.get("status");
        if (userId == null){
            return new RespResult(RespCode.LOGIN_ERROR, "当前用户存在异常，请向管理员确认");
        }
        // 生成token
        String token = JwtUtil.generateToken(authLogin.getUserName(), authLogin.getPassword());

        // 获取当前用户的全部角色
        List<BaseSelect> roleList = authMapper.queryUserOfRole(String.valueOf(userId));

        UserLoginInfo userInfo = new UserLoginInfo();
        userInfo.setUserName(authLogin.getUserName());
        userInfo.setUserId(String.valueOf(userId));
        userInfo.setRoleList(roleList);
        userInfo.setToken(token);
        userInfo.setStatus(status);
        // 将数据存入redis中
        redisTemplate.opsForValue().set(authLogin.getUserName()+"_info", userInfo, 30, TimeUnit.MINUTES);
        return new RespResult(RespCode.LOGIN, userInfo);
    }

    @Override
    public RespResult logout(String userName) {
        redisTemplate.expire(userName + "_info", 0, TimeUnit.MINUTES);
        return new RespResult(RespCode.LOGOUT);
    }

    @Override
    public RespResult queryMenuCascade(String menuId) {
        if(!StringUtils.isEmpty(menuId)){
            List<MenuTree> dataList = authMapper.queryMenuCascade(menuId);
            return new RespResult(RespCode.SUCCESS, dataList);
        }else{
            List<MenuTree> dataList = authMapper.queryMenuCascade(menuId);
            JsonTreeUtil<MenuTree> util = new JsonTreeUtil<>();
            List<MenuTree> list = util.getTree(dataList, "0");
            return new RespResult(RespCode.SUCCESS, list);
        }
    }

}
