<template>
    <div class="app-sidebar sidebar-shadow" @mouseover="toggleSidebarHover('add','closed-sidebar-open')" @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')">
        <div class="app-header__logo">
            <div class="logo-src"/>
            <div class="header__pane ml-auto">
                <button type="button" class="hamburger close-sidebar-btn hamburger--elastic" v-bind:class="{ 'is-active' : isOpen }" @click="toggleBodyClass('closed-sidebar')">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </button>
            </div>
        </div>
        <div class="app-sidebar-content">
            <VuePerfectScrollbar class="app-sidebar-scroll" v-once>
                <sidebar-menu showOneChild :menu="menu"/>
            </VuePerfectScrollbar>
        </div>

    </div>
</template>

<script>
    import {SidebarMenu} from 'vue-sidebar-menu'
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'

    export default {
        components: {
            SidebarMenu,
            VuePerfectScrollbar
        },
        data() {
            return {
                isOpen: false,
                sidebarActive: false,

                menu: [
                    {
                        header: true,
                        title: '系统',
                    },
                    {
                        title: '首页',
                        icon: 'pe-7s-rocket',
                        href: '/'
                    },
                    {
                        header: true,
                        title: '业务',
                    },
                    {
                        title: '护照业务',
                        icon: 'pe-7s-edit',
                        href: '/bussiness/passportoper'
                    },
                    {
                        title: '出入境统计',
                        icon: 'pe-7s-graph1',
                        href: '/bussiness/exitentrystatic'
                    },
                    {
                        header: true,
                        title: '设备',
                    },
                    {
                        icon: 'pe-7s-albums',
                        title:'设备列表',
                        href:'/device/deviceinfo'
                    },
                    {
                        icon: 'pe-7s-tools',
                        title:'设备维修',
                        child:[
                           {
                               title: '维修记录',
                               href:'/device/devicerepair'
                           },
                           {
                               title: '维修指派',
                               href:'/device/repairassign'
                           }
                        ],
                       
                    },
                    // {
                    //     icon: 'pe-7s-diamond',
                    //     title: 'Elements',
                    //     child: [
                    //         {
                    //             title: 'Buttons',
                    //             child: [
                    //                 {
                    //                     title: 'Standard',
                    //                     href: '/elements/buttons-standard',
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             title: 'Dropdowns',
                    //             href: '/elements/dropdowns',
                    //         },
                    //         {
                    //             title: 'Icons',
                    //             href: '/elements/icons',
                    //         },
                    //         {
                    //             title: 'Badges',
                    //             href: '/elements/badges-labels',
                    //         },
                    //         {
                    //             title: 'Cards',
                    //             href: '/elements/cards',
                    //         },
                    //         {
                    //             title: 'List Groups',
                    //             href: '/elements/list-group',
                    //         },
                    //         {
                    //             title: 'Timeline',
                    //             href: '/elements/timelines',
                    //         },
                    //         {
                    //             title: 'Utilities',
                    //             href: '/elements/utilities',
                    //         },
                    //     ],
                    // },
                    // {
                    //     icon: 'pe-7s-car',
                    //     title: 'Components',
                    //     child: [
                    //         {
                    //             title: 'Tabs',
                    //             href: '/components/tabs',
                    //         },
                    //         {
                    //             title: 'Accordions',
                    //             href: '/components/accordions',
                    //         },
                    //         {
                    //             title: 'Modals',
                    //             href: '/components/modals',
                    //         },
                    //         {
                    //             title: 'Progress Bar',
                    //             href: '/components/progress-bar',
                    //         },
                    //         {
                    //             title: 'Tooltips & Popovers',
                    //             href: '/components/tooltips-popovers',
                    //         },
                    //         {
                    //             title: 'Carousel',
                    //             href: '/components/carousel',
                    //         },
                    //         {
                    //             title: 'Pagination',
                    //             href: '/components/pagination',
                    //         },
                    //         {
                    //             title: 'Maps',
                    //             href: '/components/maps',
                    //         },
                    //     ],
                    // },
                    // {
                    //     icon: 'pe-7s-display2',
                    //     title: 'Tables',
                    //     child: [
                    //         {
                    //             title: 'Regular Tables',
                    //             href: '/tables/regular-tables',
                    //         },
                    //     ]
                    // },
                    {
                        header: true,
                        title: '用户',
                    },
                    {
                        icon: 'pe-7s-users',
                        title: '用户管理',
                        child:[
                            {
                                icon: 'pe-7s-albums',
                                title: '用户列表',
                                href: '/user/userList',
                            },
                            {
                                title: '角色管理',
                                icon:'pe-7s-user',
                                href:'/user/roleMgr',
                            },
                            {
                                title: '权限管理',
                                icon:'pe-7s-key',
                                href:'/user/permissionMgr',
                            }
                        ]
                    },
                    // {
                    //     header: true,
                    //     title: 'Forms',
                    // },
                    // {
                    //     icon: 'pe-7s-light',
                    //     title: 'Elements',
                    //     child: [
                    //         {
                    //             title: 'Controls',
                    //             href: '/forms/controls',
                    //         },
                    //         {
                    //             title: 'Layouts',
                    //             href: '/forms/layouts',
                    //         },
                    //     ],
                    // },
                    {
                        header: true,
                        title: '设置',
                    },
                    {
                        icon: 'pe-7s-graph2',
                        title: '基础资料',
                        child:[
                            {
                                title: '设备档案',
                                href: '/device/devicedetail',
                            },
                            {
                                title: '设备维保',
                                href:'/device/maintenance',
                            }
                        ]
                    },
                ],
                collapsed: true,

                windowWidth: 0,

            }
        },
        props: {
            sidebarbg: String,
        },
        methods: {

            toggleBodyClass(className) {
                const el = document.body;
                this.isOpen = !this.isOpen;

                if (this.isOpen) {
                    el.classList.add(className);
                } else {
                    el.classList.remove(className);
                }
            },
            toggleSidebarHover(add, className) {
                const el = document.body;
                this.sidebarActive = !this.sidebarActive;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth > '992') {
                    if (add === 'add') {
                        el.classList.add(className);
                    } else {
                        el.classList.remove(className);
                    }
                }
            },
            getWindowWidth() {
                const el = document.body;

                this.windowWidth = document.documentElement.clientWidth;

                if (this.windowWidth < '1350') {
                    el.classList.add('closed-sidebar', 'closed-sidebar-md');
                } else {
                    el.classList.remove('closed-sidebar', 'closed-sidebar-md');
                }
            },
        },
        mounted() {
            this.$nextTick(function () {
                window.addEventListener('resize', this.getWindowWidth);

                //Init
                this.getWindowWidth()
            })
        },

        beforeDestroy() {
            window.removeEventListener('resize', this.getWindowWidth);
        }
    }
</script>
