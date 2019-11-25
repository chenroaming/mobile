<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="第三人身份信息" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'infoList'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
            <yd-cell-group>
                <yd-cell-item arrow>
                    <div slot="right" style="width:100%">
                        <Select @change="showType" v-model="litigantType"  style="vertical-align:middle;display: inline-block;width:100%;text-align:right">
                            <!-- <Option  value=0 >请选择当事人身份类型</Option> -->
                            <option disabled value=0>请选择</option>
                            <Option  :value=item.id v-for='item in identityArr'>{{item.text}}</Option>                              
                        </Select>
                    </div>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group v-if='litigantType==0'>
                <yd-cell-item>
                    <span slot="left">姓名：</span>
                    <yd-input slot="right" required v-model="litigantName" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item arrow type="label">
                    <span slot="left">性别：</span>
                    <select slot="right" v-model='litigantSex'>
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
                <yd-cell-item arrow type="label">
                    <span slot="left">身份证件：</span>
                    <span slot="right">中华人民共和国居民身份证</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">公民身份证号码：</span>
                    <yd-input slot="right" required v-model="identityCard" max="22" placeholder="210602199996666666"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手机号码：</span>
                    <yd-input slot="right" required v-model="litigantPhone" type="tel" max="11" placeholder=""></yd-input>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group v-if='litigantType==1'>
                <yd-cell-item>
                    <span slot="left">姓名：</span>
                    <yd-input slot="right" required v-model="legalManName" max="20" placeholder="请输入用户名"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">注册地址：</span>
                    <yd-input slot="right" required v-model="nativePlace" max="20" placeholder="请输入注册地址"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">经营地址：</span>
                    <yd-input slot="right" required v-model="address" max=""></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手机号码：</span>
                    <yd-input slot="right" required v-model="legalManPhone" type="tel" max="11" placeholder=""></yd-input>
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
import {saveWXOnlineLitigantLegal} from '@/api/setcase.js'
import {updateWXOnlineLitigant} from '@/api/setcase.js'
import {updateWXOnlineLitigantLegal} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
    export default {
        data(){
            return{
                onlineLitigantId:'',

                litigationStatusId:3,
                litigantType:0,
                identityType:0,

                litigantName:'',
                litigantSex:0,
                birthday:'',
                nation:'',
                identityCard:'',
                litigantPhone:'',

                legalManName:'',
                legalManPhone:'',
                nativePlace:'',
                address:'',

                identityArr:[
                    {id:0,text:'自然人'},
                    {id:1,text:'法人'},
                ]
            }
        },
        created(){
            let that=this
            if (Util.GetUrlParam('onlineLitigantId')) {
                this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            }else{
                this.onlineLitigantId=''
            }
            if (this.onlineLitigantId=="") {
                    
            }else{
                getLitigantInfolitigant(this.onlineLitigantId).then(res => {
                    console.log(res.data)
                    if (res.data.onlineLitigant.litigantType==0) {
                    that.litigantType=0
                    that.identityType=0
                }else if (res.data.onlineLitigant.litigantType==1) {
                    that.litigantType=1
                    that.identityType=1
                    that.identityArr=[
                        {id:1,text:'法人'},
                        {id:0,text:'自然人'}
                    ]
                }
                    that.litigantType=res.data.onlineLitigant.litigantType
                    if (res.data.onlineLitigant.litigantType==0) {
                        that.litigantName=res.data.onlineLitigant.litigantName
                        that.litigantPhone=res.data.onlineLitigant.litigantPhone
                        that.litigantSex=res.data.onlineLitigant.litigantSex
                        that.identityCard=res.data.onlineLitigant.identityCard
                        that.nation=res.data.onlineLitigant.nation
                        var d=new Date(res.data.onlineLitigant.birthday); 
                        var year=d.getFullYear(); 
                        var month=d.getMonth()+1; 
                        var date=d.getDate(); 
                        that.birthday=year+"-"+month+"-"+date;
                    }else{
                        that.legalManName=res.data.onlineLitigant.legalManName
                        that.legalManPhone=res.data.onlineLitigant.legalManPhone
                        that.nativePlace=res.data.onlineLitigant.nativePlace
                        that.address=res.data.onlineLitigant.address
                    }
                })
            }
        },
        methods:{
            showType(e) {
                let value = e.target.value;
                this.litigantType=value
                if (this.litigantType==0) {
                    this.identityType=0
                }else if (this.litigantType==1) {
                    this.identityType=1
                }
            },
            nextStep(){
                if (Util.GetUrlParam('onlineLitigantId')) {
                    this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
                }else{
                    this.onlineLitigantId=''
                }
                if (this.identityType==0) {
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
                    }else{
                        this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
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
                                "",
                                "",

                                this.litigantName,
                                this.litigantSex,
                                timestamp,
                                this.nation,
                                this.identityCard,
                                this.litigantPhone
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
                        else if (this.onlineLitigantId!="") {
                            updateWXOnlineLitigant(
                                this.onlineLawCaseId,
                                this.litigationStatusId,
                                this.litigantType,
                                this.identityType,
                                '',
                                '',

                                this.litigantName,
                                this.litigantSex,
                                timestamp,
                                this.nation,
                                this.identityCard,
                                this.litigantPhone,
                                '',
                                '',
                                '',
                                '',
                                '',
                                this.onlineLitigantId,
                            ).then(res => {
                                if (res.data.state==100) {
                                    this.$dialog.toast({
                                        mes: '修改成功',
                                        icon: "warning",
                                        timeout: 1500
                                    });
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
                }else if (this.identityType==1) {
                    if (this.onlineLitigantId=="") {
                        this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
                        if (this.legalManPhone=="") {
                            this.$dialog.toast({
                                mes: '法人联系方式不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.legalManName=="") {
                            this.$dialog.toast({
                                mes: '法人联系人不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.address=="") {
                            this.$dialog.toast({
                                mes: '经营地址不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.nativePlace=="") {
                            this.$dialog.toast({
                                mes: '注册地址人不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else{
                            saveWXOnlineLitigantLegal(
                                this.onlineLawCaseId,
                                this.litigationStatusId,
                                this.litigantType,
                                this.identityType,

                                this.legalManName,
                                this.legalManPhone,
                                this.nativePlace,
                                this.address,
                            ).then(res => {
                                if (res.data.state==100) {
                                    console.log(res.data.onlintLitigant.id)
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
                    }else if (this.onlineLitigantId!="") {
                        this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
                        if (this.legalManPhone=="") {
                            this.$dialog.toast({
                                mes: '法人联系方式不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.legalManName=="") {
                            this.$dialog.toast({
                                mes: '法人联系人不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.address=="") {
                            this.$dialog.toast({
                                mes: '经营地址不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else if (this.nativePlace=="") {
                            this.$dialog.toast({
                                mes: '注册地址人不能为空',
                                icon: "warning",
                                timeout: 1500
                            });
                        }else{
                            updateWXOnlineLitigantLegal(
                                this.onlineLawCaseId,
                                this.litigationStatusId,
                                this.litigantType,
                                this.identityType,

                                this.legalManName,
                                this.legalManPhone,
                                this.nativePlace,
                                this.address,
                                "",
                                this.onlineLitigantId
                            ).then(res => {
                                if (res.data.state==100) {
                                    console.log(res.data.onlintLitigant.id)
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
