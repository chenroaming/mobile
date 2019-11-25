<template lang="html">
    <div style="height:100%;background:#F1F2F6">
        <input id="upLicense" style="display: none;" onchange="choice()" type="file" name="upLicense" accept="image/*" multiple>
        <header>
            <p>{{caseNo}}</p>
        </header>
        <div v-for="(item,index) in eviList" class="evi-box">
            <p class="evi-title">
                <img src="@/images/titleIcon.png" alt="">
                <span>{{item.No}}</span>
            </p>
            <p class="evi-name">
                <img src="@/images/write1.png" alt="">
                <span>证据名称</span><input type="text" v-model="item.name">
            </p>
            <p class="evi-icon">
                <img src="@/images/upload1.png" alt="">
                <span>文件上传</span>
            </p>
            <ul>
                <li class="pic-box" v-for="(item2,index2) in item.picList">
                    <img class="pic-content" :src="item2.src" alt="">
                    <!-- <span class="del" v-if="!item2.status">上传中...</span> -->
                    <span class="del" @click="del(index,index2,item2.proofUrlId)">删除</span>
                </li>
                <li class="add" @click="choice(index)" v-show="item.picList.length < 9">
                    <img class="pic-content" src="@/images/addIcon.png" alt="">
                </li>
            </ul>
        </div>
        <div class="add-select" @click="addEvi">
            <p class="evi-title">
                <img src="@/images/add1.png" alt="">
                <span>添加新证据</span>
            </p>
        </div>
        <yd-button size="large" bgcolor="#1F4E87" color="#fff" type="primary" @click.native="upload" shape="circle">确认上传</yd-button>
    </div>
    
</template>

<script>
import wx from 'weixin-js-sdk'
import Util from '@/libs/util.js'
// import {uploadFrontImage} from '@/api/setcase.js'
// import {uploadBackImage} from '@/api/setcase.js'
// import {getOnlineLawCaseEdit} from '@/api/setcase.js'
// import {getOnlineLitigantInfo} from '@/api/setcase.js'
// import {getLitigantInfolitigant} from '@/api/setcase.js'
// import {getwxinfo} from '@/api/setcase.js'
// import {upfile} from '@/api/uploadEvi.js';
import {upfile,delProofUrl,saveProof} from '@/api/uploadEvi.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
    components : {},
    data(){
        return{
            picList: [],
            fileArr:[
                {id:1,No:'证据1',name:'',picList:[]},
            ],
            caseNo:'',
            roomId:'',
            recordId:'',
            eviList:[
                {id:1,No:'证据1',name:'',picList:[],fileList:[],urlIds:[]},
            ],
            path:'ws://mediate.ptnetwork001.com/api/web/webSocket.jhtml',
            socket:'',
        }
    },
    mounted () {
        this.caseNo = this.$route.query.mediateNo;
        const id = this.$route.query.id;
        this.roomId = id.split('-')[0];
        this.recordId = id.split('-')[1];
        console.log(this.roomId,this.recordId);
    },
    created(){
        
    },
    watch:{
        
　　},
    methods:{
        choice(index){
            const upLicense = document.getElementById('upLicense');
            const nav = navigator.userAgent.toLowerCase();
            const isIos = (nav.indexOf('iphone') != -1) || (nav.indexOf('ipad') != -1);
            if (isIos) {
                upLicense.removeAttribute("capture");//ios兼容适配
            }
            upLicense.click();
            const that = this;//以下的function函数中的this指向该function函数，由于无法使用箭头函数因此只能先用that指代一下this
            upLicense.onchange = function(e){
                const file = e.target.files[0];
                that.eviList[index].fileList.push(file);
                const fileReader = new FileReader();
                if(!fileReader){
                    console.log('not support!');
                }
                fileReader.onloadend = function () {
                    // if (fileReader.readyState == fileReader.DONE) {
                    //     const src = {
                    //         src:fileReader.result,
                    //         status:false,
                    //         proofUrlId:'',
                    //     }
                    //     that.eviList[index].picList.push(src);
                    // }
                    upfile(file,that.recordId).then(res => {
                        if(res.data.state == 100){
                            that.eviList[index].urlIds.push(res.data.proofUrlId);
                            const src = {
                                src:fileReader.result,
                                status:true,
                                proofUrlId:res.data.proofUrlId
                            }
                            that.eviList[index].picList.push(src);
                        }else if(res.data.state == 101){
                            that.$dialog.alert({mes: res.data.message});
                        }
                    }).catch(err => {
                        that.$dialog.alert({mes: '网络错误！请刷新重试！'});
                    })
                };
                fileReader.onload = function () {
                    console.log(file);
                }
                fileReader.readAsDataURL(file);
            }
        },
        upload(){
            console.log(this.eviList);
            const dataList = [];
            for (const item of this.eviList){
                const obj = {
                    proofName:item.name,
                    urlIds:item.urlIds.join(',')
                }
                dataList.push(obj);
            }
            saveProof(this.roomId,this.recordId,dataList).then(res => {
                if(res.data.state == 100){
                    this.$dialog.confirm({
                        title: '提交成功',
                        mes: res.data.message,
                        opts:
                        [
                            {
                                txt: '确定',
                                color: true,
                                callback: () => {
                                    console.log(111);
                                    WeixinJSBridge.invoke('closeWindow',{},function(res){});
                                }
                            }
                        ]
                    });
                }else if(res.data.state == 101){
                    this.$dialog.alert({mes: res.data.message});
                }
            })
        },
        del(index,index2,proofUrlId){
            delProofUrl(proofUrlId).then(res => {
                if(res.data.state == 100){
                    this.eviList[index].picList.splice(index2,1);
                    this.eviList[index].fileList.splice(index2,1);
                    this.eviList[index].urlIds.splice(index2,1);
                    this.$dialog.alert({mes: res.data.message});
                }else if(res.data.state == 101){
                    this.$dialog.alert({mes: res.data.message});
                }
            })
        },
        addEvi(){
            console.log(this.eviList[this.eviList.length-1]);
            const id = this.eviList[this.eviList.length-1].id +1;
            const evi = {
                id:id,
                No:'证据' + id,
                name:'',
                picList:[],
                fileList:[],
                urlIds:[]
            }
            this.eviList.push(evi);
        },
        // uploadImg(){
        //     let that=this
        //         wx.chooseImage({
        //             count: 1,  
        //             sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
        //             sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        //             fail:function (res){
        //                 console.log('111'+res);
        //             },
        //             success: function (res) {
        //                 const tempFilePaths = res.tempFilePaths
        //                 console.log(JSON.stringify(res));
        //                 const src = {
        //                     src:tempFilePaths
        //                 };
        //                 this.picList.push(src);
        //                 that.localIds=res.localIds[0]
        //                 if (name=='front'||name=='legal') {
        //                     if (that.fileType==1) {
        //                         that.photoUrl1=that.localIds
        //                     }else if (that.fileType==2) {
        //                         that.photoUrl3=that.localIds
        //                     }
        //                     wx.uploadImage({
        //                         localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
        //                         isShowProgressTips: 1, // 默认为1，显示进度提示
        //                         success: function (res) {
        //                             console.log(res)
        //                             let serverId = res.serverId; // 返回图片的服务器端ID
        //                             uploadFrontImage(serverId).then(res => {
        //                                 if (res.data.state == 100) {
        //                                     that.$dialog.toast({
        //                                         mes: '上传成功！',
        //                                         icon: "success",
        //                                         timeout: 1000
        //                                     });
        //                                     if (that.fileType==1) {
        //                                         that.fromtOrLegalImg=res.data.frontImage
        //                                     }else if (that.fileType==2) {
        //                                         that.fromtOrLegalImg1=res.data.frontImage
        //                                     }
        //                                 } else {
        //                                     alert('上传失败！')
        //                                 }
        //                             })
        //                         },fail:function(res){
        //                             alert('上传图片出现问题')
        //                         }
        //                     });
        //                 }else if (name=='opposite') {
        //                     that.photoUrl2=that.localIds
        //                     wx.uploadImage({
        //                         localId: that.localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
        //                         isShowProgressTips: 1, // 默认为1，显示进度提示
        //                         success: function (res) {
        //                             let serverId = res.serverId; // 返回图片的服务器端ID
        //                             uploadBackImage(serverId).then(res => {
        //                                 if (res.data.state == 100) {
        //                                     that.$dialog.toast({
        //                                         mes: '上传成功！',
        //                                         icon: "success",
        //                                         timeout: 1000
        //                                     });
        //                                     that.opposite=res.data.backImage
        //                                 } else {
        //                                     alert('上传失败！')
        //                                 }
        //                             })
        //                         },fail:function(res){
        //                             alert('上传图片出现问题')
        //                         }
        //                     });
        //                 }
        //             }  
        //         });
        // },
    }
}
</script>

<style lang="css">
    header {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background-color: #1F4E87;
    }
    header p{
        font-size: 16px;
        font-weight: 700;
        color: #fff;
    }
    ul {
        width: 98%;
        margin: 0 auto;
        height: 264px;
        margin-top: 10px;
        position: relative;
    }
    .pic-box {
        width: 30%;
        margin-left: 3%;
        float: left;
        height: 33%;
        position: relative;
    }

    .pic-content {
        width: 100%;
        height: 100%;
    }

    .del {
        display: inline-block;
        width: 100%;
        height: 25px;
        line-height: 25px;
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9;
        color: #fff;
        background-color: rgba(0,0,0,0.5);
    }
    .evi-box {
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        padding-bottom: 10px;
        height: auto;
        border-radius: 10px;
        box-shadow: 1px 5px 5px #dedede;
    }

    .evi-title {
        height: 30px;
        line-height: 30px;
        text-align: left;
        color: #1F4E87;
        font-weight: 700;
        font-size: 18px;
    }

    .evi-title img{
        display: inline;
        vertical-align: middle;
        width: 25px;
    }
    .evi-title span{
        vertical-align: middle;
    }
    
    .evi-name {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        color: #000;
        font-weight: 700;
        font-size: 15px;
        margin-top: 15px;
    }
    .evi-name span{

    }
    .evi-name img{
        display: inline;
        vertical-align: middle;
        width: 30px;
        height: 30px;
    }
    .evi-name input{
        width: 60%;
        border: 1px solid #dedede;
        margin-left: 10px;
        display: inline;
    }

    .evi-icon {
        height: 30px;
        line-height: 30px;
        text-align: left;
        color: #000;
        font-weight: 700;
        font-size: 15px;
        margin-top: 15px;
    }
    .evi-icon span{

    }
    .evi-icon img{
        display: inline;
        vertical-align: middle;
        width: 30px;
        height: 30px;
    }

    .add {
        width: 30%;
        margin-left: 3%;
        float: left;
        height: 33%;
        border: 2px dashed #1F4E87;
        position: relative;
    }
    .add img{
        width: 50%;
        height: 50%;
        position: absolute;
        top: 25%;
        right: 25%;
    }

    .add-select {
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        height: 50px;
        border-radius: 10px;
        box-shadow: 1px 5px 5px #dedede;
    }
    .add-select p{
        height: 50px;
        line-height: 50px;
    }
    .add-select img{    
        width: 30px;
        vertical-align: middle;
    }
    .add-select p{
        
    }
/* .yd-timeline-content {
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
} */
</style>    