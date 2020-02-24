package com.zjservice.user.controller;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.query.RoleQueryCondition;
import com.zjservice.user.pojo.query.UserQueryCondition;
import com.zjservice.user.pojo.role.Role;
import com.zjservice.user.pojo.user.User;
import com.zjservice.user.pojo.user.UserRole;
import com.zjservice.user.service.RoleService;
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
@Api(tags = "用户信息管理")
@RequestMapping("/user")
public class UserController {

    @Resource
    private UserService baseService;

    @PostMapping("/info")
    @ApiOperation(value = "新增用户信息", position = 1)
    public RespResult insert(@RequestBody User user){
        return baseService.insert(user);
    }

    @DeleteMapping("/info")
    @ApiOperation(value = "删除用户信息", position = 2)
    public RespResult delete(@RequestParam String userId){
        if (StringUtils.isEmpty(userId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.deleteUser(userId);
    }

    @PutMapping("/info")
    @ApiOperation(value = "修改用户信息", position = 3)
    public RespResult modify(@RequestBody User user){
        return baseService.modify(user);
    }

    @PostMapping("/info/query")
    @ApiOperation(value = "查询用户信息(分页)，传入userId则获取指定用户信息", position = 4)
    public RespResult query(@RequestBody UserQueryCondition queryCondition){
        queryCondition.setPage(queryCondition.getPage()*queryCondition.getSize());
        queryCondition.setSize((queryCondition.getPage()+1)*queryCondition.getSize());
        return baseService.query(queryCondition);
    }

    @GetMapping("/info/auth")
    @ApiOperation(value = "查询当前用户已有的角色", position = 5)
    public RespResult queryUserOfRole(@RequestParam String userId){
        if (StringUtils.isEmpty(userId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.queryUserOfRole(userId);
    }

    @PutMapping("/info/auth")
    @ApiOperation(value = "修改用户的角色信息", position = 5)
    public RespResult modifyRoleToUser(@RequestBody UserRole userRole){
        if (StringUtils.isEmpty(userRole.getUserId())){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.modifyRoleToUser(userRole.getRoles(), userRole.getUserId());
    }

    @GetMapping("/info/menu")
    @ApiOperation(value = "查询当前用户拥有的菜单，在用户进行登录和角色判断后调用", position = 5)
    public RespResult queryUserOfMenu(@RequestParam String userId){
        if (StringUtils.isEmpty(userId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.queryUserOfMenu(userId);
    }

}
