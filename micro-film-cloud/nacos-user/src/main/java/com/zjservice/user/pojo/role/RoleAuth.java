package com.zjservice.user.pojo.role;

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
@ApiModel(description = "角色权限实体类")
public class RoleAuth {

    @ApiModelProperty(value = "角色权限集合", position = 1)
    private List<String> menuId;
    @ApiModelProperty(value = "角色ID", position = 2)
    private String roleId;

}
