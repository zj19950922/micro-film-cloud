package com.zjservice.user.mapper.serviceimpl;

import com.zjservice.common.entity.Cascade;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.CascadeUtil;
import com.zjservice.common.utils.IdUtil;
import com.zjservice.common.utils.JsonTreeUtil;
import com.zjservice.user.mapper.OrgMapper;
import com.zjservice.user.pojo.org.Org;
import com.zjservice.user.pojo.org.OrgTree;
import com.zjservice.user.pojo.query.OrgQueryCondition;
import com.zjservice.user.service.OrgService;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/12 13:14
 * @Description
 */
@Service
public class OrgServiceImpl implements OrgService {

    @Resource
    private OrgMapper orgMapper;
    /** 使用雪花算法获取唯一18位纯数字ID*/
    private IdUtil idUtil = new IdUtil(1, 2);

    @Override
    public RespResult queryCascade() {
        // 获取可用的上级机构级联
        List<Cascade> cascade = orgMapper.queryCascade();
        List<Cascade> data = CascadeUtil.getCascade(cascade, "0");
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    public RespResult insert(Org org) {
        // 对菜单标题和名称进行验重
        int checkName = orgMapper.checkRepeat(org.getOrgName(), null);
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "机构名称重复，新增失败");
        }
        org.setOrgId(idUtil.nextId());
        int result = orgMapper.insert(org);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "新增机构成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "新增机构失败");
    }

    @Override
    public RespResult delete(String param) {
        // 获取当前机构是否存在子机构
        int child = orgMapper.queryChild(param);
        if (child > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "当前机构存在下级机构，不可删除");
        }
        // 当前机构是否已经赋值给用户
        int check = orgMapper.queryOrgToUser(param);
        if (check > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "当前机构正在使用，不可删除");
        }
        int result = orgMapper.delete(param);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "删除机构成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "删除机构失败，当前机构不可操作");
    }

    @Override
    public RespResult modify(Org org) {
        // 对机构名称进行验重
        int checkName =orgMapper.checkRepeat(org.getOrgName(), String.valueOf(org.getOrgId()));
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "机构名称重复，修改失败");
        }
        int result = orgMapper.modify(org);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "修改机构成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "修改机构失败，当前机构不可操作");
    }

    @Override
    public RespResult query(OrgQueryCondition queryCondition) {
        return null;
    }

    @Override
    public RespResult queryOrgCascade(String orgId) {
        if(!StringUtils.isEmpty(orgId)){
            List<OrgTree> dataList = orgMapper.queryOrgCascade(orgId);
            return new RespResult(RespCode.SUCCESS, dataList);
        }else{
            List<OrgTree> dataList = orgMapper.queryOrgCascade(orgId);
            JsonTreeUtil<OrgTree> util = new JsonTreeUtil<>();
            List<OrgTree> list = util.getTree(dataList, "0");
            return new RespResult(RespCode.SUCCESS, list);
        }
    }

}
