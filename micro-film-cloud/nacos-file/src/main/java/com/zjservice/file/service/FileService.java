package com.zjservice.file.service;

import com.zjservice.common.entity.RespResult;
import com.zjservice.file.pojo.FileDelete;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author zj
 * @Date Create in 2020/3/15 0015 18:23
 * @Description detail:
 */
public interface FileService {

    /**
     * 上传文件
     * @param file 文件信息
     * @param request 请求对象
     * @param bucketName 文件存储桶名称
     * @param fileType 文件类型
     * @return RespResult
     */
    RespResult upload(MultipartFile file, HttpServletRequest request, String bucketName, String fileType);

    /**
     * 删除文件
     * @param fileDelete 删除条件参数
     * @return RespResult
     */
    RespResult delete(FileDelete fileDelete);

    /**
     * 下载文件
     * @param request 请求对象
     * @param response 响应对象
     * @param fileName 文件名称
     */
    void download(HttpServletRequest request, HttpServletResponse response, String fileName);

}
