<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <div class="shadeDi" v-show="shadeA">
        <div class="content-shade" >
            <div class="tip-success"></div>
            <p style="font-size:16px;">　提交成功！</p>
        </div>
    </div>
    <yd-navbar title="证据上传" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    
    <yd-cell-group>  
      <yd-cell-item>
          <span slot="left">案件编号：</span>
          <span slot="right">{{ caseInfo.caseNo }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">案由：</span>
          <span slot="right">{{ caseInfo.brief }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">开庭时间：</span>
          <span slot="right">{{ caseInfo.openCourtTime | formatDateTime }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">开庭地点：</span>
          <span slot="right">{{ caseInfo.openCourtAddress }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">立案日期：</span>
          <span slot="right">{{ caseInfo.expireDate | formatDate }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">审判员：</span>
          <span slot="right">{{ caseInfo.judge }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">书记员：</span>
          <span slot="right">{{ caseInfo.clerk }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">案件标的：</span>
          <span slot="right">{{ caseInfo.applyStandard }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">证据提交人：</span>
          <span slot="right">{{ caseInfo.litigantName }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">诉讼地位：</span>
          <span slot="right">{{ caseInfo.litigantType }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">文件类型：</span>
          <div slot="right" style="width:100%">
            <Select @change="showType" v-model="fileType"  style="vertical-align:middle;display: inline-block;width:100%;text-align:right">
                    <Option  value=0 >请选择上传文件类型</Option>
                    <Option  value=1 >证据</Option>
                    <Option  value=2 >答辩状</Option>
                    <Option  value=3 >起诉状</Option>
                    <Option  value=4 >反诉状</Option>
                    <Option  value=5 >调查取证申请书</Option>
                    <Option  value=6 >证人出庭申请书</Option>
                    <Option  value=7 >证据目录</Option>                    
                    <Option  value=8 >其他</Option>                                          
                </Select>
          </div>
      </yd-cell-item>              
     </yd-cell-group>
     <div style="background: #fff;marginBottom:10px"  v-show="value1">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传证据材料：</span></div> 
        <yd-lightbox :num="list1.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list1">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,1,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(1)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value2">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传答辩状文件：</span></div> 
        <yd-lightbox :num="list2.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list2">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,2,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(2)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value3">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传起诉状文件：</span></div> 
        <yd-lightbox :num="list3.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list3">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,3,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(3)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value4">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传反诉状文件：</span></div> 
        <yd-lightbox :num="list4.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list4">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,4,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(4)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value5">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传调查取证申请书：</span></div> 
        <yd-lightbox :num="list5.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list5">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,5,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(5)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value6">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传证人出庭申请书：</span></div> 
        <yd-lightbox :num="list6.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list6">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,6,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(6)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value7">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传证据目录文件：</span></div> 
        <yd-lightbox :num="list7.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list7">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,7,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(7)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
    <div style="background: #fff;marginBottom:10px"  v-show="value8">
        <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传其他文件：</span></div> 
        <yd-lightbox :num="list8.length" class="pic-list-wrapper">
            <div class="pic-wrapper" v-for="item, key in list8">
            <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
            <span class="delete-wrapper" @click="deletePic(key,8,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
            </div>
            <div class="add-pic" v-show="isCanAdd" @click="addPic(8)">
            <img width="100px" height="100px" src="/images/add.png">
            </div>
            <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
        </yd-lightbox>
    </div>
     <yd-button @click.native="checkSubmit()" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF" style="width:90%;margin: 0 auto;">上传</yd-button>
  </div>
</template>
<script type="text/babel">
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
import {
  receiveDocument,
  upload,
  addEvidence,
  saveSendImage,
  delAttachMent
} from "@/api/uploadEvidence";
export default {
  data() {
    return {
      lawCaseId: "",
      litigantId: "",
      caseNo: "",
      litigantName: "",
      LitigationStatusName: "",
      litigantPhone: "",
      IdentityCard: "",
      diplomsName: "",
      firstC: 1,
      fileType: 0,
      isCanAdd: true,
      shadeA: false,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      list7: [],
      list8: [],
      value1: false,
      value2: false,
      value3: false,
      value4: false,
      value5: false,
      value6: false,
      value7: false,
      value8: false,
      evidenceInfo: {
        evidenceId: ""
      },
      caseInfo: {
        id: "",
        caseNo: "",
        brief: "",
        openCourtTime: "",
        openCourtAddress: "",
        expireDate: "",
        judge: "",
        clerk: "",
        applyStandard: "",
        litigantList: [],
        litigantData: [],
        litigantName: "",
        litigantType: "",
        litigantId: ""
      },
      tableData: "",
      addType: ""
    };
  },
  created() {
    const lawCaseId = Util.GetUrlParam("lawCaseId");
    this.lawCaseId = lawCaseId;
    const litigantId = Util.GetUrlParam("litigantId");
    this.litigantId = litigantId;
    receiveDocument(lawCaseId, litigantId).then(res => {
      if (res.data.state == 100) {
        this.caseInfo.id = this.litigantId;
        this.caseInfo.caseNo = res.data.result.evidence.lawCase.caseNo;
        this.caseInfo.brief = res.data.result.evidence.lawCase.brief.name;
        this.caseInfo.openCourtTime = res.data.result.openCourtTime;
        this.caseInfo.openCourtAddress = res.data.result.openCourtAddress;
        this.caseInfo.expireDate = res.data.result.evidence.lawCase.expireDate;
        this.caseInfo.judge = res.data.result.evidence.lawCase.judge.name;
        this.caseInfo.clerk = res.data.result.evidence.lawCase.clerk.name;
        this.caseInfo.applyStandard =
          res.data.result.evidence.lawCase.applyStandard;
        this.caseInfo.litigantName = res.data.result.litigant.litigantName;
        this.caseInfo.litigantType =
          res.data.result.litigant.litigationStatus.name;
        this.caseInfo.litigantId = res.data.result.litigant.id;
      } else {
        this.$dialog.toast({
          mes: res.data.message,
          icon: "error",
          timeout: 1500
        });
      }
    });
  },
  methods: {
    showType(e) {
      let value = e.target.value;
      if (value == 1) {
        this.value1 = true;
      } else if (value == 2) {
        this.value2 = true;
      } else if (value == 3) {
        this.value3 = true;
      } else if (value == 4) {
        this.value4 = true;
      } else if (value == 5) {
        this.value5 = true;
      } else if (value == 6) {
        this.value6 = true;
      } else if (value == 7) {
        this.value7 = true;
      } else if (value == 8) {
        this.value8 = true;
      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      console.log(files);
      let file = files[0];
      if (this.firstC == 1) {
        upload(file, this.lawCaseId, this.addType,this.litigantId).then(res => {
          if (res.data.state == 100) {
            this.firstC = 2;
            this.evidenceInfo.evidenceId = res.data.result.evidenceId;
            this.$dialog.toast({
              mes: res.data.message,
              icon: "success",
              timeout: 1500
            });
            let fileAdress = res.data.result.evidenceAttachment.address;
            var strUrl = "http://court1.ptnetwork001.com";
            if (res.data.result.evidenceAttachment.uploadType == 1) {
              this.list1.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list1.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 2) {
              this.list2.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list2.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 3) {
              this.list3.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list3.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 4) {
              this.list4.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list4.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 5) {
              this.list5.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list5.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 6) {
              this.list6.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list6.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 7) {
              this.list7.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list7.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 8) {
              this.list8.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list8.length > 5) {
                this.isCanAdd = false;
              }
            }
          } else {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "error",
              timeout: 1500
            });
          }
        });
      } else {
        upload(
          file,
          this.lawCaseId,
          this.addType,
          this.evidenceInfo.evidenceId
        ).then(res => {
          if (res.data.state == 100) {
            this.firstC = 2;
            this.evidenceInfo.evidenceId = res.data.result.evidenceId;
            this.$dialog.toast({
              mes: res.data.message,
              icon: "success",
              timeout: 1500
            });
            let fileAdress = res.data.result.evidenceAttachment.address;
            var strUrl = "http://court1.ptnetwork001.com";
            if (res.data.result.evidenceAttachment.uploadType == 1) {
              this.list1.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list1.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 2) {
              this.list2.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list2.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 3) {
              this.list3.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list3.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 4) {
              this.list4.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list4.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 5) {
              this.list5.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list5.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 6) {
              this.list6.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list6.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 7) {
              this.list7.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list7.length > 5) {
                this.isCanAdd = false;
              }
            } else if (res.data.result.evidenceAttachment.uploadType == 8) {
              this.list8.push({
                src: strUrl + fileAdress,
                attachId: res.data.result.evidenceAttachment.id
              });
              if (this.list8.length > 5) {
                this.isCanAdd = false;
              }
            }
          } else {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "error",
              timeout: 1500
            });
          }
        });
      }
    },
    addPic(type) {
      let inputNode = document.getElementById("imgUpload");
      let evt = new MouseEvent("click", {
        bubbles: false,
        cancelable: true,
        view: window
      });
      this.addType = type;
      inputNode.dispatchEvent(evt);
      return false;
    },
    deletePic(key, type, attachId) {
      console.log(attachId);
      if (type == 1) {
        this.list1.splice(key, 1);
        if (this.list1.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 2) {
        this.list2.splice(key, 1);
        if (this.list2.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 3) {
        this.list3.splice(key, 1);
        if (this.list3.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 4) {
        this.list4.splice(key, 1);
        if (this.list4.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 5) {
        this.list5.splice(key, 1);
        if (this.list5.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 6) {
        this.list6.splice(key, 1);
        if (this.list6.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 7) {
        this.list7.splice(key, 1);
        if (this.list7.length < 6) {
          this.isCanAdd = true;
        }
      } else if (type == 8) {
        this.list8.splice(key, 1);
        if (this.list8.length < 6) {
          this.isCanAdd = true;
        }
      }
      delAttachMent(attachId)
        .then(res => {
          if (res.data.state == 100) {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "success",
              timeout: 1500
            });
          } else {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "error",
              timeout: 1500
            });
          }
        })
        .catch(err => {
          this.$dialog.toast({
            mes: "服务器无响应",
            icon: "error",
            timeout: 1500
          });
        });
    },
    checkSubmit() {
      addEvidence(this.evidenceInfo.evidenceId, this.caseInfo.litigantId)
        .then(res => {
          if (res.data.state == 100) {
            this.shadeA = true;
          } else {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "error",
              timeout: 1500
            });
          }
        })
        .catch(err => {
          this.$dialog.toast({
            mes: "服务器无响应",
            icon: "error",
            timeout: 1500
          });
        });
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
.content-shade {
  width: 3rem;
  height: 4.5rem;
  position: absolute;
  top: 20%;
  left: 50%;
  margin-left: -1.5rem;
  text-align: center;
}
.tip-success {
  width: 3rem;
  height: 3rem;
  background-image: url("../assets/success.png");
}
.yd-cell-right{
    width:100%;
}
</style>
