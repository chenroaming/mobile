<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="诉讼请求与标的" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'setcase'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-item style="margin-top:20px">
            <span slot="left" class="yd-font-span16">诉讼请求</span>
            <span slot="right">诉讼请求怎么填写</span>
        </yd-cell-item>
        <yd-cell-group title="">
            <yd-cell-item>
                <yd-textarea slot="right"  placeholder="请填写您的诉讼请求" v-model='factContent' ></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="案由" style="margin-top:0.3rem;" >
            <yd-cell-item>
                <div style="width:100%;text-align: left;font-size: .3rem;"  slot='right'   v-on:click="caseType = true">
                    {{caseId =='1'?'民商案件':"执行案件"}}
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="案件类型" style="margin-top:0.3rem;" >
            <yd-cell-item >
                <div style="width:100%;text-align: left;font-size: .3rem;"  slot='right'  v-on:click="popupVisible = true">
                    {{briefMenuMsg}}
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="标的总额（元/人民币）">
            <yd-cell-item>
                <yd-input slot="right" v-model="standarMoney"  placeholder="在此处填入金额"></yd-input>
                <span slot="right">元</span>
            </yd-cell-item>
        </yd-cell-group>
        <mt-popup
        v-model="popupVisible"
        position="bottom" style="width:100%;background-color: #f1f1f1;">
            <div class="pickerDiv" v-for="item in briefMenuArr" :key="item.id"  v-on:click="briefMenuVal = item.id; briefMenuMsg=item.name; popupVisible = false">{{item.name}}</div>
            <div class="pickerDiv" v-on:click="popupVisible = false">取消</div>
        </mt-popup>
        <mt-popup
        v-model="caseType"
        position="bottom" style="width:100%;background-color: #f1f1f1;">
            <div class="pickerDiv" v-on:click="caseId ='1';caseType = false">民商案件</div>
            <div class="pickerDiv" v-on:click="caseId = '2';caseType = false">执行案件</div>
            <div class="pickerDiv" v-on:click="caseType = false">取消</div>
        </mt-popup>
        <p class="footer-button" style="position: relative;top:5%;">
            <mt-button type="primary" size='large' class='mint-btn' @click.native="nextStep" style='margin-top:500px;'>下一步</mt-button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {briefMenu} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
  data(){
    return{
        onlineBriefId:'',
        briefMenuArr:[],
        briefMenuVal:'',
        popupVisible:false,
        briefMenuMsg:'请选择案由',
        standarMoney:'',
        factContent:'',
        caseType:false,
        caseTypeMsg:'民商案件',
        caseId:'1',
      }
  },
  created(){
    
    briefMenu().then(res => {
        this.briefMenuArr=res.data.result
        console.log(this.$store.state.onlineLawCase)
        if (this.$store.state.onlineLawCase) {
            this.caseId=this.$store.state.onlineLawCase.type
            this.briefMenuVal=this.$store.state.onlineLawCase.onlineBrief.id
            this.standarMoney=this.$store.state.onlineLawCase.standarMoney
            this.factContent=this.$store.state.onlineLawCase.factContent
        }
    })
  },
  watch: {
        briefMenuVal(curVal,oldVal){
// 　　　　　　console.log(curVal,oldVal);
　　　      },
  },
  methods:{
    test(){
        console.log(1111)
    },
    upStep(){

    },
    showType(value){
        // console.log(value)
    },
    nextStep(){
        if (this.factContent=='') {
            
            this.$dialog.toast({
                mes: '请填写诉讼请求',
                icon: "warning",
                timeout: 1000
            });
        }else if (this.briefMenuVal=='') {
            this.$dialog.toast({
                mes: '请选择案由',
                icon: "warning",
                timeout: 1000
            });
        }else if (this.standarMoney=='') {
            this.$dialog.toast({
                mes: '请输入标的总额',
                icon: "warning",
                timeout: 1000
            });
        }else{
            this.$store.commit('factContent', this.factContent)
            this.$router.push({
                name:'factSD',
                query: { 
                    'type':this.caseId,
                    'onlineBriefId':this.briefMenuVal,
                    'standarMoney':this.standarMoney,
                }
            })
        }
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
.blockD{
    margin-top:20px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    min-height:80px;
    background:#fff;
    padding:10px 10px;
    text-align:left;
}
.mint-btn {
    background-color:#40a9ff;
    padding: 0.1rem 0.7rem;
    font-size: 16px;
    border-radius: 0.1rem;
    width: 90%;
    margin: 0 auto;
    margin-bottom: .5rem;
}
.factI textarea{
    height:4.5rem
}
.briefMenu{
vertical-align:middle;display: inline-block;width:100%;text-align:right
}

.pickerDiv{
    text-align: center;
    padding: .2rem;
    background-color: #fff;
    font-size: .3rem;
}
.mint-popup-bottom {
        max-height: 5rem;

    overflow: scroll;
}
.mint-toast-text {
        color:#fff
    }
.yd-toast-none-icon .yd-toast-content {
    color:#fff
}
.yd-textarea textarea {
    height: 3.5rem;
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    padding: 0.2rem;
}
</style>
