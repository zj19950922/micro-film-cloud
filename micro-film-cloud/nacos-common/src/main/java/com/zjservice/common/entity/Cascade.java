package com.zjservice.common.entity;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 20:04
 * @Description
 */
@Data
public class Cascade implements Serializable {

    private String value;
    private String label;
    private String pId;
    private List<Cascade> children = null;

}
