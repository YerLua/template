<template>
  <div>
    <b-tabs>
       <b-tab title="维修记录" active @click="isback">
          <div class="row">
      <div class="main-card mb-3 card col-md-12">
        <div class="card-body">
         <div class="row">
                <div class="col-md-6">
                    <b-form-group
                        label="排序"
                        label-cols-sm="3"
                        label-align-sm="right"
                        label-size="sm"
                        label-for="sortBySelect"
                        class="mb-10"
                    >
                    <b-input-group size="sm">
                        <b-form-select v-model="sortBy" id="sortBySelect" :options="sortOptions" class="w-75">
                        <option slot="first" value="">-- 无 --</option>
                        </b-form-select>
                        <b-form-select v-model="sortDesc" size="sm" :disabled="!sortBy" class="w-25">
                        <option :value="false">Asc</option>
                        <option :value="true">Desc</option>
                        </b-form-select>
                    </b-input-group>
                    </b-form-group>
                </div>
                <div class="col-md-6">
                    <b-form-group
                    label="排序规则"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="initialSortSelect"
                    class="mb-10"
                    >
                    <b-form-select
                        v-model="sortDirection"
                        id="initialSortSelect"
                        size="sm"
                        :options="['asc', 'desc', 'last']"
                    ></b-form-select>
                    </b-form-group>
                </div>
         </div>
         <div class="row">
            <div class="col-md-6">
                    <b-form-group
                    label="查询"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    label-for="filterInput"
                    class="mb-3"
                    >
                    <b-input-group size="sm">
                        <b-form-input
                        v-model="filter"
                        type="search"
                        id="filterInput"
                        placeholder="输入查询条件"
                        ></b-form-input>
                        <b-input-group-append>
                        <b-button variant='primary' :disabled="!filter" @click="filter = ''">清 除</b-button>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </div>
         <div class="col-md-6">
                    <b-form-group
                    label="过滤条件"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="sm"
                    description="选择一列以过滤数据"
                    class="mb-3">
                    <b-form-checkbox-group v-model="filterOn" class="mt-1">
                        <b-form-checkbox value="name">名称</b-form-checkbox>
                        <b-form-checkbox value="malfunction_type">故障类型</b-form-checkbox>
                        <b-form-checkbox value="malfunction_position">故障部位</b-form-checkbox>
                        <b-form-checkbox value="level">紧急程度</b-form-checkbox>
                    </b-form-checkbox-group>
                    </b-form-group>
                </div>
         </div>
         <div class="d-block form-inline text-right">
             <button class="btn btn-success btn-sm" v-on:click="create"> 
                 <font-awesome-icon class="mr-2" icon="plus"/>
                   新增
             </button>
        </div>
        <b-table
                show-empty
                small
                stacked="md"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                :filter="filter"
                :filterIncludedFields="filterOn"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :sort-direction="sortDirection"
                @filtered="onFiltered"
            >
            <template slot="actions" slot-scope="row">
                <button :id="'see'+ row.index" class="border-0 btn-transition btn btn-outline-info" @click="row.toggleDetails">
                <font-awesome-icon icon="eye"/>
                </button>
                <button :id="'trash'+row.index" class="border-0 btn-transition btn btn-outline-danger" v-on:click="items.splice(row.index,1)">
                    <font-awesome-icon icon="trash-alt"/>
                </button>
                <b-tooltip :target="'see'+row.index" placement="top" title="详细信息"></b-tooltip>
                <b-tooltip :target="'trash'+row.index" placement="top" title="删除"></b-tooltip>
            </template>
            <template slot="row-details" slot-scope="row">
            <b-card>
            <ul class="list-group">
                <li class="list-group-item">主维修人 : {{row.item.master}}</li>
                <li class="list-group-item">辅维修人 : {{row.item.assist}}</li>
                <li class="list-group-item">故障描述 : {{row.item.descr}}</li>
                <li class="list-group-item">备注 : {{row.item.remark}}</li>
            </ul>
            </b-card>
            </template>
        </b-table>
        <div class="row">
            <div class="col-md-1 col-sm-3">
                <b-form-group
                    label=""
                    label-align-sm="right"
                    label-size="sm"
                    label-for="perPageSelect"
                >
                <b-form-select
                    v-model="perPage"
                    id="perPageSelect"
                    size="sm"
                    :options="pageOptions"
                ></b-form-select>
                </b-form-group>
        </div>
        <div class ="col-md-5">
            <b-pagination
                    v-model="currentPage"
                    :total-rows="totalRows"
                    :per-page="perPage"
                    size="sm"
                    align="fill"
            ></b-pagination>    
        </div>
          </div>
         </div>
         </div>
        </div>
       </b-tab>
       <b-tab :title="title" :active="!active" :disabled="active">
        <div class="col-md-8">
                <div class="main-card mb-3 card">
                    <div class="card-body">
                        <form class="">
                             <div class="row">
                               <div class="col-md-6">
                                  <b-form-group
                                    label="设备名称"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="devicename"
                                    class="mb-3"
                                    >
                                     <b-form-select
                                        v-model="repair.name"
                                        required
                                        id="devicename"
                                        size="sm"
                                        :options="['设备1', '设备2', '设备3','设备4']"
                                    ></b-form-select>
                                   </b-form-group>
                               </div>
                               <div class="col-md-6">
                                    <b-form-group
                                    label="故障分类"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="malfunctiontype"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="repair.malfunction_type"
                                        required
                                        id="malfunctiontype"
                                        size="sm"
                                        :options="['热电偶-感温线', '烟雾报警器', '指示灯', '湿度传感器', '格子','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                    <b-form-group
                                    label="故障部位"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="malfunctionposition"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="repair.malfunction_positon"
                                        required
                                        id="malfunctionposition"
                                        size="sm"
                                        :options="['本机', '门禁', '壳体', '电路板','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                    <b-form-group
                                    label="紧急程度"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="level"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="repair.level"
                                        required
                                        id="level"
                                        size="sm"
                                        :options="['常规', '紧急', '特急','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                    <b-form-group
                                    label="开始时间"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="time_start"
                                    class="mb-10"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="repair.start_time_date"
                                            required
                                            type="date"
                                            id="time_start"
                                        ></b-form-input>
                                        <b-form-input
                                            v-model="repair.start_time_time"
                                            required
                                            type="time"
                                        ></b-form-input>
                                    </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                    <b-form-group
                                    label="结束时间"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="time_end"
                                    class="mb-10"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="repair.end_time_date"
                                            required
                                            type="date"
                                            id="time_end"
                                        ></b-form-input>
                                        <b-form-input
                                            v-model="repair.end_time_time"
                                            required
                                            type="time"
                                        ></b-form-input>
                                    </b-input-group>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                  <b-form-group
                                    label="维修时长"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="duration"
                                    class="mb-3"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="repair.duration"
                                            required
                                            type="text"
                                            id="duration"
                                        ></b-form-input>
                                    </b-input-group>
                                   </b-form-group>
                               </div>
                               <div class="col-md-6">
                                    <b-form-group
                                    label="维修结果"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="result"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="repair.result"
                                        required
                                        id="result"
                                        size="sm"
                                        :options="['已修', '未修好', '已指派','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-6">
                                  <b-form-group
                                    label="主维修人"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="master"
                                    class="mb-3"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="repair.master"
                                            required
                                            type="text"
                                            id="master"
                                        ></b-form-input>
                                    </b-input-group>
                                   </b-form-group>
                               </div>
                               <div class="col-md-6">
                                  <b-form-group
                                    label="辅维修人"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="assist"
                                    class="mb-3"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="repair.assist"
                                            type="text"
                                            id="assist"
                                        ></b-form-input>
                                    </b-input-group>
                                   </b-form-group>
                               </div>
                               <div class="col-md-6">
                                  <b-form-group
                                    label="故障描述"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="descr"
                                    class="mb-3"
                                    >
                                    <b-form-textarea
                                        id="descr"
                                        v-model="repair.descr"
                                        rows="3"
                                        max-rows="5"
                                    ></b-form-textarea>
                                   </b-form-group>
                               </div>
                               <div class="col-md-6">
                                  <b-form-group
                                    label="备注"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="remark"
                                    class="mb-3"
                                    >
                                    <b-form-textarea
                                        id="remark"
                                        v-model="repair.remark"
                                        rows="3"
                                        max-rows="6"
                                    ></b-form-textarea>
                                   </b-form-group>
                               </div>
                                <div class="col-md-6">
                                  <b-form-group
                                    label="上传图片"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="picture"
                                    class="mb-3"
                                    >
                                    <b-form-file 
                                        id="picture" 
                                        placeholder="选择文件"
                                        accept="image/jpeg, image/png, image/gif"
                                        v-model="pic"
                                     ></b-form-file>
                                   </b-form-group>
                               </div>
                               <div class="d-block form-inline col-md-12 text-right">
                                  <button class="mt-1 btn btn-warning mr-2" @click="cancel">取消</button>
                                  <button class="mt-1 btn btn-primary" @click="submit">提交</button>
                               </div>
                              </div>
                        </form>
                    </div>
                </div>
            </div>
       </b-tab>
    </b-tabs>
  </div>
</template>

<script>
 import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
  export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
    data() {
      return {
        repair:{ 
            name:'',
            malfunction_type:'',
            malfunction_positon:'',
            level:'',
            strat_time_date:'',
            start_time_time:'',
            end_time_date:'',
            end_time_time:'',
            duration:'',
            result:'',
            master:'',
            assist:'',
            descr:'',
            remark:''
        },
        items: [
            { id : 1, name: '设备1', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-26 15:00:00', end_time:'2019-08-26 17:00:00', duration:'2h', result: '已修', master:'王毅', assist:'李逵', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'info'},
            { id : 2, name: '设备2', malfunction_type:'烟雾报警器', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-24 09:00:00', end_time:'2019-08-26 10:00:00', duration:'1h', result: '已修', master:'王韩', assist:'张良', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'info'},
            { id : 3, name: '设备3', malfunction_type:'指示灯', malfunction_positon:'本机', level:'紧急', strat_time: '2019-08-13 13:00:00', end_time:'2019-08-13 13:30:00', duration:'0.5h', result: '已修', master:'王毅', assist:'郭嘉', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'danger'},
            { id : 4, name: '设备4', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-26 15:00:00', end_time:'2019-08-26 17:00:00', duration:'2h', result: '已修', master:'王毅', assist:'李逵', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'info'},
            { id : 5, name: '设备5', malfunction_type:'格子', malfunction_positon:'本机', level:'紧急', strat_time: '2019-08-28 15:00:00', end_time:'2019-08-28 17:00:00', duration:'2h', result: '已修', master:'王毅', assist:'李逵', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'danger'},
            { id : 6, name: '设备2', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-26 15:00:00', end_time:'2019-08-26 17:00:00', duration:'2h', result: '已修', master:'王毅', assist:'李逵', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'info'},
            { id : 7, name: '设备3', malfunction_type:'湿度传感器', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-26 15:00:00', end_time:'2019-08-26 15:20:00', duration:'2h', result: '已指派', master:'王毅', assist:'李逵', descr:'故障详细描述', remark:'维修备注信息', _rowVariant: 'info'},
            { id : 8, name: '设备2', malfunction_type:'其它', malfunction_positon:'本机', level:'常规', strat_time: '2019-08-25 16:20:00', end_time:'2019-08-25 17:00:00', duration:'0.8h', result: '未修好', master:'王毅', assist:'李逵', descr:'不明故障，请求支援', remark:'维修备注信息', _rowVariant: 'info'}
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'name', label: '设备名称', sortable: true, sortDirection: 'desc' },
          { key: 'malfunction_type', label: '故障类型', sortable: true, sortDirection: 'desc' },
          { key: 'malfunction_positon', label: '故障部位', sortable: true, sortDirection: 'desc' },
          { key: 'level', label: '紧急程度', sortable: true, sortDirection: 'desc' },
          { key: 'strat_time', label: '开始时间', sortable: true, sortDirection: 'desc' },
          { key: 'end_time', label: '结束时间', sortable: true, sortDirection: 'desc' },
          { key: 'duration', label: '时长'},
          { key: 'result', label: '维修结果', sortable: true, sortDirection: 'desc' },
          { key: 'actions', label: '操作' }
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        filterOn: [],
        title:'',
        active: true,
        pic:null
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    mounted() {
      // Set the initial number of items
      this.totalRows = this.items.length
    },
    methods: {
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      create(){
         this.title='记录新增';
         this.active = false;
      },
      isback(){
          this.title = '';
          this.active = true;
      },
      submit(){
          
      },
      cancel(){
          this.pic = null;
          this.title = '';
          this.active = true;
      }
    }
  }
</script>