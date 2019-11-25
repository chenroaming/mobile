<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div  style="height:100%;background:#F1F2F6">
        <yd-navbar title="原告身份信息" bgcolor="#40a9ff" color="#fff">
            <!-- <router-link :to="{name: 'addPlaintiffInfo'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link> -->
        </yd-navbar>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">姓名：</span>
                    <yd-input slot="right" required v-model="litigantName" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">性别：</span>
                    <div slot="right" style="width:100%">
                        <Select @change="showType" v-model="litigantSex"  style="vertical-align:middle;display: inline-block;width:100%;text-align:right">
                            <!-- <Option  value=0 >请选择当事人身份类型</Option> -->
                            <Option  value=0 >男</Option>
                            <Option  value=1 >女</Option>                                
                        </Select>
                    </div>
                </yd-cell-item>
                <!-- <yd-cell-item>
                    <span slot="left">性别：</span>
                    <yd-input slot="right" required v-model="litigantSex" placeholder="请输入性别"></yd-input>
                </yd-cell-item> -->
            
                <yd-cell-item arrow>
                    <span slot="left">出生：</span>
                    <yd-datetime type="date" v-model="birthday" slot="right" start-date="1950-01-01"></yd-datetime>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">民族：</span>
                    <yd-input slot="right" required v-model="nation" placeholder="请输入民族"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">公民身份证号码：</span>
                    <yd-input slot="right" required v-model="identityCard" type="number" max="22" placeholder="请填写"></yd-input>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">联系电话：</span>
                    <yd-input slot="right" required v-model="litigantPhone" type='tel' max="11" placeholder="请填写"></yd-input>
                </yd-cell-item>

                <yd-cell-item>
                    <span slot="left">住址：</span>
                    <yd-input slot="right" required v-model="address"  placeholder="请填写"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">工作单位：</span>
                    <yd-input slot="right" required v-model="employer"  placeholder="请填写"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">工作地址：</span>
                    <yd-input slot="right" required v-model="employerAddress"  placeholder="请填写"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">户籍地址：</span>
                    <yd-input slot="right" required v-model="nativePlace"  placeholder="请填写"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">常住地址：</span>
                    <yd-input slot="right" required v-model="sendAddress"  placeholder="请填写"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep'>提交保存</button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {saveWXOnlineLitigant} from '@/api/setcase.js'
import {updateWXOnlineLitigant} from '@/api/setcase.js'
import {getLitigantInfolitigant} from '@/api/setcase.js'
import {getOnlineLitigantInfo} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
// import addPlaintiffInfoThrVue from '../../components/setcase/litigantInfo/addPlaintiffInfoThr.vue';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    data(){
        return{
            onlineLawCaseId:'',
            identityType:0,
            fromtOrLegalImg:'',
            opposite:'',
            litigantType:0,

            litigantName:'',
            litigantSex:0,
            birthday:'1990-01-01',
            nation:'',
            identityCard:'',
            litigantPhone:'',
            address:'',
            employer:'',
            employerAddress:'',
            nativePlace:'',
            sendAddress:'',


            onlineLitigantId:''
        }
    },
    watch: {
        '$route' (to, from) {
            
        }
    },
  created(){
      this.menu();
      this.litigationStatusId=Util.GetUrlParam('litigationStatusId')
            
            let that=this
            
            if (Util.GetUrlParam('onlineLitigantId')) {
                this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            }else{
                this.onlineLitigantId=''
            }
            if (this.onlineLitigantId=="") {
                getOnlineLitigantInfo(1).then(res => {
                    console.log(res)
                    that.address=res.data.onlineLitigant.address
                    that.identityCard=res.data.onlineLitigant.identityCard
                    that.litigantName=res.data.onlineLitigant.litigantName
                    that.nation=res.data.onlineLitigant.nation
                    that.litigantSex=res.data.onlineLitigant.litigantSex
                    var d=new Date(res.data.onlineLitigant.birthday); 
                    var year=d.getFullYear(); 
                    var month=d.getMonth()+1; 
                    var date=d.getDate(); 
                    that.birthday=year+"-"+month+"-"+date;
                })
            }else{
                getLitigantInfolitigant(this.onlineLitigantId).then(res => {
                    console.log(1)
                    console.log(res)
                    console.log(2)
                    that.litigantName=res.data.onlineLitigant.litigantName
                    that.litigantPhone=res.data.onlineLitigant.litigantPhone
                    that.litigantSex=res.data.onlineLitigant.litigantSex
                    that.identityCard=res.data.onlineLitigant.identityCard
                    that.nation=res.data.onlineLitigant.nation
                    that.address=res.data.onlineLitigant.address
                    that.employer=res.data.onlineLitigant.employer
                    that.employerAddress=res.data.onlineLitigant.employerAddress
                    that.nativePlace=res.data.onlineLitigant.nativePlace
                    that.sendAddress=res.data.onlineLitigant.sendAddress
                    var d=new Date(res.data.onlineLitigant.birthday); 
                    var year=d.getFullYear(); 
                    var month=d.getMonth()+1; 
                    var date=d.getDate(); 
                    that.birthday=year+"-"+month+"-"+date; 
                })
            }
  },
  methods:{
      menu() {
  window.scrollTo(0,0);
},
    test(){
        console.log(1111)
    },
    formatDate(now) { 
        var year=now.getFullYear(); 
        var month=now.getMonth()+1; 
        var date=now.getDate(); 
        return "20"+year+"-"+month+"-"+date; 
    },
    showType(e) {
        let value = e.target.value;
        this.litigantSex=value
    },
    upStep(){

    },
    nextStep(){
        
        // this.opposite=Util.GetUrlParam('opposite').replace('%2F','/')
        // this.fromtOrLegalImg=decodeURI(Util.GetUrlParam('fromtOrLegalImg'))
        this.litigationStatusId=Util.GetUrlParam('litigationStatusId')
        this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
        // console.log(this.$store)
        if (this.$store.getters.opposite) {
            this.opposite=this.$store.getters.opposite
        }else{
            this.opposite=''
        }
        if (this.$store.getters.fromtOrLegalImg) {
            this.fromtOrLegalImg=this.$store.getters.fromtOrLegalImg
        }else{
            this.fromtOrLegalImg=''
        }
        if (this.litigantName=='') {
            this.$dialog.toast({
                mes: '姓名不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.birthday=="") {
            this.$dialog.toast({
                mes: '请填写您的出生日期',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.nation=="") {
            this.$dialog.toast({
                mes: '请填写您的民族',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.identityCard=="") {
            this.$dialog.toast({
                mes: '身份证不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.litigantPhone=="") {
            this.$dialog.toast({
                mes: '联系电话不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.address=="") {
            this.$dialog.toast({
                mes: '住址不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.employer=="") {
            this.$dialog.toast({
                mes: '工作单位不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.employerAddress=="") {
            this.$dialog.toast({
                mes: '工作住址不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else if (this.sendAddress=="") {
            this.$dialog.toast({
                mes: '常住地址不能为空',
                icon: "warning",
                timeout: 1500
            });
        }else{
            let date = this.birthday;
            date = date.substring(0,19);    
            date = date.replace(/-/g,'/'); 
            let timestamp = new Date(date).getTime();
            console.log(timestamp)
            if (this.onlineLitigantId=="") {
                saveWXOnlineLitigant(
                    this.onlineLawCaseId,
                    this.litigationStatusId,
                    this.litigantType,
                    this.identityType,
                    this.fromtOrLegalImg,
                    this.opposite,

                    this.litigantName,
                    this.litigantSex,
                    timestamp,
                    this.nation,
                    this.identityCard,
                    this.litigantPhone,
                    this.address,
                    this.employer,
                    this.employerAddress,
                    this.nativePlace,
                    this.sendAddress,
                ).then(res => {
                    console.log(res)
                    if (res.data.state==100) {
                        if (this.$store.getters.litigantInfoFristId=="") {
                            this.$store.commit('setlitigantInfoFristId', res.data.onlintLitigant.id)
                        }
                        this.$router.push({
                            name:'addPlaintiffInfoThr',
                            query:{
                                'onlintLitigantId':res.data.onlintLitigant.id
                            }
                        })
                    }else{
                        this.$dialog.toast({
                            mes: res.data.message,
                            icon: "warning",
                            timeout: 1500
                        });
                    }
                })
            }else if (this.onlineLitigantId!="") {
                updateWXOnlineLitigant(
                    this.onlineLawCaseId,
                    this.litigationStatusId,
                    this.litigantType,
                    this.identityType,
                    this.fromtOrLegalImg,
                    this.opposite,

                    this.litigantName,
                    this.litigantSex,
                    timestamp,
                    this.nation,
                    this.identityCard,
                    this.litigantPhone,
                    this.address,
                    this.employer,
                    this.employerAddress,
                    this.nativePlace,
                    this.sendAddress,

                    this.onlineLitigantId,
                ).then(res => {
                    console.log(res)
                    if (res.data.state==100) {
                        if (this.$store.getters.litigantInfoFristId=="") {
                            this.$store.commit('setlitigantInfoFristId', res.data.onlintLitigant.id)
                        }
                        this.$dialog.toast({
                            mes: '修改成功',
                            icon: "warning",
                            timeout: 1500
                        });
                        this.$router.push({
                            name:'addPlaintiffInfoThr',
                            query:{
                                'onlintLitigantId':this.onlineLitigantId
                            }
                        })
                    }else{
                        this.$dialog.toast({
                            mes: res.data.message,
                            icon: "warning",
                            timeout: 1500
                        });
                    }
                })
            }
            
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
.factI textarea{
    height:4.5rem
}
.upidentityfilD{
    width:80%;
    border: 1px solid #ccc;
    margin: 10px 0;
    display: inline-block;
}
.upidentityfilD .upfilD{
    margin-top:30px;
}
.yd-btn-primary {
    background-color: #40a9ff;
    color: #fff;
    padding: 0.1rem 0.7rem;
    font-size: 16px;
    border-radius: 0.25rem;
}
</style>
