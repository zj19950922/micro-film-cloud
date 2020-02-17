package com.zjservice.user.controller;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.auth.AuthLogin;
import com.zjservice.user.pojo.query.UserQueryCondition;
import com.zjservice.user.pojo.user.User;
import com.zjservice.user.service.AuthService;
import com.zjservice.user.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 18:44
 * @Description
 */
@RestController
@Api(tags = "用户登录管理")
@RequestMapping("/auth")
public class AuthController {

    @Resource
    private AuthService baseService;

    @PostMapping("/login")
    @ApiOperation(value = "用户登录", position = 1)
    public RespResult login(@RequestBody AuthLogin authLogin){
        return baseService.login(authLogin);
    }

    @GetMapping("/logout")
    @ApiOperation(value = "用户登出", position = 2)
    public RespResult logout(@RequestParam String userName){
        if (StringUtils.isEmpty(userName)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.logout(userName);
    }

}
