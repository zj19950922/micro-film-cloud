package com.zjservice.user.pojo.user;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(description = "角色信息实体类")
public class User implements Serializable {

	private static final long serialVersionUID =  1235267295980689378L;

	/**
	 * 用户ID
	 */
	@ApiModelProperty(value = "用户ID[后端自动生成，修改需要携带]", position = 1)
	private String userId;

	/**
	 * 用户名(唯一)
	 */
	@ApiModelProperty(value = "用户名(验重)", position = 2, required = true)
	private String userName;

	/**
	 * 用户密码
	 */
	@ApiModelProperty(value = "用户密码", position = 3, required = true)
	private String password;

	/**
	 * 用户状态[1启用,0停用]
	 */
	@ApiModelProperty(value = "用户状态[true启用,false停用]", position = 4, required = true)
	private Boolean status;

	/**
	 * 删除状态[0未删除,1已删除]
	 */
	@ApiModelProperty(value = "删除状态[false未删除,true已删除]", position = 5, required = true)
	private Boolean deleteStatus;

	/**
	 * 机构部门ID(机构表的外键)
	 */
	@ApiModelProperty(value = "机构部门ID(机构表的外键)", position = 6)
	private String orgId;

	/**
	 * 机构部门
	 */
	@ApiModelProperty(value = "机构部门", position = 6, hidden = true)
	private String orgName;

	/**
	 * 是否可操作[0不可操作,1可操作]
	 */
	@ApiModelProperty(value = "是否可操作[false不可操作,true可操作]", position = 7, required = true)
	private Boolean operation;

	/**
	 * 创建/修改时间
	 */
	@ApiModelProperty(value = "创建/修改时间", position = 8, hidden = true)
	@JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;

	/**
	 * 备注
	 */
	@ApiModelProperty(value = "备注", position = 9)
	private String remark;

}
