<template>
 <div>
     <b-tabs>
         <b-tab title="设备详情" active @click="isback">
                <b-alert
                    :show="testCountDown"
                    @dismissed="testCountDown=0"
                    @dismiss-count-down="countDownChanged"
                    >
                    <p>正在测试连接 {{testCountDown}} s...</p>
                    <b-progress
                        variant="warning"
                        :max="testSecs"
                        :value="testCountDown"
                        height="3px"
                    ></b-progress>
                </b-alert>
   <div class="row" style="margin-top:10px">
        <div class="col-md-6">
                <b-form-group
                        label="选择设备"
                        label-cols-sm="2"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="deviceSelect"
                        class="mb-10"
                    >
                    <b-input-group size="sm">
                        <b-form-select id="deviceSelect" :options="devicesName" >       
                        </b-form-select>
                    </b-input-group>
                </b-form-group>
        </div>
    <div class="col-md-6">
        <div class="d-block form-inline text-right">
                       <button class="btn btn-info btn-sm" v-on:click="create" style="margin-right:10px">新增</button>
                       <button class="btn btn-danger btn-sm" @click="deldevice = !deldevice">删除</button>
        </div>
    </div>
     <div class="col-md-6">
       <div class="col-md-12">
            <div class="main-card mb-2 card">
                <div class="card-header mb-3"><h5><i class="pe-7s-monitor" /> <span> 设备信息</span>
                      <button style="float:right" class="btn btn-warning btn-sm"  v-on:click="test">测试连接</button>
                   </h5></div>
                <div class="card-body">
                   <b-row class="mb-3">
                   <b-col sm="3">
                       <label for="devicename">设备名称 : </label>
                   </b-col>
                   <b-col sm="9">
                        <b-form-input id="devicename" type="text" v-model="name" :value="name" :readonly="disable" ></b-form-input>
                   </b-col>
                   </b-row>
                   <b-row class="mb-3">
                   <b-col sm="3">
                       <label for="belong">设备归属 : </label>
                   </b-col>
                   <b-col sm="9">
                        <b-form-input id="belong" type="text" v-model="belong" :value="belong" :readonly="disable"></b-form-input>
                   </b-col>
                   </b-row>
                   <b-row class="mb-3">
                   <b-col sm="3">
                       <label for="ip">IP : </label>
                   </b-col>
                   <b-col sm="9">
                        <b-form-input id="ip" type="text" v-model="ip" :value="ip" :readonly="disable"></b-form-input>
                   </b-col>
                   </b-row>
                   <b-row class="mb-3">
                   <b-col sm="3">
                       <label for="port">端口 : </label>
                   </b-col>
                   <b-col sm="9">
                        <b-form-input id="port" type="number" v-model="port" :value="port" :readonly="disable"></b-form-input>
                   </b-col>
                   </b-row>
                </div>
                <div class="d-block form-inline text-right card-footer">
                       <button class="btn btn-info btn-sm" v-on:click="edit" style="margin-right:10px">编辑</button>
                       <button class="btn btn-success btn-sm" v-on:click="save" :disabled="disable">保存</button>
                </div>
            </div>
        </div>
        <div class="col-md-12">
                <div class="main-card mb-2 card">
                    <div class="card-header mb-3"><h5><i class="pe-7s-drop" /> <span> 阈值设定</span>
                    </h5>
                    </div>
                    <div class="card-body">
                        <b-alert
                            :show="testCountDown"
                            dismissible
                            @dismissed="testCountDown=0"
                            @dismiss-count-down="countDownChanged"
                            >
                            <p>{{resetmessage}}</p>
                        </b-alert>
                        <b-row class="mb-3">
                            <b-col sm="3">
                                <label for="temperature1">温度预警下限 : </label>
                            </b-col>
                            <b-col sm="7">
                                    <b-form-input id="temperature1" type="range" v-model="temperature_min" min="-5" max="60"></b-form-input>
                            </b-col>
                            <b-col sm="2">
                                {{temperature_min}}°C
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col sm="3">
                                <label for="temperature2">温度预警上限 : </label>
                            </b-col>
                            <b-col sm="7">
                                    <b-form-input id="temperature2" type="range" v-model="temperature_max" min="-5" max="60"></b-form-input>
                            </b-col>
                            <b-col sm="2">
                                {{temperature_max}}°C
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col sm="3">
                                <label for="humidity1">湿度预警下限 : </label>
                            </b-col>
                            <b-col sm="7">
                                    <b-form-input id="humidity1" type="range" v-model="humidity_min" min="10" max="100"></b-form-input>
                            </b-col>
                            <b-col sm="2">
                                {{humidity_min}}%
                            </b-col>
                        </b-row>
                        <b-row class="mb-3">
                            <b-col sm="3">
                                <label for="humidity2">湿度预警上限 : </label>
                            </b-col>
                            <b-col sm="7">
                                    <b-form-input id="humidity2" type="range" v-model="humidity_max" min="10" max="100"></b-form-input>
                            </b-col>
                            <b-col sm="2">
                                {{humidity_max}}%
                            </b-col>
                        </b-row>
                    </div>
                    <div class="d-block form-inline text-right card-footer">
                       <button class="btn btn-success btn-sm" v-on:click="reset">保存更改</button>
                    </div>
                </div>
            </div>
    </div>
       <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">设备状态</div>
                                                <div class="widget-subheading">Device status</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-success">正常</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">设备温度</div>
                                                <div class="widget-subheading">Device temperature</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-primary">26°C</div>
                                            </div>
                                        </div>
                                        <div class="widget-progress-wrapper">
                                            <b-progress :value="26" variant="info" :striped="striped" class="mb-2"></b-progress>
                                       </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">设备湿度</div>
                                                <div class="widget-subheading">Device humidity</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-danger">65%</div>
                                            </div>
                                        </div>
                                        <div class="widget-progress-wrapper">
                                            <b-progress :value="65" variant="success" :striped="striped" class="mb-2"></b-progress>
                                       </div>
                                    </div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                 <div class="widget-content p-0">
                                    <div class="widget-content-outer">
                                        <div class="widget-content-wrapper">
                                            <div class="widget-content-left">
                                                <div class="widget-heading">柜体使用率</div>
                                                <div class="widget-subheading">Device usage</div>
                                            </div>
                                            <div class="widget-content-right">
                                                <div class="widget-numbers text-info">60%</div>
                                            </div>
                                        </div>
                                        <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                           <ve-pie :data="pieData"></ve-pie>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>
         </b-tab>
         <b-tab :title="title" :active="!active" :disabled="active">
            <div class="col-md-6">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <form class="">
                            <div class="position-relative form-group"><label for="devicename"
                                                                             class="">设备名称</label>
                                                                             <input name="name"
                                                                                    id="devicename"
                                                                                    type="text"
                                                                                    class="form-control">
                            </div>
                            <div class="position-relative form-group"><label for="devicebelong" class="">设备归属</label>
                                  <Tree></Tree>
                            </div>
                            <div class="position-relative form-group">
                                <label for="deviceip" class="">设备IP</label>
                                <input name="ip" id="deviceip" type="text" class="form-control">
                            </div>
                            <div class="position-relative form-group">
                                <label for="deviceport" class="">端口</label>
                                <input name="port" id="deviceport" type="number" class="form-control">
                            </div>
                            <button class="mt-1 btn btn-primary">提交</button>
                        </form>
                    </div>
                </div>
            </div>
         </b-tab>
     </b-tabs>
     <b-modal v-model="deldevice" title="操作确认" size="sm" centered >
         确定删除该设备
      <template slot="modal-ok">确认 </template>
      <template slot="modal-cancel">取消 </template>
    </b-modal>
 </div>
</template>
<script>
import Tree from './Tree'
export default {
    components:{
       Tree
    },
    data: ()=>({
        pieData: {
            columns: ['状态', '数量'],
            rows:[
                {'状态':'已使用','数量':15},
                {'状态':'未使用','数量':8},
                {'状态':'故障','数量':2},
            ]
        },
        devicesName:['设备1','设备2','设备3','设备4','设备5','设备6'],
        disable : true,
        name:'设备1',
        belong:'测试部',
        ip:'192.168.1.110',
        port:5040,
        temperature_min:5,
        temperature_max:45,
        humidity_min:20,
        humidity_max:80,
        testSecs: 10,
        resetSecs:1,
        testCountDown: 0,
        resetmessage: '设置成功',
        striped: true,
        active:true,
        title:'',
        deldevice:false
    }),
    methods:{
        edit : function(){
              this.disable = false
        },
        save : function(){
              this.disable = true
        },
        reset(){
            this.testCountDown =this.resetSecs
        },
        test(){
            this.testCountDown = this.testSecs
        },
        countDownChanged(testCountDown) {
            this.testCountDown = testCountDown
        },
        showconfirm(){
        
        },
        create(){
            this.title = "新增设备";
            this.active = false;
        },
        isback(){
            this.title = "";
            this.active = true;
        }
    }
}
</script>