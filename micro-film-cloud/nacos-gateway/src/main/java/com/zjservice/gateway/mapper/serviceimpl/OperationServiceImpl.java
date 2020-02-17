package com.zjservice.gateway.mapper.serviceimpl;

import com.zjservice.gateway.mapper.OperationMapper;
import com.zjservice.gateway.pojo.OperationLog;
import com.zjservice.gateway.service.OperationService;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zj
 * @date 2020/1/6 9:34
 * @Description
 */
@Service
public class OperationServiceImpl implements OperationService {

    @Resource
    private OperationMapper operationMapper;

    @Override
    @Async
    public void addOperationLog(String userName, String visitorService, String visitorUrl, String visitorMethod, String remoteAddress) {
        OperationLog log = new OperationLog();
        log.setUserName(userName);
        log.setVisitorService(visitorService);
        log.setVisitorUrl(visitorUrl);
        log.setVisitorMethod(visitorMethod);
        log.setRemoteAddress(remoteAddress);
        operationMapper.addOperationLog(log);
    }

}
