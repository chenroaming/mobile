<template lang="html">
<div class="">
  <yd-navbar title='时间轴' bgcolor="#40a9ff" color="#fff">
    <router-link to="caseList-new" slot="left" v-show="issongd">
        <yd-navbar-back-icon color="#fff"><span style="color:#fff">返回</span></yd-navbar-back-icon>
    </router-link>
  </yd-navbar>
  <yd-cell-group>
    <yd-cell-item>
        <span slot="left">案号：<span v-model="caseNo">{{caseNo}}</span></span>
    </yd-cell-item>
</yd-cell-group>
  <yd-timeline>
    <yd-timeline-item v-for="item in timeData">
        <p>{{item.operatorContent}}</p>
        <p style="margin-top: 10px;">操作人：<span>{{item.operatorName}}</span></p>
        <p style="margin-top: 10px;">{{item.createDate}}</p>
    </yd-timeline-item>
</yd-timeline>
<template>
    <yd-backtop style=""></yd-backtop>
</template>
</div>

</template>

<script>
import Util from '@/libs/util.js'
import {geTCaseList} from '@/api/caseList-new.js'
import {getTimePage} from '@/api/caseList-new.js'
import Vue from 'vue'
export default {
  data(){
    return{
      timeData:[],
      caseNo:"",
      nowCaseId:"",
      issongd:true,
    }
  },
  created(){
    if(Util.GetUrlParam("nowCaseId")){
      this.nowCaseId = Util.GetUrlParam("nowCaseId");
      this.caseNo = decodeURI(Util.GetUrlParam("caseNo"));
      // this.caseNo=URLDecoder.decode(names,"utf8");
      this.issongd = false;
    }else{
      this.caseNo=this.$route.params.caseNo
      this.nowCaseId = this.$route.params.nowCaseId;
      this.issongd = true;      
    }
    getTimePage(this.nowCaseId).then(res=>{
      if (res.data.state==100) {
        console.log(this.caseNo)
        console.log(res.data)
        this.timeData=res.data.result
        for (var i = 0; i < res.data.result.length; i++) {
          res.data.result[i].createDate=this.getMyDate(res.data.result[i].createDate)
        }
      }else{
        console.log(res.data.message)
      }
    })
  },
  methods:{
    getMyDate(str){
        var oDate = new Date(str),
        oYear = oDate.getFullYear(),
        oMonth = oDate.getMonth()+1,
        oDay = oDate.getDate(),
        oHour = oDate.getHours(),
        oMin = oDate.getMinutes(),
        oSen = oDate.getSeconds(),
        oTime = oYear +'-'+ this.getzf(oMonth) +'-'+ this.getzf(oDay) +' '+ this.getzf(oHour) +':'+ this.getzf(oMin) +':'+this.getzf(oSen);//最后拼接时间
        return oTime;
    },
    //补0操作
    getzf(num){
        if(parseInt(num) < 10){
            num = '0'+num;
        }
        return num;
    },
  }
}
</script>

<style lang="css">
.yd-timeline-content {
    margin-left: 16px;
    border-left: 1px solid #e4e5e9;
    text-align: left;
}
.yd-backtop{
  bottom: 10%;
}
</style>
