package com.zjservice.user.lb;

import org.springframework.cloud.client.ServiceInstance;

import java.util.List;

/**
 * @author zj
 * @Date Create in 2020/3/22 0022 20:41
 * @Description detail:自定义轮询算法
 */
public interface LoadBalancer {

    /**
     * 获取服务实例
     * @param serviceInstances 服务实例集合
     * @return 服务实例
     */
    ServiceInstance instances(List<ServiceInstance> serviceInstances);

}
