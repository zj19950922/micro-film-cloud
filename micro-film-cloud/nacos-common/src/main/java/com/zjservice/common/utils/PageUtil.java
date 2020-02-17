package com.zjservice.common.utils;

import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @date 2019/12/30 9:17
 * @Description
 */
@Data
public class PageUtil implements Serializable {

    private int total;
    private Object data;

}
