<template lang="html">
<div  style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="填写立案信息" bgcolor="#40a9ff" color="#fff">
                <router-link  slot="left" :to="{name: !dataFrom?'factSD':'EvidenceMaterial',query: !dataFrom?'':{ 'updateEviden': 'updateEviden' }}">
                    <yd-navbar-back-icon  style="color:#fff;" color="#fff"  >上一步</yd-navbar-back-icon>
                </router-link>
        </yd-navbar>
        <div>
            <div class="blockD">
                <p class="yd-font-span16"  style='padding-bottom: .3rem;'> 原告</p>
                    <yd-cell-group v-show='litigantInfoFristId'>
                        <yd-cell-item arrow type="a" v-for="item in litigantInfoArr" v-if='item.litigationStatus.id==1' style="width:100%"  @click.native=updateLitigant(item.id)>
                            <span slot="left" style="width:100%">{{item.litigantName?item.litigantName:item.legalManName}}</span>
                            
                        </yd-cell-item>
                    </yd-cell-group>
                <div class="assCla"  @click='dropPlaintiffInfo'><img src="../../images/add.png" alt="湖里法院" style="width:0.8rem"></div>
            </div>
            <div class="blockD">
                <p class="yd-font-span16" style='padding-bottom: .3rem;'>原告代理人（一个案件至多两个代理人）</p>
                <yd-cell-group v-show='lawyerInfoArr'>
                    <yd-cell-item arrow type="a" v-for="item in lawyerInfoArr"  style="width:100%" @click.native=changeLawyer(item.id)>
                        <span slot="left" style="width: 100%;height: .7rem;display: flex;align-items: center;">{{item.name}}</span>
                    </yd-cell-item>
                </yd-cell-group>
                <div class="assCla"> <img src="../../images/add.png" alt="湖里法院" style="width:0.8rem" v-show='addImgLawyer' @click='Lawyer'></div>                
            </div>
            <div class="blockD">
                <p class="yd-font-span16" style='padding-bottom: .3rem;'>被告</p>
                <yd-cell-group v-show='litigantInfoFristId'>
                    <yd-cell-item arrow type="a" v-for="item in litigantInfoArr" v-if='item.litigationStatus.id==2' style="width:100%"  @click.native=updatedefendant(item.id)>
                        <span slot="left" style="width:100%">{{item.litigantName?item.litigantName:item.legalManName}}</span>
                    </yd-cell-item>
                </yd-cell-group>
                <div class="assCla"> <img src="../../images/add.png" alt="湖里法院" style="width:0.8rem" @click='dropDefendant'></div>                
            </div>
            
            <div class="blockD">
                <p class="yd-font-span16" style='padding-bottom: .3rem;'>第三人</p>
                <yd-cell-group v-show='litigantInfoFristId'>
                    <yd-cell-item arrow type="a" v-for="item in litigantInfoArr" v-if='item.litigationStatus.id==3' style="width:100%"  @click.native=updatethirdPeo(item.id)>
                        <span slot="left" style="width:100%">{{item.litigantName?item.litigantName:item.legalManName}}</span>
                    </yd-cell-item>
                </yd-cell-group>
                <div class="assCla"> <img src="../../images/add.png" alt="湖里法院" style="width:0.8rem"  @click='dropThirdPeo'></div>                
            </div>
            <div  v-if=dataFrom>
            <yd-cell-group title="原告送达信息" style="margin-top:0.3rem;">
                <yd-cell-item >
                    <div slot="right" style="width:100%;text-align:left">
                        {{checkData.onlineLawyers[0]?checkData.onlineLawyers[0].name:'暂无送达信息'}}
                    </div>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="诉讼请求" style="margin-top:0.3rem;">
                <yd-cell-item>
                    <div slot="right" style="width:100%;text-align:left">
                        {{checkData.factContent}}
                    </div>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="标的总额（元/人民币）" style="margin-top:0.3rem;">
                <yd-cell-item>
                    <div slot="right" style="width:100%;text-align:left">
                        {{checkData.standardMoney}}
                    </div>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="事实与理由" style="margin-top:0.3rem;">
                <yd-cell-item>
                    <div slot="right" style="width:100%;text-align:left">
                        {{checkData.reasonContent}}
                    </div>
                </yd-cell-item>
            </yd-cell-group>

            <yd-cell-group title="证据材料" style="margin-top:0.3rem;" >
                <yd-cell-item  v-if ="checkData.onlineLitigants[0]&&item1.isDel!=true&&item1.type==3" v-for="item1 in evidenceArr">
                    <div slot="right" style="width:100%;text-align:left" >
                        {{item1.eviName}}
                    </div>
                </yd-cell-item>
            </yd-cell-group>
            </div>
        </div>
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep' v-if=!dataFrom> 下一步</button>
            <button class="nextBtn" @click='dataFromCheck' v-if=dataFrom> 确认无误，提交审核</button>
        </p>
        <yd-actionsheet :items="myItems1" v-model="show1" cancel="取消"></yd-actionsheet>
    </div>
</div>
</template>
<script>
import Util from '@/libs/util.js'
import {getLitigantInfo} from '@/api/setcase.js'
import {getLawyerList} from '@/api/setcase.js'
import {getOnlineLawCaseEdit} from '@/api/setcase.js'
import {deleteLitigantInfo} from '@/api/setcase.js'
import {deleteLawyerInfo} from '@/api/setcase.js'
import {commitRegisterLawCase} from '@/api/setcase.js'
import {loginUserIsLitigant} from '@/api/setcase.js'
export default {
    data(){
        return{
            show1:false,
            myItems1: [
                    {
                        label: '',
                        callback: () => {}
                    },
                    {
                        label: '',
                        callback: () => {}
                    }
                ],
            onlineLawCaseId:'',
            litigantInfoArr:[],
            litigantInfoFristId:'',
            lawyerInfoArr:'',
            addImgLawyer:true,
            dataFrom:'',
            checkData:'',
            evidenceArr:''
        }
    },
    watch: {
		
    },
    created(){
        console.log(this.$store.state.onlineLawCase)
        let that=this
        this.$dialog.toast({
            mes: '获取信息中...',
            timeout: 2000
        });
        getLitigantInfo(this.$store.getters.onlineLawCase.id).then(res => {
            
            if (res.data.result.length!=0) {
                that.litigantInfoArr=res.data.result
                that.litigantInfoFristId=that.litigantInfoArr[0].id
                that.$store.commit('setlitigantInfoFristId', that.litigantInfoArr[0].id)
            }
            
            getLawyerList(this.$store.getters.onlineLawCase.id).then(res => {
                if (res.data.result.length!=0) {
                    that.lawyerInfoArr=res.data.result
                    if (that.lawyerInfoArr.length==2) {
                        that.addImgLawyer=false
                    }
                }
            })
        })
        

        if (Util.GetUrlParam('dataFrom')) {
            this.evidenceArr=[]
            // this.$dialog.loading.open('正在获取信息，请稍后...');
            this.dataFrom=Util.GetUrlParam('dataFrom')
            getOnlineLawCaseEdit(this.$store.getters.onlineLawCase.id).then(res => {
                this.checkData=res.data.result
                for (let index = 0; index < this.checkData.onlineLitigants.length; index++) {
                    if (this.checkData.onlineLitigants[index].litigationStatus.name=='原告'&&this.checkData.onlineLitigants[index].onlineEvidenceAttachments.length!=0) {
                        this.evidenceArr=this.checkData.onlineLitigants[index].onlineEvidenceAttachments
                        break;
                    }
                }
                console.log(this.evidenceArr)
            })
        }
    },
    methods:{
        dropDefendant(){
            if (this.dataFrom=="") {
                this.$router.push({
                    name:'Defendant'
                })
            }
        },
        dropThirdPeo(){
            if (this.dataFrom=="") {
                this.$router.push({
                    name:'thirdPeo'
                })
            }
        },
        changeLawyer(id){//修改or删除代理人
            console.log(id)
            if (this.dataFrom=="") {
                this.show1=true
                let that =this
                this.myItems1=[
                    {label: '修改代理人',
                        callback: () => {
                            console.log(id)
                            this.$router.push({
                                name:'Lawyer',
                                query:{
                                    'onlineLitigantId':that.litigantInfoFristId,
                                    'onlineLawyerId':id
                                }
                            })
                            /* 注意： callback: function() {} 和 callback() {}  这样是无法正常使用当前this的 */
                        }
                    },
                    {
                        label: '删除代理人',
                        callback: () => {
                            console.log(id)
                            deleteLawyerInfo(id).then(res => {
                                console.log(res)
                                if (res.data.state==100) {
                                    this.$dialog.toast({
                                        mes: '删除成功',
                                        icon: "warning",
                                        timeout: 1000
                                    });
                                    getLawyerList(this.$store.getters.onlineLawCase.id).then(res => {
                                        that.lawyerInfoArr=res.data.result
                                    })
                                    this.addImgLawyer=true
                                }
                            })
                        }
                    }
                ]
            }
        },
        Lawyer(){//添加律师代理人
            console.log(this.dataFrom)
            if (this.dataFrom=="") {
                if (this.litigantInfoFristId) {
                    this.$router.push({
                        name:'Lawyer',
                        query:{
                            'onlineLitigantId':this.litigantInfoFristId
                        }
                    })
                }else{
                    this.$dialog.toast({
                        mes: '请先添加原告当事人',
                        icon: "warning",
                        timeout: 1000
                    });
                }
            }
            
        },
        test(){
            console.log(1111)
        },
        upStep(){
            if (Util.GetUrlParam('dataFrom')=='isOk') {
                this.$router.push({
                    name:'EvidenceMaterial',
                    query:{
                        'updateEviden':'updateEviden'
                    }
                })
            }else{
                this.$router.push({
                    name:'factSD'
                })
            }
        },
        dropPlaintiffInfo(){//添加原告
            if (this.dataFrom=="") {
                this.$router.push({
                    name:'addPlaintiffInfo'
                })
            }
        },
        nextStep(){
            loginUserIsLitigant(this.$store.getters.onlineLawCase.id).then(res => {
                if (res.data.state==100) {
                    this.$router.push({
                        name:'EvidenceMaterial'
                    })
                }else{
                    this.$dialog.toast({
                        mes: res.data.message,
                        icon: "warning",
                        timeout: 1500
                    });
                }
            })
        },
        updatedefendant(id){//修改or删除被告当事人
            let that=this
            if (this.dataFrom=="") {
                this.show1=true
                this.myItems1=[
                    {label: '修改当事人',
                        callback: () => {
                            console.log(id)
                            this.$router.push({
                                name:'Defendant',
                                query:{
                                    'onlineLitigantId':id
                                }
                            })
                        }
                    },
                    {
                        label: '删除当事人',
                        callback: () => {
                            console.log(id)
                            deleteLitigantInfo(id).then(res => {
                                console.log(res)
                                if (res.data.state==100) {
                                    getLitigantInfo(this.$store.getters.onlineLawCase.id).then(res => {
                                        if (res.data.result.length!=0) {
                                            that.litigantInfoArr=res.data.result
                                            that.litigantInfoFristId=that.litigantInfoArr[0].id
                                            that.$store.commit('setlitigantInfoFristId', that.litigantInfoArr[0].id)
                                        }
                                    })
                                    this.$dialog.toast({
                                        mes: '删除成功',
                                        icon: "warning",
                                        timeout: 1000
                                    });
                                    getLitigantInfo(this.$store.getters.onlineLawCase.id).then(res => {
                                        that.litigantInfoArr=res.data.result
                                        if (res.data.result.length==0) {
                                            that.litigantInfoFristId=''
                                            that.$store.commit('setlitigantInfoFristId', '')
                                        }
                                    })
                                }
                            })
                        }
                    }
                ]
            }
        },
        updateLitigant(id){//修改or删除原告当事人
            if (this.dataFrom=="") {
                let that=this
                this.show1=true
                this.myItems1=[
                    {label: '修改当事人',
                        callback: () => {
                            console.log(id)
                            this.$router.push({
                                name:'addPlaintiffInfo',
                                query:{
                                    'onlineLitigantId':id
                                }
                            })
                        }
                    },
                    {
                        label: '删除当事人',
                        callback: () => {
                            console.log(id)
                            deleteLitigantInfo(id).then(res => {
                                console.log(res)
                                if (res.data.state==100) {
                                    this.$dialog.toast({
                                        mes: '删除成功',
                                        icon: "warning",
                                        timeout: 1000
                                    });
                                    getLitigantInfo(this.$store.getters.onlineLawCase.id).then(res => {
                                        that.litigantInfoArr=res.data.result
                                        if (res.data.result.length==0) {
                                            that.litigantInfoFristId=''
                                            that.$store.commit('setlitigantInfoFristId', '')
                                        }
                                    })
                                }
                            })
                        }
                    }
                ]
            }
        },
        updatethirdPeo(id){//修改or删除第三人
            let that=this
            if (this.dataFrom=="") {
                this.show1=true
                this.myItems1=[
                    {label: '修改当事人',
                        callback: () => {
                            console.log(id)
                            this.$router.push({
                                name:'thirdPeo',
                                query:{
                                    'onlineLitigantId':id
                                }
                            })
                        }
                    },
                    {
                        label: '删除当事人',
                        callback: () => {
                            console.log(id)
                            deleteLitigantInfo(id).then(res => {
                                console.log(res)
                                if (res.data.state==100) {
                                    this.$dialog.toast({
                                        mes: '删除成功',
                                        icon: "warning",
                                        timeout: 1000
                                    });
                                    getLitigantInfo(this.$store.getters.onlineLawCase.id).then(res => {
                                        that.litigantInfoArr=res.data.result
                                        if (res.data.result.length==0) {
                                            that.litigantInfoFristId=''
                                            that.$store.commit('setlitigantInfoFristId', '')
                                        }
                                    })
                                }
                            })
                        }
                    }
                ]
            }
        },
        dataFromCheck(){
            this.$dialog.loading.open('正在提交信息，请稍后...');
            commitRegisterLawCase(this.$store.getters.onlineLawCase.id).then(res => {
                this.$dialog.loading.close();
                if (res.data.state==100) {
                    this.$dialog.toast({
                        mes: '提交审核成功',
                        icon: "warning",
                        timeout: 1000
                    });
                    this.$router.push({
                        name:'setcaseSuccess'
                    })
                }else{
                    this.$dialog.toast({
                        mes: res.data.message,
                        icon: "warning",
                        timeout: 1000
                    });
                }
            })
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
</style>
