<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="公告上传" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="case-wrapper">
      <div class="title">案件基本信息</div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">刊登时间：</span>
          <span slot="right">{{ caseInfo.caseNo }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">报纸名称：</span>
          <span slot="right">{{ caseInfo.briefName }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">报纸刊号：</span>
          <span slot="right">{{ caseInfo.applyStandard }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">公告链接：</span>
          <span slot="right">{{ caseInfo.applyStandard }}</span>
        </yd-cell-item>
      </yd-cell-group>
      <div style="background: #fff;marginBottom:10px" >
            <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">公告上传：</span></div> 
            <yd-lightbox :num="list7.length" class="pic-list-wrapper">
                <div class="pic-wrapper" v-for="item, key in list">
                <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
                <span class="delete-wrapper" @click="deletePic(key,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
                </div>
                <div class="add-pic" v-show="isCanAdd" @click="addPic(7)">
                <img width="100px" height="100px" src="/images/add.png">
                </div>
                <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
            </yd-lightbox>
        </div>
    </div>
  </div>
</template>

<script type="text/babel">
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
import { sendInfo, saveSendInfo } from "@/api/sendType";
export default {
  data() {
    return {
      lawCaseId: "",
      caseInfo: {
        caseNo: "",
        briefName: "",
        applyStandard: "",
        filingDate: ""
      },
      list: [],
      isCanAdd: true
    };
  },
  created() {
    const lawCaseId = Util.GetUrlParam("lawCaseId");
    this.lawCaseId = lawCaseId;
    sendInfo(lawCaseId).then(res => {
      if (res.data.state == 100) {
        this.caseInfo.caseNo = res.data.result.caseNo;
        this.caseInfo.briefName = res.data.result.briefName;
        this.caseInfo.applyStandard = res.data.result.applyStandard;
        this.caseInfo.filingDate = res.data.result.filingDate;
        this.plaintiffs = res.data.result.plaintiffName;
        this.defendant = res.data.result.defendantName;
        this.litigantName = res.data.result.litigantName;
        this.litigantPhone = res.data.result.litigantPhone;
      }
    });
  },
  methods: {
    deletePic(key, type, attachId) {
      //     delAttachMent(attachId).then(res => {
      //     if (res.data.state == 100) {
      //       this.$dialog.toast({
      //         mes: res.data.message,
      //         icon: 'success',
      //         timeout: 1500
      //       })
      //     } else {
      //       this.$dialog.toast({
      //         mes: res.data.message,
      //         icon: 'error',
      //         timeout: 1500
      //       })
      //     }
      //   }).catch(err => {
      //     this.$dialog.toast({
      //       mes: '服务器无响应',
      //       icon: 'error',
      //       timeout: 1500
      //     })
      //   })
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
    submitSend() {
      const params = {
        lawCaseId: this.lawCaseId,
        sendType: this.sendType,
        email: this.email,
        sendAddress: this.address + this.address1
      };
      saveSendInfo(params)
        .then(res => {
          if (res.data.state == 100) {
            this.$dialog.toast({
              mes: "提交成功",
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
        .catch(error => {
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
.case-wrapper,
.send-wrapper {
  padding-top: 10px;
  background-color: #f1f2f6;
}
.case-wrapper .title,
.send-wrapper .title {
  padding: 10px;
  color: #a4a6a5;
  text-align: left;
}
.yd-cell-box {
  margin-bottom: 0;
}
.yd-accordion-title {
  color: #525252;
  font-size: 0.26rem;
  position: absolute;
  right: 0.6rem;
}
.left {
  color: #333;
  font-size: 0.3rem;
  padding-left: 0.1rem;
}
.right {
  color: #525252;
  text-align: right;
  font-size: 0.26rem;
  float: right;
  padding-right: 0.3rem;
}
.yd-radio {
  display: inline-block;
  padding: 0rem 0.25rem;
}
.yd-radio-icon {
  border: 1px solid #ccc;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  z-index: 1;
  vertical-align: bottom;
  pointer-events: none;
}
.tips {
  color: #ef4f4f;
  font-size: 12px;
  text-align: left;
  padding: 10px 15px;
  line-height: 18px;
}
</style>
