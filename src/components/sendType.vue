<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="送达方式" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="case-wrapper">
      <div class="title">案件基本信息</div>
      <yd-cell-group>
        <yd-cell-item>
          <span slot="left">案号：</span>
          <span slot="right">{{ caseInfo.caseNo }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">案由：</span>
          <span slot="right">{{ caseInfo.briefName }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">案件标的额：</span>
          <span slot="right">{{ caseInfo.applyStandard }}</span>
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
          <span slot="left">立案日期：</span>
          <span slot="right">{{ caseInfo.filingDate | formatDate }}</span>
        </yd-cell-item>
      </yd-cell-group>
    </div>
    <div class="send-wrapper">
      <div class="title">送达方式</div>
      <yd-radio-group v-model="sendType" style="background-color:#fff;padding: 10px;border-bottom: 1px solid #eee" color="#40a9ff">
        <yd-radio val="3" @click.native="clickDZ">电子送达</yd-radio>
        <yd-radio val="1" @click.native="clickEMS">EMS送达</yd-radio>
        <yd-radio val="0" @click.native="clickSC">现场领取</yd-radio>
      </yd-radio-group>
      <yd-cell-group v-show="DZShow">
        <yd-cell-item>
            <span slot="left">邮箱：</span>
            <yd-input slot="right" v-model="email" :debug="true" regex="email" placeholder="请输入邮箱地址"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-show="EMSShow">
        <yd-cell-item>
            <span slot="left">收件人：</span>
            <span slot="right">{{ litigantName }}</span>
            <!-- <yd-input slot="right" v-model="name" placeholder="请输入姓名"></yd-input> -->
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">手机号：</span>
            <span slot="right">{{ litigantPhone }}</span>
            <!-- <yd-input slot="right" v-model="phone" regex="mobile" placeholder="请输入手机号码"></yd-input> -->
        </yd-cell-item>
        <yd-cell-group>
           <yd-cell-item arrow>
               <span slot="left">所在地区：</span>
               <input slot="right" type="text" @click.stop="show = true" v-model="address" readonly placeholder="请选择收货地址">
           </yd-cell-item>
       </yd-cell-group>
       <yd-cityselect
               v-model="show"
               ref="cityselectDemo"
               :callback="result"
               :items="district"
               provance="福建"
               city="厦门市"
               area="湖里区"
       ></yd-cityselect>
        <yd-cell-item>
            <span slot="left">详细地址：</span>
            <yd-textarea slot="right" v-model="address1" placeholder="请输入详细地址" maxlength="50"></yd-textarea>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">备注：</span>
            <yd-input slot="right" v-model="remark" :debug="true" placeholder="请输入备注"></yd-input>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group v-show="SCShow">
        <yd-cell-item>
            <span slot="left">领取地址：</span>
            <span slot="right" style="width: 80%">华荣路54号殿前法庭诉讼服务中心</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">领取时间：</span>
            <span slot="right">三个工作日内，8:30~12:00, 15：00~17：30</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">联系人：</span>
            <span slot="right">沈春福，电话：0592-2621015</span>
        </yd-cell-item>
        <div class="tips">
          *提示：本人领取的需要携带本人身份证原件，委托他人领取的，需提供委托人身份证复印件、委托人签名的授权委托书及代理人身份证原件；法人或其他组织委托的，需提供营业执照复印件（加盖公章）、法定代表人身份证明、授权委托书或介绍信（加盖公章）及受托人的身份证原件。
        </div>
      </yd-cell-group>
      <yd-button @click.native="submitSend" size="large" shape="circle" bgcolor="#40a9ff" color="#FFF" style="width: 80%;margin: 30px auto 0px;">提交</yd-button>
    </div>
  </div>
</template>

<script type="text/babel">
import Util from '@/libs/util.js'
import { formatDate } from '@/libs/date.js'
import { sendInfo, saveSendInfo } from '@/api/sendType'
import District from 'ydui-district/dist/jd_province_city_area_id'
export default {
  data() {
    return {
      lawCaseId: '',
      caseInfo: {
        caseNo: '',
        briefName: '',
        applyStandard: '',
        filingDate: ''
      },
      show: false,
      district: District,
      DZShow: true,
      EMSShow: false,
      SCShow: false,
      plaintiffs: [],
      defendant: [],
      sendType: '3',
      email: '',
      name: '',
      phone: '',
      address: '福建 厦门市 湖里区',
      address1: '',
      remark: ''
    }
  },
  created() {
    const lawCaseId = Util.GetUrlParam('lawCaseId')
    this.lawCaseId = lawCaseId
    sendInfo(lawCaseId).then(res => {
      if (res.data.state == 100) {
        this.caseInfo.caseNo = res.data.result.caseNo
        this.caseInfo.briefName = res.data.result.briefName
        this.caseInfo.applyStandard = res.data.result.applyStandard
        this.caseInfo.filingDate = res.data.result.filingDate
        this.plaintiffs = res.data.result.plaintiffName
        this.defendant = res.data.result.defendantName
        this.litigantName = res.data.result.litigantName
        this.litigantPhone = res.data.result.litigantPhone
      }
    })
  },
  methods: {
    result(ret) {
      this.address = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3
    },
    clickDZ() {
      this.DZShow = true
      this.EMSShow = false
      this.SCShow = false
    },
    clickEMS() {
      this.DZShow = false
      this.EMSShow = true
      this.SCShow = false
    },
    clickSC() {
      this.DZShow = false
      this.EMSShow = false
      this.SCShow = true
    },
    submitSend() {
      const params = {
        lawCaseId: this.lawCaseId,
        sendType: this.sendType,
        email: this.email,
        sendAddress: this.address + this.address1
      }
      saveSendInfo(params).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: '提交成功',
            icon: 'success',
            timeout: 1500
          })
        } else {
          this.$dialog.toast({
            mes: res.data.message,
            icon: 'error',
            timeout: 1500
          })
        }
      }).catch(error => {
        this.$dialog.toast({
          mes: '服务器无响应',
          icon: 'error',
          timeout: 1500
        })
      })
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatDateTime(time) {
      var date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
    }
  }
}
</script>

<style>
.case-wrapper,.send-wrapper {
  padding-top: 10px;
  background-color: #f1f2f6;
}
.case-wrapper .title,.send-wrapper .title {
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
    padding: 0rem .25rem;
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
