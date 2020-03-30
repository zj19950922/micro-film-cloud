package com.zjservice.common.entity;

/**
 * @author zj
 * @date 2020/2/7 12:16
 * @Description 响应枚举
 */
public enum RespCode {

    /** 配置返回值*/
    SUCCESS(true, 10000, "请求成功"),
    LOGOUT(true, 10001, "用户已注销此次登录"),
    LOGIN(true, 10002, "登录成功"),
    API(true, 10003, "调用Api成功"),
    REMOTE_SUCCESS(false, 10004, "远程调用成功"),
    SEND_SUCCESS(false, 10005, "数据传输成功"),

    ACCESS_ERROR(false, 20000, "权限不足"),
    FORBIDDEN(false, 20001, "禁止访问"),
    METHOD_NOT_ALLOWD(false, 20002, "不支持该请求方式"),
    CONFLICT(false, 20003, "出现冲突"),
    LOGIN_ERROR(false, 20005, "登录失败，用户名或密码错误"),
    REMOTE_ERROR(false, 20006, "远程调用失败"),
    REPEAT_ERROR(false, 20007, "重复操作"),
    SEND_ERROR(false, 20008, "数据传输失败"),
    OUTOFQUEUE(false, 20009, "超出等待队列"),
    TIMEOUT(false, 20010, "请求超时，请稍后重试"),
    CODE_HYSTRIX(false, 20011, "服务繁忙或者服务端发生异常，请稍后再试"),
    REMOTE_CONNECT_FAIL(false, 20013, "远程连接失败"),
    CODE_ENUM_FAIL(false, 20014, "请求失败"),
    EXCEPTION(false, 20015, "请求处理异常，请稍后再试"),
    REJECT(false, 20016,"服务器拒绝请求"),
    SERVICE_NO_ENABLE(false, 20018, "服务不可用"),
    TOKEN_NO_USE(false, 20019,"登录Token过期"),
    USER_NO_LOGIN(false, 20020,"用户未登录或登录信息失效"),
    ILLEGAL_TOKEN(false, 20021, "非法token"),
    MISS_TOKEN(false, 20022, "缺失token"),
    MISS_PARAM(false, 20023, "缺少必要参数"),
    API_FORBIDDEN(false, 20024, "API请求拒绝访问"),
    NO_PERMISSION(false, 20025, "无权限访问"),
    ;

    private boolean flag;
    private Integer code;
    private String msg;

    RespCode(boolean flag, Integer code, String msg) {
        this.flag = flag;
        this.code = code;
        this.msg = msg;
    }

    public boolean isFlag() {
        return flag;
    }

    public Integer getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
