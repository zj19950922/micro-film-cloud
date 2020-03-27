package com.zjservice.user.interceptor;

import org.slf4j.Logger;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
/**
 * @author zj
 * @date 2020/2/27 21:21
 * @Description 用户中心拦截器
 */
public class InterceptorReturnMsg {

    static void returnJson(Logger log, HttpServletResponse response, String str){
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html; charset=utf-8");
        try (PrintWriter writer = response.getWriter()) {
            writer.print(str);
        } catch (IOException e) {
            log.error("Response Exception:[{}]", e.getMessage(), e);
        }
    }

}
