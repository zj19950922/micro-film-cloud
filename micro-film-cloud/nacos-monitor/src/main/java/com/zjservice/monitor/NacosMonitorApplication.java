package com.zjservice.monitor;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.cloud.netflix.hystrix.dashboard.EnableHystrixDashboard;

/**
 * @author zj
 * @Date Create in 2020/3/5 0005 18:24
 * @Description detail:项目监控模块启动类
 */
@EnableDiscoveryClient
@SpringBootApplication
@RefreshScope
@EnableAdminServer
@EnableHystrixDashboard
public class NacosMonitorApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosMonitorApplication.class, args);
    }

}
