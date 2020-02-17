package com.zjservice.user.pojo.auth;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.io.Serializable;

/**
 * @author zj
 * @date 2020/2/13 21:32
 * @Description
 */
@Data
@ApiModel(description = "登录实体类")
public class AuthLogin implements Serializable {

    @ApiModelProperty(value = "用户名", position = 1, required = true)
    private String userName;
    @ApiModelProperty(value = "用户密码", position = 2, required = true)
    private String password;

}
