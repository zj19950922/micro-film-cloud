package com.zjservice.gateway.pojo;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @date 2020/1/6 9:36
 * @Description
 */
@Data
public class OperationLog implements Serializable {

    /** 用户名*/
    private String userName;
    /** 请求服务*/
    private String visitorService;
    /** 请求API资源*/
    private String visitorUrl;
    /** 请求方式*/
    private String visitorMethod;
    /** 访问者远程地址*/
    private String remoteAddress;

}
