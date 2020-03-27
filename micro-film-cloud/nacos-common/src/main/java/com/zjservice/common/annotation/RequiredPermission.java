package com.zjservice.common.annotation;

import java.lang.annotation.*;

/**
 * @author zj
 * @Date Create in 2020/3/25 0025 21:40
 * @Description detail:
 */
@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
@Documented
public @interface RequiredPermission {
    String value();
}
