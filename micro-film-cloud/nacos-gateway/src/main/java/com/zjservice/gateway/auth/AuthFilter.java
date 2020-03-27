package com.zjservice.gateway.auth;

import com.alibaba.fastjson.JSONObject;
import com.zjservice.common.entity.UserLoginInfo;
import com.zjservice.common.utils.JwtUtil;
import com.zjservice.gateway.service.OperationService;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.support.ServerWebExchangeUtils;
import org.springframework.core.Ordered;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.annotation.Resource;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author zj
 * @date 2019/12/25 16:33
 * @Description 权限过滤器，进行鉴权，操作日志同步到数据库
 */
@Component
@Slf4j
@Data
public class AuthFilter implements GlobalFilter, Ordered {
    private static final String[] SKIP_URL = {"login", "logout", "regist", "api-docs", "api-docs-ext"};

    /** 跳过不需要验证的请求地址*/
    @Value("${auth.skip.urls}")
    private String[] skipAuthUrls;
    /** 跳过不需要验证的请求方式*/
    @Value("${auth.skip.requestMethods}")
    private String[] skipAuthRequestMethods;

    /** 让redisTemplate成为该类的私有静态属性，解决注入问题*/
    private static RedisTemplate<String, UserLoginInfo> redisTemplate;
    @Resource
    public void setRedisTemplate(RedisTemplate<String, UserLoginInfo> redisTemplate) {
        AuthFilter.redisTemplate = redisTemplate;
    }

    /** 让operationService成为该类的私有静态属性，解决注入问题*/
    private static OperationService operationService;
    @Resource
    public void setOperationService(OperationService operationService) {
        AuthFilter.operationService = operationService;
    }

    @Override
    public int getOrder() {
        // 返回值越小，过滤器级别越高
        return -100;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // 访问路径
        String url = exchange.getRequest().getURI().getPath();
        String method = exchange.getRequest().getMethodValue();
        String remoteAddress = null;
        if (exchange.getRequest().getRemoteAddress() != null){
            remoteAddress = exchange.getRequest().getRemoteAddress().toString();
        }
        // 跳过不需要验证的包含的路径
        for (String skipUrl : SKIP_URL){
            if (url.contains(skipUrl)){
                return chain.filter(exchange);
            }
        }
        for (String getUrl : skipAuthUrls){
            if (url.equals(getUrl)){
                return chain.filter(exchange);
            }
        }
        // 从请求头中取出token
        String token = exchange.getRequest().getHeaders().getFirst(JwtUtil.HEADER_AUTH);
        // 判判断token是否存在，不存在则返回未认证
        ServerHttpResponse originalResponse = exchange.getResponse();
        originalResponse.setStatusCode(HttpStatus.OK);
        originalResponse.getHeaders().add("Content-Type", "application/json;charset=UTF-8");
        if (token == null || token.isEmpty()) {
            DataBuffer buffer = getResponseData(20022, "认证失败，请登录", originalResponse);
            return originalResponse.writeWith(Flux.just(buffer));
        }
        // 验证token
        Map<String, String> userMap = JwtUtil.validateToken(token);
        if (userMap == null || userMap.size() < 1) {
            DataBuffer buffer = getResponseData(20021, "认证失败，非法token", originalResponse);
            return originalResponse.writeWith(Flux.just(buffer));
        }
        // 从当前已认证的token中获取userName
        String userName = userMap.get("userName");
        // 获取redis中对应用户的数据
        UserLoginInfo userMsg = redisTemplate.opsForValue().get(userName+"_info");
        // 判断redis中的用户登录信息是否存在
        if (userMsg == null){
            DataBuffer buffer = getResponseData(20020, "认证失败，用户登录已失效", originalResponse);
            return originalResponse.writeWith(Flux.just(buffer));
        }
        log.info("获取到的用户信息：{}", userMsg);
        // 比较redis中的token和当前传递的token 是否相同
        String tokenForRedis = userMsg.getToken();
        if (!token.equals(tokenForRedis)){
            DataBuffer buffer = getResponseData(20019, "认证失败，无效token", originalResponse);
            return originalResponse.writeWith(Flux.just(buffer));
        }
        // 认证通过后，判断当前redis的有效时长，小于5min，将时间延长至30min
        Long expireTime = redisTemplate.getExpire(userName+"_info", TimeUnit.MINUTES);
        if (expireTime!=null && expireTime <= 5){
            redisTemplate.expire(userName+"_info",30, TimeUnit.MINUTES);
        }if (expireTime == null){
            redisTemplate.expire(userName+"_info",30, TimeUnit.MINUTES);
        }
        // 记录当前访问者日志
        Route gatewayUrl = exchange.getRequiredAttribute(ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR);
        log.info("用户:{} 访问服务:{} 访问资源:{} 请求方式:{} 访问者远程地址:{}",
                userName,
                gatewayUrl.getId(),
                url,
                method,
                remoteAddress);
        // 异步执行日志存储
        operationService.addOperationLog(userName, gatewayUrl.getId(), url, method, remoteAddress);
        // 将现在的request，添加当前用户名称，将其传递到下层服务中
        ServerHttpRequest mutableReq = exchange.getRequest().mutate().header("userName", userName).build();
        ServerWebExchange mutableExchange = exchange.mutate().request(mutableReq).build();
        return chain.filter(mutableExchange);
    }

    /**
     * 设定返回值
     * @param code 响应代码
     * @param msg 响应信息
     * @param originalResponse 响应对象
     * @return 返回缓冲值
     */
    private DataBuffer getResponseData(int code, String msg, ServerHttpResponse originalResponse) {
        JSONObject data1 = new JSONObject();
        data1.put("flag", false);
        data1.put("code", code);
        data1.put("msg", msg);
        data1.put("data", null);
        byte[] response = (data1.toString()).getBytes(StandardCharsets.UTF_8);
        return originalResponse.bufferFactory().wrap(response);
    }
}
