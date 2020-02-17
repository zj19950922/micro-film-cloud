package com.zjservice.common.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/12 9:32
 * @Description
 */
@Data
public class BaseCascade<T> implements Serializable {

    private String value;
    private String parentId;
    private List<T> children;

}
