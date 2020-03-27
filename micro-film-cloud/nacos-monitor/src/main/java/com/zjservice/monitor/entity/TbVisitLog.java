package com.zjservice.monitor.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zjservice.common.entity.BaseQueryCondition;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;
import java.io.Serializable;

/**
 * (TbVisitLog)实体类
 *
 * @author makejava
 * @since 2020-03-06 17:13:34
 */
@Data
@ApiModel(description = "访问日志条件查询")
public class TbVisitLog extends BaseQueryCondition implements Serializable {
    private static final long serialVersionUID = 305400732993551082L;

    @ApiModelProperty(value = "Id", position = 1)
    private String id;

    /**
    * 用户名
    */
    @ApiModelProperty(value = "用户名", position = 1)
    private String userName;
    /**
    * 访问时间
    */
    @ApiModelProperty(value = "访问时间", position = 2)
    @JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
    private Date visitorTime;
    /**
    * 请求服务
    */
    @ApiModelProperty(value = "请求服务", position = 3)
    private String visitorService;
    /**
    * 请求API资源
    */
    @ApiModelProperty(value = "请求API资源", position = 4)
    private String visitorUrl;
    /**
    * 请求方式
    */
    @ApiModelProperty(value = "请求方式", position = 5)
    private String method;
    /**
    * 访问者远程地址
    */
    @ApiModelProperty(value = "访问者远程地址", position = 6)
    private String remoteAddress;

}