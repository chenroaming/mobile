<template>
    <div>
        <yd-navbar title="案件证据列表" bgcolor="#40a9ff" color="#fff">
            <router-link to="/mobile/caseInfo" slot="left">
                <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
            </router-link>
            <!-- <router-link to="#" slot="right" @click="gotoAdd">
                <yd-navbar-next-icon color="#fff" style="color:#fff;">添加证据</yd-navbar-next-icon>
            </router-link> -->
            <span @click="gotoAddEvidence" slot="right">
                 <span color="#fff" style="color:#fff;">我的证据</span>
            </span>
        </yd-navbar>
        <yd-cell-group title="" style="margin-top:0.3rem;">
            <yd-cell-item>
                <div slot="right" style="width:100%">
                    <Select @change="showType" v-model="litigantN"  style="vertical-align:middle;display: inline-block;width:100%;text-align:right">
                            <Option  value=0 >全部</Option>
                            <Option v-for="item in nameList" :value="item.dsrName" :key="item.dsrName">{{'('+item.dsrStatus+')'+ item.dsrName }}</Option>                               
                    </Select>
                </div>
            </yd-cell-item>
        </yd-cell-group>
          <div >
            <div v-for="item in allList" >
            <yd-cell-group>  
                <yd-cell-item >
                    <span slot="left" :class="item.dsrStatus == '原告' ? 'plaimSpan' : (item.dsrStatus == '被告' ? 'defentSpan' : 'lawSpan')">{{item.dsrStatus}}</span>
                    <span slot="left">{{item.dsrName}}</span>
                    <span slot="right">
                        
                    </span>
                </yd-cell-item>
                <yd-cell-item arrow  @click.native="gotoInfo(i.id,i.isSameSite)" v-for='i in item.eviList'>
                    <!-- <span slot="left" class="sdaa">证据名称：</span> -->
                    <span slot="left">{{i.name}}</span>
                    <span slot="right" :class="i.stateed">
                        
                    </span>
                </yd-cell-item>
                
                <!-- <yd-cell-item>
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
                <yd-accordion>
                    <yd-accordion-item title="质证信息">
                        <div style="padding: .24rem;">
                            <p>花间一壶酒，独酌无相亲。</p>
                            <p>举杯邀明月，对影成三人。</p>
                            <p>月既不解饮，影徒随我身。</p>
                            <p>暂伴月将影，行乐须及春。</p>
                            <p>我歌月徘徊，我舞影零乱。</p>
                            <p>醒时同交欢，醉后各分散。</p>
                            <p>永结无情游，相期邈云汉。</p>
                        </div>
                    </yd-accordion-item>
                </yd-accordion>            -->
            </yd-cell-group>
             
            <!-- <yd-button @click.native="deleEvidence(i.id)" shape="circle"  bgcolor="#EF4F4F" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%">删　除</yd-button>
            <yd-button @click.native="editEvidence(i.id)" shape="circle"  bgcolor="#40a9ff" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-right:2%;margin-left:2%;margin-bottom:10px">编　辑</yd-button>    
            <yd-button @click.native="checkSubmit(i.id)" shape="circle"  bgcolor="#04BE02" color="#FFF" style="width:20%;margin-top:0.2rem;display:inline-block;margin-left:2%">提　交</yd-button> -->
            <span style="margin-bottom:0.3rem;margin-top:0.2rem;display:block;height:5px;width:100%;border-bottom:1px dashed #ccc"></span>
          </div>
         
          </div>
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
        <span slot="doneTip" style="margin-top:0.2rem;display:inline-block" v-show='allList.length == 0'>暂无证据~</span>
        <img v-show="imageShow" @click="imgCli" class="wxTips" src="../../images/wxTips.png" alt="">
        <yd-backtop style=""></yd-backtop>
    </div>
</template>

<script type="text/babel">
import { editEvi, delEvidence, getEvi, checkEvi, getEviById,getReverts } from "@/api/evidence.js";
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
export default {
  data() {
    return {
      lowCaseId:'',
      litigantN:0,
      isself:"",
      show1:false,
      allList:[],
      imageShow:false,
      fileList:[],
      evidenceListSub:[],
      urlHistiory:'',
      nameList:[],
      stateAllList:[],
      paths:'',
    };
  },
  created() {
        var sUrl = window.location.href;
        if(sUrl.indexOf("upload") == -1){
            if(localStorage.getItem("lawCaseId") && !this.$route.params.lawCaseId){
                this.lowCaseId = localStorage.getItem("lawCaseId");
                this.getEvit()
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
//             console.log(to.name)
//             if (this.$route.params && to.name != 'evidenceList' && to.name != 'addEvidence') {
//                     if(this.$route.params.lawCaseId){
//                         this.lowCaseId = this.$route.params.lawCaseId;
//                         localStorage.setItem("lawCaseId",this.lowCaseId);
//                         this.getEvit()
//                     }
                    
//             }
// 		},
//     },
  mounted(){
      if (this.$route.params) {
            if(this.$route.params.lawCaseId){
                this.lowCaseId = this.$route.params.lawCaseId;
                localStorage.setItem("lawCaseId",this.lowCaseId);
                this.getEvit()
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
      gotoInfo(id,num){
          console.log(id,num)
          this.$router.push({
            name: 'evidenceInfo',
            params: { evidenceId: id,isButton:num }
        });
      },
      showType(e){
          this.allList = [];
            if(e.target.value == 0){
                this.allList = this.stateAllList;
            }else{
                for(var i=0;i<this.stateAllList.length;i++){
                    if(this.stateAllList[i].dsrName == e.target.value){
                        this.allList.push(this.stateAllList[i])
                    }
                }
            }
      },
      imgCli(){
          this.imageShow = false;
          var str = window.location.host+window.location.pathname;
          var mewstr = str.replace(this.paths,'');
          console.log(str)
          console.log(mewstr)
          
            window.history.pushState({},0,'http://'+mewstr);
      },
      gotoAddEvidence(){
          this.$router.push({
            name: 'evidenceList-mycase',
            params: { lawCaseId: this.lowCaseId , path:'mycase' }
        });
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
          var ua = navigator.userAgent.toLowerCase(); 
          this.paths = path; 
            if(ua.match(/MicroMessenger/i)=="micromessenger") {  
                this.imageShow = true; 
                  var absurl = window.location.href; 
                  this.urlHistiory = absurl;
                  window.history.pushState({},0,'http://'+window.location.host+window.location.pathname+'?down='+path); 
                  console.log(absurl)
            } else {  
                var fileStr = path;
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
                console.log(filename);
                eleLink.download = filename;
                eleLink.style.display = "none";
                // 字符内容转变成blob地址
                eleLink.href = fileStr+'?mp.wexin.qq.com';
                // 触发点击
                document.body.appendChild(eleLink);
                eleLink.click();
                // 然后移除
                document.body.removeChild(eleLink);  
            }
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
        this.$dialog.loading.open('');
          getReverts(this.lowCaseId).then(res => {
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
                this.nameList = arr;
                for(var i=0;i<newArr.length;i++){
                    var arySmall = [];
                    res.data.result.map((item, index) => {
                        if(item.dsrName==newArr[i].dsrName){
                            let data = {};
                            var ty1 = 0;
                            var ty2 = 0;
                            var ty3 = 0;
                            var ty4 = 0;
                            var ty5 = 0;
                            for(var t=0;t<item.reverts.length;t++){
                                if(item.reverts[t].result == '110' || item.reverts[t].result == '011' || item.reverts[t].result == '101'){
                                    ty2 = 1;
                                }else if(item.reverts[t].result == '100' || item.reverts[t].result == '001' || item.reverts[t].result == '010'){
                                    ty3 = 1;
                                }else if(item.reverts[t].result == '000'){
                                    ty4 = 1;
                                }else if(item.reverts[t].result == '111'){
                                    ty5 = 1;
                                }
                            }
                            if(ty5 == 1){
                                data.stateed = 'stateShow4';
                            }
                            //越来越多反对
                            if(ty2 == 1){
                                data.stateed = 'stateShow1';
                            }
                            if(ty3 == 1){
                                data.stateed = 'stateShow2';
                            }
                            if(ty4 == 1){
                                data.stateed = 'stateShow3';
                            }
                            if(item.reverts.length == 0){
                                data.stateed = 'stateShow';      
                            }
                            data.id = item.evidenceId;
                            data.isSameSite = item.isSameSite ? 0 : 1; //1为能发表意见
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
                this.stateAllList = newArr;
            }else{
                this.$dialog.toast({
                    mes: res.data.message,
                    timeout: 1500
                });
            }
            this.$dialog.loading.close();
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
<style scoped>
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
.plaimSpan{
    display: inline-block;
    padding: 5px;
    color: #fff;
    background: #40a9ff;
    margin-right: 5px;
}
.defentSpan{
    display: inline-block;
    padding: 5px;
    color: #40a9ff;
    border: 1px solid #40a9ff;
    margin-right: 5px;
}
.lawSpan{
    display: inline-block;
    padding: 5px;
    margin-right: 5px;
    color: #40a9ff;
}
.yd-cell-right{
    width:28%;
}
.stateShow{
    background-image:url('../../images/state.png');
    background-size: 100% 100%; 
    display:inline-block;
    /* cursor: pointer; */
    height:20px ;
    width:60px;
}
.stateShow1{
    background-image:url('../../images/state1.png');
    background-size: 100% 100%; 
    display:inline-block;
    /* cursor: pointer; */
    height:20px ;
    width:60px;
}
.stateShow2{
    background-image:url('../../images/state2.png');
    background-size: 100% 100%; 
    display:inline-block;
    /* cursor: pointer; */
    height:20px ;
    width:60px;
}
.stateShow3{
    background-image:url('../../images/state3.png');
    background-size: 100% 100%; 
    display:inline-block;
    /* cursor: pointer; */
    height:20px ;
    width:60px;
}
.stateShow4{
    background-image:url('../../images/state4.png');
    background-size: 100% 100%; 
    display:inline-block;
    /* cursor: pointer; */
    height:20px ;
    width:60px;
}
.yd-cell-left{
    width: 70%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.yd-cell-left .sdaa{
    /* white-space: pre-wrap; 
    word-wrap: break-word; */
} 
</style>
