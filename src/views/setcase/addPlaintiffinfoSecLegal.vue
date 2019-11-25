<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div  style="height:100%;background:#F1F2F6">
        <yd-navbar title="原告身份信息" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'addPlaintiffInfo'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">公司名称：</span>
                    <yd-input slot="right" required v-model="litigantName" placeholder="请输入公司名称"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">法定代表人：</span>
                    <yd-input slot="right" required v-model="legalManName" placeholder="请输入法定代表人"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">信用代码：</span>
                    <yd-input slot="right" required v-model="identityCard" type="number" placeholder="请输入信用代码"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">注册地址：</span>
                    <yd-input slot="right" required v-model="nativePlace" placeholder="福建省厦门市思明区莲前东路xx号"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">经营地址：</span>
                    <yd-input slot="right" required v-model="address" placeholder="福建省厦门市思明区莲前东路xx号"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">联系人：</span>
                    <yd-input slot="right" required v-model="linkman"  placeholder="请输入联系人"></yd-input>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">联系电话：</span>
                    <yd-input slot="right" required v-model="legalManPhone" max="11" type='tel' placeholder="请输入联系电话"></yd-input>
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
import {saveWXOnlineLitigantLegal} from '@/api/setcase.js'
import {updateWXOnlineLitigantLegal} from '@/api/setcase.js'
import Vue from 'vue'
import {getLitigantInfolitigant} from '@/api/setcase.js'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    data(){
        return{
            
            identityType:"",
            fileType:"",
            
            username:'',
            onlineLawCaseId:'',
            litigationStatusId:1,
            litigantType:1,
            identityType:1,

            legalManPhone:'',
            linkman:'',
            address:'',
            nativePlace:'',
            legalManName:'',
            frontImage:'',
            identityCard:'',//新加字段
            litigantName:"",//新加字段

            onlineLitigantId:'',
            fromtOrLegalImg:''
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
                    that.legalManName=res.data.onlineLitigant.legalManName
                    that.legalManPhone=res.data.onlineLitigant.legalManPhone
                    that.nativePlace=res.data.onlineLitigant.nativePlace
                    that.address=res.data.onlineLitigant.address

                    that.litigantName=res.data.onlineLitigant.litigantName
                    that.identityCard=res.data.onlineLitigant.identityCard
                })
            }
    },
    methods:{
        test(){
            console.log(1111)
        },
        showType(){

        },
        upStep(){

        },
        nextStep(){
            this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
            this.litigationStatusId=Util.GetUrlParam('litigationStatusId')
            if (this.$store.getters.fromtOrLegalImg1) {
                this.fromtOrLegalImg=this.$store.getters.fromtOrLegalImg1
            }else{
                this.fromtOrLegalImg=''
            }
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
            }else if (this.litigantName=="") {
                this.$dialog.toast({
                    mes: '公司名称不能为空',
                    icon: "warning",
                    timeout: 1500
                });
            }else if (this.identityCard=="") {
                this.$dialog.toast({
                    mes: '信用代码不能为空',
                    icon: "warning",
                    timeout: 1500
                });
            }
            else{
                if (this.onlineLitigantId=='') {
                    saveWXOnlineLitigantLegal(
                        this.onlineLawCaseId,
                        this.litigationStatusId,
                        this.litigantType,
                        this.identityType,

                        this.legalManName,
                        this.legalManPhone,
                        this.nativePlace,
                        this.address,
                        this.litigantName,
                        this.identityCard,
                        this.fromtOrLegalImg
                    ).then(res => {
                        if (res.data.state==100) {
                            console.log(res.data.onlintLitigant.id)
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
                }else if (this.onlineLitigantId!='') {
                    updateWXOnlineLitigantLegal(
                        this.onlineLawCaseId,
                        this.litigationStatusId,
                        this.litigantType,
                        this.identityType,

                        this.legalManName,
                        this.legalManPhone,
                        this.nativePlace,
                        this.address,
                        this.litigantName,
                        this.identityCard,
                        this.fromtOrLegalImg,

                        this.onlineLitigantId
                    ).then(res => {
                        if (res.data.state==100) {
                            console.log(res.data.onlintLitigant.id)
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
