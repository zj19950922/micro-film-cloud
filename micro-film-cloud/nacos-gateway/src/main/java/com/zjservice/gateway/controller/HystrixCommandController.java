package com.zjservice.gateway.controller;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author zj
 * @date 2019/12/25 16:49
 * @Description 服务熔断降级
 */
@RestController
public class HystrixCommandController {

    /**
     * 服务器熔断降级
     */
    @RequestMapping("/hystrixTimeOut")
    public RespResult hystrixTimeOut(){
        return new RespResult(RespCode.CODE_HYSTRIX);
    }

}
