<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="文书列表" bgcolor="#40a9ff" color="#fff">
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
          <div slot="right">
           
              <span  v-for="item in diplomsList"> <a :href="item.path">{{ item.name }}</a><br></span>
              </div>
      </yd-cell-item>
     </yd-cell-group>
  </div>
</template>
<script type="text/babel">
import Util from '@/libs/util.js'
import {getLitigantDiplomsEdit } from '@/api/checkSend'
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
      sendId:"",
      diplomsList:[],
    }
  },
  created() {
    const litigantId = Util.GetUrlParam('litigantId')
    this.litigantId = litigantId;
    getLitigantDiplomsEdit(litigantId).then(res => {
      if (res.data.state == 100) {
        this.caseNo = res.data.lawCase.caseNo;
        this.litigantName = res.data.litigant.litigantName;
        this.LitigationStatusName = res.data.litigant.litigationStatus.name;
        this.litigantPhone = res.data.litigant.litigantPhone;
        this.IdentityCard = res.data.litigant.identityCard;
        res.data.diplomsList.map(item => {
          var data = {
            name:item.name,
            path:item.path,
          }
            this.diplomsList.push(data)
        })
        // this.diplomsName = res.data.diplomsList[0].name
      } else {
          console.log(45454)
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
