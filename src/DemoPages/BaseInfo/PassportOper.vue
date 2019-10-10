<template>
<div>
<b-alert
    :show="dismissCountDown"
    variant="info"
    @dismissed="dismissCountDown=0"
    @dismiss-count-down="countDownChanged"
  >
    {{content}}
</b-alert>
<b-tabs>
<b-tab title="护照管理" active @click="isback">
<b-row class="mt-3">
  <b-col lg="6">
    <b-form-group
        label="机构"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="selectDepart"
        class="mb-10"
    >
      <b-input-group size="sm">
          <Tree></Tree>
      </b-input-group>
    </b-form-group>
  </b-col>
  <b-col lg="6">
    <b-form-group
        label="设备"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="selectDevice"
        class="mb-10"
    >
      <b-input-group size="sm">
          <b-form-select v-model="device" id="selectDevice" :options="devicesName">
          <option slot="first" value="">-- 无 --</option>
          </b-form-select>
      </b-input-group>
    </b-form-group>
  </b-col>
</b-row>
<b-row>
  <b-col lg="6">
     <b-form-group
        label="查询"
        label-cols-sm="3"
        label-align-sm="right"
        label-size="sm"
        label-for="search"
        class="mb-3"
        >
        <b-input-group size="sm">
            <b-form-input
            v-model="filter"
            type="search"
            id="search"
            placeholder="输入查询条件"
            ></b-form-input>
            <b-input-group-append>
            <b-button variant='primary' :disabled="!filter" @click="filter = ''">清 除</b-button>
            </b-input-group-append>
        </b-input-group>
        </b-form-group>
  </b-col>
</b-row>
<b-row>
  <b-col lg="12" >
    <div class="d-block form-inline text-right">
        <button class="btn btn-primary btn-sm"  style="margin-right:10px" @click="giveback">护照归还</button>
        <button class="btn btn-success btn-sm" style="margin-right:10px">护照接收</button>
    </div>
  </b-col>
</b-row>
<b-row>
   <b-col lg="4" sm="6">
      <div class="main-card mt-4 mb-3 card">
        <div class="card-body">
            <b-table dark :items="items" :fields="fields" :filter="filter">
               <template slot="col1" slot-scope="row">
                 <b-button block class="btn-transition" style="height:80px;width:40px" :variant="row.item.col1.status" :disabled="row.item.col1.disable" @click="showDetail(row.item.col1)">
                    {{row.item.col1.name}}
                  </b-button>
               </template>
               <template slot="col2" slot-scope="row">
                 <b-button block class="btn-transition" style="height:80px;width:40px" :variant="row.item.col2.status" :disabled="row.item.col2.disable" @click="showDetail(row.item.col2)">
                    {{row.item.col2.name}}
                  </b-button>
               </template>
               <template slot="col3" slot-scope="row">
                 <b-button block class="btn-transition" style="height:80px;width:40px" :variant="row.item.col3.status" :disabled="row.item.col3.disable" @click="showDetail(row.item.col3)">
                    {{row.item.col3.name}}
                  </b-button>
               </template>
               <template slot="col4" slot-scope="row">
                 <b-button block class="btn-transition" style="height:80px;width:40px" :variant="row.item.col4.status" :disabled="row.item.col4.disable" @click="showDetail(row.item.col4)">
                    {{row.item.col4.name}}
                  </b-button>
               </template>
               <template slot="col5" slot-scope="row">
                 <b-button block class="btn-transition" style="height:80px;width:40px" :variant="row.item.col5.status" :disabled="row.item.col5.disable" @click="showDetail(row.item.col5)">
                    {{row.item.col5.name}}
                  </b-button>
               </template>
            </b-table>
        </div>
      </div>
   </b-col>
   <b-col lg="4" sm="6">
      <div class="main-card ml-3 mt-5 mb-3 card" style="height:535px">
           <div class="card-border mb-1 card card-body border-info"><h6 class="card-title text-center"><strong>证件详情</strong></h6>
              <div class="divider bg-info"/>
              <div class="text-right small">No: {{staffinfo.certificateNo}}</div>
              <div class="d-block form-inline text-center mt-3 mb-5">
                  <b-img :src="imgsrc" rounded="circle" :width="imgwidth" :height="imgheight" ></b-img>
              </div>
              <b-row>
                <b-col class="text-right">姓名 :</b-col>
                <b-col class="text-left">{{staffinfo.name}}</b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">性别 :</b-col>
                <b-col class="text-left">{{staffinfo.sex}}</b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">出生日期 :</b-col>
                <b-col class="text-left">{{staffinfo.birth}}</b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">担任职务 :</b-col>
                <b-col class="text-left">{{staffinfo.job}}</b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">所在层号 :</b-col>
                <b-col class="text-left">{{staffinfo.floor}}</b-col>
              </b-row>
              <b-row>
                <b-col class="text-right">所在柜号 :</b-col>
                <b-col class="text-left">{{staffinfo.containerNo}}</b-col>
              </b-row>
              <div class="mt-5 text-center">
                  <button class="btn btn-success btn-lg mr-2" @click="apply" :disabled="staffinfo.certificateNo==''">申请取用</button>
                  <button class="btn btn-info btn-lg" :disabled="staffinfo.certificateNo==''">办理转递</button>
              </div>
           </div>  
      </div>
      </b-col>
      <b-col lg="4" sm="12">
          <div class="main-card mt-5 ml-3 mb-3 card">
            <div class="mb-1 card card-body"><h6 class="card-title text-center"><strong>证件取用\归还记录</strong></h6>
                <b-table
                    show-empty
                    small
                    sticky-header
                    head-variant="dark"
                    stacked="md"
                    :items="tdatas"
                    :fields="tfields"
                    :sort-desc.sync="sortDesc"
                    :sort-direction="sortDirection"
                ></b-table>
            </div>
          </div>
      </b-col>
    </b-row>
   </b-tab>     
   <b-tab :title="title" :active="!active" :disabled="active">
    <div class="row">
      <div class="main-card mb-3 card col-md-8">
        <div class="card-header"><i class="pe-7s-albums" /> 待归还列表</div>
        <div class="card-body">
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
                        v-model="condition"
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
                        <b-form-checkbox value="applicant">申请人</b-form-checkbox>
                        <b-form-checkbox value="status">状态</b-form-checkbox>
                    </b-form-checkbox-group>
                    </b-form-group>
                </div>
         </div>
        <b-table
            show-empty
            small
            sticky-header
            stacked="md"
            :items="outItems"
            :fields="outFields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="condition"
            :filterIncludedFields="filterOn"
            @filtered="onFiltered"
        >
        <template slot="actions" slot-scope="row">
            <button :id="'see'+ row.index" class="border-0 btn-transition btn btn-outline-info" v-on:click="outItems.splice(row.index,1)">
              <font-awesome-icon icon="backward"/>
            </button>
            <button :id="'fax'+ row.index" class="border-0 btn-transition btn btn-outline-danger" :disabled="row.item.status!='已超期'"  v-on:click="fax(row.index)">
              <font-awesome-icon icon="fax"/>
            </button>
            <b-tooltip :target="'see'+row.index" placement="top" title="归还" ></b-tooltip>
            <b-tooltip :target="'fax'+row.index" placement="top" title="催收" ></b-tooltip>
        </template>
        </b-table>
        <div class="row">
            <div class="col-md-2 col-sm-3">
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
   <b-tab :title="title2" :active="!active2" >
   <div class="col-md-6">
    <div class="main-card mb-3 card">
        <div class="card-header mt-3 text-center"> 护照取用申请</div>
        <div class="card-body">
          <form class="">
            <b-form-group
                 label="护照号码"
                 label-cols-sm="3"
                 label-align-sm="right"
                 label-size="sm"
                 label-for="passportno"
                 class="mb-3"
             >
             <b-input-group size="sm">
                 <b-form-input
                     v-model="applyinfo.certificateNo"
                     disabled
                     type="text"
                     id="passportno"
                 ></b-form-input>
             </b-input-group>
            </b-form-group>
            <b-form-group
               label="申请人"
               label-cols-sm="3"
               label-align-sm="right"
               label-size="sm"
               label-for="applicant"
               class="mb-3"
               >
               <b-input-group size="sm">
                   <b-form-input
                       v-model="applyinfo.applicant"
                       disabled
                       type="text"
                       id="applicant"
                   ></b-form-input>
               </b-input-group>
              </b-form-group>
              <b-form-group
                       label="前往国家"
                       label-cols-sm="3"
                       label-align-sm="right"
                       label-size="sm"
                       label-for="dest"
                       class="mb-3"
               >
               <b-input-group size="sm">
                   <b-form-input
                       v-model="applyinfo.dest"
                       required
                       type="text"
                       id="dest"
                   ></b-form-input>
               </b-input-group>
              </b-form-group>
              <b-form-group
                       label="取用日期"
                       label-cols-sm="3"
                       label-align-sm="right"
                       label-size="sm"
                       label-for="takedate"
                       class="mb-3"
               >
               <b-input-group size="sm">
                   <b-form-input
                       v-model="applyinfo.takedate"
                       required
                       type="date"
                       id="takedate"
                   ></b-form-input>
               </b-input-group>
              </b-form-group>
              <b-form-group
                       label="归还日期"
                       label-cols-sm="3"
                       label-align-sm="right"
                       label-size="sm"
                       label-for="backdate"
                       class="mb-3"
               >
               <b-input-group size="sm">
                   <b-form-input
                       v-model="applyinfo.backdate"
                       required
                       type="date"
                       id="backdate"
                   ></b-form-input>
               </b-input-group>
              </b-form-group>
              <b-form-group
                  label="原因说明"
                  label-cols-sm="3"
                  label-align-sm="right"
                  label-size="sm"
                  label-for="reason"
                  class="mb-3"
               >
               <b-form-textarea
                   id="reason"
                   v-model="applyinfo.reason"
                   rows="3"
                   max-rows="5"
               ></b-form-textarea>
              </b-form-group>
            </form>
        </div>
         <div class="d-block form-inline text-right card-footer">
            <button class="btn btn-primary" @click="showAlert">提交</button>
         </div>
    </div>
</div>
   </b-tab>
</b-tabs>


</div>
</template>
<script>
import Tree from './Tree'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
export default {
    components: {
        'font-awesome-icon': FontAwesomeIcon,
        Tree
    },
    data(){
      return{
         items:[
             {col1:{id:1 ,name:'杨利伟',sex:'男',birth:'1998-07-09',job:'副处',floor:'1',certificateNo:'43567419980709765x',containerNo:'1',status:'outline-success',disable:false}, 
              col2:{id:2 ,name:'杨伟',sex:'男',birth:'1988-07-13',job:'科长',floor:'1',certificateNo:'43237419880713235x',containerNo:'2',status:'outline-success',disable:false},
              col3:{id:3 ,name:'黄飞鸿',sex:'男',birth:'1978-11-09',job:'副处',floor:'1',certificateNo:'432174197811099654',containerNo:'3',status:'outline-success',disable:false},
              col4:{id:4 ,name:'徐若云',sex:'女',birth:'1975-05-12',job:'副处',floor:'1',certificateNo:'412674197505127652',containerNo:'4',status:'outline-success',disable:false},
              col5:{id:5 ,name:'未使用',status:'dark',disable:true}},
             {col1:{id:6 ,name:'郭凤霞',sex:'女',birth:'1990-07-09',job:'副科',floor:'2',certificateNo:'125674199807097652',containerNo:'6',status:'outline-success',disable:false}, 
              col2:{id:7 ,name:'张毅',sex:'男',birth:'1981-02-19',job:'副处',floor:'2',certificateNo:'535674198102197651',containerNo:'7',status:'outline-success',disable:false},
              col3:{id:8 ,name:'韦德',sex:'男',birth:'1965-07-24',job:'副局',floor:'2',certificateNo:'467624196507247659',containerNo:'8',status:'outline-success',disable:false},
              col4:{id:9 ,name:'时长生',sex:'男',birth:'1973-03-29',job:'处长',floor:'2',certificateNo:'414674197303297659',containerNo:'9',status:'outline-success',disable:false},
              col5:{id:10 ,name:'未使用',status:'dark',disable:true}},
             {col1:{id:11 ,name:'叶立群',sex:'男',birth:'1972-01-15',job:'副处',floor:'3',certificateNo:'42357419720115765x',containerNo:'11',status:'outline-success',disable:false}, 
              col2:{id:12 ,name:'季德成',sex:'男',birth:'1969-04-19',job:'副厅',floor:'3',certificateNo:'425674196902147658',containerNo:'12',status:'outline-success',disable:false},
              col3:{id:13 ,name:'李煜国',sex:'男',birth:'1975-02-14',job:'副局',floor:'3',certificateNo:'415674197502147654',containerNo:'13',status:'outline-success',disable:false},
              col4:{id:14 ,name:'赵玉伟',sex:'男',birth:'1965-07-08',job:'科长',floor:'3',certificateNo:'453674196507087652',containerNo:'14',status:'outline-success',disable:false},
              col5:{id:15 ,name:'卢巧音',sex:'女',birth:'1991-05-04',job:'副科',floor:'3',certificateNo:'256741999105046754',containerNo:'15',status:'outline-success',disable:false}},
             {col1:{id:16 ,name:'田福菊',sex:'男',birth:'1976-04-12',job:'局长',floor:'4',certificateNo:'245674197904127651',containerNo:'16',status:'outline-success',disable:false}, 
              col2:{id:17 ,name:'康天骄',sex:'女',birth:'1979-03-13',job:'副局',floor:'4',certificateNo:'565674197903137655',containerNo:'17',status:'outline-success',disable:false},
              col3:{id:18 ,name:'王德苍',sex:'男',birth:'1983-02-10',job:'科长',floor:'4',certificateNo:'885674198302107657',containerNo:'18',status:'outline-success',disable:false},
              col4:{id:19 ,name:'赵本伟',sex:'男',birth:'1985-11-23',job:'副处',floor:'4',certificateNo:'445674198511237658',containerNo:'19',status:'outline-success',disable:false},
              col5:{id:20 ,name:'异常',status:'danger',disable:true}},
             {col1:{id:21 ,name:'周胜康',sex:'男',birth:'1982-12-03',job:'处长',floor:'5',certificateNo:'145674198212037652',containerNo:'21',status:'outline-success',disable:false}, 
              col2:{id:22 ,name:'未使用',status:'dark',disable:true},
              col3:{id:23 ,name:'未使用',status:'dark',disable:true},
              col4:{id:24 ,name:'田大兴',sex:'男',birth:'1990-01-12',job:'副科',floor:'5',certificateNo:'52567419900112765x',containerNo:'25',status:'outline-success',disable:false},
              col5:{id:25 ,name:'异常',status:'danger',disable:true}},
         ],
         fields:{
           col1:{label:'证',thClass:'text-center'},
           col2:{label:'件',thClass:'text-center'},
           col3:{label:'-',thClass:'text-center'},
           col4:{label:'预',thClass:'text-center'},
           col5:{label:'览',thClass:'text-center'}
         },
         tdatas: [
            { id : 1, oper: '取用', oper_time : '2019-07-28', status:'完成'},
            { id : 2, oper: '归还', oper_time : '2019-08-08', status:'完成'},
            { id : 3, oper: '取用', oper_time : '2019-09-01', status:'审核中'}
        ],
        tfields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'asc' },
          { key: 'oper', label: '业务'},
          { key: 'oper_time', label: '日期', sortable: true, sortDirection: 'desc' },
          { key: 'status', label: '状态', variant: 'success'}
          ],
        sortDesc: false,
        sortDirection: 'asc',
        staffinfo:{
              name:'',
              sex:'',
              birth:'',
              job:'',
              floor:'',
              certificateNo:'',
              containerNo:''
         },
         applyinfo:{
             certificateNo:'',
             applicant:'',
             dest:'',
             takedate:'',
             backdate:'',
             reason:''
         },
         dismissSecs: 4,
         dismissCountDown: 0,
         content:'',
         imgwidth:'75px',
         imgheight:'75px',
         imgsrc:'https://picsum.photos/250/250/?image=58',
         depart:'',
         devicesName:['设备1','设备2','设备3','设备4','设备5','设备6'],
         device:'',
         filter:'',
         outItems:[
           {id:1,applicant:'林更新',out_time:'2019-08-07',aback_time:'2019-09-03',status:'待归还',_rowVariant: 'success'},
           {id:2,applicant:'黄飞鸿',out_time:'2019-07-07',aback_time:'2019-08-03',status:'已超期', _rowVariant: 'danger'},
           {id:3,applicant:'杨戬',out_time:'2019-08-05',aback_time:'2019-08-30',status:'待归还',_rowVariant: 'success'},
           {id:4,applicant:'徐若云',out_time:'2019-08-07',aback_time:'2019-09-07',status:'待归还',_rowVariant: 'success'},
           {id:5,applicant:'刘三姐',out_time:'2019-06-07',aback_time:'2019-08-04',status:'催收中', _rowVariant: 'warning'},
           {id:6,applicant:'郭凤霞',out_time:'2019-08-07',aback_time:'2019-09-23',status:'待归还',_rowVariant: 'success'},
           {id:7,applicant:'秦凤琴',out_time:'2019-08-07',aback_time:'2019-09-13',status:'待归还',_rowVariant: 'success'},
           {id:8,applicant:'贾琏',out_time:'2019-08-07',aback_time:'2019-10-09',status:'待归还',_rowVariant: 'success'},
           ],
         outFields:[
           {key:'id',label:"ID",sortable: true, sortDirection: 'asc' },
           {key:'applicant',label:"申请人"},
           {key:'out_time',label:"取出日期",sortable: true, sortDirection: 'desc' },
           {key:'aback_time',label:"申请归还日期",sortable: true, sortDirection: 'desc' },
           {key:'status',label:"状态"},
           {key:'actions',label:'操作'}
         ],
          totalRows: 1,
          currentPage: 1,
          perPage: 5,
          pageOptions: [5, 10, 15],
          condition:null,
          filterOn: [],
          title:'',
          active:true,
          title2:'',
          active2:true,
      }
    },
    computed:{
       nowDate : function(){
          var date = new Date();
          var nowMonth = date.getMonth() + 1;
          var strDate = date.getDate();
          var seperator = "-";
          if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = "0" + nowMonth;
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
          }
          var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
          return nowDate;
       }
    },
    methods:{
        onFiltered(filteredItems) {
          // Trigger pagination to update the number of buttons/pages due to filtering
          this.totalRows = filteredItems.length
          this.currentPage = 1
        },
        countDownChanged(dismissCountDown) {
          this.dismissCountDown = dismissCountDown
        },
        showDetail(item){
            this.staffinfo = item;
        },
        apply(){
           this.title2 = "取用申请";
           this.active2 = false;
           this.applyinfo.certificateNo = this.staffinfo.certificateNo;
           this.applyinfo.applicant = this.staffinfo.name;
        },
        showAlert() {
          this.dismissCountDown = this.dismissSecs
          var len = this.tdatas.length;
          this.tdatas.push({id:len,oper:'取用',oper_time: this.nowDate, status:'审核中'})
          this.content='申请已提交，等待审核中...'
        },
        fax(index){
           this.dismissCountDown = this.dismissSecs
           this.content='已发出催收通知...'
           this.outItems[index].status='催收中'
           this.outItems[index]._rowVariant='warning'
        },
        giveback(){
            this.title = "护照归还";
            this.active = false;
        },
        isback(){
            this.title = "";
            this.active = true;
            this.title2 = "";
            this.active2 = true;
        }
    }
    
}
</script>