package com.zjservice.gateway.mapper;

import com.zjservice.gateway.pojo.OperationLog;
import org.apache.ibatis.annotations.Mapper;

/**
 * @author zj
 * @date 2020/1/6 9:33
 * @Description
 */
@Mapper
public interface OperationMapper {

    /**
     * 访问者日志记录
     * @param operationLog 操作日志
     */
    void addOperationLog(OperationLog operationLog);

}
