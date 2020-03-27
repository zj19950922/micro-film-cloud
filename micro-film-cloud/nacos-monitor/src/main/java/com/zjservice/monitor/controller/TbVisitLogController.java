package com.zjservice.monitor.controller;

import com.zjservice.common.annotation.RequiredPermission;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.monitor.entity.TbVisitLog;
import com.zjservice.monitor.service.TbVisitLogService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * (TbVisitLog)表控制层
 * @author makejava
 * @since 2020-03-06 17:13:37
 */
@RestController
@Api(tags = "日志监控管理")
@RequestMapping("/logging")
public class TbVisitLogController {
    /**
     * 服务对象
     */
    @Resource
    private TbVisitLogService tbVisitLogService;

    @PostMapping("/visitor")
    @ApiOperation(value = "用户访问日志")
    public RespResult getVisitorLog(@RequestBody TbVisitLog queryCondition){
        queryCondition.setPage(queryCondition.getPage()*queryCondition.getSize());
        return tbVisitLogService.getVisitorLog(queryCondition);
    }

    @GetMapping("/test/{id}")
    @RequiredPermission(value = "menu:add")
    public RespResult getTest(@PathVariable("id") Long id){
        return new RespResult(RespCode.SUCCESS, id);
    }

}