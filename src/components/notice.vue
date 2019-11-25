<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="公告刊登通知" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="case-wrapper">
      <div class="title">案件基本信息</div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">案件编号：</span>
          <span slot="right">{{ caseInfo.caseNo }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">案件原由：</span>
          <span slot="right">{{ caseInfo.briefName }}</span>
        </yd-cell-item>
        <yd-accordion>
          <yd-accordion-item :title="plaintiff[0].name">
              <div slot="icon" style="color: #333;font-size: .3rem;padding-left: .1rem;">原告：</div>
              <div style="padding: .24rem;">
                  <p v-for="item in plaintiff" style="text-align: left;padding:3px 0px;">
                    <span class="left">原告：</span>
                    <span class="right">{{ item.name }} {{ item.value }}</span>
                  </p>
              </div>
          </yd-accordion-item>
        </yd-accordion>
        <yd-accordion>
          <yd-accordion-item :title="defendant[0].name">
              <div slot="icon" style="color: #333;font-size: .3rem;padding-left: .1rem;">被告：</div>
              <div style="padding: .24rem;">
                  <p v-for="item in defendant" style="text-align: left;padding:3px 0px;">
                    <span class="left">被告：</span>
                    <span class="right">{{ item.name }} {{ item.value }}</span>
                  </p>
              </div>
          </yd-accordion-item>
        </yd-accordion>
      </yd-cell-group>
      <a @click="downloadF" class="down-btn"> 下载公告模板 </a>
      <div style="color:#ed3f14;padding-top: 5px;">*请于{{ noticelimitTime }}前，前根据公告模版在厦门日报刊登公告！</div>
    </div>
    <div class="form-wrapper">
      <yd-cell-group>
        <yd-cell-item>
            <span slot="left">报纸刊号：</span>
            <yd-input slot="right" v-model="newspaper" placeholder="请输入报纸刊号"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
            <span slot="left">发行日期：</span>
            <yd-datetime type="date" v-model="datetime" slot="right"></yd-datetime>
        </yd-cell-item>
      </yd-cell-group>
      <div style="background: #fff;marginBottom:10px;margin-top:10px">
          <div style="textAlign:left;paddingLeft:0.24rem;" ><span style="lineHeight:30px;fontSize:.3rem;">上传公告：</span></div> 
          <yd-lightbox :num="list.length" class="pic-list-wrapper">
              <div class="pic-wrapper" v-for="item, key in list">
              <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
              <span class="delete-wrapper" @click="deletePic(key,item.attachId)"><img src="../assets/delete.png" width="23px"></span>
              </div>
              <div class="add-pic" v-show="isCanAdd" @click="addPic">
              <img width="100px" height="100px" src="/images/add.png">
              </div>
              <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png"  style="display: none">
          </yd-lightbox>
      </div>
      <yd-button @click.native="submit" size="large" shape="circle" bgcolor="#40a9ff" color="#FFF" style="width: 80%;margin: 30px auto 0px;">提交</yd-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
import {
  getByCaseId,
  chgCheck,
  download,
  SendInfo,
  upload,
  delAttachMent
} from "@/api/notice";
export default {
  data() {
    return {
      lawCaseId: "",
      sendId: "",
      noticelimitTime: "",
      downAddress: "",
      caseInfo: {
        caseNo: "",
        briefName: "",
        mtlContent: ""
      },
      list: [],
      isCanAdd: true,
      DZShow: true,
      EMSShow: false,
      SCShow: false,
      plaintiff: [],
      defendant: [],
      newspaper: "",
      datetime: formatDate(new Date(), "yyyy-MM-dd")
    };
  },
  created() {
    const lawCaseId = Util.GetUrlParam("lawCaseId");
    this.lawCaseId = lawCaseId;
    const sendId = Util.GetUrlParam("sendId");
    this.sendId = sendId;
    getByCaseId(lawCaseId).then(res => {
      if (res.data.state == 100) {
        this.caseInfo.caseNo = res.data.result.caseNo;
        this.caseInfo.briefName = res.data.result.brief;
        this.caseInfo.mtlContent = res.data.result.mtlContent;
        this.plaintiff = res.data.result.plaintiff;
        this.defendant = res.data.result.defendants;
      }
    });
    this.downAddress = `/api/mobile/send/downloadNoticeContent.jhtml?lawCaseId=${lawCaseId}&sendId=${sendId}`;
    SendInfo(lawCaseId, sendId).then(res => {
      if (res.data.state == 100) {
        this.noticelimitTime = res.data.result.noticelimitTime;
      }
    });
  },
  methods: {
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
    deletePic(key, attachId) {
      this.list.splice(key, 1);
      if (this.list.length < 6) {
        this.isCanAdd = true;
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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      upload(file, this.sendId, this.lawCaseId).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: res.data.message,
            icon: "success",
            timeout: 1500
          });
          let fileAdress = res.data.result.noticeAttachment.address;
          var strUrl = "http://court1.ptnetwork001.com";
          this.list.push({
            src: strUrl + fileAdress,
            attachId: res.data.result.noticeAttachment.id
          });
          if (this.list.length > 5) {
            this.isCanAdd = false;
          }
        } else {
          this.$dialog.toast({
            mes: res.data.message,
            icon: "error",
            timeout: 1500
          });
        }
      });
    },
    downloadF() {
      download(this.lawCaseId, this.sendId).then(res => {
        if (res.data.state == 100) {
          var fileStr = "/" + res.data.filePath;
          // location.href=res.data.filePath;
          // 创建隐藏的可下载链接
          var eleLink = document.createElement("a");
          var strs = res.data.filePath.split("/");
          for (var i = 0; i < strs.length; i++) {
            if (i == strs.length - 1) {
              var filename = strs[i];
            }
          }
          console.log(filename);
          eleLink.download = filename;
          eleLink.style.display = "none";
          // 字符内容转变成blob地址
          eleLink.href = fileStr;
          // 触发点击
          document.body.appendChild(eleLink);
          eleLink.click();
          // 然后移除
          document.body.removeChild(eleLink);
        }
      });
    },
    submit() {
      chgCheck(this.lawCaseId, this.datetime, this.newspaper).then(res => {
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
.form-wrapper {
  margin-top: 10px;
}
.down-btn {
  margin: 10px auto;
  border-radius: 0.9rem;
  line-height: 0.9rem;
  width: 80%;
  display: block;
  font-size: 0.4rem;
  height: 0.9rem;
  background-color: rgb(64, 169, 255);
  color: rgb(255, 255, 255);
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
</style>
