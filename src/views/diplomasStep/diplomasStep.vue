<template lang="html">
<div class="">
  <yd-navbar title='文书历史' bgcolor="#40a9ff" color="#fff">
    <span @click="backP" slot="left" v-show="!isShowList">
            <span color="#fff" style="color:#fff;">返回</span>
    </span>
  </yd-navbar>
  <div v-show="isShowList">
  <yd-cell-group>
      <yd-cell-item>
          <span slot="left">案号：<span v-model="caseNo">{{caseNo}}</span></span>
      </yd-cell-item>
  </yd-cell-group>
  <yd-timeline>
    <yd-timeline-item v-for="item in timeData">
        
        <div style="height:0.5rem">
            <span style="font-weight:600;float:left;line-height: 0.5rem;">{{item.name}}</span>
             <yd-button type="hollow" style="float:right" @click.native="previewBtn(item.path)">预览</yd-button>
        </div>
        <p style="margin-top: 10px;">当事人人：<span>{{item.litigantName}}</span></p>
        <p style="margin-top: 10px;">{{item.createDate  | formatDate}}</p>
    </yd-timeline-item>
</yd-timeline>
<template>
    <yd-backtop style=""></yd-backtop>
</template>
</div>

<div v-show="!isShowList" style="width:100%;height:100%;position: fixed;top:1rem;left:0;">
    <pdf :src='path' style="width:100%;height:100%;"></pdf>
    <p class="footer-button" style="position: fixed;bottom:1%;width: 100%;width:100%">
        <button style="padding: 0.1rem 1.5rem;" class="nextBtn" @click='downPdf'> 下载</button>
    </p>
    <img v-show="imageShow" @click="imgCli" class="wxTips" src="../../images/wxTips.png" alt="">
</div>
</div>

</template>

<script>
import Util from '@/libs/util.js'
import {geTCaseList} from '@/api/caseList-new.js'
import { formatDate } from "@/libs/date.js";
import {historyDiplomas} from '@/api/step.js'
import Vue from 'vue'
import pdf from 'vue-pdf'
export default {
  components: {
        pdf
    },
  data(){
    return{
      timeData:[],
      caseNo:"",
      nowCaseId:"",
      issongd:true,
      isShowList:true,
      path:'',
      imageShow:false,
      urlNow:"",
    }
  },
  created(){
    if(Util.GetUrlParam("nowCaseId")){
      this.nowCaseId = Util.GetUrlParam("nowCaseId");
      this.issongd = false;
    }else{
      this.caseNo=this.$route.params.caseNo
      this.nowCaseId = this.$route.params.nowCaseId;
      this.issongd = true;      
    }
    historyDiplomas(this.nowCaseId).then(res=>{
      if (res.data.state==100) {
        this.caseNo = res.data.data.caseNo;
        this.timeData=res.data.data.diplomsList;
      }else{
        console.log(res.data.message)
      }
    })
  },
  methods:{
    downPdf(){
      this.imageShow = true;
      this.urlNow =  window.location.href;
      console.log(this.urlNow)
      window.history.pushState({},0,this.path); 
    },
    imgCli(){
      this.imageShow = false;
       console.log(this.urlNow)
      window.history.pushState({},0,this.urlNow);
    },
    previewBtn(path){
      this.isShowList = false;

      // var eleLink = document.createElement("a");
      // eleLink.href = '#topd';
      // document.body.appendChild(eleLink);
      // eleLink.click();
      // document.body.removeChild(eleLink);
      console.log(path)
      let str = path;
      let str1 = str.substr(0, 1);
      let str2 = window.location.host;
      let httpNm =  document.location.protocol;
      if(str1 == '/'){
            if(httpNm == 'https:'){
                this.path = 'https://' + str2 +  path;
            }else{
                this.path = 'http://' + str2 +  path;
            }
        }else{
            if(httpNm == 'https:'){
                this.path = 'https://' + str2 +'/'+  path;
            }else{
                this.path = 'http://' + str2 +'/'+  path;
            }
            
        }
      console.log(this.path)
    },
    backP(){
      this.isShowList = true;
    },
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
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDateTime(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
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
.wxTips{
  width: 100%;
  height: 100%;
  position: fixed;
  top:0;
  left: 0;
    z-index: 9999;
}
</style>
