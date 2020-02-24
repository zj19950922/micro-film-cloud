package com.zjservice.user.service;

import com.zjservice.common.base.BaseService;
import com.zjservice.common.entity.RespResult;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.pojo.query.OrgQueryCondition;

/**
 * @author zj
 * @date 2020/2/11 19:55
 * @Description
 */
public interface OrgService extends BaseService<Org, OrgQueryCondition> {

    /**
     * 查询级联的机构信息
     * @return 级联表
     * @param orgId 机构ID
     */
    RespResult queryOrgCascade(String orgId);

}
