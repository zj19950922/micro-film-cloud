/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : user_manage

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2020-02-24 18:51:50
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
INSERT INTO `tb_menu` VALUES ('429384157735555072', '/admin/monitor/sql', 'sql', '/admin/monitor/sql', '数据库监控', 'database', '1', '数据库监控', '0', '1', 'sql:list', '333', '429383552250023936', '0', '1');
INSERT INTO `tb_menu` VALUES ('429384720414019584', '', '', '', '用户新增', null, '1', '用户新增', '0', '2', 'user:add', '2241', '429049377902956544', '0', '1');

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
INSERT INTO `tb_user_role` VALUES ('425324162320580608', '428966277940391936');
INSERT INTO `tb_user_role` VALUES ('425324162320580608', '428966376410066944');
INSERT INTO `tb_user_role` VALUES ('425441287865516032', '425103723132497920');

-- ----------------------------
-- Table structure for tb_visit_log
-- ----------------------------
DROP TABLE IF EXISTS `tb_visit_log`;
CREATE TABLE `tb_visit_log` (
  `UserName` varchar(64) DEFAULT NULL COMMENT '用户名',
  `VisitorTime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '访问时间',
  `VisitorService` varchar(64) DEFAULT NULL COMMENT '请求服务',
  `VisitorUrl` varchar(64) DEFAULT NULL COMMENT '请求API资源',
  `Method` varchar(32) DEFAULT NULL COMMENT '请求方式',
  `RemoteAddress` varchar(64) DEFAULT NULL COMMENT '访问者远程地址'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_visit_log
-- ----------------------------
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
