package com.zjservice.test;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zj
 * @date 2020/2/10 0:50
 * @Description
 */
@EnableDiscoveryClient
@SpringBootApplication
@RefreshScope
@RestController
@RequestMapping("/test")
public class TestApplication {

    public static void main(String[] args) {
        SpringApplication.run(TestApplication.class, args);
    }
    @Value("${test.value}")
    private String value;

    @GetMapping("/value")
    public String getValue(){
        return value;
    }

}
