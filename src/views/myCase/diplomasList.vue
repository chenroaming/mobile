<template lang="html">
<div class="" style="width:100%;height:100%"  v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  <yd-navbar :title="isShowList ? '文书列表' : '文书预览'" id="topd" bgcolor="#40a9ff" color="#fff" >
    <router-link to="/mobile/caseInfo" slot="left" v-show="isShowList">
            <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
        </router-link>
    <span @click="backP" slot="left" v-show="!isShowList">
            <span color="#fff" style="color:#fff;">返回</span>
    </span>
  </yd-navbar>
  <div v-show="isShowList">
    <div style="position: relative;text-align:center">
    </div>
    <yd-cell-group>
      <!-- 
        
      -->
        <yd-cell-item  v-for="item, key in caseData" :key="key" arrow @click.native="popupData(item.path)">
          <span slot="left" @click.native="">
            
            <span class="casen">{{item.name}}</span>        
          </span>
          <!-- <span slot="right"><yd-button type="primary" @click.native="downloads(item.path)" slot="right">下载</yd-button></span> -->
        </yd-cell-item>
    </yd-cell-group>
    
      <template>
        <yd-backtop style=""></yd-backtop>
      </template>
    <span slot="doneTip" style="margin-top:0.2rem;display:inline-block" v-show='dataEnd'>已经是所有文书了~</span>
    <img slot="loadingTip" style="margin: 0 auto;width:30%" v-show='loadingImg' src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
  </div>
  <div v-show="!isShowList" style="width:100%;height:100%">
    <pdf :src='path' style="width:100%;height:100%"></pdf>
    <p class="footer-button" style="position: fixed;bottom:1%;width: 100%;width:100%">
        <button style="padding: 0.1rem 1.5rem;" class="nextBtn" @click='downPdf'> 下载</button>
    </p>
    <img v-show="imageShow"  @click="imgCli" class="wxTips" src="../../images/wxTips.png" alt="">
  </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {geTCaseList} from '@/api/caseList-new.js'
import {getTimePage} from '@/api/caseList-new.js'
import {wxLitigantLawCaseList,wxLitigantSendDiplomsList} from '@/api/mycase.js'
import Vue from 'vue'
import pdf from 'vue-pdf'
var count = 0;
export default {
  components: {
        pdf
    },
  data(){
    return{
      data:[],
      show1: false,
      tab:0,
      caseData:[],
      litigants:'',
      nowCaseNo:'',
      isShowList:true,
      nowCaseId:'',
      isFinsh: false,
      imageShow:false,
      caseNo:'',
      path:"",
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
      urlNow:"",
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
      if(!this.lowCaseId && !this.$route.params.lawCaseId){
          this.lowCaseId = localStorage.getItem("lawCaseId");
          // this.loadList(true);
      }
      if (this.$route.params) {
            if(this.$route.params.lawCaseId){
                this.lowCaseId = this.$route.params.lawCaseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
                // this.loadList(true);
            }
       }
  },
  //  watch: {
	// 	'$route' (to, from) {
  //           if (this.$route.params) {
  //             if(this.$route.params.lawCaseId){
  //                 this.lowCaseId = this.$route.params.lawCaseId;
  //                 localStorage.setItem("lawCaseId",this.lowCaseId);
  //                 console.log(5556)
  //                 this.caseData = [];
  //                 this.pageNumber = 1;
  //                 this.loadList(true);
  //             }
  //       }
	// 	},
  //   },
  downloads(path){
    
    console.log(1111)
  },
  methods:{
    popupData(path){
      // this.$router.push({
      //     name: 'dipDetail',
      //     params: { path: path}
      // });
      
      this.isShowList = false;
      var eleLink = document.createElement("a");
      eleLink.href = '#topd';
      document.body.appendChild(eleLink);
      eleLink.click();
      document.body.removeChild(eleLink);
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
    downPdf(){
      this.imageShow = true;
      this.urlNow =  window.location.href;
      console.log(this.urlNow)
      window.history.pushState({},0,this.path); 
      //  var ua = navigator.userAgent.toLowerCase(); 
      //  console.log(ua.match(/MicroMessenger/i))
      // if(ua.match(/MicroMessenger/i)=="micromessenger") {  
      //     this.imageShow = true;
      //       var absurl = window.location.href; 
      //       this.urlNow = window.location.host;
      //       console.log(this.urlNow)
      //       window.history.pushState({},0,this.path); 
      //       console.log(absurl)
      // }
    },
    imgCli(){
      this.imageShow = false;
       console.log(this.urlNow)
      window.history.pushState({},0,this.urlNow);
    },
    backP(){
      this.isShowList = true;
     
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
    loadList(flag){
      console.log(this.pageNumber)
      var self=this
      console.log(this.lowCaseId)
      wxLitigantSendDiplomsList(this.lowCaseId,this.pageSize,this.pageNumber)
      .then(function (res) {
        
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
              name:item.name,
              id:item.id,
              path:item.path,
            }
            self.caseData.push(data);
          })
          // if(self.pageNumber == 1 && self.caseData != []){
          //   let str = self.caseData[0].path;
          //   let str1 = str.substr(0, 1);
          //   let str2 = window.location.host;
          //   if(str1 == '/'){
          //         self.path =str2 +  self.caseData[0].path;
          //     }else{
          //         self.path =str2 +'/'+  self.caseData[0].path;
          //     }
          // }
        }else if(res.data.state=='109'){
          self.$dialog.toast({mes: res.data.message});
          // self.$router.push({name:'loginJudge'})
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
  bottom: 14px;
  right: 17px;
}
.casen{
    display: block;
    text-align: left;
    font-weight: 600;
    margin-bottom: 0.2rem;
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
  top: 10px;
  right: 17px;
}
.onS{
  border-color: transparent transparent #40a9ff;
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
