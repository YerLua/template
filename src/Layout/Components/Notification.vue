<template>
 <div class="main-card card">
        <div class="card-body"><h5 class="card-title">
            系统公告</h5>
        <div class="vertical-time-simple vertical-without-time vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
            <div class="dot-success vertical-timeline-element">
            <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                <h4 class="timeline-title">系统上线使用啦</h4>
                </div>
            </div>
            </div>
            <div class="dot-warning vertical-timeline-element">
            <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                <p><span class="text-success">15:00 PM，</span>xxx设备温度异常</p>
                </div>
            </div>
            </div>
            <div class="dot-success vertical-timeline-element">
            <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                <p><span class="text-success">08:00 AM，</span>xxx设备上线</p>
                </div>
            </div>
            </div>
            <div class="dot-primary vertical-timeline-element">
            <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                <h4 class="timeline-title">
                    xxx设备已维修
                </h4>
                </div>
            </div>
            </div>
            <div class="dot-info vertical-timeline-element">
            <div>
                <span class="vertical-timeline-element-icon bounce-in"></span>
                <div class="vertical-timeline-element-content bounce-in">
                <h4 class="timeline-title">xxx新增了一条设备维修信息</h4>
                </div>
            </div>
            </div>
        </div>
    </div>
     <div class="d-block form-inline text-center card-footer">
         <button class="btn btn-sm btn-success" @click="msgSetting">消息管理</button>
     </div>
 </div>
</template>
<script>
export default {
    name:'Notification',
    components:{

    },
    methods:{
        msgSetting(){
            this.$router.replace('/system/messagemanager')
        },
    }
}
</script>