package com.zjservice.user.pojo.org;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.zjservice.common.entity.BaseCascade;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
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
public class OrgTree extends BaseCascade<OrgTree> implements Serializable {

	private static final long serialVersionUID =  8247147677729045221L;

	/**
	 * 机构ID
	 */
	private Long orgId;

	/**
	 * 机构名称
	 */
	private String orgName;

	/**
	 * 上级机构ID
	 */
	private Long orgPid;

	/**
	 * 机构状态[0停用,1启用]
	 */
	private Boolean status;

	/**
	 * 创建/修改时间
	 */
	@JsonFormat(shape=JsonFormat.Shape.STRING,pattern="yyyy-MM-dd HH:mm:ss",timezone="GMT+8")
	private Date createTime;

	/**
	 * 是否可操作[0不可操作,1可操作]
	 */
	private Boolean operation;

	/**
	 * 自定义排序值
	 */
	private Long sort;

}
