<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="送达确认" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <yd-cell-group>
      <yd-cell-item>
          <span slot="left">案件编号：</span>
          <span slot="right">{{ caseNo }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">收件人：</span>
          <span slot="right">{{ litigantName }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">邮寄地址：</span>
          <span slot="right">{{ address }}</span>
      </yd-cell-item>
     </yd-cell-group>
    <yd-lightbox :num="list.length" class="pic-list-wrapper">
        <div class="pic-wrapper" v-for="item, key in list">
          <yd-lightbox-img width="100px" height="100px" :key="key" :src="item.src"></yd-lightbox-img>
          <span class="delete-wrapper" @click="deletePic(key)"><img src="../assets/delete.png" width="23px"></span>
        </div>
        <div class="add-pic" v-show="isCanAdd" @click="addPic">
          <img width="100px" height="100px" src="/images/add.png">
        </div>
        <input id="imgUpload" @change="onFileChange" type="file" accept="image/jpeg,image/jpg,image/png" style="display: none">
    </yd-lightbox>
    <yd-button @click.native="checkSubmit()" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF" style="width:90%;margin: 30px auto;">确认提交</yd-button>
  </div>
</template>
<script type="text/babel">
import Util from "@/libs/util.js";
import { upload, commissionerDelivery, saveSendImage } from "@/api/checkSend";
export default {
  data() {
    return {
      lawCaseId: "",
      litigantId: "",
      list: [],
      isCanAdd: true,
      caseNo: "",
      litigantName: "",
      address: "",
      sendId: ""
    };
  },
  created() {
    const lawCaseId = Util.GetUrlParam("lawCaseId");
    this.lawCaseId = lawCaseId;
    const litigantId = Util.GetUrlParam("litigantId");
    this.litigantId = litigantId;
    const sendId = Util.GetUrlParam("sendId");
    this.sendId = sendId;
    commissionerDelivery(lawCaseId, litigantId).then(res => {
      console.log(res);
      if (res.data.state == 100) {
        this.caseNo = res.data.result.caseNo;
        this.litigantName = res.data.result.litigantName;
        this.address = res.data.result.sendAddress;
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
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      let file = files[0];
      upload(file)
        .then(res => {
          if (res.data.state == 100) {
            this.$dialog.toast({
              mes: res.data.message,
              icon: "success",
              timeout: 1500
            });
            this.list.push({
              src: res.data.result
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
        })
        .catch(err => {
          this.$dialog.toast({
            mes: "服务器无响应",
            icon: "error",
            timeout: 1500
          });
        });
    },
    deletePic(key) {
      this.list.splice(key, 1);
      if (this.list.length < 6) {
        this.isCanAdd = true;
      }
    },
    checkSubmit() {
      let sendImageArray = [];
      this.list.map(item => {
        console.log(item.src);
        let pathArr = item.src.split("/");
        sendImageArray.push(
          "/cloud/court1/web/upload/temporaryImg/" + pathArr[5]
        );
      });
      saveSendImage(
        this.lawCaseId,
        this.litigantId,
        sendImageArray,
        this.sendId
      )
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
        .catch(err => {
          this.$dialog.toast({
            mes: "服务器无响应",
            icon: "error",
            timeout: 1500
          });
        });
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
</style>
