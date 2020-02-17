package com.zjservice.user.mapper.serviceimpl;

import com.zjservice.common.entity.BaseSelect;
import com.zjservice.common.entity.Cascade;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.utils.CascadeUtil;
import com.zjservice.common.utils.IdUtil;
import com.zjservice.common.utils.PageUtil;
import com.zjservice.user.mapper.RoleMapper;
import com.zjservice.user.pojo.query.RoleQueryCondition;
import com.zjservice.user.pojo.role.Role;
import com.zjservice.user.service.RoleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/12 13:14
 * @Description
 */
@Service
public class RoleServiceImpl implements RoleService {

    @Resource
    private RoleMapper roleMapper;
    /** 使用雪花算法获取唯一18位纯数字ID*/
    private IdUtil idUtil = new IdUtil(1, 3);


    @Override
    public RespResult queryCascade() {
        return null;
    }

    @Override
    public RespResult insert(Role role) {
        // 对角色名称进行验重
        int checkName = roleMapper.checkRepeat(role.getRoleName(), null);
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "角色名称已存在，新增失败");
        }
        role.setRoleId(idUtil.nextId());
        int result = roleMapper.insert(role);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "新增角色信息成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "新增角色信息失败");
    }

    @Override
    public RespResult delete(String param) {
        int result = roleMapper.delete(param);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "删除角色信息成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "删除角色信息失败，当前角色不可操作");
    }

    @Override
    public RespResult modify(Role role) {
        // 对机构名称进行验重
        int checkName =roleMapper.checkRepeat(role.getRoleName(), String.valueOf(role.getRoleId()));
        if (checkName > 0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "角色名称重复，修改失败");
        }
        int result = roleMapper.modify(role);
        if (result > 0){
            return new RespResult(RespCode.SUCCESS, "修改角色信息成功");
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "修改角色信息失败，当前角色不可操作");
    }

    @Override
    public RespResult query(RoleQueryCondition queryCondition) {
        queryCondition.setPage(queryCondition.getPage()*queryCondition.getSize());
        queryCondition.setSize((queryCondition.getPage()+1)*queryCondition.getSize());
        int total = roleMapper.queryTotal(queryCondition);
        List<Role> data = roleMapper.query(queryCondition);
        PageUtil util = new PageUtil();
        util.setTotal(total);
        util.setData(data);
        return new RespResult(RespCode.SUCCESS, util);
    }

    @Override
    public RespResult queryRoleForSelect() {
        List<BaseSelect> data = roleMapper.queryRoleForSelect();
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    public RespResult queryAuthToRole(String roleId) {
        List<Cascade> cascades;
        if (StringUtils.isEmpty(roleId)){
            // roleId为""或者为null，则查询全部可用的权限菜单
            cascades = roleMapper.queryAllMenuAuth();
        }else{
            // 获取当前角色的菜单权限
            cascades = roleMapper.queryAuthToRole(roleId);
        }
        List<Cascade> data = CascadeUtil.getCascade(cascades, "0");
        return new RespResult(RespCode.SUCCESS, data);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public RespResult modifyAuthToRole(List<String> list, String roleId) {
        // 角色删除全部菜单
        roleMapper.deleteAuthToRole(roleId, null);
        // 菜单权限授予角色
        if (list.size() > 0){
            int result = roleMapper.insertAuthToRole(list, roleId);
            if (result > 0){
                return new RespResult(RespCode.SUCCESS, "角色授权成功");
            }
            return new RespResult(RespCode.CODE_ENUM_FAIL, "角色授权失败");
        }
        return new RespResult(RespCode.SUCCESS, "角色授权成功");
    }

}
