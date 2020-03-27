package com.zjservice.user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.circuitbreaker.EnableCircuitBreaker;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;

/**
 * @author zj
 * @date 2020/2/11 9:41
 * @Description 用户权限管理模板启动类
 */
@EnableDiscoveryClient
@SpringBootApplication
@RefreshScope
@EnableCircuitBreaker
public class NacosUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosUserApplication.class, args);
    }

}
