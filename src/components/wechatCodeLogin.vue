<template lang="html">
  <div>
    <div v-show="isSuccess" style="text-align: center;">
        <img src="../images/successLogin.png" alt="湖里法院" style="margin-top:30%;">
        <p style="font-size: 0.6rem;font-weight: 600;">登录成功</p>
    </div>
    <div v-show="!isSuccess" style="text-align: center;">
        <img src="../images/fileLogin.png" alt="湖里法院" style="margin-top:30%;display: inline-block;">
        <p style="font-size: 0.5rem;font-weight: 600;margin-top:20px">登录失败，未实名认证</p>
        <yd-button @click.native="gotoCerti" style="font-weight: 600;width:50%;display:inline-block;margin-top:0.7rem" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">前往实名认证</yd-button>
    </div>
  </div>
</template>

<script>
import Util from '@/libs/util.js'
import { login } from '@/api/courtDate.js' 
export default {
  data() {
    return {
      isLogin: '',
      isSuccess:true,
      urls:''
    }
  },
  created(){

      this.isLogin = Util.GetUrlParam("isLogin");
      if(this.isLogin == 1){
          this.isSuccess = true;
      }else if(this.isLogin == 0){
          this.isSuccess = false;
      }
      let urls = window.location.host;
  },
  methods: {
    gotoCerti() {
        window.location.href = this.urls + '/weapp/'
    }
  }
}
</script>

<style lang="css">
</style>
