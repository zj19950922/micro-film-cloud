package com.zjservice.gateway.mapper.serviceimpl;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import com.zjservice.common.utils.IdUtil;
import com.zjservice.gateway.mapper.OperationMapper;
import com.zjservice.gateway.pojo.OperationLog;
import com.zjservice.gateway.service.OperationService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author zj
 * @date 2020/1/6 9:34
 * @Description
 */
@Service
@Slf4j
public class OperationServiceImpl implements OperationService {

    @Resource
    private OperationMapper operationMapper;
    private IdUtil idUtil = new IdUtil(1, 1);

    @Override
    @Async("gatewayLogAsync")
    @HystrixCommand(fallbackMethod = "addOperationLogFail", commandProperties = {
            @HystrixProperty(name = "execution.isolation.thread.timeoutInMilliseconds", value = "3000")
    })
    public void addOperationLog(String userName, String visitorService, String visitorUrl, String visitorMethod, String remoteAddress) {
        OperationLog operationLog = new OperationLog();
        operationLog.setId(String.valueOf(idUtil.nextId()));
        operationLog.setUserName(userName);
        operationLog.setVisitorService(visitorService);
        operationLog.setVisitorUrl(visitorUrl);
        operationLog.setVisitorMethod(visitorMethod);
        operationLog.setRemoteAddress(remoteAddress);
        log.info("异步执行日志存入");
        operationMapper.addOperationLog(operationLog);
    }

    public void addOperationLogFail(String userName, String visitorService, String visitorUrl, String visitorMethod, String remoteAddress) {
        log.error("当前日志存储异常或3秒内还未存储成功，自动熔断");
    }

}
