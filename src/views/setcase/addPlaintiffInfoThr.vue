<template lang="html">
<div style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="原告送达信息" bgcolor="#40a9ff" color="#fff">
            <!-- <router-link :to="{name: 'addPlaintiffInfoSec'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link> -->
        </yd-navbar>
            <yd-cell-group style="    margin-bottom: 0rem;">
                <yd-cell-item>
                    <span slot="left">是否有代理人接收送达消息</span>
                    <span slot="right">
                        <yd-radio-group v-model="isReplace" style="text-align:right">
                            <yd-radio val="1">是</yd-radio>
                            <yd-radio val="0">否</yd-radio>
                        </yd-radio-group>
                    </span>
                </yd-cell-item>
            </yd-cell-group>
            <div style="margin-bottom: 0.2rem;margin-top: .2rem;">(若由代理人接收送达信息则在下方填写代理人的联系信息)</div>

            <yd-cell-group v-if='isReplaceshow'>
                <yd-cell-item arrow type="label">
                    <span slot="left">接收人：</span>
                    <select slot="right" v-model="onlineLawyerId" @change="showType">
                        <option :value=item.id v-for="item in lawyerArr" :key="item.id">{{item.name}}</option>
                    </select>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手机号码：</span>
                    <yd-input slot="right" required v-model="phone" type="number" max="11" placeholder="请输入手机号码"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">电子邮箱：</span>
                    <yd-input slot="right" required v-model="email" placeholder="请输入电子邮箱"></yd-input>
                </yd-cell-item>
            
                <yd-cell-item>
                    <span slot="left">司法专邮送达地址：</span>
                    <yd-input slot="right" required v-model="emailaddr" placeholder="请输入司法专邮送达地址"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
                    <yd-cell-group title="电子送达方式选择" v-if='isReplaceshow'>
                        <yd-cell-item type="checkbox">
                            <span slot="left">电子邮箱</span>
                            <input slot="right" type="checkbox" value=1 v-model="checkedNames"/>
                        </yd-cell-item>

                        <yd-cell-item type="checkbox">
                            <span slot="left">湖里微法院小程序内消息</span>
                            <input slot="right" type="checkbox" value=2 v-model="checkedNames"/>
                        </yd-cell-item>

                        <yd-cell-item type="checkbox">
                            <span slot="left">湖里区人民法院互联网法庭微信公众号</span>
                            <input slot="right" type="checkbox" value=3 v-model="checkedNames"/>
                        </yd-cell-item>

                        <!-- <yd-cell-item>
                            <span slot="left">选中的值：</span>
                            <span slot="right">{{checkedNames}}</span>
                        </yd-cell-item> -->
                    </yd-cell-group>
                    <yd-radio-group v-model="radio3">
                        <yd-radio val="">我已详细阅读，知悉并接受遵守<a style="color:blue">《送达地址有关事项告知书》</a></yd-radio>
                    </yd-radio-group>
            
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep'>提交保存</button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {getLawyers} from '@/api/setcase.js'
import {saveSendee} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    data(){
        return{
            identityType:"",
            fileType:"",
            onlineLawyerId:'',
            phone:'',
            email:'',
            emailaddr:'',
            isReplace:0,
            isReplaceshow:false,
            datetime4:'2017-05-11',
            checkedNames:[1],
            radio3:'',
            onlintLitigantId:'',
            lawyerArr:[]
        }
    },
    created(){
        this.isReplace=0
        if (this.isReplace==1) {
            this.isReplaceshow=true
            this.onlintLitigantId=Util.GetUrlParam('onlintLitigantId')
                    getLawyers(this.$store.getters.litigantInfoFristId,this.$store.getters.onlineLawCase.id).then(res => {
                    console.log(res.data.result)
                    if (!res.data.result.length) {

                        this.$dialog.confirm({
                            title: '提示',
                            mes: '您还未添加代理人，是否返回主页添加代理人，',
                            opts: () => {
                                this.$router.push({
                                    name:'infoList',
                                    query:{
                                        'onlintLitigantId':that.onlintLitigantId
                                    }
                                })
                            }
                        });
                    }else{
                        that.lawyerArr=res.data.result
                        console.log(res.data.result)
                    }
                })
        }
    },
    watch: {
        '$route' (to,from) {
            this.isReplace=0
		},
        isReplace:function(curVal,oldVal){
              let that=this
                if (curVal==1) {
                    this.$dialog.loading.open('正在获取代理人信息，请稍后...');
                    this.onlintLitigantId=Util.GetUrlParam('onlintLitigantId')
                    getLawyers(this.onlintLitigantId,this.$store.getters.onlineLawCase.id).then(res => {
                    console.log(res.data.result)
                    that.$dialog.loading.close();
                    if (!res.data.result.length) {
                        that.$dialog.confirm({
                            title: '提示',
                            mes: '您还未添加代理人，是否返回主页添加代理人，',
                            opts:
                            [
                                {
                                    txt: '取消',
                                    color: false,
                                    callback: () => {
                                        this.isReplace=0
                                        this.isReplaceshow=false
                                    }
                                },
                                {
                                    txt: '确定',
                                    color: true,
                                    callback: () => {
                                        this.$router.push({
                                            name:'infoList',
                                            query:{
                                                'onlintLitigantId':that.onlintLitigantId
                                            }
                                        })
                                    }
                                }
                            ]
                        });
                    }else{
                        that.lawyerArr=res.data.result
                        console.log(res.data.result)
                        this.isReplaceshow=true
                    }
                })
            }else if (curVal==0) {
                this.isReplaceshow=false
            }
        },
    },
    methods:{
        test(){
            console.log('this is test~')
        },
        showType(e) {
            let value = e.target.value;
            this.onlineLawyerId=value
            },
        upStep(){

        },
        nextStep(){
            if (this.isReplace==0) {
                saveSendee(this.isReplace).then(res=>{
                    console.log(res)
                    this.$router.push({
                        name:'infoList'
                    })
                })
            }else if (this.isReplace==1) {
                if (this.onlineLawyerId=="") {
                    this.$dialog.toast({
                        mes: '接收人不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else if (this.phone=="") {
                     this.$dialog.toast({
                        mes: '手机号不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else if (this.email=="") {
                     this.$dialog.toast({
                        mes: '邮件地址不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else if (this.sendType=="") {
                     this.$dialog.toast({
                        mes: '送达方式不能为空',
                        icon: "warning",
                        timeout: 1500
                    });
                }else{
                    let newSendType=this.checkedNames.join(',')
                    console.log(this.onlineLawyerId)
                    console.log(newSendType)
                    saveSendee(
                        this.isReplace,
                        this.$store.getters.litigantInfoFristId,
                        this.onlineLawyerId,
                        this.phone,
                        this.email,
                        
                        newSendType
                    ).then(res=>{
                        console.log(res)
                        this.$router.push({
                            name:'infoList'
                        })
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
.yd-radio-text {
    font-size: 12px;
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
