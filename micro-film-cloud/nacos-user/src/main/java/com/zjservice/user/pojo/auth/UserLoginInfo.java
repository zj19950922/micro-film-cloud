package com.zjservice.user.pojo.auth;

import com.zjservice.common.entity.BaseSelect;
import com.zjservice.user.pojo.menu.MenuTree;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/13 22:09
 * @Description
 */
@Data
public class UserLoginInfo implements Serializable {

    private String userName;
    private String userId;
    private String token;
    private List<BaseSelect> roleList;
    private boolean status;

}
