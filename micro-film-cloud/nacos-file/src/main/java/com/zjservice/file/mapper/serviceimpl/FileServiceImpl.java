package com.zjservice.file.mapper.serviceimpl;

import cn.hutool.core.lang.UUID;
import com.zjservice.common.entity.RespCode;
import com.zjservice.common.entity.RespResult;
import com.zjservice.file.config.minio.MinioProperties;
import com.zjservice.file.pojo.FileDelete;
import com.zjservice.file.service.FileService;
import io.minio.MinioClient;
import io.minio.ObjectStat;
import io.minio.Result;
import io.minio.messages.Item;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.xmlpull.v1.XmlPullParserException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

/**
 * @author zj
 * @Date Create in 2020/3/15 0015 18:22
 * @Description detail:
 */
@Slf4j
@Service("fileService")
public class FileServiceImpl implements FileService {

    @Resource
    private MinioProperties minioProp;
    @Resource
    private MinioClient minioClient;

    @Override
    public RespResult upload(MultipartFile file, HttpServletRequest request, String bucketName, String fileType){
        if(file==null || file.getSize()==0){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "上传了一个空文件");
        }
        if (StringUtils.isEmpty(bucketName)){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "缺失文件存储桶");
        }
        try {
            //是否存在名为bucketName的bucket，没有就创建
            if (!StringUtils.isEmpty(bucketName) && !minioClient.bucketExists(bucketName)) {
                minioClient.makeBucket(bucketName);
            }
            // 生成新的文件名称
            String orgFileName = file.getOriginalFilename();
            if (orgFileName != null){
                // 新的名称，file会是bucket下的文件夹;file是桶下默认的文件夹
                if (StringUtils.isEmpty(fileType)){
                    orgFileName ="file/"+ UUID.randomUUID().toString().replaceAll("-", "")
                            + orgFileName.substring(orgFileName.lastIndexOf("."));
                }else {
                    orgFileName =fileType+"/"+ UUID.randomUUID().toString().replaceAll("-", "")
                            + orgFileName.substring(orgFileName.lastIndexOf("."));
                }
            }
            // 存入文件流
            InputStream in = file.getInputStream();
            String contentType= file.getContentType();
            minioClient.putObject(bucketName, orgFileName, in,null, null, null, contentType);
            in.close();
            String url = minioClient.getObjectUrl(bucketName, orgFileName);
            Map<String,Object> data=new HashMap<>(2);
            data.put("bucketName",bucketName);
            data.put("fileName",orgFileName);
            data.put("url", url);
            return new RespResult(RespCode.SUCCESS, data);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new RespResult(RespCode.CODE_ENUM_FAIL, "上传失败，"+e.getMessage());
        }
    }

    @Override
    public RespResult delete(FileDelete fileDelete) {
        if (StringUtils.isEmpty(fileDelete.getBucketName())){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "存储桶不能为空");
        }
        if (StringUtils.isEmpty(fileDelete.getFileName())){
            return new RespResult(RespCode.CODE_ENUM_FAIL, "图片名称不能为空");
        }
        try {
            minioClient.removeObject(fileDelete.getBucketName(), fileDelete.getFileName());
            return new RespResult(RespCode.SUCCESS, "删除成功");
        } catch (Exception e) {
            log.error("====minio:删除失败，"+e.getMessage());
        }
        return new RespResult(RespCode.CODE_ENUM_FAIL, "删除失败");
    }

    @Override
    public void download(HttpServletRequest request, HttpServletResponse response, String fileName) {
        InputStream in=null;
        try {
            //获取文件对象 stat原信息
            ObjectStat stat =minioClient.statObject(minioProp.getBucketName(), fileName);
            response.setContentType(stat.contentType());
            in = minioClient.getObject(minioProp.getBucketName(), fileName);
            IOUtils.copy(in,response.getOutputStream());
        }catch (Exception e){
            log.error(e.getMessage());
        }finally {
            if(in!=null){
                try {
                    in.close();
                } catch (IOException e) {
                    log.error(e.getMessage());
                }
            }
        }
    }

}
