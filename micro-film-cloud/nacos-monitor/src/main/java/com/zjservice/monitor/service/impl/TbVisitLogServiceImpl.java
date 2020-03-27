package com.zjservice.monitor.service.impl;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.PageUtil;
import com.zjservice.monitor.entity.TbVisitLog;
import com.zjservice.monitor.mapper.TbVisitLogMapper;
import com.zjservice.monitor.service.TbVisitLogService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * (TbVisitLog)表服务实现类
 *
 * @author makejava
 * @since 2020-03-06 17:13:37
 */
@Service("tbVisitLogService")
public class TbVisitLogServiceImpl implements TbVisitLogService {
    @Resource
    private TbVisitLogMapper tbVisitLogMapper;

    @Override
    public RespResult getVisitorLog(TbVisitLog queryCondition) {
        int total = tbVisitLogMapper.queryTotal(queryCondition);
        List<TbVisitLog> tbVisitLogs = tbVisitLogMapper.queryAll(queryCondition);
        PageUtil data = new PageUtil();
        data.setTotal(total);
        data.setData(tbVisitLogs);
        return new RespResult(RespCode.SUCCESS, data);
    }

}