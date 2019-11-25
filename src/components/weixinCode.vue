<template lang="html">
<div class="">
  <yd-navbar title="文书验证" bgcolor="#40a9ff" color="#fff">
      <!-- <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link> -->
  </yd-navbar>
  <yd-cell-group style="position: relative;">  
      <yd-cell-item>
          <span slot="left">{{type == 3 ? '引调号：' : '案件编号：'}}</span>
          <span slot="right">{{ caseInfo.caseNo }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">{{type == 3 ? '回执编号：' : '案由：'}}</span>
          <span slot="right">{{ caseInfo.brief }}</span>
      </yd-cell-item>
      <yd-cell-item v-show="type != 3">
          <span slot="left">承办法庭：</span>
          <span slot="right">{{ caseInfo.courtName }}</span>
      </yd-cell-item>
      <!-- <yd-cell-item>
          <span slot="left">开庭地点：</span>
          <span slot="right">{{ caseInfo.openCourtAddress }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">立案日期：</span>
          <span slot="right">{{ caseInfo.expireDate | formatDate }}</span>
      </yd-cell-item> -->
      <yd-cell-item v-show="type != 3">
          <span slot="left">审判员：</span>
          <span slot="right">{{ caseInfo.judge }}</span>
      </yd-cell-item>
      <yd-cell-item v-show="type != 3">
          <span slot="left">书记员：</span>
          <span slot="right">{{ caseInfo.clerk }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">案件标的：</span>
          <span slot="right">{{ caseInfo.applyStandard }}元</span>
      </yd-cell-item>
        <yd-cell-item style='width: 70%;background-color: #fff;' v-show=codeShow>
            <span slot="left">验证码：</span>
            <yd-input slot="right" v-model="codeValue" max="20" placeholder="输入右侧验证码"></yd-input>
            
        </yd-cell-item>
        <span v-show=codeShow style='height: 1rem;float: right;position: absolute;right: 0;bottom: 0;padding: 5px;'  @click="changeUserCode">
            <img :src="userCodeSrc" alt="验证码" style="vertical-align: middle;height: 100%;">
        </span>
        
      <!-- <yd-cell-item>
          <span slot="left">证据提交人：</span>
          <span slot="right">{{ caseInfo.litigantName }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">诉讼地位：</span>
          <span slot="right">{{ caseInfo.litigantType }}</span>
      </yd-cell-item>             -->
     </yd-cell-group>
     <yd-button size="large" type="primary" @click.native='getErWeiMa' v-show=codeShow>点击获取文书二维码</yd-button>
    <div style="margin:0 auto;width:200px;height:200px;border:1px solid #ccc;margin-top:10px" v-show=!codeShow>
        <img :src="filePath"  alt="二维码" style="width:100%;height:100%"/>
    </div>
    <p style="margin-top: 10px;font-size: 18px;font-weight: 600;" v-show=!codeShow>验证文书请微信长按识别二维码</p>
</div>

</template>

<script>
import Util from '@/libs/util.js'
import {wxImageLawCaseInfo,getCode,getWxImageUrl} from '@/api/weixinCode.js'
import Vue from 'vue'
export default {
  data(){
    return{
        userCodeSrc: '/api/main/dpcode.jhtml',
        codeValue:'',
      timeData:[],
      lawCaseId:'',
      litigantId:"",
      sendId:"",
      filePath:"",
      caseNo:"",
      type:"",
      caseInfo:{
        caseNo:"",
        brief:"",
        courtName:"",
        judge:"",
        clerk:"",
        applyStandard:"",
        
      },
      codeShow:true,
    }
  },
  created(){

    const idStr = Util.GetUrlParam("id");
    var arr = idStr.split("-");
    console.log(arr)
    this.lawCaseId = arr[0];
    this.litigantId = arr[1];
    this.sendId = arr[2];
    if(arr.length == 4){
      this.type = arr[3];
    }else{
      this.type = "";
    }
    wxImageLawCaseInfo(this.lawCaseId,this.litigantId,this.sendId,this.type).then(res=>{
        if (res.data.state==100) {
            if(this.type == 1){
                this.filePath =  res.data.path;
            }else{
                this.filePath = "/" + res.data.path;
            }
            if(this.type == 3){
                this.caseInfo.caseNo=res.data.lawCase.caseNo;
                this.caseInfo.brief=res.data.lawCase.code;
                // this.caseInfo.courtName=res.data.lawCase.court.name;
                // this.caseInfo.judge=res.data.lawCase.judge.name;
                // this.caseInfo.clerk=res.data.lawCase.clerk.name;
                this.caseInfo.applyStandard=res.data.lawCase.standardMoney;
            }else if (this.type == 4) {
                this.caseInfo.caseNo=res.data.lawCase.caseNo;
                this.caseInfo.brief=res.data.lawCase.code;
                // this.caseInfo.courtName=res.data.lawCase.court.name;
                // this.caseInfo.judge=res.data.lawCase.judge.name;
                // this.caseInfo.clerk=res.data.lawCase.clerk.name;
                this.caseInfo.applyStandard=res.data.lawCase.standardMoney;
            }
            else{
                this.caseInfo.caseNo=res.data.lawCase.caseNo;
                this.caseInfo.brief=res.data.lawCase.brief.name;
                this.caseInfo.courtName=res.data.lawCase.court.name;
                this.caseInfo.judge=res.data.lawCase.judge.name;
                this.caseInfo.clerk=res.data.lawCase.clerk.name;
                this.caseInfo.applyStandard=res.data.lawCase.applyStandard;
            }
        }else{
            this.$dialog.toast({
                mes: res.data.message,
                timeout: 1500
            })
        }
    })
  },
    methods:{
        getErWeiMa(){
          
            if (this.codeValue) {
                getWxImageUrl(this.codeValue,this.lawCaseId,this.litigantId,this.sendId,this.type).then(res=>{
                    if (res.data.state==100) {
                        this.codeShow=false
                        if(this.type == 1){
                            this.filePath =  res.data.path;
                        }else{
                            this.filePath = "/" + res.data.path;
                        }
                        if(this.type == 3){
                        }else{
                        }
                    }else{
                        this.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        })
                    }
                })
            }else{
                this.$dialog.toast({
                    mes: '验证码不能为空',
                    timeout: 1500
                })
            }
          
        },
    changeUserCode(){
        this.userCodeSrc = '/api/main/dpcode.jhtml?tm=' + Math.random();
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
  }
}
</script>

<style lang="css">
.yd-timeline-content {
    margin-left: 16px;
    border-left: 1px solid #e4e5e9;
    text-align: left;
}
</style>
