package com.zjservice.user.pojo.visitlog;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import java.util.Date;

/**
 * @author zj
 * @date 2020/2/11 9:41
 * @Description
 */
@Setter
@Getter
@ToString
public class VisitLog implements Serializable {

	private static final long serialVersionUID =  4300768294256452663L;

	/**
	 * 用户名
	 */
	private String userName;

	/**
	 * 访问时间
	 */
	private Date visitorTime;

	/**
	 * 请求服务
	 */
	private String visitorService;

	/**
	 * 请求API资源
	 */
	private String visitorUrl;

	/**
	 * 请求方式
	 */
	private String method;

	/**
	 * 访问者远程地址
	 */
	private String remoteAddress;

}
