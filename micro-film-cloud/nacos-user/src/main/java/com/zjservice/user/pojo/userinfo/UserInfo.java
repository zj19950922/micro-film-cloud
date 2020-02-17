package com.zjservice.user.pojo.userinfo;

import java.io.Serializable;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * @author zj
 * @date 2020/2/11 9:41
 * @Description
 */
@Setter
@Getter
@ToString
public class UserInfo implements Serializable {

	private static final long serialVersionUID =  4797434208987059768L;

	/**
	 * 用户ID(user表触发生成)
	 */
	private Long userId;

	/**
	 * 联系方式-手机
	 */
	private String phone;

	/**
	 * 地址
	 */
	private String address;

	/**
	 * 头像
	 */
	private String image;

	/**
	 * 邮件
	 */
	private String mail;

}
