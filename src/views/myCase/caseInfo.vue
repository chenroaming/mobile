<template lang="html">
<div class="" style="height:100%"   infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <yd-navbar title='案件信息' bgcolor="#40a9ff" color="#fff">
        <router-link to="/mobile/mycase" slot="left">
            <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
        </router-link>
    </yd-navbar>
    <yd-tab active-color="#40a9ff" v-model="tab" :callback="fn">
        <yd-tab-panel label="基本信息">
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">案号：</span>
                    <span slot="right">{{ this.caseInfos.caseNo }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">案由：</span>
                    <span slot="right">{{ this.caseInfos.brief }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">标的额（元）：</span>
                    <span slot="right">{{ this.caseInfos.applyStandard }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">立案日期：</span>
                    <span slot="right">{{ this.caseInfos.filingDate | formatDate }}</span>
                </yd-cell-item>
                <!-- <yd-cell-item>
                    <span slot="left">剩余审限：</span>
                    <span slot="right">{{ this.caseInfos.expireDate | formatDate }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">审判人员</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">审判长：</span>
                    <span slot="right"></span>
                </yd-cell-item> -->
                <yd-cell-item>
                    <span slot="left">承办人：</span>
                    <span slot="right">{{ this.caseInfos.judge }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">合议庭成员：</span>
                    <span slot="right">{{ this.caseInfos.allMembers }}</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">书记员：</span>
                    <span slot="right">{{ this.caseInfos.clerkName}}</span>
                </yd-cell-item>
            </yd-cell-group>
        </yd-tab-panel>
        <yd-tab-panel label="案件主体">
            
            <div style="text-align:left;">
                <p style="line-height: 0.7rem;padding-left:0.2rem">当事人信息</p>
                <p class="tipTitke">
                    <span style="display: inline-block;width: 20%;">身份</span>
                    <span  style="display: inline-block;width: 40%;">姓名/名称</span>
                    <span  style="display: inline-block;width: 38%;">联系方式</span>
                </p>
                <div class="containInfo" v-for="item in litigantList">
                    <div>
                        <p  style="display: inline-block;width: 20%;">
                            <span  :class="item.litigationStatus == '原告' ? 'plaimSpan' : (item.litigationStatus == '被告' ? 'defentSpan' : 'lawSpan')">{{item.litigationStatus}}</span>
                        </p>
                        <p  style="display: inline-block;width: 40%;">
                            <span>{{item.litigantName}}</span>
                            </p>
                        <p  style="display: inline-block;width: 38%;">{{item.litigantPhone}}</p>
                    </div>
                    <div v-for='i in item.lawyers'>
                        <p  style="display: inline-block;width: 20%;text-align:right;">
                            <span  :class="i.litigationStatus == '原告' ? 'plaimSpan' : (i.litigationStatus == '被告' ? 'defentSpan' : 'lawSpan')">{{i.litigationStatus}}</span>
                        </p>
                        <p  style="display: inline-block;width: 40%;">{{i.lawyerName}}</p>
                        <p  style="display: inline-block;width: 38%;">{{i.agentMobile}}</p>
                    </div>
                </div>
            </div>
            <yd-cell-group title="我在本案的送达地址" style="margin-top:0.1rem;">
                <yd-cell-item  >
                    <yd-icon slot="icon"  size=".42rem"></yd-icon>
                    <span slot="left">{{mySendAdress}}</span>
                </yd-cell-item>
            </yd-cell-group>
        </yd-tab-panel>
        <yd-tab-panel label="流程节点">
            <yd-timeline style="text-align:left">
                <yd-timeline-item class="timepa" v-for="item in timeData">
                    <p>{{item.operatorContent}}</p>
                    <p style="margin-top: 5px;">操作人：<span>{{item.operatorName}}</span></p>
                    <p style="margin-top: 5px;">{{item.createDate | formatDate}}</p>
                </yd-timeline-item>
            </yd-timeline>
            
        </yd-tab-panel>
        <yd-tabbar :fixed='isFixs'>
            <yd-tabbar-item title="我的文书" type='a' @click.native="gotoDim">
                <yd-icon name="order" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="证据列表" type='a' @click.native="conso">
                <yd-icon name="feedback" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
            <yd-tabbar-item title="在线庭审" type='a'  @click.native="goRtc">
                <yd-icon name="play" slot="icon" size="0.54rem"></yd-icon>
            </yd-tabbar-item>
        </yd-tabbar>
    </yd-tab>
    <yd-backtop style=""></yd-backtop>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import { formatDate } from '@/libs/date.js';
import {wxLawCaseLitigantList} from '@/api/mycase.js'
import {getTimePage} from '@/api/caseList-new.js'
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
      plaintiffList:[],
      defendantList:[],
      thirdList:[],
      litigantList:[],
      mySendAdress:"",
      isloaTimepage:true,
      caseInfo:{
      },
      caseInfos:{
      },

    }
  },
  created(){
      if (this.$route.params) {
            if(this.$route.params.caseId){
                this.lowCaseId = this.$route.params.caseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
                this.getDetail(this.lowCaseId);
            }
       }
    
  },
  watch: {
    '$route' (to, from) {
        if (this.$route.params) {
            if(this.$route.params.caseId){
                this.lowCaseId = this.$route.params.caseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
                this.getDetail(this.lowCaseId);
            }
       }
    },
},
  mounted(){
      if(!this.lowCaseId){
            this.lowCaseId = localStorage.getItem("lawCaseId");
            this.getDetail(this.lowCaseId);
        }
        
  },
  methods:{
    fn(label, key) {
        if(label == '流程节点'){
            if(this.isloaTimepage == true){
                this.$dialog.loading.open('数据加载中');
                console.log(this.lowCaseId)
                getTimePage(this.lowCaseId).then(res=>{
                    if (res.data.state==100) {
                        console.log(this.caseNo)
                        console.log(res.data)
                        this.timeData=res.data.result
                        this.isloaTimepage = false;
                        // for (var i = 0; i < res.data.result.length; i++) {
                        // res.data.result[i].createDate=this.getMyDate(res.data.result[i].createDate)
                        // }
                    }else{
                        console.log(res.data.message)
                    }
                    this.$dialog.loading.close();
                })
            }
            
            
        }
        
    },
    goRtc(){
        this.$dialog.toast({
                mes: '正在开发中..',
                timeout: 1500
        });
    },
    getDetail(id){
        this.$dialog.loading.open('');
        wxLawCaseLitigantList(id)
          .then(res => {
            this.plaintiffList = [];
            this.defendantList = [];
            this.thirdList = [];
            this.litigantList = [];
            console.log(res.data.state)
            if (res.data.state === 100) {
                console.log(111)
                this.$dialog.loading.close();
              const caseInfo = res.data.result.caseInfo;
              const defendantList = res.data.result.defendantList;
              const plaintiffList = res.data.result.plaintiffList;
              const thirdList = res.data.result.thirdList;
              this.caseInfo.id = caseInfo.id.toString();
              this.caseInfo.caseNo = caseInfo.caseNo;
              this.caseInfo.court = caseInfo.court.name;
              this.caseInfo.judge = caseInfo.judge.name;
              this.caseInfo.clerk = caseInfo.clerk.name;
              this.caseInfo.filingDate = caseInfo.filingDate;
              this.caseInfo.expireDate = caseInfo.expireDate;
              this.caseInfo.brief = caseInfo.brief.name;
              this.caseInfo.applyStandard = caseInfo.applyStandard;
              this.caseInfo.allMembers =
                caseInfo.allMembers == null ? "" : caseInfo.allMembers;
                this.caseInfo.clerkName = caseInfo.clerk.name;
                this.caseInfos = this.caseInfo;
              plaintiffList.map((item, index) => {
                const data = {};
                data.id = item.litigant.id;
                data.litigantName = item.litigant.litigantName;
                data.litigationStatus = item.litigant.litigationStatus.name;
                // data.identityCard = item.litigant.identityCard;
                data.litigantPhone = item.litigant.litigantPhone;
                // data.address = item.litigant.address;
                data.lawyers = [];
                if(item.lawyers != [] && item.lawyers != null){
                    for(let y=0;y<item.lawyers.length;y++){
                        let datas = {};
                        datas.litigationStatus = '代理人';
                        datas.lawyerName = item.lawyers[y].agentName;
                        datas.agentMobile = item.lawyers[y].agentMobile;
                        data.lawyers.push(datas)
                    }
                }
                this.litigantList.push(data);
              });
              defendantList.map((item, index) => {
                const data = {};
                data.id = item.litigant.id;
                data.litigantName = item.litigant.litigantName;
                data.litigationStatus = item.litigant.litigationStatus.name;
                // data.identityCard = item.litigant.identityCard;
                data.litigantPhone = item.litigant.litigantPhone;
                // data.address = item.litigant.address;
                data.lawyers = [];
                if(item.lawyers != [] && item.lawyers != null){
                    for(let y=0;y<item.lawyers.length;y++){
                        let datas = {};
                        datas.litigationStatus = '代理人';
                        datas.lawyerName = item.lawyers[y].agentName;
                        datas.agentMobile = item.lawyers[y].agentMobile;
                        data.lawyers.push(datas)
                    }
                }
                this.litigantList.push(data);
              });
              this.mySendAdress = res.data.result.sendAddress ? res.data.result.sendAddress : "";
               console.log(this.caseInfos )
            }else{
                this.$dialog.loading.close();
                this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                });
            }
          })
          .catch(() => {});
        // findByCaseLitigant(this.lowCaseId).then(res => {
        //     if(res.data.state == 100){
        //         this.$dialog.loading.close();
        //     }else{
        //         this.$dialog.loading.close();
        //         this.$dialog.toast({
        //                 mes: res.data.message,
        //                 timeout: 1500
        //         });
        //     }
            
        // })
    },
    gotoDim(){
        this.$router.push({
            name: 'casediplomasList',
            params: { lawCaseId: this.lowCaseId }
        });
    },
    conso(){
        this.$router.push({
            name: 'caseAllEvdence',
            params: { lawCaseId: this.lowCaseId }
        });
    }
    
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

<style lang="css" >
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
.yd-backtop{
    bottom: 20%;
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
.yd-cell-title{
    line-height: 0.7rem;
    padding-top: 0.4rem;
}
.containInfo{
    border-bottom: 1px solid #ccc;
    margin: 0.1rem;
}
.containInfo p{
    text-align: center;
    line-height: 0.7rem;
    word-wrap: break-word;
    word-break: normal;
    word-break:break-all;
    vertical-align: middle;
}
.containInfo p span{
    text-align: center;
    line-height: 0.4rem;
    word-wrap: break-word;
    word-break: normal;
    word-break:break-all;
}
</style>

