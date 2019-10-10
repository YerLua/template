<template>
<div class="row">
  <div class="col-lg-4 col-sm-6">
   <div class="main-card mb-2 card border-info">
        <div class="card-header"><i class="pe-7s-flag" /> 问题类型</div>
            <div class="scroll-area-sm">
             <VuePerfectScrollbar class="scrollbar-container" >
              <ul class="todo-list-wrapper list-group list-group-flush">
                  <li class="list-group-item" v-for="(item,index) in problems" v-bind:key="item.text">
                    <div class="todo-indicator bg-warning"></div>
                    <div class="widget-content p-0">
                      <div class="widget-content-wrapper">
                        <div class="widget-content-left">
                          <div class="widget-heading">{{item.text}}
                          </div>
                        </div>
                        <div class="widget-content-right widget-content-actions">
                          <button class="border-0 btn-transition btn btn-outline-danger" v-on:click="problems.splice(index,1)">
                            <font-awesome-icon icon="trash-alt"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
             </VuePerfectScrollbar>
            </div>
              <div class="d-block form-inline text-right card-footer">
                   <input v-model="newProblem" name="addproblem" id="addproblem2" placeholder="添加问题类型" type="text" class="form-control" style="margin-right:10px;width:80%">
                   <button class="btn btn-success btn-sm" v-on:click="add">添加</button>
                </div>
        </div>
  </div>
   <div class="col-lg-4 col-sm-6">
   <div class="main-card mb-2 card border-info">
        <div class="card-header"><i class="pe-7s-hammer" /> 维修对象</div>
          <div class="scroll-area-sm">
             <VuePerfectScrollbar class="scrollbar-container" >
              <ul class="todo-list-wrapper list-group list-group-flush">
                <li class="list-group-item" v-for="(item,index) in objects" v-bind:key="item.text">
                  <div class="todo-indicator bg-warning"></div>
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left">
                        <div class="widget-heading">{{item.text}}
                        </div>
                      </div>
                      <div class="widget-content-right widget-content-actions">
                        <button class="border-0 btn-transition btn btn-outline-danger" v-on:click="objects.splice(index,1)">
                          <font-awesome-icon icon="trash-alt"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
             </VuePerfectScrollbar>
          </div>
          <div class="d-block form-inline text-right card-footer">
                <input v-model="newObject" name="addobject" id="addobject2" placeholder="添加维修对象" type="text" class="form-control" style="margin-right:10px;width:80%">
                <button class="btn btn-success btn-sm" v-on:click="addObject">添加</button>
            </div>
        </div>
  </div>
  <div class="col-lg-4 col-sm-6">
   <div class="main-card mb-2 card border-info">
        <div class="card-header"><i class="pe-7s-filter" /> 维修结果</div>
            <div class="scroll-area-sm">
             <VuePerfectScrollbar class="scrollbar-container" >
              <ul class="todo-list-wrapper list-group list-group-flush">
                <li class="list-group-item" v-for="(item,index) in results" v-bind:key="item.text">
                  <div class="todo-indicator bg-warning"></div>
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left">
                        <div class="widget-heading">{{item.text}}
                        </div>
                      </div>
                      <div class="widget-content-right widget-content-actions">
                        <button class="border-0 btn-transition btn btn-outline-danger" v-on:click="results.splice(index,1)">
                          <font-awesome-icon icon="trash-alt"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
             </VuePerfectScrollbar>
            </div>
            <div class="d-block form-inline text-right card-footer">
                  <input v-model="newResult" name="addobject" id="addobject2" placeholder="添加维修结果" type="text" class="form-control" style="margin-right:10px;width:80%">
                  <button class="btn btn-success btn-sm" v-on:click="addResult">添加</button>
              </div>
        </div>
  </div>
    <div class="col-lg-4 col-sm-6">
   <div class="main-card mb-2 card border-info">
        <div class="card-header"><i class="pe-7s-alarm" /> 紧急程度</div>
         <div class="scroll-area-sm">
             <VuePerfectScrollbar class="scrollbar-container" >
              <ul class="todo-list-wrapper list-group list-group-flush">
                <li class="list-group-item" v-for="(item,index) in emergencys" v-bind:key="item.text">
                  <div class="todo-indicator bg-warning"></div>
                  <div class="widget-content p-0">
                    <div class="widget-content-wrapper">
                      <div class="widget-content-left">
                        <div class="widget-heading">{{item.text}}
                        </div>
                      </div>
                      <div class="widget-content-right widget-content-actions">
                        <button class="border-0 btn-transition btn btn-outline-danger" v-on:click="emergencys.splice(index,1)">
                          <font-awesome-icon icon="trash-alt"/>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
             </VuePerfectScrollbar>
          </div>
          <div class="d-block form-inline text-right card-footer">
                <input v-model="newEmergency" name="addemergency" id="addemergency2" placeholder="添加紧急程度" type="text" class="form-control" style="margin-right:10px;width:80%">
                <button class="btn btn-success btn-sm" v-on:click="addEmergency">添加</button>
            </div>
        </div>
  </div>
  <div class="col-lg-12" >
     <div class="mb-2 text-right">
          <button class="btn btn-info btn-lg">保存修改</button>
     </div>
  </div>
</div>  
</template>
<script>
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
export default {
  components: {
      VuePerfectScrollbar,
      'font-awesome-icon': FontAwesomeIcon,
    },
  data: () => ({
      problems : [
          {
              text : "problem 1",
          },
          {
              text : "problem 2",
          },
          {
              text : "problem 3",
          },
          {
              text : "problem 4",
          }
      ],
      newProblem:'',
      objects : [
          {
              text : "object 1",
          },
          {
              text : "object 2",
          },
          {
              text : "object 3",
          },
          {
              text : "object 4",
          }
      ],
      newObject:'',
      results : [
         {
              text : "成功",
          },
          {
              text : "失败",
          },
          {
              text : "无",
          },
      ],
      newResult:'',
      emergencys:[
          {
              text : "一般",
          },
          {
              text : "紧急",
          },
          {
              text : "十万火急",
          },
      ],
      newEmergency:'',
    }),
    methods:{
      add : function(){
        if(this.newProblem != ''){
          this.problems.push({ 
            text: this.newProblem
          })
          this.newProblem = ''
        }
      },
      addObject : function(){
        if(this.newObject != ''){
          this.objects.push({
            text : this.newObject
          })
          this.newObject = ''
        }
      },
      addResult : function(){
        if(this.newResult != ''){
          this.results.push({
            text : this.newResult
          })
          this.newResult = ''
        }
      },
      addEmergency : function(){
        if(this.newEmergency != ''){
          this.emergencys.push({
            text : this.newEmergency
          })
          this.newEmergency = ''
        }
      },
    }
}
</script>