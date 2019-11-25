<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="诉讼详情" bgcolor="#40a9ff" color="#fff">
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
        <span slot="left">案件原由：</span>
        <span slot="right">{{ caseInfo.briefName }}</span>
      </yd-cell-item>
      <yd-accordion>
        <yd-accordion-item :title="plaintiffs[0]">
            <div slot="icon" style="color: #333;font-size: .3rem;padding-left: .1rem;">原告：</div>
            <div style="padding: .24rem;">
                <p v-for="item in plaintiffs" style="text-align: left;padding:3px 0px;">
                  <span class="left">原告：</span>
                  <span class="right">{{ item }}</span>
                </p>
            </div>
        </yd-accordion-item>
      </yd-accordion>
      <yd-accordion>
        <yd-accordion-item :title="defendant[0]">
            <div slot="icon" style="color: #333;font-size: .3rem;padding-left: .1rem;">被告：</div>
            <div style="padding: .24rem;">
                <p v-for="item in defendant" style="text-align: left;padding:3px 0px;">
                  <span class="left">被告：</span>
                  <span class="right">{{ item }}</span>
                </p>
            </div>
        </yd-accordion-item>
      </yd-accordion>
      <yd-cell-item>
        <span slot="left">答辩期（日）：</span>
        <span slot="right">{{ caseInfo.defensePeriod }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">答辩状份数：</span>
        <span slot="right">{{ caseInfo.replies }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">通知日期：</span>
        <span slot="right">{{ caseInfo.noticeDate | formatDate }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">举证期限（日）：</span>
        <span slot="right">{{ caseInfo.proofPeriod }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">开庭时间：</span>
        <span slot="right">{{ caseInfo.scheduldingStartDate | formatDateTime }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">开庭地点：</span>
        <span slot="right">{{ caseInfo.tribunalAddress }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">立案日期：</span>
        <span slot="right">{{ caseInfo.filingDate | formatDate }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">审判员：</span>
        <span slot="right">{{ caseInfo.judgeName }}</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left">书记员：</span>
        <span slot="right">{{ caseInfo.clerkName }}</span>
      </yd-cell-item>
    </yd-cell-group>
    <div class="btns-wrapper">
      <yd-button @click.native="checked" size="large" shape="circle" bgcolor="#40a9ff" color="#FFF">确认阅读</yd-button>
      <yd-button @click.native="downfile" style="border: 2px solid #40a9ff" size="large" shape="circle" bgcolor="#FFF" color="#40a9ff">资料下载</yd-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
import { getSendDict, checkedSendDict, download } from "@/api/service";
export default {
  data() {
    return {
      lawCaseId: "",
      sendId: "",
      caseInfo: {
        caseNo: "",
        briefName: "",
        defensePeriod: "",
        replies: "",
        noticeDate: "",
        proofPeriod: "",
        scheduldingStartDate: "",
        tribunalName: "",
        filingDate: "",
        judgeName: "",
        clerkName: ""
      },
      plaintiffs: [],
      defendant: []
    };
  },
  created() {
    const lawCaseId = Util.GetUrlParam("lawCaseId");
    this.lawCaseId = lawCaseId;
    const sendId = Util.GetUrlParam("sendId");
    this.sendId = sendId;
    getSendDict(lawCaseId).then(res => {
      if (res.data.state == 100) {
        this.caseInfo.caseNo = res.data.result.caseNo;
        this.caseInfo.briefName = res.data.result.briefName;
        this.caseInfo.defensePeriod = res.data.result.defensePeriod;
        this.caseInfo.replies = res.data.result.replies;
        this.caseInfo.noticeDate = res.data.result.noticeDate;
        this.caseInfo.proofPeriod = res.data.result.proofPeriod;
        this.caseInfo.scheduldingStartDate =
          res.data.result.scheduldingStartDate;
        this.caseInfo.tribunalAddress = res.data.result.tribunalName;
        this.caseInfo.filingDate = res.data.result.filingDate;
        this.caseInfo.judgeName = res.data.result.judgeName;
        this.caseInfo.clerkName = res.data.result.clerkName;
        this.defendant = res.data.result.defendant;
        this.plaintiffs = res.data.result.plaintiffs;
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
    checked() {
      checkedSendDict(this.lawCaseId, this.sendId).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: "确认成功",
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
    },
    downfile() {
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
.btns-wrapper {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.yd-cell-item:not(:last-child):after {
  margin-left: 0.24rem;
  margin-right: 0.24rem;
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 94%;
  border-bottom: 1px solid #b2b2b2;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-accordion-head:after {
  content: "";
  margin-left: 0.24rem;
  margin-right: 0.24rem;
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
.yd-accordion-content:after {
  content: "";
  margin-left: 0.24rem;
  margin-right: 0.24rem;
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
</style>
