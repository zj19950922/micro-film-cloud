package com.zjservice.monitor.service;

import com.zjservice.common.entity.RespResult;
import com.zjservice.monitor.entity.TbVisitLog;

/**
 * (TbVisitLog)表服务接口
 * @author makejava
 * @since 2020-03-06 17:13:36
 */
public interface TbVisitLogService {

    /**
     * 获取访问日志信息
     * @param queryCondition 查询条件
     * @return 统一json格式响应
     */
    RespResult getVisitorLog(TbVisitLog queryCondition);

}