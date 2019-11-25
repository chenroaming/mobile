<template>
    <yd-tab active-color="#40a9ff">
        <yd-tab-panel label="法官登录" style="margin-top: 20px;">
          <div style="margin: 0.35rem">
            <yd-cell-group>
              <yd-cell-item>
                  <yd-icon slot="icon" name="ucenter-outline" size=".45rem"></yd-icon>
                  <yd-input v-model="m_phone" required slot="right" placeholder="请输入登陆账号"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                  <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                  <yd-input slot="right" v-model="m_password" type="password" placeholder="请输入登陆密码"></yd-input>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="loginSubmit(0)" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">登&nbsp;录</yd-button>
          </div>
        </yd-tab-panel>
    </yd-tab>
</template>

<script type="text/babel">
import { weChatlogin } from '@/api/login'
import Util from '@/libs/util.js'
import md5 from 'md5';
export default {
  data() {
    return {
      sendCodeStart: false,
      m_phone: '',
      m_password: '',
      l_phone: '',
      l_code: '',
      lawCaseId: '',
      isLawcase:''
    }
  },
  created() {

    if(Util.GetStrParam('lawCaseId', this.$store.getters.toPath)==''){
      this.isLawcase = 0;
    }else{
      this.isLawcase = 1;
      const lawCaseId = Util.GetStrParam('lawCaseId', this.$store.getters.toPath)
      this.lawCaseId = lawCaseId
    }

  },
  methods: {
    loginSubmit(type) {
      weChatlogin(this.m_phone, md5(this.m_password), this.lawCaseId, this.isLawcase)
        .then(res => {
          if (res.data.state == 100) {
            this.$dialog.toast({
              mes: '登入成功',
              icon: 'success',
              timeout: 1500
            })
            this.$store.commit('setLogin', true)
            if (this.$store.getters.toPath == '' || this.$store.getters.toPath == '/') {
              this.$router.push('caseList-new')
            } else {
              this.$router.push(this.$store.getters.toPath)
            }
          } else {
            this.$dialog.toast({
              mes: '登入失败，' + res.data.message,
              timeout: 1500
            })
          }
        })
    }
  }
}
</script>
<style>
.yd-cell:after {
  margin-left: 0.24rem;
  content: '';
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
</style>
