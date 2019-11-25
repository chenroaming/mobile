<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="代理人身份信息" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'Lawyer'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
            <yd-cell-group>
                
                <yd-cell-item>
                    <span slot="left">姓名：</span>
                    <yd-input slot="right" required v-model="name" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow type="label">
                    <span slot="left">性别：</span>
                    <select slot="right" v-model="sex" @change=showType>
                        <option value="">请选择性别</option>
                        <option value=0>男</option>
                        <option value=1>女</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item arrow>
                    <span slot="left">出生：</span>
                    <yd-datetime type="date" v-model="birthday" slot="right"  start-date="1950-01-01"></yd-datetime>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">民族：</span>
                    <yd-input slot="right" required v-model="nation" max="20" placeholder="请输入民族"></yd-input>
                </yd-cell-item>
               
                <yd-cell-item>
                    <span slot="left">律师执业证号码：</span>
                    <yd-input slot="right" required v-model="lawyerIdcard" placeholder="210602199996666666"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">联系地址：</span>
                    <yd-input slot="right" required v-model="address" placeholder=""></yd-input>
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
import {addWXLawyer} from '@/api/setcase.js'
import {updateWXOnlineLawyer} from '@/api/setcase.js'
import {getLawyerInfo} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
    export default {
        data(){
            return{
                onlineLawCaseId:'',
                onlineLitigantId:'',
                type:1,

                name:'',
                sex:0,
                birthday:"1980-01-01",
                nation:'',
                lawyerIdcard:'',
                address:'',
                lawyerImg:'',
                onlineLawyerId:''
            }
        },
        created(){
            let that=this
            this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
            if (this.$store.getters.lawyerImg) {
                this.lawyerImg=this.$store.getters.lawyerImg
            }else{
                this.lawyerImg=''
            }
            this.onlineLawyerId=Util.GetUrlParam('onlineLawyerId')
            if (Util.GetUrlParam('onlineLitigantId')) {
            this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            }else{
                this.onlineLitigantId=''
            }
            if (this.onlineLawyerId=="") {
                    
            }else{
                getLawyerInfo(this.onlineLawyerId).then(res => {
                    console.log(res.data.onlineLawyer)
                    that.name=res.data.onlineLawyer.name
                    that.sex=res.data.onlineLawyer.sex
                    that.nation=res.data.onlineLawyer.nation
                    that.address=res.data.onlineLawyer.address
                    that.lawyerIdcard=res.data.onlineLawyer.lawyerIdcard
                    var d=new Date(res.data.onlineLitigant.birthday); 
                    var year=d.getFullYear(); 
                    var month=d.getMonth()+1; 
                    var date=d.getDate(); 
                    that.birthday=year+"-"+month+"-"+date;
                })
            }
        },
        methods:{
            test(){
            },
            showType(e) {
                let value = e.target.value
                this.sex=value
            },
            upStep(){

            },
            nextStep(){
                this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
                this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')

                if (this.name=='') {
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
                }else if (this.lawyerIdcard=="") {
                    this.$dialog.toast({
                        mes: '律师执业证号不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else if (this.address=="") {
                    this.$dialog.toast({
                        mes: '联系地址不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else{

                    let date = this.birthday;
                    date = date.substring(0,19);    
                    date = date.replace(/-/g,'/'); 
                    let timestamp = new Date(date).getTime();
                    console.log(timestamp)
                    this.onlineLawyerId=Util.GetUrlParam('onlineLawyerId')
                    if (this.onlineLawyerId!="") {
                        updateWXOnlineLawyer(
                            this.onlineLawCaseId,
                            this.onlineLitigantId,
                            this.type,
                            this.name,
                            this.sex,
                            timestamp,
                            this.nation,
                            this.lawyerIdcard,
                            this.address,
                            this.lawyerImg,
                            this.onlineLawyerId
                        ).then(res => {
                            console.log(res)
                            this.$dialog.toast({
                                mes: '修改成功',
                                icon: "warning",
                                timeout: 1500
                            });
                            if (res.data.state==100) {
                                this.$router.push({
                                    name:'infoList'
                                })
                            }else{
                                this.$dialog.toast({
                                    mes: res.data.message,
                                    icon: "warning",
                                    timeout: 1500
                                });
                            }
                        })
                    }else{
                        addWXLawyer(
                            this.onlineLawCaseId,
                            this.onlineLitigantId,
                            this.type,
                            this.name,
                            this.sex,
                            timestamp,
                            this.nation,
                            this.lawyerIdcard,
                            this.address,
                            this.lawyerImg,
                        ).then(res => {
                            console.log(res)
                            if (res.data.state==100) {
                                this.$router.push({
                                    name:'infoList'
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
    /* height: 120px; */
    width:80%;
    border: 1px solid #ccc;
    /* border-radius: 0.3rem; */
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
