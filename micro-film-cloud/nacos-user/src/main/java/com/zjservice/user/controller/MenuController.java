package com.zjservice.user.controller;

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
public class MenuController {

    @Resource
    private MenuService baseService;

    @GetMapping("/parent/cascade")
    @ApiOperation(value = "获取上级可用菜单级联", position = 1)
    public RespResult queryCascade(){
        return baseService.queryCascade();
    }

    @PostMapping("/info")
    @ApiOperation(value = "新增菜单信息", position = 2)
    public RespResult insert(@RequestBody Menu menu){
        return baseService.insert(menu);
    }

    @DeleteMapping("/info")
    @ApiOperation(value = "删除菜单信息", position = 3)
    public RespResult delete(@RequestParam String menuId){
        if (StringUtils.isEmpty(menuId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.delete(menuId);
    }

    @PutMapping("/info")
    @ApiOperation(value = "修改菜单信息", position = 4)
    public RespResult modify(@RequestBody Menu menu){
        return baseService.modify(menu);
    }

    @GetMapping("/info")
    @ApiOperation(value = "查询菜单信息(级联不分页)", position = 5)
    public RespResult queryMenuCascade(@RequestParam(defaultValue = "", required = false) String menuId){
        return baseService.queryMenuCascade(menuId);
    }

}
