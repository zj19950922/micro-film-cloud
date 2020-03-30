## 需要nacos-1.1.4作为服务注册中心和外部配置中心

进入nacos文件夹
单例启动命令：sh ./bin/startup.sh -m standalone
关闭命令；sh ./bin/shutdown.sh

## 需要sentinel-dashboard-1.7.1

进入sentinel-dashboard-1.7.1.jar所在的文件夹，使用命令：
java -Dserver.port=启动端口 -Dcsp.sentinel.dashboard.server=localhost:启动端口 -Dsentinel.dashboard.auth.username=进入WEB页面的用户名 -Dsentinel.dashboard.auth.password=进入WEB页面的密码 -Dproject.name=sentinel-dashboard -jar sentinel-dashboard-1.7.1.jar

## 注意

在拉取工程后，修改maven库地址，然后在nacos-common中用mvn clean后用mvn install，之后正常启动其它的。 