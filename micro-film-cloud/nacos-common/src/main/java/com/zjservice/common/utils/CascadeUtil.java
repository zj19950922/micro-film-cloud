package com.zjservice.common.utils;

import com.zjservice.common.entity.Cascade;

import java.util.ArrayList;
import java.util.List;

/**
 * @author zj
 * @date 2020/2/11 20:17
 * @Description 通用级联表生成
 */
public class CascadeUtil {

    public  static List<Cascade> getCascade(List<Cascade> dataList, String pid){
        List<Cascade> data = new ArrayList<>();
        for (Cascade cascade : dataList){
            // 获取顶级根节点
            if (pid.equals(cascade.getPId())){
                data.add(addChild(cascade, dataList));
            }
        }
        return data;
    }

    /**
     * 获取子节点
     */
    private static Cascade addChild(Cascade cascade, List<Cascade> dataList) {
        List<Cascade> childList = new ArrayList<>();
        for (Cascade child : dataList){
            // 获取根节点
            if (child.getPId().equals(cascade.getValue())){
                childList.add(child);
                addChild(child, dataList);
            }
        }
        if (childList.size() >= 1){
            // 为每一个父节点增加子树（List形式，没有则为空的list）
            cascade.setChildren(childList);
        }
        return cascade;
    }

}
