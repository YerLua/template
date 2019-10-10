<template>
  <div>
    <b-tabs>
        <b-tab title="消息管理" active>
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
                                <b-form-checkbox value="type">消息类型</b-form-checkbox>
                                <b-form-checkbox value="create_time">时间</b-form-checkbox>
                                <b-form-checkbox value="status">消息状态</b-form-checkbox>
                            </b-form-checkbox-group>
                            </b-form-group>
                        </div>
                </div>
                
                    <div class="d-block form-inline text-right">
                            <button class="btn btn-info btn-sm" v-on:click="info($event.target)" style="margin-right:10px">消息设置</button>
                            <button class="btn btn-success btn-sm" @click="allsee">批阅</button>
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
                    <button :id="'see'+ row.index" class="border-0 btn-transition btn btn-outline-info" :disabled="row.item.status=='已处理'" v-on:click="see(row.index)">
                    <font-awesome-icon icon="eye"/>
                    </button>
                    <button :id="'trash'+row.index" class="border-0 btn-transition btn btn-outline-danger" v-on:click="items.splice(row.index,1)">
                        <font-awesome-icon icon="trash-alt"/>
                    </button>
                    <b-tooltip :target="'see'+row.index" placement="top" title="已阅"></b-tooltip>
                    <b-tooltip :target="'trash'+row.index" placement="top" title="删除"></b-tooltip>
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
    </b-tabs>
    <b-modal :id="infoModal.id" :title="infoModal.title" centered ok-only >
            <b-form-group label="系统通知中显示的消息类型">
                <b-form-checkbox-group
                    v-model="selected"
                    :options="options"
                    switches
                    stacked
                ></b-form-checkbox-group>
              </b-form-group>
    </b-modal>
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
        items: [
            { id : 1, type: '普通消息', create_time: '2019-08-26', content : 'xxx设备已维修', status : '已处理', _rowVariant: 'success'},
            { id : 2, type: '普通消息', create_time: '2019-07-26', content : 'xxx新增了一条设备维修信息', status : '等待处理', _rowVariant: 'success'},
            { id : 3, type: '报警信息', create_time: '2019-07-26', content : 'xxx设备湿度异常', status : '已处理', _rowVariant: 'danger'},
            { id : 4, type: '普通消息', create_time: '2019-08-21', content : 'xxx设备上线', status : '等待处理', _rowVariant: 'success'},
            { id : 5, type: '普通消息', create_time: '2019-08-21', content : 'xxx设备上线', status : '等待处理', _rowVariant: 'success'},
            { id : 6, type: '报警信息', create_time: '2019-08-24', content : 'xxx设备温度异常', status : '等待处理', _rowVariant: 'danger'},
            { id : 7, type: '系统公告', create_time: '2019-08-13', content : '系统上线使用啦', status : '已处理', _rowVariant: 'success'},
            { id : 8, type: '普通消息', create_time: '2019-08-06', content : 'xxx设备上线', status : '等待处理', _rowVariant: 'success'}
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'type', label: '消息类型', sortable: true, sortDirection: 'desc' },
          { key: 'create_time', label: '创建时间', sortable: true, sortDirection: 'desc' },
          { key: 'content', label: '消息内容'},
          { key: 'status', label: '消息状态', sortable: true, sortDirection: 'desc' },
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
        infoModal: {
          id: 'info-modal',
          title: '消息设置',
        },
        selected:['normal','emergency','system'],
        options:[
            {text:'普通消息', value:'normal'},
            {text:'报警消息', value:'emergency'},
            {text:'系统公告', value:'system'}
        ]
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
      info(button) {
        this.$root.$emit('bv::show::modal', this.infoModal.id, button)
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      see(index){
          this.items[index].status='已处理';
      },
      allsee(){
         for(var i=0; i<this.items.length; i++){
             if(this.items[i].status != '已处理')
                 this.items[i].status = '已处理'
         }
      },
      create(){
         this.active=false;
      }
    }
  }
</script>