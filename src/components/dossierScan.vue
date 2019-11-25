<template>
    <div style="background-color: #fff;padding-bottom:30px; height:100%;">
        <yd-navbar title="湖里法院全在线平台" fontsize="17px" color="#1a1a1a">
        </yd-navbar>
        <div style="height:15px;"></div>
        <yd-flexbox>
            <i class="iconfont icon-juanzong change-icon-juanzong"></i>
            <div class="scan-fenline"></div>
            <div class="scan-juan-title"><p>卷宗GPS</p></div>
        </yd-flexbox>
        <div style="height:45px;"></div>
        <yd-flexbox>
            <div class="scan-title">您扫描的案号为：</div>
        </yd-flexbox>
        <div style="height:35px;"></div>
        <yd-flexbox>
            <div class="scan-result">{{param}}</div>
        </yd-flexbox>
        <div style="height:55px;"></div>
        <yd-flexbox>
            <yd-button @click.native="receiveDossier" size="large" shape="circle" style="width:50%;margin: 0 auto;" bgcolor="#397ce5" color="#FFF">接收卷宗</yd-button>
        </yd-flexbox>
        <div style="height:35px;"></div>
        <yd-flexbox>
            <yd-button  size="large" shape="circle" style="width:50%;margin: 0 auto;" bgcolor="#397ce5" color="#FFF" @click.native="dossierLookInfo()">查看卷宗信息</yd-button>
        </yd-flexbox>
    </div>
</template>
<script>
import {
    addTimeLine
} from "../api/dossier.js"
import Util from "@/libs/util.js";
export default {
    data() {
        return {
            param: "",
        };
    },
    created() {
        let param = this.$route.query.param
        this.param = param
        console.log(param)
    },
    methods: {
        receiveDossier() {
            this.$dialog.confirm({
                title: '',
                mes: '是否确认从立案大厅处接收文书？',
                opts: () => {
                    this.getAddTimeLine();
                }
            });
        },
        dossierLookInfo(){
            this.$router.push({
                 name: "dossierInfo",
                 params: {caseNo: this.param }
            }); 
        },
        getAddTimeLine(){
            console.log(this.param)
            this.$dialog.loading.open("加载中...");
            addTimeLine(this.param)
            .then(res => {
                if(res.data.state == 100){
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                    });
                }else{
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                    });
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
        }
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
.icon-juanzong{
    font-size: 60px!important;
    color: #6499f2;
    margin-left: 10px;
}
.scan-fenline{
    width: 2px;
    height: 28px;
    background-color: #9ebff7;
    display: inline-block;
    margin-left: 10px;
}
.scan-juan-title{
    display: inline-block;
    margin-left: 15px;
    font-size: 17px;
    font-weight: 600;
    color: #777272;
}
.scan-title{
    font-size: 22px;
    font-weight: 600;
    margin: 0 auto;
    color: #777272;
}
.scan-result{
    font-size: 22px;
    font-weight: 600;
    margin: 0 auto;
    color: #397ce5;
}
</style>
