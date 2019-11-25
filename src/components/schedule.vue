<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px">
    <yd-navbar title="庭审排期" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="undone-wrapper">
      <yd-cell-group v-for="(item, index) in ListData.undone" :key="index">
        <yd-cell-item>
          <span slot="left">案件编号</span>
          <span slot="right">{{ item.caseNo }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">审判员</span>
          <span slot="right">{{ item.judge }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">开庭时间</span>
          <span slot="right">{{ item.startDate | formatDate }}</span>
        </yd-cell-item>
        <yd-cell-item>
          <span slot="left">开庭地址</span>
          <span slot="right">{{ item.tribunal }}</span>
        </yd-cell-item>
        <div style="padding: 10px;">
          <div class="tips">
            *注：调期申请提交成功后，法院将在5个工作日内确定最终开庭时间，结果将以短信形式通知您！最终决定权归法院所有。
          </div>
          <yd-button v-show="showBtn" @click.native="checked(item.id)" bgcolor="#40a9ff" color="#fff" type="primary" shape="circle" style="width: 2rem;height:.8rem;margin-right:.4rem;font-size: 14px;">确认排期</yd-button>
          <yd-button v-show="showBtn" @click.native="sendRemark(item.id)" color="#40a9ff" type="hollow" shape="circle" style="width: 2rem;height:.8rem;border-color:#40a9ff;font-size: 14px;">申请调期</yd-button>
        </div>
      </yd-cell-group>
    </div>
    <div class="done-wrapper">
      <div v-for="(item, index) in ListData.done" :key="index">
        <div class="title">排期已确认</div>
        <yd-cell-group>
          <yd-cell-item>
            <span slot="left">案件编号</span>
            <span slot="right">{{ item.caseNo }}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">审判员</span>
            <span slot="right">{{ item.judge }}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">开庭时间</span>
            <span slot="right">{{ item.startDate | formatDate }}</span>
          </yd-cell-item>
          <yd-cell-item>
            <span slot="left">开庭地址</span>
            <span slot="right">{{ item.tribunal }}</span>
          </yd-cell-item>
        </yd-cell-group>
      </div>
    </div>
    <yd-popup v-model="showRemark" position="center" width="90%">
      <div style="color:#999;font-size: 14px;margin: 0 auto;padding-top:15px;">申请调期</div>
      <yd-textarea v-model="remark" placeholder="请输入您申请调期的理由" maxlength="100" style="width:80%;margin: 10px auto;padding: 10px;border:1px solid #ddd;border-radius: 15px;"></yd-textarea>
      <p style="text-align: center;">
        <yd-button @click.native="remarkSubmit" shape="circle" bgcolor="#40a9ff" color="#FFF" style="width:1.5rem;margin-bottom: 10px;">提&nbsp;交</yd-button>
      </p>
    </yd-popup>
  </div>
</template>

<script type="text/babel">
import Util from '@/libs/util.js'
import { formatDate } from '@/libs/date.js'
import { schedulList, confirm } from '@/api/scheduling'
export default {
  data() {
    return {
      lawCaseId: '',
      ListData: {
        undone: [],
        done: []
      },
      showRemark: false,
      showBtn: true,
      remark: '',
      schedulingId: ''
    }
  },
  created() {
    const lawCaseId = Util.GetUrlParam('lawCaseId')
    this.lawCaseId = lawCaseId
    this.getList()
  },
  methods: {
    getList() {
      schedulList(this.lawCaseId).then(res => {
        if (res.data.state == 100) {
          this.ListData.undone = []
          this.ListData.done = []
          res.data.result.unconfirms.map(item => {
            let objectData = {
              id: item.id,
              caseNo: item.lawCase.caseNo,
              judge: item.judge.name,
              startDate: item.startDate,
              tribunal: item.tribunal.address + item.tribunal.name
            }
            this.ListData.undone.push(objectData)
          })
          res.data.result.confirms.map(item => {
            let objectData = {
              id: item.id,
              caseNo: item.lawCase.caseNo,
              judge: item.judge.name,
              startDate: item.startDate,
              tribunal: item.tribunal.address + item.tribunal.name
            }
            this.ListData.done.push(objectData)
          })
        }
      })
    },
    checked(id) {
      confirm(id, 1, '').then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: '确认成功',
            icon: 'success',
            timeout: 1500
          })
          this.showBtn = false
          this.getList()
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
    },
    sendRemark(id) {
      this.showRemark = true
      this.schedulingId = id
    },
    remarkSubmit() {
      confirm(this.schedulingId, 0, this.remark).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: '确认成功',
            icon: 'success',
            timeout: 1500
          })
          this.showBtn = false
          this.getList()
          this.showRemark = false
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
            var date = new Date(time);
            return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
    }
}
</script>
<style>
.yd-cell-item:not(:last-child):after {
  margin-left: 0.24rem;
  margin-right: 0.24rem;
  content: '';
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
.tips {
  color: #ef4f4f;
  font-size: 12px;
  text-align: left;
  margin-bottom: 15px;
  padding: 0px 5px;
}
.yd-cell-box:last-child {
  margin-bottom: 0px;
}
.done-wrapper {
}
.done-wrapper .title {
  padding: 10px;
  color: #a4a6a5;
  text-align: left;
}
.yd-popup-center {
  border-radius: 15px;
}
</style>
