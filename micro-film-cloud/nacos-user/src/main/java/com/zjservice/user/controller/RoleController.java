package com.zjservice.user.controller;

import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.zjservice.common.annotation.RequiredPermission;
import com.zjservice.common.base.BaseController;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.pojo.query.RoleQueryCondition;
import com.zjservice.user.pojo.role.Role;
import com.zjservice.user.pojo.role.RoleAuth;
import com.zjservice.user.service.OrgService;
import com.zjservice.user.service.RoleService;
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
@Api(tags = "角色信息管理")
@RequestMapping("/role")
@DefaultProperties(defaultFallback = "globalHystrix")
public class RoleController extends BaseController {

    @Resource
    private RoleService baseService;

    @PostMapping("/info")
    @ApiOperation(value = "新增角色信息", position = 1)
    @RequiredPermission(value = "role:add")
    @HystrixCommand
    public RespResult insert(@RequestBody Role role){
        return baseService.insert(role);
    }

    @DeleteMapping("/info")
    @ApiOperation(value = "删除角色信息", position = 2)
    @RequiredPermission(value = "role:delete")
    @HystrixCommand
    public RespResult delete(@RequestParam String roleId){
        if (StringUtils.isEmpty(roleId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.delete(roleId);
    }

    @PutMapping("/info")
    @ApiOperation(value = "修改角色信息", position = 3)
    @RequiredPermission(value = "role:modify")
    @HystrixCommand
    public RespResult modify(@RequestBody Role role){
        return baseService.modify(role);
    }

    @PostMapping("/info/query")
    @HystrixCommand
    @ApiOperation(value = "查询角色信息(分页)，传入roleId则获取指定角色信息", position = 4)
    public RespResult query(@RequestBody RoleQueryCondition queryCondition){
        return baseService.query(queryCondition);
    }

    @GetMapping("/info")
    @HystrixCommand
    @ApiOperation(value = "用户新增/修改时获取角色", position = 5)
    public RespResult queryRoleForSelect(){
        return baseService.queryRoleForSelect();
    }

    @GetMapping("/info/auth")
    @HystrixCommand
    @ApiOperation(value = "获取当前角色的权限菜单/获取所有可用的权限菜单", notes = "传递roleId则查询当前角色已有的权限菜单；" +
            "roleId为空字符串，则获取全部可用权限菜单", position = 6)
    @ApiImplicitParams(
            @ApiImplicitParam(name = "roleId", value = "角色ID")
    )
    public RespResult queryAuthToRole(@RequestParam(required = false, defaultValue = "") String roleId){
        return baseService.queryAuthToRole(roleId);
    }

    @PutMapping("/info/auth")
    @ApiOperation(value = "修改角色的权限菜单信息", position = 7)
    @RequiredPermission(value = "role:permission")
    @HystrixCommand
    public RespResult modifyAuthToRole(@RequestBody RoleAuth roleAuth){
        if (StringUtils.isEmpty(roleAuth.getRoleId())){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.modifyAuthToRole(roleAuth.getMenuId(), roleAuth.getRoleId());
    }

    @Override
    public RespResult globalHystrix() {
        return super.globalHystrix();
    }
}
