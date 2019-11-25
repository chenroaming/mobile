<template>
    <div>
        <yd-navbar title="证据信息" bgcolor="#40a9ff" color="#fff">
            <router-link to="/mobile/caseAllEvdence" slot="left">
                <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
            </router-link>
            <!-- <span @click="gotoAddEvidence" slot="right">
                 <span color="#fff" style="color:#fff;">添加证据</span>
            </span> -->
        </yd-navbar>
        <yd-cell-group>  
            <yd-cell-item>
                <span slot="left">证据名称：</span>
                <span slot="right" style="padding:0.2rem;">{{evidenceInfo.name}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">证据对象：</span>
                <span slot="right" style="padding:0.2rem;">{{evidenceInfo.prove}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">证据来源：</span>
                <span slot="right">{{evidenceInfo.where}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">提交时间：</span>
                <span slot="right">{{evidenceInfo.proveTime | formatDate}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left">附件：</span>
                <span slot="right"  @click="downloadFile(evidenceInfo.fileAddr)"><yd-icon name="download"></yd-icon></span>
            </yd-cell-item>
            <yd-accordion >
                <!-- dsrName:item.dsrName,
                            dsrStatus:item.dsrStatus,
                            time:item.time,
                            zhen:item.result.substr(0,1),
                            he:item.result.substr(1,1),
                            guan:item.result.substr(2,1),
                            content:item.content,
                            content2:item.content2, -->
                    <yd-accordion-item title="质证信息" open>
                        <div style="padding: .24rem 0.1rem;" v-for="item in reverList">
                            <div >
                                <div class="peopleTitle">
                                    <p class="suya" style="float:left;display:inline-block">
                                        <span :class="item.dsrStatus == '原告' ? 'plaimSpan' : (item.dsrStatus == '被告' ? 'defentSpan' : 'lawSpan')">{{item.dsrStatus}}</span>
                                    </p>
                                    <p style="float:left;display:inline-block;margin-left: 0.1rem;">{{item.dsrName}}</p>
                                    <p style="float:right;display:inline-block">{{item.time}}</p>
                                </div>
                                <p class="threeCon">
                                    <span style="display: inline-block;width: 31%;">真实性：<span :class="item.zhen != 1 ? 'red' : 'green'">{{item.zhen != 1 ? "不认可" : "认可"}}</span></span>
                                    <span  style="display: inline-block;width: 31%;">合法性：<span :class="item.he != 1 ? 'red' : 'green'">{{item.he != 1 ? "不认可" : "认可"}}</span></span>
                                    <span  style="display: inline-block;width: 31%;">关联性：<span :class="item.guan != 1 ? 'red' : 'green'">{{item.guan != 1 ? "不认可" : "认可"}}</span></span>
                                </p>
                            </div>
                            <div>
                                <p class="reasonCont" >
                                    <span style="display:inline-block;width:20%;text-align:right;font-weight:600">原因：</span>
                                    <span style="text-align:left">{{item.content}}</span>
                                </p>
                                <p  class="reasonCont">
                                    <span style="display:inline-block;width:20%;text-align:right;font-weight:600">其他意见：</span>
                                    <span  style="text-align:left">{{item.content2}}</span>
                                </p>
                            </div>
                        </div>
                    </yd-accordion-item>
            </yd-accordion>            
        </yd-cell-group>
        <p class="footer-button" style="position: relative;top:3%;" v-show=" this.isButton == 1">
            <button class="nextBtn" @click='goToAddWitness'> 发表意见</button>
        </p>
    <!-- <yd-tab active-color="#40a9ff" :callback="itemClick" >
        <yd-tab-panel label="已上传未提交证据" style="margin-top: 20px;">
          <div v-for="item in allList">
            <div v-for='i in item.eviList'>
            
            <yd-button @click.native="deleEvidence(i.id)" shape="circle"  bgcolor="#EF4F4F" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%">删　除</yd-button>
            <yd-button @click.native="editEvidence(i.id)" shape="circle"  bgcolor="#40a9ff" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%;margin-left:2%;margin-bottom:10px">编　辑</yd-button>    
            <yd-button @click.native="checkSubmit(i.id)" shape="circle"  bgcolor="#04BE02" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-left:2%">提　交</yd-button>
            <span style="margin-bottom:0.3rem;margin-top:0.2rem;display:block;height:5px;width:100%;border-bottom:1px dashed #ccc"></span>
          </div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="已提交">
            <div v-for="item in evidenceListSub">
                <div v-for="i in item.eviList">
                <yd-cell-group>  
                    <yd-cell-item>
                        <span slot="left">证据名称：</span>
                        <span slot="right">{{i.name}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">证据对象：</span>
                        <span slot="right">{{i.prove}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">证据来源：</span>
                        <span slot="right">{{i.where}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">提交时间：</span>
                        <span slot="right">{{i.proveTime}}</span>
                    </yd-cell-item>
                    <yd-cell-item>
                        <span slot="left">附件：</span>
                        <span slot="right"  @click="downloadFile(i.file)"><yd-icon name="download"></yd-icon></span>
                    </yd-cell-item>            
                </yd-cell-group>
                    <span style="margin-bottom:0.3rem;margin-top:0.2rem;display:block;height:5px;width:100%;border-bottom:1px dashed #ccc"></span>
                
                </div>
            </div>
        </yd-tab-panel>
    </yd-tab> -->
        <yd-popup v-model="show1" position="center" width="90%" style="overflow-x: hidden;">
            <div style="background-color:#fff;">
                <yd-cell-group>
                    <yd-cell-item v-for="item in fileList">
                        <span slot="left">{{item.name}}</span>              
                        <span slot="right"><yd-button type="primary" @click.native="downloads(item.addr)" slot="right">下载</yd-button></span>
                    </yd-cell-item>
                </yd-cell-group>
                <p style="text-align: center;">
                    <yd-button  @click.native="show1 = false">关　闭</yd-button>
                </p>
            </div>
        </yd-popup>
        <img v-show="imageShow" @click="imgCli" class="wxTips" src="../../images/wxTips.png" alt="">
    </div>
</template>

<script type="text/babel">
import { editEvi, delEvidence, getEvi, checkEvi, getEviById } from "@/api/evidence.js";
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
import {getEvidenceReverts} from '@/api/mycase.js'
export default {
  data() {
    return {
      lowCaseId:'',
      isself:1,
      show1:false,
      allList:[],
      imageShow:false,
      fileList:[],
      evidenceListSub:[],
      urlHistiory:'',
      evidenceInfo:{},
      reverList:[],
      paths:'',
      path:"",
      nowUrl:"",
      c:true,
      evidenceId:"",
      isButton:1,
    };
  },
  created() {
        var sUrl = window.location.href;
        if(sUrl.indexOf("upload") == -1){
            if(this.evidenceId == '' && !this.$route.params.evidenceId){
                if(localStorage.getItem("evidenceId")){
                    this.evidenceId = localStorage.getItem("evidenceId");
                    this.isButton = localStorage.getItem("isButton");
                    console.log(this.isButton)
                    console.log(996)
                    this.getEs(this.evidenceId)
                }
            }
            
        }else{
            // alert(111)
            var sstr = sUrl.split("down=");
            var newSstr = sstr[1];
            var fileStr = newSstr.replace(/%2/g,"/");
            if(fileStr == null){
                this.$dialog.toast({
                    mes: "暂无附件",
                    timeout: 1500,
                    icon: 'error',
                    callback: () => {
                        
                    }
                });
                return false;
            }
            // 创建隐藏的可下载链接
            var eleLink = document.createElement("a");
            var strs = fileStr.split("/");
            for (var i = 0; i < strs.length; i++) {
                if (i == strs.length - 1) {
                var filename = strs[i];
                }
            }
            eleLink.download = filename;
            eleLink.style.display = "none";
            eleLink.href = fileStr+'?mp.wexin.qq.com';
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
        }
       
  },
    // watch: {
	// 	'$route' (to, from) {
    //         if (this.$route.params) {
    //                 if(this.$route.params.evidenceId){
    //                     this.isButton = this.$route.params.isButton;
    //                     this.evidenceId = this.$route.params.evidenceId;
    //                     localStorage.setItem("evidenceId",this.evidenceId);
    //                     localStorage.setItem("isButton",this.evidenceId);
    //                     this.getEs(this.evidenceId)
    //                 }
                    
    //         }
	// 	},
    // },
  mounted(){
      console.log(this.$route.params)
      if (this.$route.params) {
            if(this.$route.params.evidenceId){
                this.isButton = this.$route.params.isButton;
                console.log(this.isButton)
                this.evidenceId = this.$route.params.evidenceId;
                localStorage.setItem("evidenceId",this.evidenceId);
                localStorage.setItem("isButton",this.isButton);
                this.getEs(this.evidenceId)
            }
            
       }
  },
  methods: {
      checkSubmit(id){
          var str = id;
          this.$dialog.confirm({
                title: '提示',
                mes: '确定提交该证据吗？',
                opts: () => {
                    checkEvi(this.lowCaseId, str).then(res => {
                        if(res.data.state == 100){
                             this.$dialog.toast({
                                mes: res.data.message,
                                timeout: 1500,
                                icon: 'success'
                            });
                            this.getEvit();
                        }else{
                            this.$dialog.toast({
                                mes: res.data.message,
                                timeout: 1500,
                                icon: 'error',
                                callback: () => {
                                    
                                }
                            });
                        }
                    })
                }
            });
      },
      imgCli(){
          this.imageShow = false;
        //   var str = window.location.host+window.location.pathname;
        //   var mewstr = str.replace(this.paths,'');
        //   console.log(str)
        //   console.log(mewstr)
            console.log(this.nowUrl)
            // window.history.pushState({},0,'http://'+mewstr);
            window.history.pushState({},0,this.nowUrl);
      },
      getEs(id){
          this.$dialog.loading.open('');

          getEvidenceReverts(id).then(res => {
              if(res.data.state == 100){
                  let data = {
                      name:res.data.qtwEvidence.name,
                      prove:res.data.qtwEvidence.prove,
                      where:res.data.qtwEvidence.source,
                      proveTime:res.data.qtwEvidence.createDate,
                      fileAddr:res.data.qtwEvidence.filePaths,
                  }
                  this.evidenceInfo = data;
                  this.$dialog.loading.close();
                  this.reverList = [];
                if(res.data.reverts){
                    res.data.reverts.map(item => {
                        let data2 = {
                            dsrName:item.dsrName,
                            dsrStatus:item.dsrStatus,
                            time:item.time,
                            zhen:item.result.substr(0,1),
                            he:item.result.substr(1,1),
                            guan:item.result.substr(2,1),
                            content:item.content,
                            content2:item.content2,
                        }
                        this.reverList.push(data2);
                    })
                }
              }else{
                this.$dialog.loading.close();
                this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500
                });
              }
              
          })
      },
      itemClick(label, key){
          console.log(label, key)
          if(label == '已提交'){
              console.log(15151)
              this.evidenceListSub = [];
              getEvi(this.lowCaseId, 2).then(res => {
                if(res.data.state == 100){
                    var arr = [];
                    res.data.result.map((item, index) => {
                        const ss = {};
                        ss.dsrName = item.dsrName;
                        ss.dsrStatus = item.dsrStatus;
                        arr.push(ss);
                    });
                    for(var i = 0; i < arr.length-1; i++){
                        for(var j = i+1; j < arr.length; j++){
                            if(arr[i].dsrName==arr[j].dsrName){
                                arr.splice(j,1);
                                j--;
                            }
                        }
                    }
                    var newArr = arr;
                    for(var i=0;i<newArr.length;i++){
                        var arySmall = [];
                        res.data.result.map((item, index) => {
                            if(item.dsrName==newArr[i].dsrName){
                                const data = {};
                                data.id = item.evidenceId;
                                data.prove = item.prove;
                                data.name = item.name;
                                data.fileAddr = item.fileAddr;
                                data.fileName = item.fileName;
                                data.file = item.file;
                                data.where = item.source;
                                // data.pageNum = item.
                                data.proveTime = item.time;
                                arySmall.push(data);
                            }
                        });
                        newArr[i].eviList = arySmall;
                    }
                    this.evidenceListSub = newArr;
                }else{
                        this.$Message.error(res.data.message);
                }
            })
          }
      },
      editEvidence(id){
          console.log(id)
        this.$router.push({
            name: 'editEvidence',
            params: { evidenceId: id,lawCaseId:this.lowCaseId }
        });
      },
      downloads(path){
          this.nowUrl = window.location.href;
          console.log(this.nowUrl  + '大声道')
          let str = path.substr(0, 1);
          let str2 = window.location.host;
          let httpNm =  document.location.protocol;
          if(str == '/'){
                if(httpNm == 'https:'){
                    this.path = 'https://' + str2 +  path;
                }else{
                    this.path = 'http://' + str2 +  path;
                }
            }else{
                if(httpNm == 'https:'){
                    this.path = 'https://' + str2 +'/'+  path;
                }else{
                    this.path = 'http://' + str2 +'/'+  path;
                }
            }
          this.paths = this.path; 
          console.log(this.paths)
          window.history.pushState({},0,this.paths);
          this.imageShow = true;
          
            // if(ua.match(/MicroMessenger/i)=="micromessenger") {  
            //     this.imageShow = true; 
            //       var absurl = window.location.href; 
            //       this.urlHistiory = absurl;
            //       let httpNm =  document.location.protocol;
            //       let pathss = '';
            //       if(httpNm == 'https:'){
            //             pathss = 'https://'+window.location.host+window.location.pathname+'?down='+path
            //         }else{
            //             pathss = 'http://'+window.location.host+window.location.pathname+'?down='+path
            //         }
            //         console.log(pathss)
            //       window.history.pushState({},0,pathss); 
            //     //   window.history.pushState({},0,window.location.host+window.location.pathname+'?down='+path); 
            //       console.log(absurl)
            // } else {  
            //     var fileStr = path;
            //     if(fileStr == null){
            //         this.$dialog.toast({
            //             mes: "暂无附件",
            //             timeout: 1500,
            //             icon: 'error',
            //             callback: () => {
                            
            //             }
            //         });
            //         return false;
            //     }
            //     // 创建隐藏的可下载链接
            //     var eleLink = document.createElement("a");
            //     var strs = fileStr.split("/");
            //     for (var i = 0; i < strs.length; i++) {
            //         if (i == strs.length - 1) {
            //         var filename = strs[i];
            //         }
            //     }
            //     console.log(filename);
            //     eleLink.download = filename;
            //     eleLink.style.display = "none";
            //     // 字符内容转变成blob地址
            //     eleLink.href = fileStr+'?mp.wexin.qq.com';
            //     // 触发点击
            //     document.body.appendChild(eleLink);
            //     eleLink.click();
            //     // 然后移除
            //     document.body.removeChild(eleLink);  
            // }
            // return false;
          
      },
      downloadFile(file){
          console.log(file)
          if(file == null){
              this.$dialog.toast({
                    mes: "暂无附件",
                    timeout: 1500,
                    icon: 'error',
                    callback: () => {
                        
                    }
                });
                return false;
          }else{
                this.fileList = file;
                this.show1 = true;
               
          }
          
          return false;
          
      },
      goToAddWitness(id){
          this.$router.push({
            name: 'addWitness',
            params: { evidenceId: this.evidenceId }
        });
      },
      getEvit(){
          this.allList = [];
          getEvi(this.lowCaseId, this.isself).then(res => {
            if(res.data.state == 100){
                var arr = [];
                res.data.result.map((item, index) => {
                    const ss = {};
                    ss.dsrName = item.dsrName;
                    ss.dsrStatus = item.dsrStatus;
                    arr.push(ss);
                });
                for(var i = 0; i < arr.length-1; i++){
                    for(var j = i+1; j < arr.length; j++){
                        if(arr[i].dsrName==arr[j].dsrName){
                            arr.splice(j,1);
                            j--;
                        }
                    }
                }
                var newArr = arr;
                for(var i=0;i<newArr.length;i++){
                    var arySmall = [];
                    res.data.result.map((item, index) => {
                        if(item.dsrName==newArr[i].dsrName){
                            const data = {};
                            data.id = item.evidenceId;
                            data.prove = item.prove;
                            data.name = item.name;
                            data.fileAddr = item.fileAddr;
                            data.fileName = item.fileName;
                            data.file = item.file;
                            data.where = item.source;
                            // data.pageNum = item.
                            data.proveTime = item.time;
                            arySmall.push(data);
                        }
                    });
                    newArr[i].eviList = arySmall;
                }
                this.allList = newArr;
                console.log(this.allList)
            }else{
                this.$dialog.toast({
                    mes: res.data.message,
                    timeout: 1500
                });
            }
        })
      },
      deleEvidence(id){
            this.$dialog.confirm({
                title: '提示',
                mes: '是否删除该证据？',
                opts: () => {
                    delEvidence(this.lowCaseId,id).then(res => {
                        if (res.data.state == 100) {
                            this.$dialog.toast({
                                mes: res.data.message,
                                timeout: 1500,
                                icon: 'success'
                            });
                            this.getEvit()
                        } else {
                            this.$dialog.toast({
                                mes: res.data.message,
                                timeout: 1500,
                                icon: 'error',
                                callback: () => {
                                    
                                }
                            });
                        }
                    })
                }
            });
          
      },
      gotoAdd(){
      }
   
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatDateTime(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style>
.yd-popup-content{
    overflow-x: hidden;
}
.yd-cell:after {
  margin-left: 0.24rem;
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-btn-block {
  width: 100%;
  display: block;
  font-size: 0.4rem;
  height: 0.9rem;
  margin-top: 0.8rem;
}
.wxTips{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 9999;
}
.yd-toast-none-icon .yd-toast-content {
    color:#fff;
}
.threeCon span{
    text-align: center;
    line-height: 0.7rem;
}
.green{
    color: green;
}
.red{
    color:red;
}
.reasonCont{
    margin:0.2rem 0;
    text-align: left;
}
.reasonCont span{
    line-height: 0.3rem;
    text-align: left;
}
.peopleTitle{
    background: #F7F7F7;
    padding:0 0.2rem;
        width: 100%;
    height: 0.8rem;
}
.suya{
    font-size: 0.3rem;
    line-height: 0.8rem;
    color: #495060;
}
.peopleTitle p{
    font-size: 0.2rem;
    line-height: 0.8rem;
    color: #495060;
}
.plaimSpan{
    /* display: inline-block; */
    padding: 5px;
    color: #fff;
    background: #40a9ff;
    margin-right: 5px;
}
.defentSpan{
    /* display: inline-block; */
    padding: 5px;
    color: #40a9ff;
    border: 1px solid #40a9ff;
    margin-right: 5px;
}
.yd-toast-none-icon .yd-toast-content {
    color:#fff;
}
.lawSpan{
    /* display: inline-block; */
    padding: 5px;
    margin-right: 5px;
    color: #40a9ff;
}
</style>
