package com.zjservice.file.pojo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * @author zj
 * @Date Create in 2020/3/16 0016 20:15
 * @Description detail:
 */
@Data
@ApiModel(description = "删除文件参数实体类")
public class FileDelete implements Serializable {

    @ApiModelProperty(value = "文件名称(需要携带前缀)", position = 1)
    private String fileName;
    @ApiModelProperty(value = "存储桶名称", position = 2)
    private String bucketName;

}
