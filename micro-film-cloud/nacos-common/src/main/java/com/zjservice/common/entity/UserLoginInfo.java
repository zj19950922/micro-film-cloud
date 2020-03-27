package com.zjservice.common.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

/**
 * @author zj
 * @date 2020/2/13 22:09
 * @Description
 */
@Data
public class UserLoginInfo implements Serializable {

    /** 用户名*/
    private String userName;
    /** 用户ID*/
    private String userId;
    /** 登录token*/
    private String token;
    /** 角色集合*/
    private List<BaseSelect> roleList;
    /** 用户启用状态*/
    private boolean status;
    /** 用户头像地址*/
    private String imageUrl;
    /** 用户权限集合*/
    private Set<String> permissions;

}
