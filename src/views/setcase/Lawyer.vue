<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="添加代理人信息" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'infoList'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
            <yd-cell-group>
                <yd-cell-item>
                    <span slot="left">代理人身份</span>
                    <span slot="right">律师</span>
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">代理人身份证件</span>
                    <span slot="right">律师执业证</span>
                </yd-cell-item>
            </yd-cell-group>
            <yd-cell-group title="上传证件照片">
                <yd-cell-item>
                    <div slot="right"  style="width:100%;text-align:center">
                        <img class="upidentityfilD" :src=photoUrl1 alt="湖里法院" @click="uploadImg('lawyer')">
                    </div>
                </yd-cell-item>
            </yd-cell-group>
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep'>下一步</button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import wx from 'weixin-js-sdk'
import {uploadLawyerImage} from '@/api/setcase.js'
import {getLawyerInfo} from '@/api/setcase.js'
import {getwxinfo} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
    export default {
        data(){
            return{
                caimSD:true,
                factSD:false,
                identityType:"",
                fileType:"",
                tabb:0,
                input6:"",
                username:'',
                sex:'',
                radio2:1,
                datetime4:'2017-05-11',

                litigantInfoFristId:'',
                onlineLawCaseId:'',

                onlineLawyerId:'',

                lawyerImg:'',
                photoUrl1:"/static/itentity1.png",
            }
        },
        created(){
            let that=this
            this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
            this.litigantInfoFristId=Util.GetUrlParam('onlineLitigantId')
            this.onlineLawyerId=Util.GetUrlParam('onlineLawyerId')
            this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            if (Util.GetUrlParam('onlineLitigantId')) {
                this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            }else{
                this.onlineLitigantId=''
            }
            if (this.onlineLawyerId=="") {
                    
            }else{
                getLawyerInfo(this.onlineLawyerId).then(res => {
                    console.log(res.data.onlineLawyer)
                    that.photoUrl1=document.location.toString().split('/mobile')[0]+res.data.onlineLawyer.lawyerImage
                    that.lawyerImg=res.data.onlineLawyer.lawyerImage
                })
            }
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            if (isAndroid) {
                let url=window.location.href;
                // getwxinfo(url).then(res => {
                //     // console.log(res)
                //     wx.config({
                //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                //         appId: 'wx7bbc3c1b5084a715', // 必填，公众号的唯一标识
                //         timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
                //         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                //         signature: res.data.signature,// 必填，签名，见附录1
                //         jsApiList: ['chooseImage', 'uploadImage', 'previewImage' ,'getLocalImgData','downloadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                //     });
                // })
            }
        },
        methods:{
            test(){
            },
            showType(){

            },
            upStep(){

            },
            nextStep(){
                if (this.photoUrl1=="/static/itentity1.png") {
                    this.$dialog.toast({
                        mes: '请检查律师证件照片是否已上传',
                        icon: "warning",
                        timeout: 1000
                    });
                }else{
                    this.$store.commit('lawyerImg', this.lawyerImg)
                    this.$router.push({
                        name:'LawyerInfo',
                        query:{
                            'onlineLitigantId':this.litigantInfoFristId,
                            'lawyerImg':this.lawyerImg,
                            'onlineLawyerId':this.onlineLawyerId
                        }
                    })
                }
            },
            uploadImg(name){
                let that=this
                wx.ready(function () {
                    wx.chooseImage({  
                        count: 1,  
                        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                        success: function (res) {
                            that.localIds=res.localIds[0];
                            that.photoUrl1=that.localIds
                            wx.uploadImage({
                                localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    let serverId = res.serverId; // 返回图片的服务器端ID
                                    uploadLawyerImage(serverId).then(res => {
                                        if (res.data.state == 100) {
                                            // alert('上传成功！')
                                            that.$dialog.toast({
                                                mes: '上传成功！',
                                                icon: "success",
                                                timeout: 1000
                                            });
                                            that.lawyerImg=res.data.lawyerImage
                                        } else {
                                            alert('上传失败！')
                                        }
                                    })
                                },fail:function(res){
                                    alert('上传图片出现问题')
                                }
                            });
                        }  
                    });
                })
            },
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
