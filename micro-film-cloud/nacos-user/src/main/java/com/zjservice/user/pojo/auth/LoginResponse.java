package com.zjservice.user.pojo.auth;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @Date Create in 2020/3/25 0025 20:35
 * @Description detail:
 */
@Data
public class LoginResponse implements Serializable {

    private String userId;
    private Boolean status = false;
    private String image;

}
