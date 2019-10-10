<template>
  <div>
    <div class="row">
      <div class="main-card mb-3 card col-md-12">
        <div class="card-header"><i class="pe-7s-albums" /> 设备列表</div>
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
                        <b-form-checkbox value="create_time">启用日期</b-form-checkbox>
                        <b-form-checkbox value="belong">归属地</b-form-checkbox>
                    </b-form-checkbox-group>
                    </b-form-group>
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
            :filterIncludedFields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :sort-direction="sortDirection"
            @filtered="onFiltered"
        >
        <template slot="actions" slot-scope="row">
            <button :id="'see'+ row.index" class="border-0 btn-transition btn btn-outline-info" @click="todetail">
              <font-awesome-icon icon="eye"/>
            </button>
            <b-tooltip :target="'see'+row.index" placement="top" title="查看"></b-tooltip>
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
            { id : 1, name: '设备1', create_time: '2019-08-26', belong : '测试部', status : '正常', _rowVariant: 'success'},
            { id : 2, name: '设备2', create_time: '2019-07-26', belong : '测试部', status : '正常', _rowVariant: 'success'},
            { id : 3, name: '设备3', create_time: '2019-07-26', belong : '测试部', status : '正常', _rowVariant: 'success'},
            { id : 4, name: '设备4', create_time: '2019-08-21', belong : '测试部', status : '空闲', _rowVariant: 'warning'},
            { id : 5, name: '设备5', create_time: '2019-08-21', belong : '测试部', status : '正常', _rowVariant: 'success'},
            { id : 6, name: '设备6', create_time: '2019-08-24', belong : '测试部', status : '异常', _rowVariant: 'danger'},
            { id : 7, name: '设备7', create_time: '2019-08-13', belong : '测试部', status : '正常', _rowVariant: 'success'},
            { id : 8, name: '设备8', create_time: '2019-08-06', belong : '测试部', status : '正常', _rowVariant: 'success'}
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'name', label: '设备名称', sortable: true, sortDirection: 'desc' },
          { key: 'create_time', label: '启用日期', sortable: true, sortDirection: 'desc' },
          { key: 'belong', label: '归属地'},
          { key: 'status', label: '状态', sortable: true, sortDirection: 'desc' },
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
      todetail(){
        this.$router.replace('/device/devicedetail');
      }
    }
  }
</script>