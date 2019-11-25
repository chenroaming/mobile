<template lang="html">
<div class=""  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <yd-navbar title='我的案件' bgcolor="#40a9ff" color="#fff">

  </yd-navbar>
  <div style="position: relative;text-align:center">
    <!-- <yd-button @click.native="showMethod = true" size="large" style="font-size: 0.3rem;height: 0.7rem;   width: 25%;float: left;margin-top: 0.15rem;margin-left: .1rem;" v-model='nowSeacherStr'>{{nowSeacherStr}}</yd-button> -->
    <!-- <yd-actionsheet :items="myItems1" v-model="showMethod" cancel="取消"></yd-actionsheet> -->
  <yd-search v-model="caseNo" :on-submit="submitHandler" :on-cancel="cancelHandler" style="width:100%" class='seachBtn'></yd-search>
 <!-- <yd-button @click.native="submitHandler"  style="position: absolute;top: .2rem;right: .2rem;">搜索</yd-button> -->
  </div>
   <yd-tab active-color="#40a9ff" v-model="tab" class="textCs" :callback="fn">
        <yd-tab-panel label="未结案">
          <div>
            
          </div>
          
        </yd-tab-panel>
        <yd-tab-panel label="已结案"></yd-tab-panel>
    </yd-tab>
    <yd-cell-group style="margin-bottom: 0rem;">
      <yd-cell-item  @click.native="changeSortDesc">
         <span slot="left">案件列表</span>
      <span slot="right">
        <span style="">立案时间</span> 
        <span style="display: inline-block;width:20px;">
          <i class="angle_top" ></i>
          <i class="angle_bottom onS" ></i> 
        </span>
      </span>
      </yd-cell-item >
    </yd-cell-group>
  <yd-cell-group>
      <yd-cell-item style="padding: 0.2rem 0 0.2rem 0.24rem;"  v-for="item, key in caseData" :key="key" arrow @click.native="popupData(item.sendAddress,item.id)">
        <span slot="left" @click.native="">
          <span class="casen" style="font-size: 0.34rem;">{{item.caseNo}}</span>
          <p style="width:100%;word-break: normal;word-wrap: break-word;">
              <span style="text-align:left;margin-right:5px;display:inline-block;font-size:0.23rem">原告：{{item.plainInfo}}</span>
              <span style="text-align:left;margin-right:5px;display:inline-block;font-size:0.23rem">被告：{{item.defentINfo}}</span>
              <span style="text-align:left;display:inline-block;font-size:0.23rem">案由：{{item.briefName}}</span> 
          </p>
                   
        </span>
      </yd-cell-item>
  </yd-cell-group>
    <template>
      <yd-backtop style=""></yd-backtop>
    </template>
  <span slot="doneTip" style="margin-top:0.2rem;display:inline-block" v-show='dataEnd'>已经是所有案件了~</span>
  <img slot="loadingTip" style="margin: 0 auto;width:30%" v-show='loadingImg' src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </div>
</template>

<script>
import Util from '@/libs/util.js'
import {geTCaseList} from '@/api/caseList-new.js'
import {getTimePage} from '@/api/caseList-new.js'
import {wxLitigantLawCaseList} from '@/api/mycase.js'
import Vue from 'vue'
var count = 0;
export default {
  data(){
    return{
      data:[],
      show1: false,
      tab:0,
      caseData:[],
      litigants:'',
      nowCaseNo:'',
      nowCaseId:'',
      isFinsh: false,
      caseNo:'',
      regiterTimeSort:'desc',
      nowSeacherStr:'案号',
      showMethod: false,
      pageNumber: 0,
      pageSize: 12,
      busy: false,
      dataEnd:false,
      loadingImg:false,
      caseNumber:'',
      judgeName:'',
      clerkName:'',
      myItems1: [
           {
               label: '案号',
               callback: () => {
                 this.nowSeacherStr='案号'
               }
           },
           {
               label: '法官名字',
               callback: () => {
                 this.nowSeacherStr='法官名字'
               }
           },
           {
               label: '书记号',
               callback: () => {
                 this.nowSeacherStr='书记号'
               }
           }
       ]
    }
  },
  created(){
      
  },
  methods:{
    changeSortDesc(){
      console.log(11)
      this.caseData = [];
      this.pageNumber =  1;
      this.loadingImg = true;
      this.dataEnd = false;
      if(this.regiterTimeSort == 'desc'){
        document.getElementsByClassName('angle_top')[0].classList.add("onS")
        document.getElementsByClassName('angle_bottom')[0].classList.remove("onS")
        this.regiterTimeSort = 'asc';
        this.loadList(true);
      }else{
        document.getElementsByClassName('angle_top')[0].classList.remove("onS")
        document.getElementsByClassName('angle_bottom')[0].classList.add("onS")
        this.regiterTimeSort = 'desc';
        this.loadList(true);
      }
      
      
    },
    popupData(sendAddress,nowCaseId){
      if(sendAddress){
        this.$router.push({name:'caseInfo',params:{caseId:nowCaseId}})
      }else{
        this.$router.push({name:'sendAdress',params:{caseId:nowCaseId}})
      }
      // this.$router.push({name:'timePage',params:{nowCaseId:this.nowCaseId}})
    },
    fn(label, key) {
        console.log(label, key);
        // this.$dialog.loading.open('数据加载中');
        this.caseData = [];
        this.dataEnd = false;
        if(label == '已结案'){
          this.isFinsh = true;
          this.pageNumber =  1;
          this.loadingImg = true;
          this.loadList(true);
        }else{
          this.isFinsh = false;
          this.pageNumber =  1;
          this.loadingImg = true;
          this.loadList(true);
        }
        // setTimeout(() => {
        //     this.$dialog.loading.close();
        //     // this.items[key].content = '新内容【key:' + key + '】新内容_' + new Date().getTime();
        // }, 1000);
    },
    submitHandler() {
      // console.log(value)
        // this.$dialog.toast({mes: `搜索：${value}`});
        this.caseData=[];
        this.pageNumber = 0;
        this.loadMore()

    },
    cancelHandler(){
      this.caseNo = '';
      this.caseData=[];
      this.pageNumber = 0;
      this.loadMore()
    },
    toMap(){
      this.$router.push({name:'map',params:[{caseNo:this.nowCaseNo,litigants:this.litigants}]})
    },
    toTimePage(){
      this.$router.push({name:'timePage',params:{nowCaseId:this.nowCaseId,caseNo:this.nowCaseNo}})
    },
    loadList(flag){
      console.log(this.pageNumber)
      var self=this
      wxLitigantLawCaseList(this.caseNo,this.isFinsh,this.regiterTimeSort,this.pageSize,this.pageNumber)
      .then(function (res) {
        console.log(res)
        if (res.data.result) {
          if(flag){
              // self.caseData = self.caseData.concat(res.data.result);
              if(res.data.result.length < self.pageSize){
                  self.busy = true;
                  self.dataEnd=true;
                  self.loadingImg = false;
              }else{
                  self.busy = false;
                  self.loadingImg = false;
              }
          }else{
              // 第一次加载数据
              // self.caseData = res.data.result
              // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
              self.busy = false;
              self.loadingImg = false;
          }
          let arye = [];
          res.data.result.map(item => {
            let data = {
              caseNo:item.caseNo,
              briefName:item.brief.name,
              id:item.lawCaseId,
              plainInfo:'',
              defentINfo:'',
              sendAddress:item.sendAddress,
            }
            let str1='';
            let str2 = '';
            for(let i=0;i<item.litigant.length;i++){
              if(item.litigant[i].litigationStatus.name == '原告'){
                // str1 = str1 + item.litigant[i].litigantName + "、";
                str1 = item.litigant[i].litigantName + "...";
              }else if(item.litigant[i].litigationStatus.name == '被告'){
                str2 = item.litigant[i].litigantName + "...";
              }
            }
            data.plainInfo = str1; 
            data.defentINfo = str2; 
            self.caseData.push(data);
          })
          // self.caseData = arye;
        }else if(res.data.state=='109'){
          self.$dialog.toast({mes: res.data.message});
          // self.$router.push({name:'loginJudge'})
        }else{
          self.loadingImg = false;
          self.dataEnd=true;
          self.$dialog.toast({mes: res.data.message});
        }

      });
    },
    loadMore: function() {
      this.busy = true;
      this.loadingImg = true;
      this.dataEnd=false;
      // 多次加载数据
      setTimeout(() => {
          this.pageNumber ++;
          this.loadList(true);
      }, 1000);
    }
  }

}
</script>

<style lang="css" >
.yd-cell:after {
    border-bottom:none;
}
.yd-input a{
  display: none!important;
}
input {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    font-size: inherit;
}
.yd-search-input>.search-input {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    padding-top: 1px;
    overflow: hidden;
}
.yd-toast-none-icon .yd-toast-content {
    color:#fff;
}
.angle_top {
  content: '';
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 0 6px 6px;
  border-color: transparent transparent #5e5e5e;
  position: absolute;
  transform: rotate(180deg);
  bottom: 17px;
  right: 17px;
}
.casen{
    display: block;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.2rem;
}
.textCs a{
  font-size: 0.37rem;
}
.angle_bottom {
  content: '';
  width: 0;
  height: 0;
  display: block;
  border-style: solid;
  border-width: 0 6px 6px;
  border-color: transparent transparent #5e5e5e;
  position: absolute;
  top: 13px;
  right: 17px;
}
.leftC{

}
.rightC{

}
.onS{
  border-color: transparent transparent #40a9ff;
}
</style>
