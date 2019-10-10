<template>
  <div>
    <div class="row">
      <div class="main-card mb-3 card col-md-12">
        <div class="card-header"><i class="pe-7s-albums" /> 用户列表</div>
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
                </div>
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
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
        >
        <template slot="actions" slot-scope="row">
            <button :id="'see'+ row.index" class="border-0 btn-transition btn btn-outline-danger" :disabled="row.item.role=='系统管理员'" @click="deleteuser(row.index)">
              <font-awesome-icon icon="trash-alt"/>
            </button>
            <b-tooltip :target="'see'+row.index" placement="top" title="删除"></b-tooltip>
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
    <b-modal ref="confirm" title="操作确认" size="sm" centered @ok="confirm" >
         确定删除该用户?
      <template slot="modal-ok">确认 </template>
      <template slot="modal-cancel">取消 </template>
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
            { id : 1, username: '道联', role: '系统管理员', register_time: '2019-08-26 14:00:03', lastlogin_time:'2019-09-02 09:13:15', depart : '杭州道联'},
            { id : 2, username: 'admin', role: '管理员', register_time: '2019-08-27 17:23:43', lastlogin_time:'2019-09-01 12:00:03', depart : '测试部'},
            { id : 3, username: 'normal', role: '普通用户', register_time: '2019-08-27 17:24:32', lastlogin_time:'2019-08-27 17:24:32', depart : '测试部'},
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'username', label: '用户名', sortable: true, sortDirection: 'desc' },
          { key: 'role', label: '角色',variant: 'info'},
          { key: 'register_time', label: '创建时间',sortable: true, sortDirection: 'desc'},
          { key: 'lastlogin_time', label: '上次登录',sortable: true, sortDirection: 'desc'},
          { key: 'depart', label: '所属机构'},
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
        index:''
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
      deleteuser(index){
         this.index = index
         this.$refs['confirm'].show()
      },
      confirm(){
          this.items.splice(this.index,1);
      }
    }
  }
</script>