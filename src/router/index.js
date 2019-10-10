import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes: [

        // Dashboards

        {
            path: '/',
            name: 'analytics',
            component: () => import('../DemoPages/Dashboards/Analytics.vue'),
        },

        // Pages

        {
            path: '/login',
            name: 'login',
            meta: {layout: 'userpages'},
            component: () => import('../DemoPages/UserPages/LoginBoxed.vue'),
        },

        {
            path: '/system/messagemanager',
            name: 'messagemanager',
            component: () => import('../DemoPages/BaseInfo/MessageManager.vue'),
        },
        {
            path: '/device/maintenance',
            name: 'maintenance',
            component: () => import('../DemoPages/BaseInfo/DeviceMaintenance.vue'),
        },
        {
            path: '/device/deviceinfo',
            name: 'deviceinfo',
            component: () => import('../DemoPages/BaseInfo/DeviceInfo.vue'),
        },
        {
            path: '/device/devicedetail',
            name: 'devicedetail',
            component: () => import('../DemoPages/BaseInfo/DeviceDetail.vue'),
        },
        {
            path: '/device/devicerepair',
            name: 'devicerepair',
            component: () => import('../DemoPages/BaseInfo/DeviceRepair.vue'),
        },
        {
            path: '/device/repairassign',
            name: 'repairassign',
            component: () => import('../DemoPages/BaseInfo/DeviceRepairAssign.vue'),
        },
        {
            path: '/bussiness/passportoper',
            name: 'passportoper',
            component: () => import('../DemoPages/BaseInfo/PassportOper.vue'),
        },
        {
            path: '/bussiness/exitentrystatic',
            name: 'exitentrystatic',
            component: () => import('../DemoPages/BaseInfo/ExitEntryStatic.vue'),
        },
        {
            path: '/user/userList',
            name: 'userList',
            component: () => import('../DemoPages/UserMgr/UserList.vue'),
        },
        {
            path: '/user/roleMgr',
            name: 'roleMgr',
            component: () => import('../DemoPages/UserMgr/RoleMgr.vue'),
        },
        {
            path: '/user/permissionMgr',
            name: 'permissionMgr',
            component: () => import('../DemoPages/UserMgr/PermissionMgr.vue'),
        },
    ]
})
