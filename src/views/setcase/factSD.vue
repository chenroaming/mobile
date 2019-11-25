<template lang="html">
<div style="height:100%;background:#F1F2F6" id='maxBox' ref="maxBox">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="事实与理由" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'claimInfo'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-item style="margin-top:20px">
            <span slot="left" class="yd-font-span16">事实与理由</span>
            <span slot="right">事实与理由怎么填写</span>
        </yd-cell-item>
        <yd-cell-group title="" style='    padding-bottom: 10rem;'>
            <yd-cell-item>
                <yd-textarea slot="right" v-model="reasonContent" class="factI"  placeholder="请填写您的事实与理由" ></yd-textarea>
            </yd-cell-item>
        </yd-cell-group>
        <p class="footer-button" style="position: relative;top:5%;">
            <mt-button type="primary" size='large' class='mint-btn' @click.native="nextStep">提交保存</mt-button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
import {saveLawCaseInfo} from '@/api/setcase.js'
import {updateLawCaseInfo} from '@/api/setcase.js'
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    data(){
        return{
            type:'',
            onlineBriefId:'',
            standarMoney:'',
            factContent:'',
            reasonContent:'',

            scroll: '',
            scrollWatch: true

        }
    },
    mounted () {
    this.$router.afterEach((to, from, next) => {
        window.scrollTo(0, 0)
    })
    
},
    created(){
        // // chrome
        
        // // firefox
        // document.documentElement.scrollTop = -100
        // // safari
        // window.pageYOffset = -100
        console.log(this.$store.state.onlineLawCase)
        if (this.$store.state.onlineLawCase) {
            this.reasonContent=this.$store.state.onlineLawCase.reasonContent
        }
    },
    methods:{
        test(){
            console.log('this is test')
        },
        upStep(){

        },
        nextStep(){
            this.type=Util.GetUrlParam('type')
            this.onlineBriefId=Util.GetUrlParam('onlineBriefId')
            this.standarMoney=Util.GetUrlParam('standarMoney')
            this.factContent=this.$store.getters.factContent
            if (this.$store.state.onlineLawCase) {
                this.type=this.$store.state.onlineLawCase.type
                this.onlineBriefId=this.$store.state.onlineLawCase.onlineBrief.id
                this.standarMoney=this.$store.state.onlineLawCase.standardMoney
                this.factContent=this.$store.state.onlineLawCase.factContent
            }
            if (this.reasonContent=='') {
                this.$dialog.toast({
                    mes: '请输入事实与理由',
                    icon: "warning",
                    timeout: 1000
                });
            }else if (this.type!=''&&this.onlineBriefId!=''&&this.standarMoney!=''&&this.factContent!='') {
                if (this.$store.state.onlineLawCase) {
                    console.log(this.standarMoney)
                    updateLawCaseInfo(this.type,this.onlineBriefId,this.standarMoney,this.factContent,this.reasonContent,this.$store.state.onlineLawCase.id).then(res => {
                        // console.log(res.data.onlineLawCase)
                        if (res.data.state=='100') {
                            this.$dialog.toast({
                                mes: '案件信息修改成功',
                                icon: "warning",
                                timeout: 1500
                            });
                            let data = res.data.onlineLawCase
                            this.$store.commit('setOnlineLawCase', res.data.onlineLawCase)
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
                    saveLawCaseInfo(this.type,this.onlineBriefId,this.standarMoney,this.factContent,this.reasonContent).then(res => {
                        if (res.data.state=='100') {
                            this.$dialog.toast({
                                mes: '案件信息保存成功',
                                icon: "warning",
                                timeout: 1500
                            });
                            let data = res.data.onlineLawCase
                            this.$store.commit('setOnlineLawCase', res.data.onlineLawCase)
                            localStorage.setItem("onlineLawCase",JSON.stringify(this.$store.state.onlineLawCase))
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
            }else{
                this.$dialog.toast({
                    mes: '参数缺失，请返回上一步重新填写',
                    icon: "warning",
                    timeout: 1000
                });
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
.mint-btn {
    background-color:#40a9ff;
    padding: 0.1rem 0.7rem;
    font-size: 16px;
    border-radius: 0.1rem;
    width: 90%;
    margin: 0 auto;
    margin-bottom: .5rem;
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
.yd-toast-none-icon .yd-toast-content {
    color:#fff
}
</style>
