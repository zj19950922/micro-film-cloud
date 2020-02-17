package com.zjservice.user.service;

import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.auth.AuthLogin;

/**
 * @author zj
 * @date 2020/2/11 19:55
 * @Description
 */
public interface AuthService {

    /**
     * 用户登录
     * @param authLogin 登录信息
     * @return 统一json
     */
    RespResult login(AuthLogin authLogin);

    /**
     * 用户登出
     * @param userName 用户名称
     * @return 统一json
     */
    RespResult logout(String userName);
}
