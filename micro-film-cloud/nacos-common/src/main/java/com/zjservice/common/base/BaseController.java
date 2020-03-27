package com.zjservice.common.base;

import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;

/**
 * @author zj
 * @Date Create in 2020/3/25 0025 22:28
 * @Description detail:
 */
public class BaseController {

    public RespResult globalHystrix(){
        return new RespResult(RespCode.CODE_HYSTRIX);
    }

}
