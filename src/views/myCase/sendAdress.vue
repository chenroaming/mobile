<template lang="html">
<div class="" style="height:100%;background:#fff"   infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <yd-navbar title='送达地址确认' bgcolor="#40a9ff" color="#fff">
        <router-link to="/mobile/mycase" slot="left">
            <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
        </router-link>
    </yd-navbar>
    <div class="textD" style='text-align:left;margin-bottom:0.2rem;padding:0 0.2rem;margin-top:0.5rem;font-size:0.3rem;'>
        <p style="text-indent:2em">
            为便于当事人及时收到人民法院诉讼文书，保证诉讼程序顺利进行，当事人应当如实
            提供确切的送达地址。
        </p>
        <p style="text-indent:2em">
            您在本平台提供或确认的送达地址，将适用于一审、二审、三审、再审再查、执行程序，以及同期在受理法院审理的其他案件。
        </p>
        <p style="text-indent:2em">
            您注册本平台时已验证手机号码，该手机号码将作为您的联系方式予以确认。
        </p>
        <p style="text-indent:2em">
            请填写有效的邮寄地址。如本人收件不需要填写收件人姓名和电话；如他人代收请一并填写代收人姓名和电话。
        </p>
    </div>
    <yd-cell-group title="">
        <yd-cell-item style="border-top:1px solid #ccc;border-bottom:1px solid #ccc;">
            <yd-textarea slot="right" v-model="sendAddress" placeholder="请填写送达地址" maxlength="500"></yd-textarea>
        </yd-cell-item>
    </yd-cell-group>
    <div class="textD" style='text-align:left;margin-bottom:0.2rem;padding:0 0.2rem;margin-top:0.5rem;font-size:0.3rem;'>
        <p style="text-indent:2em">
            因送达人自己提供或者确认的送达地址不准确、拒不提供送达地址、送达地址变更未及时告知法院、送达人本人或者受送达人指定的代收人拒绝签收，导致诉讼文书未能被受送达人实际签收的，文书退回之日视为送达之日。
        </p>
    </div>
    <p class="footer-button" style="position: relative;top:3%;">
        <button class="nextBtn" @click='nextPage'> 确认邮寄送达地址</button>
    </p>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {wxSaveChoiceSendInfo} from '@/api/mycase.js'
import Vue from 'vue'
var count = 0;
export default {
  data(){
    return{
      data:[],
      timeData:[],
      isFixs:true,
      show1: false,
      tab:0,
      lowCaseId:'',
      sendAddress:"",

    }
  },
  created(){
      console.log(this.$route.params)
      if (this.$route.params) {
            if(this.$route.params.caseId){
                this.lowCaseId = this.$route.params.caseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
            }
       }
    if(this.lowCaseId == ''){
        this.lowCaseId = localStorage.getItem("lawCaseId");
    }
  },
  methods:{
    nextPage(){
        if(this.sendAddress == ''){
            this.$dialog.toast({
                    mes: '送达地址不能为空!',
                    timeout: 1500
            });
            return false;
        }
        let self = this;
        wxSaveChoiceSendInfo(this.lowCaseId,this.sendAddress).then(res => {
            if(res.data.state == 100){
                this.$dialog.toast({
                        mes: '提交成功!',
                        timeout: 1000
                });
                window.setTimeout(function(){
                    self.$router.push({name:'caseInfo',params:{caseId:self.lowCaseId}})
                },1500)
                
            }else{
                this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                });
            }
        })
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
    width: 100%;
    height: 30px;
    background-color: #fff;
    border: none;
    border-radius: 3px;
    margin-right: 10px;
    padding-top: 1px;
    overflow: hidden;
}
.textD p{
    margin-bottom:0.2rem;
    line-height: 0.4rem;
}
.yd-toast-none-icon .yd-toast-content {
    color:#fff;
}
</style>
