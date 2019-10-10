<template>
  <div>
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
                        <b-form-checkbox value="exit_time">离境日期</b-form-checkbox>
                        <b-form-checkbox value="entry_time">入境日期</b-form-checkbox>
                        <b-form-checkbox value="compare_result">比对</b-form-checkbox>
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
        <template slot="compare_result" slot-scope="row">
            <b-badge :variant="compare(row.item).style">{{compare(row.item).text}}</b-badge>
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
  export default {
    data() {
      return {
        items: [
            { id : 1, name: '郭凤霞', job:'科长', apply_dest:'美国', real_dest:'美国', exit_time:'2019-07-07', entry_time:'2019-07-17'},
            { id : 2, name: '牛小燕', job:'副科长', apply_dest:'美国', real_dest:'美国', exit_time:'2019-04-07', entry_time:'2019-04-17'},
            { id : 3, name: '张毅', job:'处长', apply_dest:'埃及', real_dest:'埃及', exit_time:'2019-03-17', entry_time:'2019-03-25'},
            { id : 4, name: '刘彪', job:'局长', apply_dest:'哈萨克斯坦', real_dest:'哈萨克斯坦', exit_time:'2018-11-12', entry_time:'2018-11-17'},
            { id : 5, name: '徐若云', job:'科长', apply_dest:'泰国', real_dest:'越南', exit_time:'2019-01-07', entry_time:'2019-01-12'},
            { id : 6, name: '黄飞鸿', job:'副科长', apply_dest:'菲律宾', real_dest:'菲律宾', exit_time:'2018-05-09', entry_time:'2019-05-17'},
            { id : 7, name: '刘三姐', job:'副科长', apply_dest:'巴西', real_dest:'墨西哥', exit_time:'2018-12-17', entry_time:'2019-12-27'},
            { id : 8, name: '蒋荷花', job:'股长', apply_dest:'美国', real_dest:'美国', exit_time:'2019-03-12', entry_time:'2019-03-17'},
            { id : 9, name: '张飞', job:'副局长', apply_dest:'英国', real_dest:'英国', exit_time:'2019-03-24', entry_time:'2019-04-03'},
            { id : 10, name: '刘璇', job:'副厅长', apply_dest:'丹麦', real_dest:'瑞士', exit_time:'2019-06-07', entry_time:'2019-06-17'},
            { id : 11, name: '李志', job:'副科长', apply_dest:'法国', real_dest:'法国', exit_time:'2019-07-13', entry_time:'2019-07-22'},
            { id : 12, name: '蒋一坤', job:'科长', apply_dest:'以色列', real_dest:'土耳其', exit_time:'2019-08-01', entry_time:'2019-08-10'},
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'name', label: '姓名', sortable: true, sortDirection: 'desc' },
          { key: 'job', label: '职务', sortable: true, sortDirection: 'desc' },
          { key: 'apply_dest', label: '申请目的地'},
          { key: 'real_dest', label: '实际目的地'},
          { key: 'exit_time', label: '离境日期', sortable: true, sortDirection: 'desc' },
          { key: 'entry_time', label: '入境日期', sortable: true, sortDirection: 'desc' },
          { key: 'compare_result', label: '比对', sortable: true, sortDirection: 'desc' },
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
      },

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
      compare(record){
        var res = {style:'success',text:'正常'}
        if(record.apply_dest != record.real_dest){
            res.style = 'danger';
            res.text = '异常';
        }
        return res;
      }
    }
  }
</script>