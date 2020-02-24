package com.zjservice.user.pojo.user;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/23 17:43
 * @Description
 */
@Data
@ApiModel(description = "用户角色实体类")
public class UserRole {

    @ApiModelProperty(value = "用户角色集合", position = 1)
    private List<String> roles;
    @ApiModelProperty(value = "用户ID", position = 2)
    private String userId;

}
