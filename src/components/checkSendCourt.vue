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
          <span slot="left">当事人：</span>
          <span slot="right">{{ litigantName }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">诉讼地位：</span>
          <span slot="right">{{ LitigationStatusName }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">联系电话：</span>
          <span slot="right">{{ litigantPhone }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">身份证号：</span>
          <span slot="right">{{ IdentityCard }}</span>
      </yd-cell-item>
      <yd-cell-item>
          <span slot="left">文书列表：</span>
          <span slot="right" v-for="item in diplomsName">{{ item }}</span>
      </yd-cell-item>
     </yd-cell-group>
     <yd-button @click.native="checkSubmit()" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF" style="width:90%;margin: 0 auto;">确认领取</yd-button>
  </div>
</template>
<script type="text/babel">
import Util from '@/libs/util.js'
import { receiveDocument, receiveDocumentConfirm } from '@/api/checkSend'
export default {
  data() {
    return {
      lawCaseId: '',
      litigantId: '',
      caseNo: '',
      litigantName: '',
      LitigationStatusName: '',
      litigantPhone: '',
      IdentityCard: '',
      diplomsName: '',
      sendId:""
    }
  },
  created() {
    const lawCaseId = Util.GetUrlParam('lawCaseId')
    this.lawCaseId = lawCaseId
    const litigantId = Util.GetUrlParam('litigantId')
    this.litigantId = litigantId
    const sendId = Util.GetUrlParam("sendId");
    this.sendId = sendId;
    receiveDocument(lawCaseId, litigantId, this.sendId).then(res => {
      if (res.data.state == 100) {
        this.caseNo = res.data.result.caseNo
        this.litigantName = res.data.result.litigantName
        this.LitigationStatusName = res.data.result.LitigationStatusName
        this.litigantPhone = res.data.result.litigantPhone
        this.IdentityCard = res.data.result.IdentityCard
        this.diplomsName = res.data.result.diplomsName
      } else {
        this.$dialog.toast({
          mes: res.data.message,
          icon: 'error',
          timeout: 1500
        })
      }
    }).catch(err => {
      this.$dialog.toast({
        mes: '服务器无响应',
        icon: 'error',
        timeout: 1500
      })
    })
  },
  methods: {
    checkSubmit() {
      receiveDocumentConfirm(this.lawCaseId, this.litigantId, this.sendId).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: res.data.message,
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
      }).catch(err => {
        this.$dialog.toast({
          mes: '服务器无响应',
          icon: 'error',
          timeout: 1500
        })
      })
    }
  }
}
</script>
<style>

</style>
