<template lang="html">
<div class=""  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <yd-navbar title='案件列表' bgcolor="#40a9ff" color="#fff">

  </yd-navbar>
  <div style="position: relative;">
    <yd-button @click.native="showMethod = true" size="large" style="font-size: 0.3rem;height: 0.7rem;   width: 25%;float: left;margin-top: 0.15rem;margin-left: .1rem;" v-model='nowSeacherStr'>{{nowSeacherStr}}</yd-button>
    <yd-actionsheet :items="myItems1" v-model="showMethod" cancel="取消"></yd-actionsheet>
  <yd-search v-model="value1" :on-submit="submitHandler" class='seachBtn'></yd-search>
 <yd-button @click.native="submitHandler"  style="position: absolute;top: .2rem;right: .2rem;">搜索</yd-button>
  </div>
  <yd-cell-group>
      <yd-cell-item  v-for="item, key in caseData" :key="key" arrow @click.native="popupData(item.litigants,item.caseNo,item.id)">
        <span slot="left" @click.native="">案号: <span>{{item.caseNo}}</span></span>
      </yd-cell-item>
  </yd-cell-group>
    <template>
      <yd-backtop style=""></yd-backtop>
    </template>
  <span slot="doneTip" v-show='dataEnd'>已经是所有案件了~</span>
  <img slot="loadingTip" v-show='loadingImg' src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
    </div>
</template>

<script>
import Util from '@/libs/util.js'
import {geTCaseList} from '@/api/caseList-new.js'
import {getTimePage} from '@/api/caseList-new.js'
import Vue from 'vue'
var count = 0;
export default {
  data(){
    return{
      data:[],
      show1: false,
      caseData:[],
      litigants:'',
      nowCaseNo:'',
      nowCaseId:'',
      value1: '',
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
    popupData(litigants,nowCaseNo,nowCaseId){
      // this.show1 = true
      this.litigants=""
      this.nowCaseNo=""
      this.nowCaseId=""
      this.litigants=litigants
      this.nowCaseNo=nowCaseNo
      this.nowCaseId=nowCaseId
      this.$router.push({name:'timePage',params:{nowCaseId:this.nowCaseId,caseNo:this.nowCaseNo}})
    },
    submitHandler() {
      // console.log(value)
        // this.$dialog.toast({mes: `搜索：${value}`});
        this.caseData=[];
        this.caseNumber=''
        this.judgeName=''
        this.clerkName=''
        if (this.nowSeacherStr=='案号') {
          this.caseNumber=this.value1
        }else if (this.nowSeacherStr=='法官名字') {
          this.judgeName=this.value1
        }else if (this.nowSeacherStr=='书记号') {
          this.clerkName=this.value1
        }
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
      geTCaseList(this.caseNumber,this.judgeName,this.clerkName,this.pageNumber,this.pageSize)
      .then(function (res) {
        console.log(res)
        if (res.data.result.content) {
          if(flag){
              self.caseData = self.caseData.concat(res.data.result.content);
              if(res.data.result.content.length < self.pageSize){
                  self.busy = true;
                  self.dataEnd=true;
                  self.loadingImg = false;
              }else{
                  self.busy = false;
                  self.loadingImg = false;
              }
          }else{
              // 第一次加载数据
              self.caseData = res.data.result.content;
              // 当第一次加载数据完之后，把这个滚动到底部的函数触发打开
              self.busy = false;
              self.loadingImg = false;
          }
        }else if(res.data.state=='109'){
          self.$dialog.toast({mes: res.data.message});
          self.$router.push({name:'loginJudge'})
        }else{
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

<style lang="css">
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
    width: 75%;
    height: 30px;
    background-color: #fff;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    padding-top: 1px;
    overflow: hidden;
}
</style>
