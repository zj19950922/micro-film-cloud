const menuList = [
    {
        "menuId": 409435818319679488,
        "path": "/admin/home",
        "component": "Layout",
        "redirect": "/",
        "title": "首页",
        "icon": "",
        "hidden": false,
        "parentId": 0,
        "type": 0,
        "operation": 1,
        "remark": "",
        "children": null,
    },
    {
        "menuId": 409435818319679488,
        "path": "/admin/system",
        "component": "Layout",
        "redirect": "/",
        "title": "系统管理",
        "icon": "setting",
        "hidden": false,
        "parentId": 0,
        "type": 0,
        "operation": 1,
        "remark": "",
        "children": [
            {
                "menuId": 409438278782291968,
                "path": "/admin/system/menu",
                "component": "Layout",
                "redirect": "/admin/system/menu",
                "title": "菜单管理",
                "icon": "apartment",
                "hidden": false,
                "parentId": 409435818319679488,
                "type": 1,
                "operation": 1,
                "remark": "系统初始化生成",
                "children": null
            },
            {
                "menuId": 409438278782291969,
                "path": "/admin/system/org",
                "component": "Layout",
                "redirect": "/admin/system/org",
                "title": "机构管理",
                "icon": "apartment",
                "hidden": false,
                "parentId": 409435818319679488,
                "type": 1,
                "operation": 1,
                "remark": "系统初始化生成",
                "children": null
            },
        ]
    }

    // 菜单相关路由
    // { key: '/admin/home', title: '首页', icon: 'mobile', component: 'Dashboard' },
    // {
    //     key: '/admin/ui',
    //     title: 'UI',
    //     icon: 'scan',
    //     children: [
    //         { key: '/admin/ui/buttons', title: '按钮', component: 'Buttons' },
    //         { key: '/admin/ui/icons', title: '图标', component: 'Icons' },
    //         { key: '/admin/ui/spins', title: '加载中', component: 'Spins' },
    //         { key: '/admin/ui/modals', title: '对话框', component: 'Modals' },
    //         { key: '/admin/ui/notifications', title: '通知提醒框', component: 'Notifications' },
    //         { key: '/admin/ui/tabs', title: '标签页', component: 'Tabs' },
    //         { key: '/admin/ui/banners', title: '轮播图', component: 'Banners' },
    //         { key: '/admin/ui/wysiwyg', title: '富文本', component: 'WysiwygBundle' },
    //         { key: '/admin/ui/drags', title: '拖拽', component: 'Drags' },
    //         { key: '/admin/ui/gallery', title: '画廊', component: 'Gallery' },
    //         { key: '/admin/ui/map', title: '地图', component: 'MapUi' },
    //     ],
    // },
];
export default menuList;