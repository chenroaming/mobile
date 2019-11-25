<template lang="html">
<div class="" style="height:100%"   infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <yd-navbar title='质证意见' bgcolor="#40a9ff" color="#fff">
        <router-link to="/mobile/evidenceInfo" slot="left">
            <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
        </router-link>
    </yd-navbar>
    <div class="textD" style='text-align:left;margin-bottom:0.2rem;padding:0 0.2rem;margin-top:0.2rem;font-size:0.3rem;'>
        <p style="text-indent:2em">
            对该证据的真实性、合法性、关联性及证明目的有异议请填写下发质证意见。
        </p>
    </div>
    <!-- <yd-cell-group  style="margin-top:0.1rem;">
        <yd-cell-item  >
            <span slot="left" style="max-width:100%;word-wrap:break-word">对该证据的真实性、合法性、关联性及证明目的有异议请填写下发质证意见。</span>
        </yd-cell-item>
    </yd-cell-group> -->
    <yd-cell-group title="提出异议">  
            <yd-cell-item>
                <span slot="left">真实性</span>
                <span slot="right" style="padding:0.2rem;"><yd-switch color="#FF0000" @click.native="fn1"  v-model="switch1"></yd-switch></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">合法性</span>
                <span slot="right" style="padding:0.2rem;"><yd-switch color="#FF0000" @click.native="fn2" v-model="switch2"></yd-switch></span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">关联性</span>
                <span slot="right" style="padding:0.2rem;"><yd-switch color="#FF0000" @click.native="fn3" v-model="switch3"></yd-switch></span>
            </yd-cell-item>
            <yd-cell-group title="不认可理由（必填）" v-show="isShow">
                <yd-cell-item style="border-top:1px solid #ccc;border-bottom:1px solid #ccc;">
                    <yd-textarea slot="right" v-model="reasons" placeholder="请填写不认可理由" maxlength="500"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group title="其他意见（可不填）">
                <yd-cell-item style="border-top:1px solid #ccc;border-bottom:1px solid #ccc;">
                    <yd-textarea slot="right" v-model="otherReason" placeholder="请输入其他意见" maxlength="500"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
    </yd-cell-group>
    <p class="footer-button" style="position: relative;top:1%;">
        <button class="nextBtn" @click='submit'> 提交</button>
    </p>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import { formatDate } from '@/libs/date.js';
import {addreverts} from '@/api/mycase.js'
import {getTimePage} from '@/api/caseList-new.js'
import Vue from 'vue'
var count = 0;
export default {
  data(){
    return{
        evidenceId:"",
        checklist2:[],
        switch1:false,
        switch2:false,
        switch3:false,
        reasons:"",
        isShow:false,
        isSelect:1,
        otherReason:""
    }
  },
  created(){
      if(!this.evidenceId){
          this.evidenceId = localStorage.getItem("evidenceId");
      }
      if (this.$route.params) {
            if(this.$route.params.evidenceId){
                this.evidenceId = this.$route.params.evidenceId;
                localStorage.setItem("evidenceId",this.evidenceId);
                // this.getDetail(this.evidenceId);
            }
       }
    
  },
  mounted(){
    //   if(this.lowCaseId == ''){
    //         this.evidenceId = localStorage.getItem("evidenceId");
    //         this.getDetail(this.evidenceId);
    //     }
        
  },
  methods:{
    submit(){
        if(this.isShow == true && this.reasons == ''){
            this.$dialog.toast({
                    mes: '请输入不认可理由',
                    timeout: 1500
            });
            return false;
        }
        let self = this;
        let str = (this.switch1 ? '0' : '1') + (this.switch2 ? '0' : '1') + (this.switch3 ? '0' : '1');
        addreverts(this.evidenceId,this.reasons,this.otherReason,str).then(res => {
            if(res.data.state == 100){
                this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                });
                window.setTimeout(function(){
                    self.$router.push({name:'evidenceInfo',params:{evidenceId:self.evidenceId,isButton:1}})
                },1500)
            }else{
               this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                }); 
                
            }
        })
    },
    fn1(){
        if(this.isSelect == 1){
            this.isShow = true;
        }else if(this.switch2 == false && this.switch3 == false && this.switch1 == true){
            this.isShow = false;
        }else{
            this.isShow = true;
        }
        this.isSelect = this.isSelect + 1;
    },
    fn2(){
        if(this.isSelect == 1){
            this.isShow = true;
        }else if(this.switch1 == false && this.switch3 == false && this.switch2 == true){
            this.isShow = false;
        }else{
            this.isShow = true;
        }
        this.isSelect = this.isSelect + 1;
    },
    fn3(){
        if(this.isSelect == 1){
            this.isShow = true;
        }else if(this.switch2 == false && this.switch1 == false && this.switch3 == true){
            this.isShow = false;
        }else{
            this.isShow = true;
        }
        this.isSelect = this.isSelect + 1;
    },
  },
  filters: {
        formatDate (time) {
            if(time == null){
                  return "";
            }else{
                var date = new Date(time);
                 return formatDate(date, 'yyyy-MM-dd');
            }
           
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
.yd-toast-none-icon .yd-toast-content {
    color:#fff;
}
.tipTitke{
    border-top: 1px solid #ccc;
}
.tipTitke span{
    text-align: center;
    line-height: 0.5rem;
    font-weight: 600;
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
.yd-cell-title {
    line-height: 0.4rem;
    padding-top: 0.1rem;
}
.timepa p{
    line-height: 0.4rem;
}

.plaimSpan{
    /* display: inline-block; */
    padding: 5px;
    color: #fff;
    background: #40a9ff;
    margin-right: 5px;
}
.defentSpan{
    /* display: inline-block; */
    padding: 5px;
    color: #40a9ff;
    border: 1px solid #40a9ff;
    margin-right: 5px;
}
.lawSpan{
    /* display: inline-block; */
    padding: 5px;
    margin-right: 5px;
    color: #40a9ff;
}
.containInfo p{
    text-align: center;
    line-height: 0.7rem;
}
.textD p{
    margin-bottom:0.2rem;
    line-height: 0.4rem;
}
</style>

