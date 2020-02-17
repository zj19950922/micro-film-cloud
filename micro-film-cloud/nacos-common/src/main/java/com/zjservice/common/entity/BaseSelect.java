package com.zjservice.common.entity;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @date 2020/2/12 23:25
 * @Description
 */
@Data
public class BaseSelect implements Serializable {

    private String value;
    private String label;

}
