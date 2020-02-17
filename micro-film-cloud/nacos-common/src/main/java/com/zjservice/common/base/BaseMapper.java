package com.zjservice.common.base;

import com.zjservice.common.entity.Cascade;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 17:19
 * @Description 菜单管理mapper层
 */
public interface BaseMapper<T, Query> {

    /**
     * 通用获取可用的父级级联表
     * @return 级联表
     */
    List<Cascade> queryCascade();

    /**
     * 通用信息新增
     * @param t 删除信息
     * @return 新增是否成功
     */
    int insert(T t);

    /**
     * 通用信息修改
     * @param t 参数信息
     * @return 修改是否成功
     */
    int modify(T t);

    /**
     * 查询当前id下是否存在子级
     * @param id 查询条件
     * @return 是否有子级
     */
    int queryChild(String id);

    /**
     * 通用删除
     * @param id 删除条件
     * @return 是否删除成功
     */
    int delete(String id);

    /**
     * 分页条件总数查询
     * @param queryCondition 条件参数对象
     * @return 条件查询总数
     */
    int queryTotal(@Param("queryCondition") Query queryCondition);

    /**
     * 分页条件查询
     * @param queryCondition 条件参数对象
     * @return 条件查询结果集
     */
    List<T> query(@Param("queryCondition") Query queryCondition);

}
