<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="证据材料" bgcolor="#40a9ff" color="#fff">
            <router-link :to="{name: 'infoList'}" slot="left">
                <yd-navbar-back-icon  style="color:#fff;" color="#fff">上一步</yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div style="margin-top: 0.1rem;
    text-align: left;
    padding-left: .35rem;
    margin-bottom: .1rem;
    font-size: 14px;">上传证据材料</div>
                <yd-cell-group v-for='(item,index) in evidence' :key="item.id" >
                    <yd-cell-item>
                        <span slot="left" v-if='item.type==3' >证据名称：</span>
                        <span slot="left" v-if='item.type!=3'>{{item.type==1?'身份材料':'起诉状'}}</span>
                        <yd-input slot="right"  v-if='item.type==3' required v-model="item.eviName"  placeholder="请输入证据名称"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item v-if='item.type==3'>
                        <span slot="left">证明对象：</span>
                        <yd-input slot="right" required v-model="item.eviProve"  placeholder="请输入证明对象"></yd-input>
                    </yd-cell-item>
                    <div style="padding: 0.35rem;display: flex;justify-content: center;">
                        <img class="upidentityfilD" :src=item.photoUrl2 alt="湖里法院" v-if=item.photoUrl2  style="max-height: 5rem;">
                        <div class="uploadDiv" @click='uploadImg(index)'  v-if=!item.photoUrl2 >
                            <yd-icon name="feedback" ></yd-icon>
                            点击上传图片
                        </div>
                        <!--  -->
                        <!-- <yd-button size="large" type="danger">删除证据</yd-button> -->
                    </div>
                    <yd-button type="danger" @click.native='deleteBtn(index)' style='margin-bottom: .3rem;' v-if='item.type==3'>删除证据</yd-button>
                    
                </yd-cell-group>
            <yd-cell-group>
                <div class="blockD" style='padding:0.35rem'>
                    <p class="yd-font-span16" style='text-align: left;padding-bottom: .2rem;'>添加证据材料</p>
                    <div class="assCla"> <img src="../../images/add.png" alt="湖里法院" style="width:0.8rem"  @click='addEvidence()'></div>                
                </div>
            </yd-cell-group>            
        <p class="footer-button" style="position: relative;top:5%;">
            <button class="nextBtn" @click='nextStep'>提交保存</button>
        </p>
    </div>
</div>

</template>

<script>
import wx from 'weixin-js-sdk'
import Util from '@/libs/util.js'
import {saveWXEvidence} from '@/api/setcase.js'
import {uploadWXEvidence} from '@/api/setcase.js'
import {getLawyerInfo} from '@/api/setcase.js'
import {getFiles} from '@/api/setcase.js'
import {getwxinfo} from '@/api/setcase.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    data(){
        return{
            photoUrl2:'',
            identityType:"",
            fileType:"",
            tabb:0,
            input6:"",
            username:'',
            sex:'',
            radio2:1,
            datetime4:'2017-05-11',
            evidence:[
                {
                    eviName:"",
                    eviProve:"",
                    eviPath:'',
                    photoUrl2:'',
                    type:1
                },
                {
                    eviName:"",
                    eviProve:"",
                    eviPath:'',
                    photoUrl2:'',
                    type:5
                },
                {
                    eviName:"",
                    eviProve:"",
                    eviPath:'',
                    photoUrl2:'',
                    type:3
                }
            ],
            groupDataCount:1,
            eviName:'',
            eviProve:'',
            Evidences:'',

            localIds:'',
            onlineLawCaseId:'',
            updateEviden:''
        }
    },
    created(){     
        let that=this       
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
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
        this.onlineLawCaseId=this.$store.getters.onlineLawCase.id
        if (Util.GetUrlParam('updateEviden')) {
            this.updateEviden=Util.GetUrlParam('updateEviden')
        }else{
            this.updateEviden=''
        }
        if (this.updateEviden=="") {
                
        }else{
            getFiles(this.onlineLawCaseId).then(res => {
                let resData=res
                console.log(resData)
                if (resData.data.state==100) {
                    let data = {
                        eviName:"",
                        eviProve:"",
                        eviPath:'',
                        photoUrl2:'',
                        type:0,
                    }
                    let evidenceArr=resData.data.file
                    that.evidence = evidenceArr.map(val => {
                        let json = {};
                            json.eviPath = val.path;
                            json.photoUrl2 = document.location.toString().split('/mobile')[0]+val.path;
                            json.eviName = val.eviName;
                            json.eviProve = val.eviProve;
                            json.type = val.type;
                            return json;
                    });
                }else{
                    this.$dialog.toast({
                        mes: resData.data.message,
                        icon: "warning",
                        timeout: 1500
                    });
                }
            })
        }
        getFiles(this.onlineLawCaseId).then(res => {
            let resData=res
            console.log(resData)
            if (resData.data.state==100) {
                let data = {
                    eviName:"",
                    eviProve:"",
                    eviPath:'',
                    photoUrl2:'',
                    type:0
                }
                if (resData.data.file.length!=0) {
                    let evidenceArr=resData.data.file
                    that.evidence = evidenceArr.map(val => {
                        let json = {};
                            json.eviPath = val.path;
                            json.photoUrl2 = document.location.toString().split('/mobile')[0]+val.path;
                            json.eviName = val.eviName;
                            json.eviProve = val.eviProve;
                            json.type = val.type;
                            return json;
                    });
                    console.log(that.evidence)
                }
            }
        })

    },
    methods:{
        test(){
            console.log('this.is test~')
        },
        showType(){

        },
        uploadImg(index){
            let that=this
            wx.ready(function () {
                wx.chooseImage({  
                    count: 1,  
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                    success: function (res) {
                        that.localIds=res.localIds[0];
                        wx.uploadImage({
                            localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                let serverId = res.serverId; // 返回图片的服务器端ID
                                uploadWXEvidence(serverId).then(res => {
                                    if (res.data.state == 100) {
                                        // alert('上传成功！')
                                        // alert(JSON.stringify(res.data))
                                        that.evidence[index].eviPath=res.data.path
                                        that.evidence[index].photoUrl2=that.localIds
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
        addEvidence(){
            let data = {
                eviName:"",
                eviProve:"",
                eviPath:'',
                photoUrl2:'',
                type:3
            }
            this.evidence.push(data)
        },
        upStep(){

        },
        deleteBtn(id){
            console.log(id)
            if (this.evidence.length<3||this.evidence.length==3) {
                this.$dialog.toast({
                    mes: '至少要有一条证据信息',
                    icon: "warning",
                    timeout: 1000
                });
            }else{
                this.evidence.splice(id, 1);
                this.$dialog.toast({
                    mes: '删除成功',
                    icon: "warning",
                    timeout: 1000
                });
            }
        },
        nextStep(){
            let count=2
            let that=this
            for (let i = 2; i < this.evidence.length; i++) {
                if (this.evidence[i].eviName==""||this.evidence[i].eviProve==""||this.evidence[i].path=="") {
                    this.$dialog.toast({
                        mes: '请检查上传的证据信息是否填写完整',
                        icon: "warning",
                        timeout: 2000
                    });
                }else{
                    count++
                }
            }
            if (count==this.evidence.length) {
                if (this.evidence[0].path==''||this.evidence[1].path=='') {
                    this.$dialog.toast({
                        mes: '请检查起诉状和身份材料是否上传完整',
                        icon: "warning",
                        timeout: 2000
                    });
                }
                saveWXEvidence(this.$store.getters.onlineLawCase.id,this.evidence).then(res => {
                    // this.$dialog.loading.open('正在上传证据信息，请稍后...');
                    console.log(res)
                    if (res.data.state==100) {
                        // that.$dialog.loading.close();
                        that.$dialog.toast({
                            mes: '保存成功',
                            icon: "warning",
                            timeout: 1000
                        });
                        that.$router.push({
                            name:'infoList',
                            query:{
                                'dataFrom':'isOk'
                            }
                        })
                    }else{
                        that.$dialog.toast({
                            mes: res.data.message,
                            icon: "warning",
                            timeout: 1000
                        });
                    }
                })
            }
        }
    }
}
</script>

<style lang="css">
.uploadDiv{
    background-color: #FAFAFD;
    border: 1px #999 dashed;
    width: 40%;
    margin: 0.35rem;
    height: 2rem;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;    flex-direction: column;
}
</style>
