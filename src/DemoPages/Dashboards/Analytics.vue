<template>
    <div>
        <div class="row">
            <div class="col-sm-12 col-lg-6">
                <div class="mb-3 card" style="height:450px">
                    <div class="card-header-tab card-header bg-info">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="pe-7s-graph"> </i>
                            设备状态
                        </div>
                    </div>
                    <div class="p-0 card-body">
                        <div class="p-1 slick-slider-sm mx-auto">
                            <div class="widget-chart widget-chart2 text-left p-0">
                                <div class="widget-chat-wrapper-outer">
                                    <div class="widget-chart-content widget-chart-content-lg pb-0">
                                        <div class="widget-chart-flex">
                                            <div class="widget-title text-muted text-uppercase"><span style="font-size:24px;color:green">16</span> 设备总数</div>
                                        </div>
                                        <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                                           <ve-pie :data="pieData"></ve-pie>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-lg-6">
                <div class="card-hover-shadow-2x mb-3 card" style="height:450px">
                    <div class="card-header-tab card-header bg-info">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal">
                            <i class="pe-7s-graph2"> </i>
                            设备利用率
                        </div>
                    </div>
                   <div class="p-0 card-body">
                        <div class="widget-chart-flex text-center">
                                   <b-form-radio-group id="btnradios2"
                                        size="sm"
                                        button-variant="outline-primary"
                                        v-model="selected2"
                                        :options="options2"
                                        @change="change"
                                        name="radioBtnOutline"/>
                        </div>
                       <div class="widget-chart-wrapper he-auto opacity-10 m-0">
                          <ve-gauge :data="gaugeData" :settings="gaugeSettings"></ve-gauge>
                       </div>
                   </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-lg-12">
                <div class="card-hover-shadow-2x mb-3 card">
                    <div class="card-header-tab card-header bg-info">
                        <div class="card-header-title font-size-lg text-capitalize font-weight-normal"><i
                            class="pe-7s-graph1"> </i>设备利用率走势图
                        </div>
                    </div>
                     <div class="p-0 card-body">
                      <div class="widget-chart-flex text-right">
                                   <b-form-radio-group id="btnradios1"
                                        size="sm"
                                        button-variant="outline-primary"
                                        v-model="selected1"
                                        :options="options1"
                                        @change="change1"
                                        name="radioBtnOutline1"/>
                        </div>
                      <div class="widget-chart-wrapper he-auto opacity-10">
                       <ve-line :data="lineData" :settings="lineSettings" judge-width></ve-line>
                      </div>
                     </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
     export default {
        components: {
        },
        data: () => ({
            pieData: {
                columns: ['状态', '数量'],
                rows:[
                    {'状态':'工作中','数量':5},
                    {'状态':'未连接','数量':6},
                    {'状态':'故障','数量':1},
                    {'状态':'空闲','数量':5}
                ]
            },
            gaugeSettings: {
                dataType: {
                    '占比': 'percent'
                },
                seriesMap: {
                    '占比':{
                        min: 0,
                        max: 1
                    }
                },
                dataName: {
                   '占比': '使用率'
                }
            },
            gaugeData: {
                columns: ['type', 'value'],
                rows:[
                    {type: '占比', value: 0.71}
                ]
            },
            lineSettings: {
                xAxisType: 'time',
                min:[0,0],
                max:[100,100],
                area: true
            },
            lineData: {
                columns: ['日期','开机利用率','设备利用率'],
                rows: [
                    {'日期':'2019-08-22', '开机利用率': 50, '设备利用率': 45},
                    {'日期':'2019-08-23', '开机利用率': 60, '设备利用率': 47},
                    {'日期':'2019-08-24', '开机利用率': 60, '设备利用率': 48},
                    {'日期':'2019-08-25', '开机利用率': 80, '设备利用率': 55},
                    {'日期':'2019-08-26', '开机利用率': 74, '设备利用率': 57},
                    {'日期':'2019-08-27', '开机利用率': 76, '设备利用率': 55},
                    {'日期':'2019-08-28', '开机利用率': 54, '设备利用率': 50}
                ] 
            },
            data_week:[
                    {'日期':'2019-08-22', '开机利用率': 50, '设备利用率': 45},
                    {'日期':'2019-08-23', '开机利用率': 60, '设备利用率': 47},
                    {'日期':'2019-08-24', '开机利用率': 60, '设备利用率': 48},
                    {'日期':'2019-08-25', '开机利用率': 80, '设备利用率': 55},
                    {'日期':'2019-08-26', '开机利用率': 74, '设备利用率': 57},
                    {'日期':'2019-08-27', '开机利用率': 76, '设备利用率': 55},
                    {'日期':'2019-08-28', '开机利用率': 54, '设备利用率': 50}
            ],
            data_month:[
                    {'日期':'2019-07-29', '开机利用率': 50, '设备利用率': 45},
                    {'日期':'2019-07-30', '开机利用率': 60, '设备利用率': 47},
                    {'日期':'2019-07-31', '开机利用率': 60, '设备利用率': 48},
                    {'日期':'2019-08-01', '开机利用率': 80, '设备利用率': 55},
                    {'日期':'2019-08-02', '开机利用率': 74, '设备利用率': 57},
                    {'日期':'2019-08-03', '开机利用率': 76, '设备利用率': 55},
                    {'日期':'2019-08-04', '开机利用率': 65, '设备利用率': 53},
                    {'日期':'2019-08-05', '开机利用率': 43, '设备利用率': 38},
                    {'日期':'2019-08-06', '开机利用率': 29, '设备利用率': 22},
                    {'日期':'2019-08-07', '开机利用率': 67, '设备利用率': 36},
                    {'日期':'2019-08-08', '开机利用率': 56, '设备利用率': 42},
                    {'日期':'2019-08-09', '开机利用率': 56, '设备利用率': 47},
                    {'日期':'2019-08-10', '开机利用率': 64, '设备利用率': 49},
                    {'日期':'2019-08-11', '开机利用率': 65, '设备利用率': 59},
                    {'日期':'2019-08-12', '开机利用率': 65, '设备利用率': 58},
                    {'日期':'2019-08-13', '开机利用率': 68, '设备利用率': 48},
                    {'日期':'2019-08-14', '开机利用率': 70, '设备利用率': 54},
                    {'日期':'2019-08-15', '开机利用率': 67, '设备利用率': 53},
                    {'日期':'2019-08-16', '开机利用率': 64, '设备利用率': 54},
                    {'日期':'2019-08-17', '开机利用率': 65, '设备利用率': 50},
                    {'日期':'2019-08-18', '开机利用率': 58, '设备利用率': 51},
                    {'日期':'2019-08-19', '开机利用率': 69, '设备利用率': 43},
                    {'日期':'2019-08-20', '开机利用率': 58, '设备利用率': 50},
                    {'日期':'2019-08-21', '开机利用率': 63, '设备利用率': 49},
                    {'日期':'2019-08-22', '开机利用率': 60, '设备利用率': 51},
                    {'日期':'2019-08-23', '开机利用率': 59, '设备利用率': 48},
                    {'日期':'2019-08-24', '开机利用率': 60, '设备利用率': 46},
                    {'日期':'2019-08-25', '开机利用率': 59, '设备利用率': 48},
                    {'日期':'2019-08-26', '开机利用率': 65, '设备利用率': 58},
                    {'日期':'2019-08-27', '开机利用率': 64, '设备利用率': 54},
                    {'日期':'2019-08-28', '开机利用率': 63, '设备利用率': 56}
            ],
            selected1:'week',
            options1: [
                {text: '近7天', value: 'week'},
                {text: '近30天', value: 'month'}
            ],
            selected2: 'yesterday',
            options2: [
                {text: '昨日', value: 'yesterday'},
                {text: '近7天', value: 'week'},
                {text: '近30天', value: 'month'}
            ]
        }),

        methods: {
            change : function(event) {
                if(event == 'yesterday'){
                    this.gaugeData.rows[0].value=0.71; 
                }
                if(event == 'week'){
                    this.gaugeData.rows[0].value=0.68; 
                }
                if(event == 'month'){
                    this.gaugeData.rows[0].value=0.69; 
                }
            },
            change1 : function(event) {
                if(event == 'week'){
                    this.lineData.rows=this.data_week
                }
                else{
                    this.lineData.rows=this.data_month
                }
            }
        },

    }


</script>
