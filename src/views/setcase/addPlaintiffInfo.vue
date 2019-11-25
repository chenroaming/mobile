<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="原告身份信息" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'infoList'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <yd-cell-group title="当事人身份类型" style="margin-top:0.3rem;">
            <yd-cell-item>
                <div slot="right" style="width:100%">
                    <Select @change="showType" v-model="fileType"  style="vertical-align:middle;display: inline-block;width:100%;text-align:right">
                        <!-- <Option  value=0 >请选择当事人身份类型</Option> -->
                        <option disabled value=0>请选择</option>
                        <Option  :value=item.id v-for='item in identityArr'>{{item.text}}</Option>
                        <!-- <Option  value=2 >法人</Option>                                 -->
                    </Select>
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="当事人身份证件" style="margin-top:0.3rem;">
            <yd-cell-item>
                <div slot="right" style="width:100%;text-align:left">
                    {{fileType==1?'中华人民共和国居民身份证':'中华人民共和国营业执照'}}
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="" v-show='fileType==1'>
            <yd-cell-item>
                <div slot="right"  style="width:100%;text-align:center">
                    <img class="upidentityfilD" :src=photoUrl1 alt="湖里法院" @click="uploadImg('front')" style="max-height: 5rem;">
                </div>
            </yd-cell-item>
            <yd-cell-item>
                <div slot="right"  style="width:100%;text-align:center">
                    <img class="upidentityfilD" :src=photoUrl2 alt="湖里法院"  @click="uploadImg('opposite')" style="max-height: 5rem;">
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="" v-show='fileType==2'>
            <yd-cell-item>
                <div slot="right"  style="width:100%;text-align:center">
                    <img class="upidentityfilD" :src=photoUrl3 alt="湖里法院"  @click="uploadImg('legal')" style="max-height: 5rem;">
                </div>
            </yd-cell-item>
        </yd-cell-group>
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep'> 下一步</button>
        </p>
    </div>
</div>
</template>

<script>
import wx from 'weixin-js-sdk'
import Util from '@/libs/util.js'
import {uploadFrontImage} from '@/api/setcase.js'
import {uploadBackImage} from '@/api/setcase.js'
import {getOnlineLawCaseEdit} from '@/api/setcase.js'
import {getOnlineLitigantInfo} from '@/api/setcase.js'
import {getLitigantInfolitigant} from '@/api/setcase.js'
import {getwxinfo} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    components : {},
    data(){
        return{
            identityType:"",
            fileType:1,
            localIds:'',
            fromtOrLegalImg:false,
            fromtOrLegalImg1:false,
            opposite:false,
            onlineLawCaseId:'',

            onlineLitigantId:'',

            photoUrl1:"/static/itentity1.png",
            photoUrl2:"/static/itentity2.png",
            photoUrl3:"/static/itentity3.png",

            identityArr:[
                {id:1,text:'自然人'},
                {id:2,text:'法人'},
            ]
        }
    },
    mounted () {
    },
    created(){
        let that=this
        let u = navigator.userAgent;
        let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if (isAndroid) {
            let url=window.location.href;
            // getwxinfo(url).then(res => {
            //     // console.log(res)
            //     wx.config({
            //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //         appId: res.data.appId, // 必填，公众号的唯一标识
            //         timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
            //         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            //         signature: res.data.signature,// 必填，签名，见附录1
            //         jsApiList: ['chooseImage', 'uploadImage', 'previewImage' ,'getLocalImgData','downloadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //     });
            // })
        }
        if (Util.GetUrlParam('onlineLitigantId')) {
            this.onlineLitigantId=Util.GetUrlParam('onlineLitigantId')
            getLitigantInfolitigant(this.onlineLitigantId).then(res => {
                if (res.data.onlineLitigant.litigantType==0) {
                    that.fileType=1
                }else if (res.data.onlineLitigant.litigantType==1) {
                    that.fileType=2
                    that.identityArr=[{id:2,text:'法人'},{id:1,text:'自然人'}]
                }
                if (res.data.onlineLitigant.litigantType==0) {
                    if (res.data.onlineLitigant.backImage) {
                        that.photoUrl2=document.location.toString().split('/mobile')[0]+res.data.onlineLitigant.backImage
                        that.opposite=res.data.onlineLitigant.backImage
                    }
                    if (res.data.onlineLitigant.frontImage) {
                        that.photoUrl1=document.location.toString().split('/mobile')[0]+res.data.onlineLitigant.frontImage
                        that.fromtOrLegalImg=res.data.onlineLitigant.frontImage
                    }
                }else if (res.data.onlineLitigant.litigantType==1) {
                    if (res.data.onlineLitigant.frontImage) {
                        that.photoUrl3=document.location.toString().split('/mobile')[0]+res.data.onlineLitigant.frontImage
                        that.fromtOrLegalImg1=res.data.onlineLitigant.frontImage
                    }
                }
            })
        }else{
            this.onlineLitigantId=''
        }
        if (this.$store.getters.onlineLawCase.id) {
            this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
        }
    },
    watch:{
        fileType(curVal,oldVal){
            console.log(curVal,oldVal);
        },
　　},
    methods:{
        test(){
            console.log(1111)
        },
        showType(e) {
            let value = e.target.value;
            this.fileType=value
        },
        upStep(){

        },
        uploadImg(name){
            let that=this
            wx.ready(function () {
                wx.chooseImage({  
                    count: 1,  
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                    success: function (res) {
                        console.log(res)
                        that.localIds=res.localIds[0]
                        if (name=='front'||name=='legal') {
                            if (that.fileType==1) {
                                that.photoUrl1=that.localIds
                            }else if (that.fileType==2) {
                                that.photoUrl3=that.localIds
                            }
                            wx.uploadImage({
                                localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    console.log(res)
                                    let serverId = res.serverId; // 返回图片的服务器端ID
                                    uploadFrontImage(serverId).then(res => {
                                        if (res.data.state == 100) {
                                            that.$dialog.toast({
                                                mes: '上传成功！',
                                                icon: "success",
                                                timeout: 1000
                                            });
                                            if (that.fileType==1) {
                                                that.fromtOrLegalImg=res.data.frontImage
                                            }else if (that.fileType==2) {
                                                that.fromtOrLegalImg1=res.data.frontImage
                                            }
                                        } else {
                                            alert('上传失败！')
                                        }
                                    })
                                },fail:function(res){
                                    alert('上传图片出现问题')
                                }
                            });
                        }else if (name=='opposite') {
                            that.photoUrl2=that.localIds
                            wx.uploadImage({
                                localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                                isShowProgressTips: 1, // 默认为1，显示进度提示
                                success: function (res) {
                                    let serverId = res.serverId; // 返回图片的服务器端ID
                                    uploadBackImage(serverId).then(res => {
                                        if (res.data.state == 100) {
                                            that.$dialog.toast({
                                                mes: '上传成功！',
                                                icon: "success",
                                                timeout: 1000
                                            });
                                            that.opposite=res.data.backImage
                                        } else {
                                            alert('上传失败！')
                                        }
                                    })
                                },fail:function(res){
                                    alert('上传图片出现问题')
                                }
                            });
                        }
                    }  
                });
            })
        },
        nextStep(){

            this.onlineLawCaseId=this.$store.state.onlineLawCase.id
            if (this.fileType==1) {
                if (this.opposite&&this.fromtOrLegalImg) {
                    if (this.onlineLitigantId) {
                        getOnlineLitigantInfo(1,this.onlineLitigantId).then(res => {
                            console.log(res)
                            if (res.data.state==100) {
                                this.opposite=this.opposite
                                this.fromtOrLegalImg=this.fromtOrLegalImg
                                this.$store.commit('opposite', this.opposite)
                                this.$store.commit('fromtOrLegalImg', this.fromtOrLegalImg)
                                this.$router.push({
                                    name:'addPlaintiffInfoSec',
                                    query:{
                                        'litigationStatusId':1,
                                        'onlineLitigantId':this.onlineLitigantId
                                    }
                                })
                            }else{
                                this.$dialog.toast({
                                    mes: '身份证信息识别失败，请重新上传',
                                    icon: "warning",
                                    timeout: 1000
                                });
                            }
                        })
                    }else{
                        getOnlineLitigantInfo(1).then(res => {
                            if (res.data.state==100) {
                                this.opposite=this.opposite
                                this.fromtOrLegalImg=this.fromtOrLegalImg
                                this.$store.commit('opposite', this.opposite)
                                this.$store.commit('fromtOrLegalImg', this.fromtOrLegalImg)
                                this.$router.push({
                                    name:'addPlaintiffInfoSec',
                                    query:{
                                        'litigationStatusId':1,
                                        'onlineLitigantId':this.onlineLitigantId
                                    }
                                })
                            }else{
                                this.$dialog.toast({
                                    mes: '身份证信息识别失败，请重新上传',
                                    icon: "warning",
                                    timeout: 1000
                                });
                            }
                        })
                    }
                }else{
                    this.$dialog.toast({
                        mes: '请检查身份证照片是否已上传',
                        icon: "warning",
                        timeout: 1000
                    });
                }
            }else if (this.fileType==2) {
                if (this.fromtOrLegalImg1) {
                    if (this.onlineLitigantId) {
                        getOnlineLitigantInfo(2,this.onlineLitigantId).then(res => {
                            console.log(res)
                            if (res.data.state==100) {
                                this.$store.commit('fromtOrLegalImg1', this.fromtOrLegalImg1)
                                this.$router.push({
                                    name:'addPlaintiffInfoSecLegal',
                                    query:{
                                        'litigationStatusId':1,
                                        'frontImage':this.fromtOrLegalImg1,
                                        'onlineLitigantId':this.onlineLitigantId
                                    }
                                })
                            }else{
                                this.$dialog.toast({
                                    mes: res.data.message,
                                    icon: "warning",
                                    timeout: 1000
                                });
                            }
                        })
                    }else{
                        getOnlineLitigantInfo(2).then(res => {
                            console.log(res)
                            if (res.data.state==100) {
                                this.$store.commit('fromtOrLegalImg1', this.fromtOrLegalImg1)
                                this.$router.push({
                                    name:'addPlaintiffInfoSecLegal',
                                    query:{
                                        'litigationStatusId':1,
                                        'frontImage':this.fromtOrLegalImg1,
                                        'onlineLitigantId':this.onlineLitigantId
                                    }
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
                    
                }else{
                    this.$dialog.toast({
                        mes: '请检查营业执照是否已上传',
                        icon: "warning",
                        timeout: 1000
                    });
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
.yd-toast-none-icon .yd-toast-content {
    color:#fff
}
</style>
