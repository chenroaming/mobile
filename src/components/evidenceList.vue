<template>
    <div>
        <yd-navbar title="我的证据列表" bgcolor="#40a9ff" color="#fff">
            <!-- <router-link  @click="backP" slot="left">
                <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
            </router-link> -->
            <span @click="backP" slot="left">
                 <span color="#fff" style="color:#fff;">返回</span>
            </span>
            <!-- <router-link to="#" slot="right" @click="gotoAdd">
                <yd-navbar-next-icon color="#fff" style="color:#fff;">添加证据</yd-navbar-next-icon>
            </router-link> -->
            <span @click="gotoAddEvidence" slot="right">
                 <span color="#fff" style="color:#fff;">添加证据</span>
            </span>
        </yd-navbar>
    <yd-tab active-color="#40a9ff" :callback="itemClick" >
        <yd-tab-panel label="已上传未提交证据" style="margin-top: 20px;">
            <div>
          <div v-for="item in allList">
            <div v-for='i in item.eviList'>
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
                    <span slot="right" @click="downloadFile(i.file)"><yd-icon name="download"></yd-icon></span>
                </yd-cell-item>            
            </yd-cell-group>
            <yd-button @click.native="deleEvidence(i.id)" shape="circle"  bgcolor="#EF4F4F" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%">删　除</yd-button>
            <yd-button @click.native="editEvidence(i.id)" shape="circle"  bgcolor="#40a9ff" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%;margin-left:2%;margin-bottom:10px">编　辑</yd-button>    
            <yd-button @click.native="checkSubmit(i.id)" shape="circle"  bgcolor="#04BE02" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-left:2%">提　交</yd-button>
            <span style="margin-bottom:0.3rem;margin-top:0.2rem;display:block;height:5px;width:100%;border-bottom:1px dashed #ccc"></span>
          </div>
          </div>
          <span slot="doneTip" style="margin-top:0.2rem;display:inline-block" v-show='allList.length == 0'>暂无证据~</span>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="已提交" style="margin-top: 20px;">
            <div>
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
            <span slot="doneTip" style="margin-top:0.2rem;display:inline-block" v-show='evidenceListSub.length == 0'>暂无证据~</span>
            </div>
        </yd-tab-panel>
    </yd-tab>
        <yd-popup v-model="show1" position="center" width="90%" style="overflow-x: hidden;">
            <div style="background-color:#fff;">
                <yd-cell-group>
                    <yd-cell-item v-for="item in fileList">
                        <span slot="left">{{item.fileName}}</span>              
                        <span slot="right"><yd-button type="primary" @click.native="downloads(item.fileAddr)" slot="right">下载</yd-button></span>
                    </yd-cell-item>
                </yd-cell-group>
                <p style="text-align: center;">
                    <yd-button  @click.native="show1 = false">关　闭</yd-button>
                </p>
            </div>
        </yd-popup>
        
        <img v-show="imageShow" @click="imgCli" class="wxTips" src="../images/wxTips.png" alt="">
    </div>
</template>

<script type="text/babel">
import { editEvi, delEvidence, getEvi, checkEvi, getEviById } from "@/api/evidence.js";
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
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
      paths:'',
      nowUrl:"",
      path:"",
      backPth:0,
    };
  },
  created() {
        var sUrl = window.location.href;
        if(sUrl.indexOf("upload") == -1){
            if(this.lowCaseId == '' && !this.$route.params.lawCaseId){
                if(localStorage.getItem("lawCaseId")){
                    this.lowCaseId = localStorage.getItem("lawCaseId");
                    this.getEvit()
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
//   watch: {
// 		'$route' (to, from) {
//             if (this.$route.params && to.name != 'caseAllEvdence' && to.name != 'addEvidence') {
//                     if(this.$route.params.lawCaseId){
//                         this.lowCaseId = this.$route.params.lawCaseId;
//                         localStorage.setItem("lawCaseId",this.lowCaseId);
//                         this.getEvit()
                        
//                     }
//                     if(this.$route.params.path && this.$route.params.path == 'mycase'){
//                         this.backPth = 1;
//                     }
                            
//             }
// 		},
//     },
  mounted(){
      if (this.$route.params) {
            if(this.$route.params.lawCaseId){
                this.lowCaseId = this.$route.params.lawCaseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
                console.log(98)
                this.getEvit()
            }
            if(this.$route.params.path && this.$route.params.path == 'mycase'){
                
                this.backPth = 1;
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
          
            window.history.pushState({},0,this.nowUrl);
      },
      gotoAddEvidence(){
        this.$router.push({
            name: 'addEvidence',
            params: { lawCaseId: this.lowCaseId,path:this.backPth }
        });
      },
      backP(){
          console.log(this.backPth)
          if(this.backPth != 0){
            this.$router.push({
                name: 'caseAllEvdence',
                params: { lawCaseId:this.lowCaseId,path:1 }
            }); 
          }else{
             this.$router.push({
                name: 'caseList',
                params: {  }
            }); 
          }
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
            params: { evidenceId: id,lawCaseId:this.lowCaseId,path:this.backPth }
        });
      },
      downloads(path){
          this.nowUrl = window.location.href;
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
        //   var ua = navigator.userAgent.toLowerCase(); 
        //   this.paths = path; 
        //     if(ua.match(/MicroMessenger/i)=="micromessenger") {  
        //         this.imageShow = true; 
        //           var absurl = window.location.href; 
        //           this.urlHistiory = absurl;
        //           window.history.pushState({},0,'https://'+window.location.host+window.location.pathname+'?down='+path); 
        //           console.log(absurl)
        //     } else {  
        //         var fileStr = path;
        //         if(fileStr == null){
        //             this.$dialog.toast({
        //                 mes: "暂无附件",
        //                 timeout: 1500,
        //                 icon: 'error',
        //                 callback: () => {
                            
        //                 }
        //             });
        //             return false;
        //         }
        //         // 创建隐藏的可下载链接
        //         var eleLink = document.createElement("a");
        //         var strs = fileStr.split("/");
        //         for (var i = 0; i < strs.length; i++) {
        //             if (i == strs.length - 1) {
        //             var filename = strs[i];
        //             }
        //         }
        //         console.log(filename);
        //         eleLink.download = filename;
        //         eleLink.style.display = "none";
        //         // 字符内容转变成blob地址
        //         eleLink.href = fileStr+'?mp.wexin.qq.com';
        //         // 触发点击
        //         document.body.appendChild(eleLink);
        //         eleLink.click();
        //         // 然后移除
        //         document.body.removeChild(eleLink);  
        //     }
            // return false;
          
      },
      downloadFile(file){
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
      getEvit(){
          this.allList = [];
          console.log('加载')
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
</style>
