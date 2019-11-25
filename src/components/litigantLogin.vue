<template>
  <div>
    <yd-tab active-color="#40a9ff">
        <yd-tab-panel label="用户登录" style="margin-top: 20px;">
          <div style="margin: 0.35rem">
            <yd-cell-group>
              <yd-cell-item  style="-webkit-user-select:text !important;">
                  <yd-icon slot="icon" name="ucenter-outline" size=".45rem"></yd-icon>
                  <yd-input v-model="m_phone" required slot="right" placeholder="请输入登陆账号"></yd-input>
              </yd-cell-item>
              <yd-cell-item style="-webkit-user-select:text !important;">
                  <yd-icon slot="icon" name="shield-outline" size=".45rem"></yd-icon>
                  <!-- <yd-icon slot="icon" name="verifycode" ></yd-icon> -->
                  <yd-input slot="right" v-model="m_password" type="password" placeholder="请输入登陆密码"></yd-input>
              </yd-cell-item>
              <yd-cell-item style="-webkit-user-select:text !important;">
                  <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                  <yd-input slot="right" v-model="m_code"  placeholder="请输入验证码"></yd-input>
                  <span slot="right" @click="changeUserCode"><img height="32px" style="vertical-align: middle;" :src="userCodeSrc" alt="验证码"></span>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="loginSubmit(0)" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">登&nbsp;录</yd-button>
          </div>
        </yd-tab-panel>
        
    </yd-tab>
        <yd-actionsheet :items="myItems2" v-model="show2"></yd-actionsheet>
  </div>
</template>

<script type="text/babel">
import Cookies from 'js-cookie';
import { phoneLogin,loginNew,optionRole } from '@/api/login'
import Util from '@/libs/util.js'
import md5 from 'md5';
export default {
  data() {
    return {
      sendCodeStart: false,
      show2:false,
      userCodeSrc: '/api/main/code.jhtml',
      m_phone: '',
      m_password: '',
      m_code:"",
      l_phone: '',
      l_code: '',
      lawCaseId: '',
      isLawcase:'',
      backPath:'',
      myItems2:[],
    }
  },
  created() {
    
    // if(Util.GetStrParam('lawCaseId', this.$store.getters.toPath)==''){
    //   this.isLawcase = 0;
    // }else{
    //   this.isLawcase = 1;
    //   const lawCaseId = Util.GetStrParam('lawCaseId', this.$store.getters.toPath)
    //   this.lawCaseId = lawCaseId
    // }

    // if (this.$route.params) {
    //       if(this.$route.params.backPath){
    //           this.backPath = this.$route.params.backPath;
    //       }
    //   }
      if (window.localStorage.getItem('backPath')) {
        //   if(this.$route.params.backPath){
              this.backPath = window.localStorage.getItem('backPath')
        //   }
      }
      console.log(this.backPath)
    
  },
  methods: {
    changeUserCode(){
        this.userCodeSrc = '/api/main/code.jhtml?tm=' + Math.random();
        console.log(this.userCodeSrc)
    },
    // 当事人
    loginSubmit () {
      console.log(99)
      this.myItems2 = [];
        loginNew(this.m_phone, md5(this.m_password), this.m_code, 'litigant').then(res => {
            if (res.data.state == 100) {
                if(res.data.data.roles.length == 1){
                  this.show2 = true
                  this. optionRole(res.data.data.roles[0].type)
                }else{
                  this.show2 = true;
                  res.data.data.roles.map(item => {
                    let obj = {
                      label:item.name,
                      callback: () => {
                          this. optionRole(item.type)
                      },
                      stay: true
                    }
                    this.myItems2.push(obj)
                  })
                }
            } else {
              this.$dialog.toast({
                mes: '登入失败，' + res.data.message,
                timeout: 1500
              })
            }
        });
    },
    optionRole(type){
      optionRole(type).then(res => {
        this.show2 = false;
        if(res.data.state == 100){
            alert(1)
          Cookies.set('user', this.m_phone);
          if(this.backPath != ''){
            this.$router.push({
                name: this.backPath
            });
          }else{
            this.$router.push({
                name: 'caseList'
            });
          }
        }else{
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
