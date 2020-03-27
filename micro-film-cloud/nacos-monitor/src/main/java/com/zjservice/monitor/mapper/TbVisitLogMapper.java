package com.zjservice.monitor.mapper;

import com.zjservice.monitor.entity.TbVisitLog;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * (TbVisitLog)表数据库访问层
 *
 * @author makejava
 * @since 2020-03-06 17:13:36
 */
@Mapper
public interface TbVisitLogMapper {

    /**
     * 通过实体作为筛选条件查询
     * @param tbVisitLog 实例对象
     * @return 对象列表
     */
    List<TbVisitLog> queryAll(TbVisitLog tbVisitLog);

    /**
     * 通过主键删除数据
     * @param userName 用户名称
     * @return 影响行数
     */
    int deleteById(String userName);

    /**
     * 通过实体作为筛选条件查询
     * @param queryCondition 实例对象
     * @return 对象列表
     */
    int queryTotal(TbVisitLog queryCondition);
}