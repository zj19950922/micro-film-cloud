package com.zjservice.user.pojo.org;

import java.io.Serializable;

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
@ApiModel(description = "机构信息实体类")
public class Org implements Serializable {

	private static final long serialVersionUID =  8247147677729045221L;

	/**
	 * 机构ID
	 */
	@ApiModelProperty(value = "机构ID[后端自动生成，前端新增时传空字符串]", position = 1)
	private Long orgId;

	/**
	 * 机构名称
	 */
	@ApiModelProperty(value = "机构名称", position = 2, required = true)
	private String orgName;

	/**
	 * 上级机构ID
	 */
	@ApiModelProperty(value = "上级机构ID", position = 3, required = true)
	private Long orgPid;

	/**
	 * 机构状态[0停用,1启用]
	 */
	@ApiModelProperty(value = "机构状态[false停用,true启用]", position = 4, required = true)
	private Boolean status;

	/**
	 * 创建/修改时间
	 */
	@ApiModelProperty(value = "创建/修改时间", position = 5, hidden = true)
	private Date createTime;

	/**
	 * 是否可操作[0不可操作,1可操作]
	 */
	@ApiModelProperty(value = "是否可操作[false不可操作,true可操作]", position = 6, required = true)
	private Boolean operation;

	@ApiModelProperty(value = "自定义排序值", position = 7, required = true)
	private Long sort;

}
