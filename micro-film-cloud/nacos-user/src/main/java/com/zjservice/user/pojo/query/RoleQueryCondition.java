package com.zjservice.user.pojo.query;

import com.zjservice.common.entity.BaseQueryCondition;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @date 2020/2/11 18:59
 * @Description
 */
@Data
@ApiModel(description = "分页查询条件的扩展实体类")
public class RoleQueryCondition extends BaseQueryCondition implements Serializable {

    @ApiModelProperty(value = "角色ID[用于查询指定角色信息]", position = 3)
    private String roleId;

}
