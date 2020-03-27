package com.zjservice.user.config;

import com.zjservice.user.interceptor.UserInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

/**
 * @author zj
 * @date 2019/10/17 18:29
 * @Description 前后端分离的跨域配置，以及swagger在线文档的跨域配置
 */
@Configuration
public class GlobalCorsConfig implements WebMvcConfigurer {

    /**
     * 解决在springboot的拦截器不能注入redisTemplate
     * 由于拦截器加载的时间点在springContext之前，所以在拦截器中注入redisTemplate会为null
     * 所以，就让拦截器执行的时候实例化拦截器Bean，在拦截器配置类里面先实例化拦截器，然后再获取
     * @return UserInterceptor
     */
    @Bean
    public UserInterceptor getUserInterceptor(){
        return new UserInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册TestInterceptor拦截器
        InterceptorRegistration registration = registry.addInterceptor(getUserInterceptor());
        registration.addPathPatterns("/**");
        registration.excludePathPatterns(
                "/**/*.html",
                "/**/*.js",
                "/**/*.css",
                "/**/*.woff",
                "/**/*.ttf",
                "/swagger-resources/**",
                "/webjars/**",
                "/v2/**",
                "/swagger-ui.html/**",
                "/auth/login",
                "/auth/logout",
                "/auth/info"
        );
    }

    /**
     * 跨域配置后swagger2可能不能访问，需要增加如下配置
     * @param registry 注册
     */
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/");

    }

    //    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        //设置允许跨域的路径
//        registry.addMapping("/**")
//                //设置允许跨域请求的域名
//                .allowedOrigins("*")
//                //是否允许证书 不再默认开启
//                .allowCredentials(true)
//                //设置允许的方法
//                .allowedMethods("*")
//                //跨域允许时间
//                .maxAge(3600);
//    }

}
