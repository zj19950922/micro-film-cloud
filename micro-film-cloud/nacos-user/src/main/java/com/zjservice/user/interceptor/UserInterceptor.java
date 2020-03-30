package com.zjservice.user.interceptor;

import com.zjservice.common.annotation.RequiredPermission;
import com.zjservice.common.entity.BaseSelect;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.common.entity.UserLoginInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Set;

/**
 * @author zj
 * @date 2020/2/27 21:21
 * @Description 用户中心拦截器,实现API鉴权
 */
@Slf4j
public class UserInterceptor implements HandlerInterceptor {

    @Resource
    private RedisTemplate<String, UserLoginInfo> redisTemplate;
    /** 跳过不需要验证的角色*/
    @Value("${auth.skip.roles}")
    private List<String> skipAuthRoles;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        // 从 http 请求头中取出 userName
        String userName = request.getHeader("userName");
        if (StringUtils.isEmpty(userName)){
            response.setStatus(200);
            RespResult result = new RespResult(RespCode.API_FORBIDDEN);
            InterceptorReturnMsg.returnJson(log,response,result.toString());
            return false;
        }
        // 获取redis中对应用户的数据
        UserLoginInfo userInfo = redisTemplate.opsForValue().get(userName+"_info");
        // 判断redis中的用户登录信息是否存在
        if (userInfo == null){
            response.setStatus(200);
            RespResult result = new RespResult(RespCode.USER_NO_LOGIN);
            InterceptorReturnMsg.returnJson(log,response,result.toString());
            return false;
        }
        // 获取当前用户已有的角色集合
        List<BaseSelect> roleList = userInfo.getRoleList();
        for (BaseSelect roleInfo : roleList){
            String value = roleInfo.getValue();
            if (skipAuthRoles.contains(value)){
                return true;
            }
        }
        // 获取当前用户已有的权限
        Set<String> permissions = userInfo.getPermissions();
        // 对接口进行鉴权
        if (this.hasPermission(handler, permissions)) {
            return true;
        }
        RespResult result = new RespResult(RespCode.NO_PERMISSION);
        response.setStatus(200);
        InterceptorReturnMsg.returnJson(log,response,result.toString());
        return false;
    }

    private boolean hasPermission(Object handler, Set<String> permissions) {
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            // 获取方法上的注解
            RequiredPermission requiredPermission = handlerMethod.getMethod().getAnnotation(RequiredPermission.class);
            // 如果方法上的注解为空 则获取类的注解
            if (requiredPermission == null) {
                requiredPermission = handlerMethod.getMethod().getDeclaringClass().getAnnotation(RequiredPermission.class);
            }
            // 如果标记了注解，则判断权限
            if (requiredPermission != null && !StringUtils.isEmpty(requiredPermission.value())) {
                // redis或数据库 中获取该用户的权限信息 并判断是否有权限
                if (CollectionUtils.isEmpty(permissions) || permissions.size() <= 0){
                    return false;
                }
                return permissions.contains(requiredPermission.value());
            }
        }
        return true;
    }

}
