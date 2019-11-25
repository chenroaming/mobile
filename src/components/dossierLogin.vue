<template>
    <div style="background-color:#fff;height:100%;">
         <yd-navbar title="微信绑定" fontsize="17px" color="#6499f2">
        </yd-navbar>
        <yd-tab active-color="#40a9ff">
            <yd-tab-panel label="账号绑定" style="margin-top: 20px;">
                <div style="margin: 0.35rem">
                    <yd-cell-group>
                        <yd-cell-item>
                            <yd-icon slot="icon" name="ucenter-outline" size=".45rem"></yd-icon>
                            <yd-input v-model="username" required slot="right" placeholder="请输入登陆账号"></yd-input>
                        </yd-cell-item>
                        <yd-cell-item>
                            <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                            <yd-input slot="right"  type="password" placeholder="请输入登陆密码" v-model="pwd"></yd-input>
                        </yd-cell-item>
                        <div style="width:100%; border:1px solid #fff; height:50px; margin-top: 10px;">
                            <input class="code-input" type="text" placeholder="请输入验证码" v-model="code" />
                            <span slot="right" @click="getCode"><img style="vertical-align: middle;" :src="codeSrced" alt="验证码" class="code-img"></span>                      
                        </div>
                        
                    </yd-cell-group>
                    <ul class="box">            
                        <li v-for="(c,index) in cities" :key="index" :class="{checked:index==n}" @click="changeList(c)" id="selected">
                            {{c.val}}
                            <span style="color:#333;display: inline-block;width: 2.6rem; margin-left: 0.3rem; font-size: 15px;text-align: center;  margin-top: -10px; float:left;">{{c.text}}</span>
                        </li>        
                    </ul>
                    <yd-button  shape="circle" size="large" bgcolor="#40a9ff" color="#FFF" @click.native="weiBind()">帐&nbsp;号&nbsp;绑&nbsp;定</yd-button>
                </div>
            </yd-tab-panel>
            <yd-tab-panel label="手机绑定" style="margin-top: 20px;">
                <div style="margin: 0.35rem">
                    <yd-cell-group>
                    <yd-cell-item>
                        <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
                        <yd-input v-model="phone" required regex="mobile" slot="right" placeholder="请输入手机号码"></yd-input>
                    </yd-cell-item>
                    <yd-cell-item>
                        <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                        <yd-input slot="right" v-model="mcode" required placeholder="请输入验证码"></yd-input>
                        <yd-sendcode slot="right"
                            v-model="sendCodeStart"
                            @click.native="sendCode"
                            type="warning"
                        ></yd-sendcode>
                    </yd-cell-item>
                    </yd-cell-group>
                    <yd-button @click.native="loginSubmit()" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">手&nbsp;机&nbsp;绑&nbsp;定</yd-button>
                </div>
            </yd-tab-panel>
        </yd-tab>
        
        
       
    </div>
</template>
<script type="text/babel">
import {
    bindingWeiXinByAccount,
    code,
    bindingWeiXinByPhone,
    phoneCode,
} from "../api/dossier.js"
import md5 from 'md5';
export default {
    data() {
        return {
            username: '',
            loginType: '1',
            sendCodeStart: false,
            phone:'',
            mcode:'',
            pwd:'',
            code:'',
            codeSrced:'/api/main/code.jhtml',
            cities : [{index: 0,val: "1",text:"法院工作人员"},{index: 1,val: "2",text:"当事人/律师"}],        
            n : 0,
            selVal: 1,
        }
    },
     created() {
        console.log(this.loginType)
        

    },
    methods:{
        changeList(c){            
            this.n = c.index;
            this.selVal = c.val;
            console.log('this.selVal',this.selVal)
        },
        getCode(){
            this.codeSrced = '/api/main/code.jhtml?tm=' + Math.random();
        },
        weiBind(){
            console.log(this.selVal);
            this.loginType = this.selVal;
        //    this.changeList();
            if(this.username == ''){
                this.$dialog.toast({
                    mes: "请输入帐号",
                    timeout: 1500
                });
            }else if(this.pwd == ''){
                this.$dialog.toast({
                    mes: "请输入密码",
                    timeout: 1500
                });
            }else if(this.code == ''){
                this.$dialog.toast({
                    mes: "请输入验证码",
                    timeout: 1500
                });
            }else{
                bindingWeiXinByAccount(this.username,md5(this.pwd),this.code,this.loginType)
                .then(res => {
                    if(res.data.state == 100){
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        });
                    }else{
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        });
                    }
                })
                .catch(error => {
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: "服务器无响应",
                        icon: "error",
                        timeout: 1500
                    });
                });
            }
        },
        sendCode() {
            if (this.phone == "") {
                this.$dialog.toast({
                mes: "必须填写一个手机号码获取验证码",
                timeout: 1500
                });
            } else {
                this.$dialog.loading.open("发送中...");
                phoneCode(this.phone)
                .then(res => {
                    if (res.data.state == 100) {
                        this.sendCodeStart = true;
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: "已发送",
                            icon: "success",
                            timeout: 1500
                        });
                    } else {
                        this.sendCodeStart = true;
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: "发送失败，" + res.data.message,
                            timeout: 1500
                        });
                    }
                })
                .catch(error => {
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                    mes: "服务器无响应",
                    icon: "error",
                    timeout: 1500
                    });
                });
            }
        },
        loginSubmit(){
            if(this.phone == ""){
                this.$dialog.toast({
                mes: "请填写手机号码",
                timeout: 1500
                });
            }else if(this.mcode == ""){
                this.$dialog.toast({
                mes: "请输入短信验证码",
                timeout: 1500
                });
            }else{
                bindingWeiXinByPhone(this.phone,this.mcode)
                .then(res => {
                    if(res.data.state == 100){
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        });
                    }else{
                        this.$dialog.loading.close();
                        this.$dialog.toast({
                            mes: res.data.message,
                            timeout: 1500
                        });
                    }
                })
                .catch(error => {
                    this.$dialog.loading.close();
                    this.$dialog.toast({
                        mes: "服务器无响应",
                        icon: "error",
                        timeout: 1500
                    });
                });
            }
        }
    }  
}
</script>
<style>

.box li{
    width: 0.5rem;
    height: 0.5rem;
    text-align: center;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 50%;
    color: #fff;
    margin-left: 28%;
    margin-top: 20px;

}
.box li.checked{
    background-color: #40a9ff;
    color: #40a9ff;
}
.yd-navbar:after {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 0px solid #fff!important;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
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
.yd-cell:after {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #fff;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.code-input{
    width: 55%;
    height: 40px;
    float: left;
    margin-left: 12px;
    border-radius: 0px;
    background-color: #fff;
    border: 1px solid #eee;
    font-size: 0.3rem;
    color: #777;
}
.code-img{
    width: 35%;
    height: 40px;
    float: right;
    margin-right: 2px;
    border-radius: 0px;
    background-color: #fff;
    /* border: 1px solid #eee; */
}
.yd-radio {
    display: inline-block;
    padding-right: 10px;
    margin-left: 24px;
}
</style>