<template>
    <div class="d-flex">
        <div class="header-btn-lg pr-0">
            <div class="widget-content p-0">
                <div class="widget-content-wrapper">
                    <div class="widget-content-left">
                        <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
                            <span slot="button-content">
                                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                                    <img width="42" class="rounded-circle" src="@/assets/images/avatars/user.png" alt="">
                                </div>
                            </span>
                            <button type="button" tabindex="0" class="dropdown-item">首页</button>
                            <button type="button" tabindex="0" class="dropdown-item">修改密码</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0" class="dropdown-item" @click="logout">注销</button>
                        </b-dropdown>
                    </div>
                    <div class="widget-content-left  ml-3 header-user-info">
                        <div class="widget-heading">{{user.name}}</div>
                        <div class="widget-subheading">{{user.role}}</div>
                    </div>
                    <div class="widget-content-right header-user-info ml-3">
                        <b-dropdown toggle-class="p-2 mr-0" menu-class="dropdown-menu-sm" variant="link" right>
                             <span slot="button-content">
                                <i class="pe-7s-bell"/> 
                             </span>
                             <Notification></Notification>
                        </b-dropdown> 
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import Notification from "../Notification.vue";
    import {library} from '@fortawesome/fontawesome-svg-core'
    import {
        faAngleDown,
        faBackward,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faEdit,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
        faEye,
        faEyeSlash,
        faPlus,
        faFax,
        faTimes
    } from '@fortawesome/free-solid-svg-icons'

    library.add(
        faAngleDown,
        faBackward,
        faCalendarAlt,
        faTrashAlt,
        faCheck,
        faEdit,
        faEye,
        faEyeSlash,
        faFax,
        faFileAlt,
        faCloudDownloadAlt,
        faFileExcel,
        faFilePdf,
        faFileArchive,
        faEllipsisH,
        faPlus,
        faTimes
    );

    export default {
        components: {
            Notification
        },
        data: () => ({
            unread:5,
            user:{
                name:'道联',
                role:'系统管理员'
            }
        }),

        methods: {
            logout(){
                this.$router.replace('/login')
            }
        }
    }


</script>
