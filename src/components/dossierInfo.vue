<template>
    <div style="background-color: #fff;padding-bottom:30px; height:100%;position: relative;">
        <div style="margin-top: 0; position: relative; background-color: #fff; width: 100%;">
            <yd-navbar title="湖里法院全在线平台" fontsize="17px" color="#1a1a1a">
            </yd-navbar>
            <div style="height:15px;"></div>
            <yd-flexbox>
                <div class="icon-box">
                    <div style="margin-left: 3px; margin-top: 8px;">
                        <i class="iconfont icon-dianzijuanzongxitong change-icon-juanzong-info"></i>
                    </div>
                </div>
                <div class="info-fenline"></div>
                <div class="info-juan-title">
                    <p><span>案号：</span><span style="color:#3a7de5; font-size: 15px; ">{{caseNo}}</span></p>
                    <p><span style="float:left;">状态：</span><span class="state" v-if="state1">流转中</span><span class="state" v-if="state2">流转结束</span></p>
                </div>
            </yd-flexbox>
            <div style="height:15px;"></div>
            <yd-flexbox>
                <div class="line-mid"></div>
            </yd-flexbox>
            <div style="height:15px;"></div>
        </div>
        <div >
            <div style="margin:0 auto; width:100%; background-color: #fff;" v-for="item,key in  timeList">
                <div style="margin:0 auto; " v-show="(key==0)">
                    <p style="color:#9e9a9a; font-weight: 600; display: inline-block; width:90px;">{{item.date}}</p>
                    <div style="display: inline-block; padding: 2px 10px;">
                        <div class="mid-mid-line"></div>
                        <i class="iconfont icon-juanzongguanli_lunkuohua change-icon-juanzong1" ></i>
                        <div class="mid-mid-line1"></div>
                    </div>
                    <div class="right-info">
                        <p>{{item.court}}</p>
                        <p ><span>接收人员：</span><span>{{item.name}}</span></p>
                    </div>
                </div>
                <div style="margin:0 auto;" v-show="(key!=0)">
                    <p style="color:#ccc; font-weight: 600; display: inline-block; width:90px;">{{item.date}}</p>
                    <div style="display: inline-block; padding: 2px 10px;">
                        <div class="mid-mid-line3"></div>
                        <i class="iconfont icon-gou change-icon-gou" style="font-size: 41px;"></i>
                        <div class="mid-mid-line2"></div>
                    </div>
                    <div class="right-info1">
                        <p>{{item.court}}</p>
                        <p ><span>接收人员：</span><span>{{item.name}}</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <yd-backtop></yd-backtop>
        </div>
    </div>
</template>
<script>
import {
    queryTimeLine
} from "../api/dossier.js"
export default {
    data() {
        return {
            caseNo: "",
            timeList:[],
            state1:false,
            state2:false
        };
    },
    created() {
        var caseNo = this.$route.params.caseNo;
        this.caseNo = caseNo
        console.log(caseNo)
        this.getQueryTimeLine();
    },
    methods: {
        getQueryTimeLine(){
            console.log(this.caseNo +1)
            this.$dialog.loading.open("加载中...");
            queryTimeLine(this.caseNo)
                
                .then(res => {
                    if(res.data.state == 100){
                        if(res.data.data[0].state == 0){
                            this.state1 = true
                        }else{
                            this.state1 = false;
                            this.state2 = true; 
                        }
                        this.$dialog.loading.close();
                        var arrTime = res.data.data
                        arrTime.forEach(function(value,index,array){
                            var date = new Date(value.date);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                            var Y = date.getFullYear() + '年';
                            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
                            var D = date.getDate() + '日 ';
                            var h = date.getHours() + ':';
                            var m = date.getMinutes() + ':';
                            var s = date.getSeconds();
                            array[index].date = Y+M+D+h+m+s
                        })
                        this.timeList = arrTime
                    }else{
                        this.$dialog.loading.close();

                    }
                })
                .catch(error => {
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: "服务器无响应",
                        icon: "error",
                        timeout: 1500
                    });
                });
        },
    }
}
</script>
<style>
.yd-navbar:after {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #fff;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.icon-dianzijuanzongxitong{
    font-size: 42px!important;
    color: #6499f2;
    margin-left: 10px;
}
.icon-juanzongguanli_lunkuohua{
    font-size: 41px!important;
    color: #6499f2;
}
.icon-gou{
    font-size: 41px!important;
    color: #ccc;
}
.info-fenline{
    width: 2px;
    height: 60px;
    background-color: #9ebff7;
    display: inline-block;
    margin-left: 10px;
}
.info-juan-title{
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    color: #777272;
    line-height: 0.9rem;
    margin-left: 12px;
}
.icon-box{
    width: 55px;
    height: 60px;
}
.line-mid{
    width: 100%;
    height: 4px;
    background-color: #b8adad;
}
.right-info{
    color:#9e9a9a;
    line-height: 0.5rem;
    font-weight: 600;
    display: inline-block;
    width: 100px;
}
.right-info1{
    color:#ccc;
    line-height: 0.5rem;
    font-weight: 600;
    display: inline-block;
    width: 100px;
}
.mid-mid-line{
    width: 2px;
    height: 30px;
    background-color: #a6a6a6;
    margin-left: 20px;
}
.mid-mid-line1{
    width: 2px;
    height: 30px;
    background-color: #a6a6a6;
    margin-left: 20px;
}
.mid-mid-line2{
    width: 2px;
    height: 30px;
    background-color: #a6a6a6;
    margin-left: 20px;
    margin-top: 5px;
}
.mid-mid-line3{
    width: 2px;
    height: 46px;
    background-color: #a6a6a6;
    margin-left: 20px;
    margin-top: -5px;
    margin-bottom: 5px;
}
.state{
    float:left; 
    color:#efd673;
}

</style>
