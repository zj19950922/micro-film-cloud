package com.zjservice.gateway.service;

/**
 * @author zj
 * @date 2020/1/6 9:48
 * @Description
 */
public interface OperationService {

    /**
     * 用户操作日志记录
     * @param userName 用户名
     * @param visitorService 请求服务
     * @param visitorUrl 请求API资源
     * @param visitorMethod 请求方式
     * @param remoteAddress 访问者远程地址
     */
    void addOperationLog(String userName, String visitorService, String visitorUrl, String visitorMethod, String remoteAddress);

}
