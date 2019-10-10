<template>
  <div>
    <b-tabs>
       <b-tab title="指派记录" active @click="isback">
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
                <button :id="'check'+row.index" class="border-0 btn-transition btn btn-outline-success" v-on:click="items.splice(row.index,1)">
                    <font-awesome-icon icon="check"/>
                </button>
                <button :id="'times'+row.index" class="border-0 btn-transition btn btn-outline-danger" v-on:click="items.splice(row.index,1)">
                    <font-awesome-icon icon="times"/>
                </button>
                <b-tooltip :target="'see'+row.index" placement="top" title="详细信息"></b-tooltip>
                <b-tooltip :target="'check'+row.index" placement="top" title="确认完成"></b-tooltip>
                <b-tooltip :target="'times'+row.index" placement="top" title="取消任务"></b-tooltip>
            </template>
            <template slot="row-details" slot-scope="row">
            <b-card>
            <ul class="list-group">
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
                               <div class="col-md-8">
                                  <b-form-group
                                    label="设备名称"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="devicename"
                                    class="mb-3"
                                    >
                                     <b-form-select
                                        v-model="assign.name"
                                        id="devicename"
                                        size="sm"
                                        :options="['设备1', '设备2', '设备3','设备4']"
                                    ></b-form-select>
                                   </b-form-group>
                               </div>
                               <div class="col-md-8">
                                    <b-form-group
                                    label="故障分类"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="malfunctiontype"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="assign.malfunction_type"
                                        id="malfunctiontype"
                                        size="sm"
                                        :options="['热电偶-感温线', '烟雾报警器', '指示灯', '湿度传感器', '格子','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-8">
                                    <b-form-group
                                    label="故障部位"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="malfunctionposition"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="assign.malfunction_positon"
                                        id="malfunctionposition"
                                        size="sm"
                                        :options="['本机', '门禁', '壳体', '电路板','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-8">
                                    <b-form-group
                                    label="紧急程度"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="level"
                                    class="mb-10"
                                    >
                                    <b-form-select
                                        v-model="assign.level"
                                        id="level"
                                        size="sm"
                                        :options="['常规', '紧急', '特急','其它']"
                                    ></b-form-select>
                                    </b-form-group>
                                </div>
                                <div class="col-md-8">
                                  <b-form-group
                                    label="指派人员"
                                    label-cols-sm="3"
                                    label-align-sm="right"
                                    label-size="sm"
                                    label-for="staff"
                                    class="mb-3"
                                    >
                                    <b-input-group size="sm">
                                        <b-form-input
                                            v-model="assign.staff"
                                            type="text"
                                            id="staff"
                                        ></b-form-input>
                                    </b-input-group>
                                   </b-form-group>
                               </div>
                               <div class="col-md-8">
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
                                        v-model="assign.descr"
                                        rows="3"
                                        max-rows="5"
                                    ></b-form-textarea>
                                   </b-form-group>
                               </div>
                               <div class="col-md-8">
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
                                        v-model="assign.remark"
                                        rows="3"
                                        max-rows="6"
                                    ></b-form-textarea>
                                   </b-form-group>
                               </div>
                                <div class="col-md-8">
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
                               <div class="d-block form-inline col-md-8 text-right">
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
        assign:{ 
            name:'',
            malfunction_type:'',
            malfunction_positon:'',
            level:'',
            staff:'',
            descr:'',
            remark:''
        },
        items: [
            { id : 1, name: '设备1', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规',  staff:'李逵', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'info'},
            { id : 2, name: '设备2', malfunction_type:'烟雾报警器', malfunction_positon:'本机', level:'常规',  staff:'张良', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'info'},
            { id : 3, name: '设备3', malfunction_type:'指示灯', malfunction_positon:'本机', level:'紧急',  staff:'郭嘉', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'danger'},
            { id : 4, name: '设备4', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规',  staff:'李逵', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'info'},
            { id : 5, name: '设备5', malfunction_type:'格子', malfunction_positon:'本机', level:'紧急', staff:'李逵', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'danger'},
            { id : 6, name: '设备2', malfunction_type:'热电偶-感温线', malfunction_positon:'本机', level:'常规', staff:'李逵', descr:'故障详细描述', remark:'备注信息',_rowVariant: 'info'},
            { id : 7, name: '设备3', malfunction_type:'湿度传感器', malfunction_positon:'本机', level:'常规',  staff:'李逵', descr:'故障详细描述', remark:'三弟你太备注信息冲动了',_rowVariant: 'info'},
            { id : 8, name: '设备2', malfunction_type:'其它', malfunction_positon:'本机', level:'常规',  staff:'李逵', descr:'不明故障，请求支援', remark:'备注信息',_rowVariant: 'info'}
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'name', label: '设备名称', sortable: true, sortDirection: 'desc' },
          { key: 'malfunction_type', label: '故障类型', sortable: true, sortDirection: 'desc' },
          { key: 'malfunction_positon', label: '故障部位', sortable: true, sortDirection: 'desc' },
          { key: 'level', label: '紧急程度', sortable: true, sortDirection: 'desc' },
          { key: 'staff', label: '指派人员'},
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
        pic:null,
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
         this.title='新增指派';
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