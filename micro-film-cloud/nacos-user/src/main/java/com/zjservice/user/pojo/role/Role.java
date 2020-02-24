package com.zjservice.user.pojo.role;

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
@SuppressWarnings("AlibabaClassNamingShouldBeCamel")
@Setter
@Getter
@ToString
@ApiModel(description = "角色信息实体类")
public class Role implements Serializable {

	private static final long serialVersionUID =  3915887517965655597L;

	/**
	 * 角色ID
	 */
	@ApiModelProperty(value = "角色ID[后端自动生成，修改需要携带]", position = 1)
	private String roleId;

	/**
	 * 角色名称(唯一)
	 */
	@ApiModelProperty(value = "角色名称", position = 2, required = true)
	private String roleName;

	/**
	 * 角色状态(1启用,0停用)
	 */
	@ApiModelProperty(value = "角色状态[false停用,true启用]", position = 3, required = true)
	private Boolean status;

	/**
	 * 数据权限[0全部,1本级]
	 */
	@ApiModelProperty(value = "数据权限[0全部,1本级]", position = 4)
	private Long dataPermission;

	/**
	 * 是否可操作[1可操作,0不可操作]
	 */
	@ApiModelProperty(value = "是否可操作[true可操作,false不可操作]", position = 5, required = true)
	private Boolean operation;

	/**
	 * 创建/修改时间
	 */
	@ApiModelProperty(value = "创建/修改时间", position = 6, hidden = true)
	@JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;

	/**
	 * 备注
	 */
	@ApiModelProperty(value = "备注", position = 7)
	private String remark;

}
