package com.zjservice.user.pojo.menu;

import com.zjservice.common.entity.BaseCascade;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zj
 * @date 2020/2/11 22:06
 * @Description
 */
@Data
public class MenuTree extends BaseCascade<MenuTree> implements Serializable {

    /**
     * 菜单ID
     */
    @ApiModelProperty(value = "菜单ID[后端自动生成，前端新增时传空字符串]", position = 1)
    private Long menuId;

    /**
     * 菜单链接地址
     */
    @ApiModelProperty(value = "菜单链接地址", position = 2)
    private String path;

    /**
     * 菜单组件
     */
    @ApiModelProperty(value = "菜单组件", position = 3)
    private String component;

    /**
     * 重定向链接地址
     */
    @ApiModelProperty(value = "重定向链接地址", position = 4)
    private String redirect;

    /**
     * 标题
     */
    @ApiModelProperty(value = "标题", position = 5, required = true)
    private String title;

    /**
     * 图标
     */
    @ApiModelProperty(value = "图标", position = 6)
    private String icon;

    /**
     * 是否缓存
     */
    @ApiModelProperty(value = "是否缓存[false, true]", position = 6)
    private Boolean noCache;

    /**
     * 图标
     */
    @ApiModelProperty(value = "标题/图标", position = 6)
    private Object meta;

    /**
     * 菜单名称
     */
    @ApiModelProperty(value = "菜单名称", position = 7, required = true)
    private String name;

    /**
     * 是否隐藏[0不隐藏,1隐藏]
     */
    @ApiModelProperty(value = "是否隐藏[false不隐藏,true隐藏]", position = 8)
    private Boolean hidden;

    /**
     * 菜单类型[0目录,1菜单,2资源]
     */
    @ApiModelProperty(value = "菜单类型[0目录,1菜单,2资源]", position = 9)
    private Long type;

    /**
     * 菜单权限
     */
    @ApiModelProperty(value = "菜单权限", position = 10)
    private String permission;

    /**
     * 自定义排序
     */
    @ApiModelProperty(value = "自定义排序", position = 11)
    private Long sort;

    /**
     * 上级菜单
     */
    @ApiModelProperty(value = "上级菜单", position = 12)
    private Long pid;

    /**
     * 是否是外链[0不是,1是]
     */
    @ApiModelProperty(value = "是否是外链[false不是,true是]", position = 13)
    private Boolean isFrame;

    /**
     * 是否可操作[0不可操作,1可操作]
     */
    @ApiModelProperty(value = "是否可操作[false不可操作,true可操作]", position = 14)
    private Boolean operation;

    public Object getMeta() {
        Map<String, Object> map = new HashMap<>(3);
        map.put("title", this.title);
        map.put("icon", this.icon);
        map.put("noCache", this.noCache);
        return map;
    }

    public void setMeta(Object meta) {
        Map<String, Object> map = new HashMap<>(2);
        map.put("title", this.title);
        map.put("icon", this.icon);
        map.put("noCache", this.noCache);
        this.meta = map;
    }
}
