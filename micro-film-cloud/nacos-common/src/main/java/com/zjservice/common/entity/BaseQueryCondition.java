package com.zjservice.common.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @date 2020/2/11 17:45
 * @Description
 */
@Data
@ApiModel(description = "分页查询条件的基础实体类")
public class BaseQueryCondition implements Serializable {

    @ApiModelProperty(value = "页数[从0开始]", position = 1)
    private int page;
    @ApiModelProperty(value = "每页数据量", position = 2)
    private int size;

}
