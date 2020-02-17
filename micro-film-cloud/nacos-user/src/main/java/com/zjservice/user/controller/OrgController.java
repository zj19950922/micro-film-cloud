package com.zjservice.user.controller;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.menu.Menu;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.service.MenuService;
import com.zjservice.user.service.OrgService;
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
@Api(tags = "机构信息管理")
@RequestMapping("/org")
public class OrgController {

    @Resource
    private OrgService baseService;

    @GetMapping("/parent/cascade")
    @ApiOperation(value = "获取上级可用机构级联", position = 1)
    public RespResult queryCascade(){
        return baseService.queryCascade();
    }

    @PostMapping("/info")
    @ApiOperation(value = "新增机构信息", position = 2)
    public RespResult insert(@RequestBody Org org){
        return baseService.insert(org);
    }

    @DeleteMapping("/info")
    @ApiOperation(value = "删除机构信息", position = 3)
    public RespResult delete(@RequestParam String orgId){
        if (StringUtils.isEmpty(orgId)){
            return new RespResult(RespCode.MISS_PARAM);
        }
        return baseService.delete(orgId);
    }

    @PutMapping("/info")
    @ApiOperation(value = "修改机构信息", position = 4)
    public RespResult modify(@RequestBody Org org){
        return baseService.modify(org);
    }

    @GetMapping("/info")
    @ApiOperation(value = "查询机构信息(级联不分页)", position = 5)
    public RespResult queryMenuCascade(){
        return baseService.queryOrgCascade();
    }

}
