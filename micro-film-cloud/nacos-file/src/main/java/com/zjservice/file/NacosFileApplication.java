package com.zjservice.file;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;

/**
 * @author zj
 * @Date Create in 2020/3/15 0015 18:16
 * @Description detail:文件对象存储系统模块启动类
 */
@EnableDiscoveryClient
@SpringBootApplication
@RefreshScope
public class NacosFileApplication {

    public static void main(String[] args) {
        SpringApplication.run(NacosFileApplication.class, args);
    }

}
