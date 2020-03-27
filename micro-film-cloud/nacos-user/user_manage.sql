/*
Navicat MySQL Data Transfer

Source Server         : 阿里云
Source Server Version : 50728
Source Host           : 116.62.146.19:3306
Source Database       : user_manage

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2020-03-25 23:37:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tb_menu
-- ----------------------------
DROP TABLE IF EXISTS `tb_menu`;
CREATE TABLE `tb_menu` (
  `menuId` bigint(20) NOT NULL COMMENT '菜单ID',
  `path` varchar(32) DEFAULT NULL COMMENT '菜单链接地址',
  `component` varchar(32) DEFAULT NULL COMMENT '菜单组件',
  `redirect` varchar(32) DEFAULT NULL COMMENT '重定向链接地址',
  `title` varchar(64) DEFAULT NULL COMMENT '标题',
  `icon` varchar(32) DEFAULT NULL COMMENT '图标',
  `noCache` tinyint(1) DEFAULT NULL COMMENT '是否缓存[0不缓存，1缓存]',
  `name` varchar(64) DEFAULT NULL COMMENT '菜单名称',
  `hidden` tinyint(1) DEFAULT NULL COMMENT '是否隐藏[0不隐藏,1隐藏]',
  `type` int(11) DEFAULT NULL COMMENT '菜单类型[0目录,1菜单,2资源]',
  `permission` varchar(64) DEFAULT NULL COMMENT '菜单权限',
  `sort` int(11) DEFAULT NULL COMMENT '自定义排序',
  `pid` bigint(20) DEFAULT NULL COMMENT '上级菜单',
  `isFrame` tinyint(1) DEFAULT '0' COMMENT '是否是外链[0不是,1是]',
  `operation` tinyint(1) DEFAULT '1' COMMENT '是否可操作[0不可操作,1可操作]',
  PRIMARY KEY (`menuId`),
  KEY `menu_pid` (`pid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_menu
-- ----------------------------
INSERT INTO `tb_menu` VALUES ('423487825640689664', '/admin/home', 'home', '/admin/home', '首页', 'home', '1', '首页', '0', '0', '', '1', '0', '0', '1');
INSERT INTO `tb_menu` VALUES ('424946639132823552', '/admin/system', 'setting', '/admin/system', '系统管理', 'setting', '1', '系统管理', '0', '0', '', '2', '0', '0', '0');
INSERT INTO `tb_menu` VALUES ('428635855415021568', '/admin/system/menu', 'menu', '/admin/system/menu', '菜单管理', 'menu', '1', '菜单管理', '0', '1', 'menu:list', '222', '424946639132823552', '0', '0');
INSERT INTO `tb_menu` VALUES ('428707519309942784', '/admin/system/org', 'org', '/admin/system/org', '机构管理', 'apartment', '1', '机构管理', '0', '1', 'org:list', '223', '424946639132823552', '0', '1');
INSERT INTO `tb_menu` VALUES ('428948627210244096', '/admin/system/role', 'role', '/admin/system/role', '角色管理', 'team', '1', '角色管理', '0', '1', 'role:list', '222', '424946639132823552', '0', '0');
INSERT INTO `tb_menu` VALUES ('429041524945326080', null, null, null, '菜单新增', null, '1', '菜单新增', '0', '2', 'menu:add', '0', '428635855415021568', '0', '1');
INSERT INTO `tb_menu` VALUES ('429048005405052928', null, null, null, '菜单修改', null, '1', '菜单修改', '0', '2', 'menu:modify', '0', '428635855415021568', '0', '1');
INSERT INTO `tb_menu` VALUES ('429048169842741248', null, null, null, '菜单删除', null, '1', '菜单删除', '0', '2', 'menu:delete', '0', '428635855415021568', '0', '1');
INSERT INTO `tb_menu` VALUES ('429049377902956544', '/admin/system/user', 'user', '/admin/system/user', '用户管理', 'user', '1', '用户管理', '0', '1', 'user:list', '224', '424946639132823552', '0', '1');
INSERT INTO `tb_menu` VALUES ('429383552250023936', '/admin/monitor', 'monitor', '/admin/monitor', '项目监控', 'safety', '1', '项目监控', '0', '0', '', '3', '0', '0', '1');
INSERT INTO `tb_menu` VALUES ('429384157735555072', '/admin/monitor/druid', 'druid', '/admin/monitor/druid', '数据库监控', 'database', '1', '数据库监控', '0', '1', 'druid:list', '333', '429383552250023936', '0', '1');
INSERT INTO `tb_menu` VALUES ('429384720414019584', '', '', '', '用户新增', null, '1', '用户新增', '0', '2', 'user:add', '2241', '429049377902956544', '0', '1');
INSERT INTO `tb_menu` VALUES ('429412975774928896', '/admin/document', 'document', '/admin/document', '文档管理', 'folder', '1', '文档管理', '0', '0', null, '4', '0', '0', '1');
INSERT INTO `tb_menu` VALUES ('429413313101828096', '/admin/document/swagger', 'swagger', '/admin/document/swagger', 'Swagger文档', 'file', '1', 'Swagger文档', '0', '1', 'swagger:list', '444', '429412975774928896', '0', '1');
INSERT INTO `tb_menu` VALUES ('432926888390955008', '/admin/monitor/log', 'log', '/admin/monitor/log', '访问日志监控', 'profile', '1', '访问日志监控', '0', '1', 'log:list', '334', '429383552250023936', '0', '1');
INSERT INTO `tb_menu` VALUES ('434582023999459328', '/admin/monitor/server', 'server', '/admin/monitor/server', '服务监控', 'cloud', '1', '服务监控', '0', '1', 'server:list', '335', '429383552250023936', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322047575461888', '', '', '', '用户删除', null, '1', '用户删除', '0', '2', 'user:delete', '2241', '429049377902956544', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322160137998336', '', '', '', '用户修改', null, '1', '用户修改', '0', '2', 'user:modify', '2241', '429049377902956544', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322444981571584', '', '', '', '角色新增', null, '1', '角色新增', '0', '2', 'role:add', '2241', '428948627210244096', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322587894091776', '', '', '', '角色删除', null, '1', '角色删除', '0', '2', 'role:delete', '2241', '428948627210244096', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322711374401536', '', '', '', '角色修改', null, '1', '角色修改', '0', '2', 'role:modify', '2241', '428948627210244096', '0', '1');
INSERT INTO `tb_menu` VALUES ('440322874037899264', '', '', '', '机构新增', null, '1', '机构新增', '0', '2', 'org:add', '2241', '428707519309942784', '0', '1');
INSERT INTO `tb_menu` VALUES ('440323153785393152', '', '', '', '机构删除', null, '1', '机构删除', '0', '2', 'org:delete', '2241', '428707519309942784', '0', '1');
INSERT INTO `tb_menu` VALUES ('440323257795743744', '', '', '', '机构修改', null, '1', '机构修改', '0', '2', 'org:modify', '2241', '428707519309942784', '0', '1');
INSERT INTO `tb_menu` VALUES ('440323642828656640', '', '', '', '角色授权', null, '1', '角色授权', '0', '2', 'role:permission', '2241', '428948627210244096', '0', '1');
INSERT INTO `tb_menu` VALUES ('440323790086475776', '', '', '', '用户授权', null, '1', '用户授权', '0', '2', 'user:permission', '2241', '429049377902956544', '0', '1');

-- ----------------------------
-- Table structure for tb_org
-- ----------------------------
DROP TABLE IF EXISTS `tb_org`;
CREATE TABLE `tb_org` (
  `orgId` bigint(20) NOT NULL COMMENT '机构ID',
  `orgName` varchar(64) DEFAULT NULL COMMENT '机构名称',
  `orgPid` bigint(20) DEFAULT NULL COMMENT '上级机构ID',
  `status` tinyint(1) DEFAULT '1' COMMENT '机构状态[0停用,1启用]',
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建/修改时间',
  `operation` tinyint(1) DEFAULT '1' COMMENT '是否可操作[0不可操作,1可操作]',
  `sort` int(11) DEFAULT NULL COMMENT '自定义排序',
  PRIMARY KEY (`orgId`),
  UNIQUE KEY `unique_org_name` (`orgName`) USING BTREE COMMENT '机构名称唯一',
  KEY `BK_org_pid` (`orgPid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_org
-- ----------------------------
INSERT INTO `tb_org` VALUES ('425017258469892096', '万佳科技', '0', '1', '2020-02-23 12:40:12', '1', '1');
INSERT INTO `tb_org` VALUES ('425017568290545664', '总经办', '425017258469892096', '1', '2020-02-23 12:40:15', '1', '111');
INSERT INTO `tb_org` VALUES ('425017689996664832', '开发部', '425017568290545664', '1', '2020-02-23 13:03:45', '1', '1111');

-- ----------------------------
-- Table structure for tb_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_role`;
CREATE TABLE `tb_role` (
  `roleId` bigint(20) NOT NULL COMMENT '角色ID',
  `roleName` varchar(32) DEFAULT NULL COMMENT '角色名称(唯一)',
  `status` tinyint(1) DEFAULT NULL COMMENT '角色状态(1启用,0停用)',
  `dataPermission` int(11) DEFAULT '1' COMMENT '数据权限[0全部,1本级]',
  `operation` tinyint(1) DEFAULT '1' COMMENT '是否可操作[1可操作,0不可操作]',
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建/修改时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `unique_name` (`roleName`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_role
-- ----------------------------
INSERT INTO `tb_role` VALUES ('425103723132497920', '超级管理员', '1', '0', '0', '2020-02-12 22:51:31', '系统初始化角色');
INSERT INTO `tb_role` VALUES ('425106103269994496', '管理员', '1', '0', '1', '2020-02-23 19:13:42', '');
INSERT INTO `tb_role` VALUES ('428966277940391936', '菜单管理员', '1', '1', '1', '2020-02-23 19:42:15', null);
INSERT INTO `tb_role` VALUES ('428966376410066944', '用户管理员', '1', '1', '1', '2020-02-24 17:37:55', null);
INSERT INTO `tb_role` VALUES ('428966446996008960', '测试员3', '1', '1', '1', '2020-02-23 19:10:32', null);
INSERT INTO `tb_role` VALUES ('428966479652859904', '测试员4', '1', '1', '1', '2020-02-23 19:08:00', null);
INSERT INTO `tb_role` VALUES ('428966512771084288', '测试员5', '1', '1', '1', '2020-02-23 14:40:52', null);
INSERT INTO `tb_role` VALUES ('428966601832935424', '测试员6', '1', '1', '1', '2020-02-23 14:41:13', null);
INSERT INTO `tb_role` VALUES ('428966660347670528', '测试员7', '1', '1', '1', '2020-02-23 14:41:27', null);
INSERT INTO `tb_role` VALUES ('429033428911009792', '测试员9', '1', '1', '1', '2020-02-23 19:06:46', null);
INSERT INTO `tb_role` VALUES ('429034974839189504', '测试员10', '1', '1', '1', '2020-02-23 19:12:54', null);
INSERT INTO `tb_role` VALUES ('429035011480629248', '测试员11', '1', '1', '1', '2020-02-23 19:13:03', null);

-- ----------------------------
-- Table structure for tb_role_menu
-- ----------------------------
DROP TABLE IF EXISTS `tb_role_menu`;
CREATE TABLE `tb_role_menu` (
  `roleId` bigint(20) NOT NULL,
  `menuId` bigint(20) NOT NULL,
  PRIMARY KEY (`roleId`,`menuId`),
  KEY `tb_role_menu_roleId_index` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_role_menu
-- ----------------------------
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '423487825640689664');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '424946639132823552');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '428635855415021568');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '428707519309942784');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '428948627210244096');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '429041524945326080');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '429048005405052928');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '440322444981571584');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '440322711374401536');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '440322874037899264');
INSERT INTO `tb_role_menu` VALUES ('425106103269994496', '440323257795743744');
INSERT INTO `tb_role_menu` VALUES ('428966277940391936', '423487825640689664');
INSERT INTO `tb_role_menu` VALUES ('428966277940391936', '424946639132823552');
INSERT INTO `tb_role_menu` VALUES ('428966277940391936', '428635855415021568');
INSERT INTO `tb_role_menu` VALUES ('428966277940391936', '429041524945326080');
INSERT INTO `tb_role_menu` VALUES ('428966376410066944', '423487825640689664');
INSERT INTO `tb_role_menu` VALUES ('428966376410066944', '429049377902956544');

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user` (
  `userId` bigint(20) NOT NULL COMMENT '用户ID',
  `userName` varchar(20) DEFAULT NULL COMMENT '用户名(唯一)',
  `password` varchar(128) DEFAULT NULL COMMENT '用户密码',
  `status` tinyint(1) DEFAULT '0' COMMENT '用户状态[1启用,0停用]',
  `deleteStatus` tinyint(1) DEFAULT '0' COMMENT '删除状态[0未删除,1已删除]',
  `orgId` bigint(20) DEFAULT NULL COMMENT '机构部门ID(机构表的外键)',
  `operation` tinyint(1) DEFAULT '1' COMMENT '是否可操作[0不可操作,1可操作]',
  `createTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建/修改时间',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`userId`),
  UNIQUE KEY `unique_name` (`userName`) USING BTREE COMMENT '用户名称唯一',
  KEY `FK_ORGID` (`orgId`),
  CONSTRAINT `FK_ORGID` FOREIGN KEY (`orgId`) REFERENCES `tb_org` (`orgId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES ('425324162320580608', 'test2', 'AD0234829205B9033196BA818F7A872B', '1', '0', '425017689996664832', '1', '2020-02-13 21:15:01', '');
INSERT INTO `tb_user` VALUES ('425441287865516032', 'test1', '5A105E8B9D40E1329780D62EA2265D8A', '1', '0', '425017258469892096', '1', '2020-02-24 16:24:09', '测试用户');
INSERT INTO `tb_user` VALUES ('429352467831078912', 'zhujun', 'E10ADC3949BA59ABBE56E057F20F883E', '1', '0', '425017689996664832', '1', '2020-02-24 18:03:30', '测试用户');

-- ----------------------------
-- Table structure for tb_user_info
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_info`;
CREATE TABLE `tb_user_info` (
  `userId` bigint(20) NOT NULL COMMENT '用户ID(user表触发生成)',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系方式-手机',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `image` varchar(255) DEFAULT NULL COMMENT '头像',
  `mail` varchar(64) DEFAULT NULL COMMENT '邮件',
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_info
-- ----------------------------
INSERT INTO `tb_user_info` VALUES ('425324162320580608', null, null, null, null);
INSERT INTO `tb_user_info` VALUES ('425441287865516032', null, null, null, null);
INSERT INTO `tb_user_info` VALUES ('429352467831078912', null, null, null, null);

-- ----------------------------
-- Table structure for tb_user_role
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_role`;
CREATE TABLE `tb_user_role` (
  `userId` bigint(20) NOT NULL,
  `roleId` bigint(20) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_role
-- ----------------------------
INSERT INTO `tb_user_role` VALUES ('425324162320580608', '428966479652859904');
INSERT INTO `tb_user_role` VALUES ('425441287865516032', '428966277940391936');
INSERT INTO `tb_user_role` VALUES ('429352467831078912', '425103723132497920');

-- ----------------------------
-- Table structure for tb_visit_log
-- ----------------------------
DROP TABLE IF EXISTS `tb_visit_log`;
CREATE TABLE `tb_visit_log` (
  `Id` bigint(20) NOT NULL,
  `UserName` varchar(64) DEFAULT NULL COMMENT '用户名',
  `VisitorTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '访问时间',
  `VisitorService` varchar(64) DEFAULT NULL COMMENT '请求服务',
  `VisitorUrl` varchar(64) DEFAULT NULL COMMENT '请求API资源',
  `Method` varchar(32) DEFAULT NULL COMMENT '请求方式',
  `RemoteAddress` varchar(64) DEFAULT NULL COMMENT '访问者远程地址',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_visit_log
-- ----------------------------
INSERT INTO `tb_visit_log` VALUES ('434580708703473664', 'test1', '2020-03-10 02:29:41', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5553');
INSERT INTO `tb_visit_log` VALUES ('434580708888023040', 'test1', '2020-03-10 02:29:41', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5555');
INSERT INTO `tb_visit_log` VALUES ('434580753217622016', 'test1', '2020-03-10 02:29:51', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434580753246982144', 'test1', '2020-03-10 02:29:51', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434580874512699392', 'test1', '2020-03-10 02:30:20', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434580874584002560', 'test1', '2020-03-10 02:30:20', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434581175693086720', 'test1', '2020-03-10 02:31:32', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434581175936356352', 'test1', '2020-03-10 02:31:32', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434581401870929920', 'test1', '2020-03-10 02:32:25', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434581439250567168', 'test1', '2020-03-10 02:32:34', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434581439372201984', 'test1', '2020-03-10 02:32:34', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434581463040659456', 'test1', '2020-03-10 02:32:40', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434581816524017664', 'test1', '2020-03-10 02:34:04', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434581839311671296', 'test1', '2020-03-10 02:34:10', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434582023835881472', 'test1', '2020-03-10 02:34:54', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434582025672986624', 'test1', '2020-03-10 02:34:54', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434582025706541056', 'test1', '2020-03-10 02:34:54', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5559');
INSERT INTO `tb_visit_log` VALUES ('434582752814305280', 'test1', '2020-03-10 02:37:48', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434582827548413952', 'test1', '2020-03-10 02:38:05', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434583050664415232', 'test1', '2020-03-10 02:38:59', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434583400725221376', 'test1', '2020-03-10 02:40:22', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434583615519723520', 'test1', '2020-03-10 02:41:13', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434583808726142976', 'test1', '2020-03-10 02:41:59', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:5560');
INSERT INTO `tb_visit_log` VALUES ('434731676501938176', 'test1', '2020-03-10 12:29:34', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6712');
INSERT INTO `tb_visit_log` VALUES ('434733375522213888', 'test1', '2020-03-10 12:36:19', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6937');
INSERT INTO `tb_visit_log` VALUES ('434733559484387328', 'test1', '2020-03-10 12:37:03', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6937');
INSERT INTO `tb_visit_log` VALUES ('434736241339142144', 'test1', '2020-03-10 12:47:42', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/117.136.46.230:39531');
INSERT INTO `tb_visit_log` VALUES ('434751420382711808', 'test1', '2020-03-10 13:48:01', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751434966306816', 'test1', '2020-03-10 13:48:05', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751455795220480', 'test1', '2020-03-10 13:48:09', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751477492355072', 'test1', '2020-03-10 13:48:15', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751494584143872', 'test1', '2020-03-10 13:48:19', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751507787812864', 'test1', '2020-03-10 13:48:22', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434751518281961472', 'test1', '2020-03-10 13:48:24', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.86.242:6213');
INSERT INTO `tb_visit_log` VALUES ('434765945303601152', 'test1', '2020-03-10 14:45:44', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5427');
INSERT INTO `tb_visit_log` VALUES ('434766999806152704', 'test1', '2020-03-10 14:49:55', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5427');
INSERT INTO `tb_visit_log` VALUES ('434767646794321920', 'test1', '2020-03-10 14:52:30', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5427');
INSERT INTO `tb_visit_log` VALUES ('434767749898702848', 'test1', '2020-03-10 14:52:54', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5427');
INSERT INTO `tb_visit_log` VALUES ('434767750477516800', 'test1', '2020-03-10 14:52:54', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5520');
INSERT INTO `tb_visit_log` VALUES ('434767805414510592', 'test1', '2020-03-10 14:53:08', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5520');
INSERT INTO `tb_visit_log` VALUES ('434767805531951104', 'test1', '2020-03-10 14:53:08', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5427');
INSERT INTO `tb_visit_log` VALUES ('434767831616327680', 'test1', '2020-03-10 14:53:14', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.242:5520');
INSERT INTO `tb_visit_log` VALUES ('434769871407026176', 'test1', '2020-03-10 15:01:20', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434770062126223360', 'test1', '2020-03-10 15:02:06', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434770160738504704', 'test1', '2020-03-10 15:02:29', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434771094973583360', 'test1', '2020-03-10 15:06:12', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434771471202652160', 'test1', '2020-03-10 15:07:42', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434771698483597312', 'test1', '2020-03-10 15:08:36', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5674');
INSERT INTO `tb_visit_log` VALUES ('434774058593292288', 'test1', '2020-03-10 15:17:58', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434774140810039296', 'test1', '2020-03-10 15:18:18', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434774265380868096', 'test1', '2020-03-10 15:18:48', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434774371530313728', 'test1', '2020-03-10 15:19:13', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434774470301978624', 'test1', '2020-03-10 15:19:37', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434774899119230976', 'test1', '2020-03-10 15:21:19', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6140');
INSERT INTO `tb_visit_log` VALUES ('434776618800648192', 'test1', '2020-03-10 15:28:09', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6298');
INSERT INTO `tb_visit_log` VALUES ('434776649997881344', 'test1', '2020-03-10 15:28:16', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6298');
INSERT INTO `tb_visit_log` VALUES ('434776959134863360', 'test1', '2020-03-10 15:29:30', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6298');
INSERT INTO `tb_visit_log` VALUES ('434777057550012416', 'test1', '2020-03-10 15:29:53', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6298');
INSERT INTO `tb_visit_log` VALUES ('434777163233890304', 'test1', '2020-03-10 15:30:19', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6298');
INSERT INTO `tb_visit_log` VALUES ('434786344531791872', 'test1', '2020-03-10 16:06:48', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6813');
INSERT INTO `tb_visit_log` VALUES ('434787731634262016', 'test1', '2020-03-10 16:12:18', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434787907912470528', 'test1', '2020-03-10 16:13:00', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434788178063396864', 'test1', '2020-03-10 16:14:05', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434788303187873792', 'test1', '2020-03-10 16:14:35', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434788411719684096', 'test1', '2020-03-10 16:15:00', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434789660812775424', 'test1', '2020-03-10 16:19:58', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434789911145615360', 'test1', '2020-03-10 16:20:58', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434790371080409088', 'test1', '2020-03-10 16:22:48', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434790441959952384', 'test1', '2020-03-10 16:23:05', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6900');
INSERT INTO `tb_visit_log` VALUES ('434834789871259648', 'test1', '2020-03-10 19:19:18', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:5642');
INSERT INTO `tb_visit_log` VALUES ('434834855684083712', 'test1', '2020-03-10 19:19:34', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.242:5642');
INSERT INTO `tb_visit_log` VALUES ('434863826081550336', 'test1', '2020-03-10 21:14:41', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.242:6808');
INSERT INTO `tb_visit_log` VALUES ('434904416831803392', 'test1', '2020-03-10 23:55:58', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904430211633152', 'test1', '2020-03-10 23:56:01', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904506862538752', 'test1', '2020-03-10 23:56:20', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904515683160064', 'test1', '2020-03-10 23:56:22', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904520393363456', 'test1', '2020-03-10 23:56:23', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904525543968768', 'test1', '2020-03-10 23:56:24', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904532116443136', 'test1', '2020-03-10 23:56:26', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904534985347072', 'test1', '2020-03-10 23:56:26', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904540182089728', 'test1', '2020-03-10 23:56:28', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904552135856128', 'test1', '2020-03-10 23:56:31', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904570922143744', 'test1', '2020-03-10 23:56:35', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904581042999296', 'test1', '2020-03-10 23:56:37', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('434904600655564800', 'test1', '2020-03-10 23:56:42', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/117.136.46.230:39535');
INSERT INTO `tb_visit_log` VALUES ('435427283285708800', 'test1', '2020-03-12 10:33:39', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.87.91:21540');
INSERT INTO `tb_visit_log` VALUES ('436562830049808384', 'test1', '2020-03-15 13:45:55', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:21924');
INSERT INTO `tb_visit_log` VALUES ('436599704437002240', 'test1', '2020-03-15 16:12:26', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:23122');
INSERT INTO `tb_visit_log` VALUES ('436620394556952576', 'test1', '2020-03-15 17:34:39', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:21955');
INSERT INTO `tb_visit_log` VALUES ('436620554158608384', 'test1', '2020-03-15 17:35:17', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:21955');
INSERT INTO `tb_visit_log` VALUES ('436620570738692096', 'test1', '2020-03-15 17:35:21', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:21955');
INSERT INTO `tb_visit_log` VALUES ('436620594172268544', 'test1', '2020-03-15 17:35:27', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:21955');
INSERT INTO `tb_visit_log` VALUES ('436928443985301504', 'test1', '2020-03-16 13:58:44', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:22246');
INSERT INTO `tb_visit_log` VALUES ('436928562361143296', 'test1', '2020-03-16 13:59:12', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.90.199:22246');
INSERT INTO `tb_visit_log` VALUES ('436931323140116480', 'test1', '2020-03-16 14:10:10', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931352567353344', 'test1', '2020-03-16 14:10:17', 'nacos-user', '/api/v1/user/org/info', 'GET', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931397702258688', 'test1', '2020-03-16 14:10:28', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931425367887872', 'test1', '2020-03-16 14:10:35', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931491142963200', 'test1', '2020-03-16 14:10:50', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931502794739712', 'test1', '2020-03-16 14:10:53', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931506863214592', 'test1', '2020-03-16 14:10:54', 'nacos-user', '/api/v1/user/org/info', 'GET', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931511250456576', 'test1', '2020-03-16 14:10:55', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931521765576704', 'test1', '2020-03-16 14:10:58', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931533669011456', 'test1', '2020-03-16 14:11:01', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931547011092480', 'test1', '2020-03-16 14:11:04', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931554497925120', 'test1', '2020-03-16 14:11:06', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931561871511552', 'test1', '2020-03-16 14:11:07', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931568712421376', 'test1', '2020-03-16 14:11:09', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931583824498688', 'test1', '2020-03-16 14:11:13', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931591701401600', 'test1', '2020-03-16 14:11:14', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436931609363615744', 'test1', '2020-03-16 14:11:19', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/223.68.90.199:23201');
INSERT INTO `tb_visit_log` VALUES ('436953242937724928', 'test1', '2020-03-16 15:37:16', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:23162');
INSERT INTO `tb_visit_log` VALUES ('436960704302551040', 'test1', '2020-03-16 16:06:55', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.90.199:21698');
INSERT INTO `tb_visit_log` VALUES ('436960789585334272', 'test1', '2020-03-16 16:07:16', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.90.199:21698');
INSERT INTO `tb_visit_log` VALUES ('436960789748912128', 'test1', '2020-03-16 16:07:16', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.90.199:21719');
INSERT INTO `tb_visit_log` VALUES ('438130962983948288', 'test1', '2020-03-19 21:37:07', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.33:5903');
INSERT INTO `tb_visit_log` VALUES ('438398966372110336', 'test1', '2020-03-20 15:22:04', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.33:6933');
INSERT INTO `tb_visit_log` VALUES ('438794654780100608', 'test1', '2020-03-21 17:34:23', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30708');
INSERT INTO `tb_visit_log` VALUES ('438795988384223232', 'test1', '2020-03-21 17:39:41', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:31352');
INSERT INTO `tb_visit_log` VALUES ('438796455533219840', 'test1', '2020-03-21 17:41:33', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:31352');
INSERT INTO `tb_visit_log` VALUES ('438796502375206912', 'test1', '2020-03-21 17:41:44', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:31352');
INSERT INTO `tb_visit_log` VALUES ('438796599251046400', 'test1', '2020-03-21 17:42:07', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:31352');
INSERT INTO `tb_visit_log` VALUES ('438797107743297536', 'test1', '2020-03-21 17:44:08', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:31352');
INSERT INTO `tb_visit_log` VALUES ('438802057269481472', 'test1', '2020-03-21 18:03:48', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438802281366949888', 'test1', '2020-03-21 18:04:42', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438802544177844224', 'test1', '2020-03-21 18:05:44', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438802932218073088', 'test1', '2020-03-21 18:07:17', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438803396288450560', 'test1', '2020-03-21 18:09:07', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438803697837936640', 'test1', '2020-03-21 18:10:19', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438804010850455552', 'test1', '2020-03-21 18:11:34', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438805209687396352', 'test1', '2020-03-21 18:16:20', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438805897389674496', 'test1', '2020-03-21 18:19:04', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438806285740281856', 'test1', '2020-03-21 18:20:36', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438806557501820928', 'test1', '2020-03-21 18:21:41', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438806755472969728', 'test1', '2020-03-21 18:22:28', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438806842383142912', 'test1', '2020-03-21 18:22:49', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438808055086452736', 'test1', '2020-03-21 18:27:38', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438808210061791232', 'test1', '2020-03-21 18:28:15', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438808405780598784', 'test1', '2020-03-21 18:29:02', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438808417629507584', 'test1', '2020-03-21 18:29:05', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30678');
INSERT INTO `tb_visit_log` VALUES ('438823141318463488', 'test1', '2020-03-21 19:27:35', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.88.131:30321');
INSERT INTO `tb_visit_log` VALUES ('439426791707381760', 'test1', '2020-03-23 11:26:16', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/49.84.24.126:54131');
INSERT INTO `tb_visit_log` VALUES ('439426822799757312', 'test1', '2020-03-23 11:26:24', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:54131');
INSERT INTO `tb_visit_log` VALUES ('439426832035614720', 'test1', '2020-03-23 11:26:26', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/49.84.24.126:54131');
INSERT INTO `tb_visit_log` VALUES ('439509914935758848', 'test1', '2020-03-23 16:56:35', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/49.84.24.126:51293');
INSERT INTO `tb_visit_log` VALUES ('439509940097388544', 'test1', '2020-03-23 16:56:41', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:51293');
INSERT INTO `tb_visit_log` VALUES ('439509961563836416', 'test1', '2020-03-23 16:56:46', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:51293');
INSERT INTO `tb_visit_log` VALUES ('439510471356321792', 'test1', '2020-03-23 16:58:47', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/49.84.24.126:51293');
INSERT INTO `tb_visit_log` VALUES ('440152390256168960', 'test1', '2020-03-25 11:29:33', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152410166530048', 'test1', '2020-03-25 11:29:37', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152426012610560', 'test1', '2020-03-25 11:29:41', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152455121080320', 'test1', '2020-03-25 11:29:48', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152455242715136', 'test1', '2020-03-25 11:29:48', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152516370501632', 'test1', '2020-03-25 11:30:03', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152516387278848', 'test1', '2020-03-25 11:30:03', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152560767209472', 'test1', '2020-03-25 11:30:13', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152560779792384', 'test1', '2020-03-25 11:30:13', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152659861835776', 'test1', '2020-03-25 11:30:37', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152659882807296', 'test1', '2020-03-25 11:30:37', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152942536953856', 'test1', '2020-03-25 11:31:44', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152955958726656', 'test1', '2020-03-25 11:31:47', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440152955988086784', 'test1', '2020-03-25 11:31:47', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152983993454592', 'test1', '2020-03-25 11:31:54', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152994194001920', 'test1', '2020-03-25 11:31:57', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440152994214973440', 'test1', '2020-03-25 11:31:57', 'nacos-user', '/api/v1/user/role/info', 'GET', '/49.84.24.126:57528');
INSERT INTO `tb_visit_log` VALUES ('440153036472586240', 'test1', '2020-03-25 11:32:07', 'nacos-user', '/api/v1/user/org/info', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440153041912598528', 'test1', '2020-03-25 11:32:08', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440153046106902528', 'test1', '2020-03-25 11:32:09', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440153141686702080', 'test1', '2020-03-25 11:32:32', 'nacos-monitor', '/api/v1/monitor/logging/visitor', 'POST', '/49.84.24.126:57517');
INSERT INTO `tb_visit_log` VALUES ('440153379918974976', 'test1', '2020-03-25 11:33:29', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/49.84.24.126:57658');
INSERT INTO `tb_visit_log` VALUES ('440291814910595072', 'test1', '2020-03-25 20:43:34', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440291831721365504', 'test1', '2020-03-25 20:43:38', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440291838218342400', 'test1', '2020-03-25 20:43:40', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440291856522285056', 'test1', '2020-03-25 20:43:44', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440291856929132544', 'test1', '2020-03-25 20:43:44', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440291917859786752', 'test1', '2020-03-25 20:43:59', 'nacos-user', '/api/v1/user/user/info/auth', 'PUT', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440291935941431296', 'test1', '2020-03-25 20:44:03', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440291937552044032', 'test1', '2020-03-25 20:44:03', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292120629219328', 'zhujun', '2020-03-25 20:44:47', 'nacos-user', '/api/v1/user/user/info/menu', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292142221496320', 'zhujun', '2020-03-25 20:44:52', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292435650809856', 'test1', '2020-03-25 20:46:02', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292458211971072', 'test1', '2020-03-25 20:46:07', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292469020692480', 'test1', '2020-03-25 20:46:10', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292478004891648', 'test1', '2020-03-25 20:46:12', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292478831169536', 'test1', '2020-03-25 20:46:12', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292512242995200', 'test1', '2020-03-25 20:46:20', 'nacos-user', '/api/v1/user/user/info/auth', 'PUT', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292803868758016', 'test1', '2020-03-25 20:47:30', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292804019752960', 'test1', '2020-03-25 20:47:30', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292877889835008', 'test1', '2020-03-25 20:47:47', 'nacos-user', '/api/v1/user/user/info/auth', 'PUT', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292900249669632', 'test1', '2020-03-25 20:47:53', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292900270641152', 'test1', '2020-03-25 20:47:53', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292914426417152', 'test1', '2020-03-25 20:47:56', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292914485137408', 'test1', '2020-03-25 20:47:56', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292958747627520', 'test1', '2020-03-25 20:48:07', 'nacos-user', '/api/v1/user/user/info/auth', 'PUT', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440292977601024000', 'test1', '2020-03-25 20:48:11', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:5402');
INSERT INTO `tb_visit_log` VALUES ('440292977638772736', 'test1', '2020-03-25 20:48:11', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440293228697227264', 'test1', '2020-03-25 20:49:11', 'nacos-user', '/api/v1/user/user/info/menu', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440293289845985280', 'test1', '2020-03-25 20:49:26', 'nacos-user', '/api/v1/user/user/info/menu', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440293333986840576', 'zhujun', '2020-03-25 20:49:36', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5433');
INSERT INTO `tb_visit_log` VALUES ('440296369169764352', 'zhujun', '2020-03-25 21:01:40', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296382713171968', 'zhujun', '2020-03-25 21:01:43', 'nacos-user', '/api/v1/user/role/info', 'GET', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296383002578944', 'zhujun', '2020-03-25 21:01:43', 'nacos-user', '/api/v1/user/user/info/auth', 'GET', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296454637096960', 'zhujun', '2020-03-25 21:02:00', 'nacos-user', '/api/v1/user/user/info/auth', 'PUT', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296864869388288', 'test1', '2020-03-25 21:03:38', 'nacos-user', '/api/v1/user/user/info/menu', 'GET', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296894028189696', 'test1', '2020-03-25 21:03:45', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:6383');
INSERT INTO `tb_visit_log` VALUES ('440296973971623936', 'test1', '2020-03-25 21:04:04', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:6470');
INSERT INTO `tb_visit_log` VALUES ('440296974034538496', 'test1', '2020-03-25 21:04:04', 'nacos-user', '/api/v1/user/user/info/menu', 'GET', '/223.68.86.112:6471');
INSERT INTO `tb_visit_log` VALUES ('440321667902869504', 'zhujun', '2020-03-25 22:42:12', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440321694683500544', 'zhujun', '2020-03-25 22:42:18', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440321826481115136', 'zhujun', '2020-03-25 22:42:49', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440321826749550592', 'zhujun', '2020-03-25 22:42:49', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440321841819684864', 'zhujun', '2020-03-25 22:42:53', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322047319609344', 'zhujun', '2020-03-25 22:43:42', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322049265766400', 'zhujun', '2020-03-25 22:43:42', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322049311903744', 'zhujun', '2020-03-25 22:43:42', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322066261086208', 'zhujun', '2020-03-25 22:43:47', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322160083472384', 'zhujun', '2020-03-25 22:44:09', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322161094299648', 'zhujun', '2020-03-25 22:44:09', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322161182380032', 'zhujun', '2020-03-25 22:44:09', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322342867046400', 'zhujun', '2020-03-25 22:44:52', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322444922851328', 'zhujun', '2020-03-25 22:45:17', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322446130810880', 'zhujun', '2020-03-25 22:45:17', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322446223085568', 'zhujun', '2020-03-25 22:45:17', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322478754107392', 'zhujun', '2020-03-25 22:45:25', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322499092287488', 'zhujun', '2020-03-25 22:45:30', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322499205533696', 'zhujun', '2020-03-25 22:45:30', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322513164177408', 'zhujun', '2020-03-25 22:45:33', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322587847954432', 'zhujun', '2020-03-25 22:45:51', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322588900724736', 'zhujun', '2020-03-25 22:45:51', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322589106245632', 'zhujun', '2020-03-25 22:45:51', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322632483737600', 'zhujun', '2020-03-25 22:46:02', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322711328264192', 'zhujun', '2020-03-25 22:46:20', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322712561389568', 'zhujun', '2020-03-25 22:46:21', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322712834019328', 'zhujun', '2020-03-25 22:46:21', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322800465612800', 'zhujun', '2020-03-25 22:46:42', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322873970790400', 'zhujun', '2020-03-25 22:46:59', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322875271024640', 'zhujun', '2020-03-25 22:46:59', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322875350716416', 'zhujun', '2020-03-25 22:46:59', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322934033223680', 'zhujun', '2020-03-25 22:47:13', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322934125498368', 'zhujun', '2020-03-25 22:47:13', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322997228802048', 'zhujun', '2020-03-25 22:47:28', 'nacos-user', '/api/v1/user/menu/info', 'PUT', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440322998612922368', 'zhujun', '2020-03-25 22:47:29', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440322998650671104', 'zhujun', '2020-03-25 22:47:29', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323042028163072', 'zhujun', '2020-03-25 22:47:39', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323042246266880', 'zhujun', '2020-03-25 22:47:39', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323066988466176', 'zhujun', '2020-03-25 22:47:45', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323153730867200', 'zhujun', '2020-03-25 22:48:06', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323155358257152', 'zhujun', '2020-03-25 22:48:06', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323155379228672', 'zhujun', '2020-03-25 22:48:06', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323182235357184', 'zhujun', '2020-03-25 22:48:13', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323257749606400', 'zhujun', '2020-03-25 22:48:31', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323259200835584', 'zhujun', '2020-03-25 22:48:31', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323259217612800', 'zhujun', '2020-03-25 22:48:31', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323445335658496', 'zhujun', '2020-03-25 22:49:15', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323467016015872', 'zhujun', '2020-03-25 22:49:20', 'nacos-user', '/api/v1/user/org/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323479628288000', 'zhujun', '2020-03-25 22:49:23', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323486976708608', 'zhujun', '2020-03-25 22:49:25', 'nacos-user', '/api/v1/user/org/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323505955934208', 'zhujun', '2020-03-25 22:49:30', 'nacos-user', '/api/v1/user/user/info/query', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323516001292288', 'zhujun', '2020-03-25 22:49:32', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323519000219648', 'zhujun', '2020-03-25 22:49:33', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323544216375296', 'zhujun', '2020-03-25 22:49:39', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323544430284800', 'zhujun', '2020-03-25 22:49:39', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323555608104960', 'zhujun', '2020-03-25 22:49:42', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323642740576256', 'zhujun', '2020-03-25 22:50:02', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323644057587712', 'zhujun', '2020-03-25 22:50:03', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323644074364928', 'zhujun', '2020-03-25 22:50:03', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323681504333824', 'zhujun', '2020-03-25 22:50:12', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323681521111040', 'zhujun', '2020-03-25 22:50:12', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440323692338221056', 'zhujun', '2020-03-25 22:50:14', 'nacos-user', '/api/v1/user/menu/parent/cascade', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323790006784000', 'zhujun', '2020-03-25 22:50:38', 'nacos-user', '/api/v1/user/menu/info', 'POST', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323793018294272', 'zhujun', '2020-03-25 22:50:38', 'nacos-user', '/api/v1/user/menu/info', 'GET', '/223.68.86.112:5408');
INSERT INTO `tb_visit_log` VALUES ('440323793068625920', 'zhujun', '2020-03-25 22:50:38', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5382');
INSERT INTO `tb_visit_log` VALUES ('440326872535011328', 'zhujun', '2020-03-25 23:02:52', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:6380');
INSERT INTO `tb_visit_log` VALUES ('440329498567774208', 'zhujun', '2020-03-25 23:13:19', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:6859');
INSERT INTO `tb_visit_log` VALUES ('440329533095284736', 'zhujun', '2020-03-25 23:13:27', 'nacos-user', '/api/v1/user/role/info/query', 'POST', '/223.68.86.112:6859');
INSERT INTO `tb_visit_log` VALUES ('440329543337775104', 'zhujun', '2020-03-25 23:13:29', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/223.68.86.112:6859');
INSERT INTO `tb_visit_log` VALUES ('440329543694290944', 'zhujun', '2020-03-25 23:13:29', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/223.68.86.112:6865');
INSERT INTO `tb_visit_log` VALUES ('440329718068285440', 'zhujun', '2020-03-25 23:14:11', 'nacos-user', '/api/v1/user/role/info/auth', 'PUT', '/223.68.86.112:6865');
INSERT INTO `tb_visit_log` VALUES ('440329729741033472', 'zhujun', '2020-03-25 23:14:14', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/223.68.86.112:6865');
INSERT INTO `tb_visit_log` VALUES ('440329729963331584', 'zhujun', '2020-03-25 23:14:14', 'nacos-user', '/api/v1/user/role/info/auth', 'GET', '/223.68.86.112:6859');
INSERT INTO `tb_visit_log` VALUES ('440334938986909696', 'zhujun', '2020-03-25 23:34:56', 'nacos-user', '/api/v1/user/auth/info', 'GET', '/223.68.86.112:5791');
DROP TRIGGER IF EXISTS `user_ins`;
DELIMITER ;;
CREATE TRIGGER `user_ins` AFTER INSERT ON `tb_user` FOR EACH ROW BEGIN 

  INSERT INTO tb_user_info (userId) value (new.userId);

END
;;
DELIMITER ;
DROP TRIGGER IF EXISTS `user_del`;
DELIMITER ;;
CREATE TRIGGER `user_del` AFTER DELETE ON `tb_user` FOR EACH ROW BEGIN

     DELETE FROM tb_user_info WHERE userId=old.userId;

END
;;
DELIMITER ;
