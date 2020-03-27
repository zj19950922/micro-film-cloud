package com.zjservice.file.controller;

import com.zjservice.common.entity.RespResult;
import com.zjservice.file.pojo.FileDelete;
import com.zjservice.file.service.FileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author zj
 * @Date Create in 2020/3/15 0015 18:25
 * @Description detail:
 */
@RestController
@Api(tags = "文件对象存储API管理")
@RequestMapping("/file")
public class FileController {

    @Resource
    private FileService fileService;

    @PostMapping("/upload")
    @ApiOperation(value = "文件上传")
    public RespResult upload(@RequestParam(name = "file") MultipartFile file,
                             @RequestParam(name = "bucketName") String bucketName,
                             @RequestParam(name = "fileType") String fileType,
                             HttpServletRequest request){
        return fileService.upload(file, request, bucketName, fileType);
    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "文件删除")
    public RespResult deleteFile(@RequestBody FileDelete fileDelete){
        return fileService.delete(fileDelete);
    }

    @GetMapping("/download")
    @ApiOperation(value = "文件下载")
    public void download(HttpServletRequest request, HttpServletResponse response,
                         @RequestParam(name = "fileName")String fileName){
        fileService.download(request, response, fileName);
    }

}
