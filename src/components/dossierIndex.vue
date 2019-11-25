<template>
    <div style="background-color: #fff;padding-bottom:30px; height:100%;">
        <yd-navbar title="湖里法院全在线平台" fontsize="17px" color="#1a1a1a">
        </yd-navbar>
        <div style="height:15px;"></div>
        <yd-flexbox>
            <i class="iconfont icon-juanzong change-icon-juanzong"></i>
            <div class="fenline"></div>
            <div class="juan-title"><p>卷宗GPS</p></div>
        </yd-flexbox>
        <div style="height:65px;"></div>
        <yd-flexbox @click.native="lookDossier()">
            <yd-flexbox-item><i class="iconfont icon-dianzijuanzong change-icon-dianzijuanzong"></i></yd-flexbox-item>
        </yd-flexbox>
        <div style="height:75px;"></div>
        <yd-flexbox @click.native="saomaDossier()">
            <yd-flexbox-item><i class="iconfont icon-saoma"></i></yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>


<script>
// import '@/assets/jweixin-1.4.0.js';
import wx from 'weixin-js-sdk';
// import $ from 'jquery';

import {
    wx1
} from "../api/dossier.js"
export default {
    data(){
        return{
            url:""
        }
    },
    created(){
        var urlTest = window.location.href
        this.url = urlTest; 
        // var test = window.location.protocol;
        // var domain = window.location.host;          
        // this.url = test+domain;
        console.log(this.url)
    },
    methods:{
        lookDossier(){
            this.$router.push({name:'dossierLook'})
        },
        saomaDossier(){
            // console.log(this.$router.push({name:'dossierScan'}))
            // this.$router.push({name:'dossierScan'})
            wx1(this.url)
                
                .then(res => {
                    if(res.data.state == 100){
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: res.data.appId, // 必填，公众号的唯一标识
                            timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
                            nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                            signature: res.data.signature,// 必填，签名
                            jsApiList: ['checkJsApi', 'scanQRCode','translateVoice'] // 必填，需要使用的JS接口列表
                        });
                        console.log(res.data.state)
                        // wx.error(function (res) {
                        //     alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
                        // });
                        wx.ready(function(){
                            console.log(res.data.state)
                            wx.checkJsApi({
                                jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                                success: function(res) {
                                    console.log(res)
                                    console.log(111)
                                // 以键值对的形式返回，可用的api值true，不可用为false
                                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                                }
                            });
                        });
                        wx.scanQRCode({
                            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                            scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                            success: function (res) {
                            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                            console.log(result)
                            console.log(222)
                            this.$router.push({
                                name: "dossierScan",
                                 params: {param: result}
                             });
                            }
                        });
                        
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
.icon-dianzijuanzong{
    font-size: 80px!important;
    color: #7d8da6;
}
.icon-saoma{
    font-size: 70px!important;
    color: #7d8da6;
    margin-left: 5px;
}
.fenline{
    width: 2px;
    height: 28px;
    background-color: #9ebff7;
    display: inline-block;
    margin-left: 10px;
}
.juan-title{
    display: inline-block;
    margin-left: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #777272;
}
</style>
