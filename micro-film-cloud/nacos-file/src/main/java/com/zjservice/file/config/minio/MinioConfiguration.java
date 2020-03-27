package com.zjservice.file.config.minio;

import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.annotation.Resource;

/**
 * @author zj
 * @Date Create in 2020/3/15 0015 21:52
 * @Description detail:
 */
@Configuration
public class MinioConfiguration {
    @Resource
    private MinioProperties minioProp;

    @Bean
    public MinioClient minioClient() throws InvalidPortException, InvalidEndpointException {
        return new MinioClient(minioProp.getUrl(),minioProp.getAccessKey(),minioProp.getSecretKey());
    }

}
