package com.zjservice.user.controller;

import com.netflix.hystrix.contrib.javanica.annotation.DefaultProperties;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.zjservice.common.annotation.RequiredPermission;
import com.zjservice.common.base.BaseController;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.menu.Menu;
import com.zjservice.user.service.MenuService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * @author zj
 * @date 2020/2/11 18:44
 * @Description
 */
@RestController
@Api(tags = "菜单信息管理")
@RequestMapping("/menu")
@DefaultProperties(defaultFallback = "globalHystrix")
public class MenuController extends BaseController {

    @Resource
    private MenuService baseService;

    @GetMapping("/parent/cascade")
    @ApiOperation(value = "获取上级可用菜单级联", position = 1)
    @HystrixCommand
    public RespResult queryCascade(){
        return baseService.queryCascade();
    }

    @PostMapping("/info")
    @ApiOperation(value = "新增菜单信息", position = 2)
    @RequiredPermission(value = "menu:add")
    @HystrixCommand
    public RespResult insert(@RequestBody Menu menu){
        return baseService.insert(menu);
    }

    @DeleteMapping("/info")
    @ApiOperation(value = "删除菜单信息", position = 3)
    @RequiredPermission(value = "menu:delete")
    @HystrixCommand
    public RespResult delete(@RequestParam String menuId){
        if (StringUtils.isEmpty(menuId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.delete(menuId);
    }

    @PutMapping("/info")
    @ApiOperation(value = "修改菜单信息", position = 4)
    @RequiredPermission(value = "menu:modify")
    @HystrixCommand
    public RespResult modify(@RequestBody Menu menu){
        return baseService.modify(menu);
    }

    @GetMapping("/info")
    @ApiOperation(value = "查询菜单信息(级联不分页)", position = 5)
    @HystrixCommand
    public RespResult queryMenuCascade(@RequestParam(defaultValue = "", required = false) String menuId){
        return baseService.queryMenuCascade(menuId);
    }

    @Override
    public RespResult globalHystrix() {
        return super.globalHystrix();
    }
}
