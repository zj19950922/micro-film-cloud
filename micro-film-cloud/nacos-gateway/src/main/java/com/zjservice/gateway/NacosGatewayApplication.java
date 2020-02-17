package com.zjservice.gateway;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * @author zj
 * @date 2019/12/25 16:29
 * @Description 网关路由/权限认证服务，记录用户的操作记录
 */
@SpringBootApplication
@EnableDiscoveryClient
@RefreshScope
@EnableAsync
@MapperScan("com.zjservice.gateway.mapper")
public class NacosGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosGatewayApplication.class, args);
    }

}
