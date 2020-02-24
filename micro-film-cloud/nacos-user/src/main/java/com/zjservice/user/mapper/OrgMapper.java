package com.zjservice.user.mapper;

import com.zjservice.common.base.BaseMapper;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.pojo.org.OrgTree;
import com.zjservice.user.pojo.query.OrgQueryCondition;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * @author zj
 * @date 2020/2/12 13:14
 * @Description
 */
@Mapper
public interface OrgMapper extends BaseMapper<Org, OrgQueryCondition> {

    /**
     * 机构名称验重
     * @param name 机构名称
     * @param orgId 机构Id
     * @return 验重结果
     */
    int checkRepeat(@Param("name") String name, @Param("orgId") String orgId);

    /**
     * 查询机构级联数据(不分页)
     * @return 级联数据
     * @param orgId 机构ID
     */
    List<OrgTree> queryOrgCascade(@Param("orgId") String orgId);

    /**
     * 当前机构是否已经赋值给用户
     * @param param 机构ID
     * @return 是否
     */
    int queryOrgToUser(String param);
}
