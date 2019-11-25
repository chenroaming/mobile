<template>
    <div>
        <yd-navbar title="证据编辑" bgcolor="#40a9ff" color="#fff">
            <router-link to="/mobile/evidenceList" slot="left">
                <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
            </router-link>
        </yd-navbar>
    <yd-cell-group style="margin-bottom: 0.35rem">
        <yd-cell-item>
            <span slot="left">证据名称：</span>
            <yd-input slot="right" type="text"  v-model="evidenceName"  placeholder="请输入证据名称"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">证明对象：</span>
            <yd-input slot="right" type="text"  v-model="evidenceObject"  placeholder="请输入证据对象"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">证明来源：</span>
            <yd-input slot="right" type="text"  v-model="evidenceWhere"  placeholder="请输入证据来源"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
    <div style="background: #fff;marginBottom:10px">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">附件：</span></div> 
        <a href="javascript:;" class="a-upload">
            <input type="file"  name="" @change="getFile($event)" id="inputFile">点击这里上传文件
        </a>
        <div style="padding: 4px 10px;display:block;position: relative;top:-10px">
            <p v-for="item in fileNlist" style="margin-top:10px">{{item.name}}<span @click="delFile(item.name,item.id)"><yd-icon name="error" style="margin-left:10px"></yd-icon></span></p>
        </div>
    </div>
    <!-- <yd-button @click.native="checkSubmit()" shape="circle" size="large" bgcolor="#ccc" color="#FFF" style="width:40%;display:inline-block;margin-right:2%">取消</yd-button>     -->
    <yd-button @click.native="checkSubmit()" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF" style="width:80%;display:inline-block;padding-bottom:10px">上传</yd-button>
    </div>
</template>

<script type="text/babel">
import { editEvi, delEvidence, getEvi, checkEvi, getEviById, deleteFile } from "@/api/evidence.js";
import { getCode, login } from "@/api/login";
import Util from "@/libs/util.js";
export default {
  data() {
    return {
      input1:'',
      list:[],
       files:[],
      fileNlist:[],
      evidenceName:'',
      evidenceObject:'',
      evidenceWhere:'',
      isCanAdd:true,
      fileN:'',
      evidenceId:"",
      pageNum:'',
      lowCaseId:'',
      backPth:"",
    };
  },
  created() {
  },
  mounted(){
      if (this.$route.params) {
            console.log(this.$route.params)
            if(this.$route.params.evidenceId){
                console.log(this.$route.params.evidenceId)
                this.evidenceId = this.$route.params.evidenceId;
                this.lowCaseId = this.$route.params.lawCaseId;
                this.getEvid();
            }   
            if(this.$route.params.path){
                this.backPth = 'mycase';
            }  
       }
  },
//    watch: {
//     '$route' (to, from) {
//         if (this.$route.params) {
//             if(this.$route.params.evidenceId){
//                 console.log(this.$route.params.evidenceId)
//                 this.evidenceId = this.$route.params.evidenceId;
//                 this.lowCaseId = this.$route.params.lawCaseId;
//                 this.getEvid();
//             } 
//             if(this.$route.params.path){
//                 this.backPth = 'mycase';
//             }    
//        }
//     },
// },
  methods: {
    deletePic(){

    },
    delFile(name,id){
        console.log(111);
        if(id != ''){
            deleteFile(this.lowCaseId,this.evidenceId,id).then(res => {
                if(res.data.state == 100){
                    this.$dialog.toast({
                        mes: res.data.message,
                        timeout: 1500,
                        icon: 'success'
                    });
                    for(var i=0;i<this.fileNlist.length;i++){
                        if(id==this.fileNlist[i].id){
                            this.fileNlist.splice(i,1)
                        }
                    }
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
        }else{
            for(var i =0;i<this.files.length;i++){
                if(name==this.files[i].name){
                    this.files.splice(i,1)
                }
            }
            for(var i=0;i<this.fileNlist.length;i++){
                if(name==this.fileNlist[i].name){
                    this.fileNlist.splice(i,1)
                }
            }
        }
        
    },
    getFile(event){
        console.log(event)
        this.file = event.target.files[0];
        for(var i=0;i<this.fileNlist.length;i++){
            if(this.file.name==this.fileNlist[i]){
                return false;
            }
        }
        this.files.push(this.file)
        this.fileN = this.file.name;
        var datas = {
            name:this.file.name,
            id:''
        }
        this.fileNlist.push(datas);
        document.getElementById("inputFile").value = "";
    },
    onFileChange(e){
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      console.log(files)
    },
    getEvid(){
         this.$dialog.loading.open('数据加载中');
        getEviById(this.lowCaseId, this.evidenceId).then(res => {
            if(res.data.state == 100){
                
                this.evidenceObject = res.data.result.prove;
                this.evidenceName = res.data.result.name;
                this.evidenceWhere = res.data.result.source;
                // this.pageNum = res.data.result.pageno;
                this.fileN = res.data.result.fileName;
                 if(res.data.result.file != [] && res.data.result.file != null){
                     res.data.result.file.map(item => {
                        const data ={
                            name:item.fileName,
                            id:item.fileId
                        }
                        this.fileNlist.push(data)
                    })
                 }
                
            }
            this.$dialog.loading.close();
            
        })
    },
    checkSubmit(){
        if(this.evidenceName == ""){
            this.$dialog.toast({
                mes: '证据名称不能为空',
                timeout: 1500,
                icon: 'error',
                callback: () => {
                    
                }
            });
            return false;
        }
        if(this.evidenceObject == ""){
            this.$dialog.toast({
                mes: '证明对象不能为空',
                timeout: 1500,
                icon: 'error',
                callback: () => {
                    
                }
            });
            return false;
        }
        if(this.evidenceWhere == ""){
            this.$dialog.toast({
                mes: '证明来源不能为空',
                timeout: 1500,
                icon: 'error',
                callback: () => {
                    
                }
                
            });
            return false;
        }
        if(this.file == "" && this.evidenceId == ""){
            this.$dialog.toast({
                mes: '请上传证据文件',
                timeout: 1500,
                icon: 'error',
                callback: () => {
                    
                }
            });
            return false;
        }
        var liniId = "";
        let self = this;
        editEvi(
          this.files,
          this.lowCaseId,
          this.evidenceObject,
          this.evidenceName,
          this.evidenceWhere,
          this.pageNum,
          this.evidenceId,
          liniId
        ).then(res => {
            if(res.data.state == 100){
              this.$dialog.toast({
                    mes: "修改成功",
                    timeout: 1500,
                    icon: 'success'
                });
                window.setTimeout(function(){
                    self.$router.push({name:'evidenceList',
                    params: { lawCaseId: self.lowCaseId , path:self.backPth 
                    }})
                },1500)
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
    },
    addPic() {
      let inputNode = document.getElementById("imgUpload");
      let evt = new MouseEvent("click", {
        bubbles: false,
        cancelable: true,
        view: window
      });
      inputNode.dispatchEvent(evt);
      return false;
    },
  }
};
</script>
<style>
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
.pic-list-wrapper {
  text-align: justify;
  font-size: 0px;
  padding: 10px 0.4rem;
  background: #fff;
}
.pic-wrapper {
  display: inline-block;
  margin-bottom: 10px;
  margin-right: calc((100% - 300px) / 2);
  position: relative;
}
.pic-wrapper:nth-child(3n) {
  margin-right: 0px;
}
.delete-wrapper {
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: block;
  width: 100%;
  text-align: center;
  background: rgba(0, 0, 0, 0.4);
}
.add-pic {
  width: 100px;
  height: 100px;
  display: inline-block;
}
.shadeDi {
  position: fixed;
  height: 100%;
  width: 100%;
  background: #fff;
  z-index: 99;
}
.a-upload {
    padding: 4px 10px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1
}
.a-upload  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
}

.a-upload:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
</style>
