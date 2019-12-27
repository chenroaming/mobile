<template>
    <div class="loading">loading.......</div>
    <!-- <yd-tab active-color="#40a9ff">
        <yd-tab-panel label="当事人" style="margin-top: 20px;">
          <div style="margin: 0.35rem">
            <yd-cell-group>
              <yd-cell-item>
                  <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
                  <yd-input v-model="m_phone" required regex="mobile" slot="right" placeholder="请输入手机号码"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                  <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                  <yd-input slot="right" v-model="m_code" required placeholder="请输入验证码"></yd-input>
                  <yd-sendcode slot="right"
                    v-model="sendCodeStart"
                    @click.native="sendCode"
                    type="warning"
                  ></yd-sendcode>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="loginSubmit(0)" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">登&nbsp;录</yd-button>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="律师">
          <div style="margin: 0.35rem">
            <yd-cell-group>
              <yd-cell-item>
                  <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
                  <yd-input v-model="m_phone" required regex="mobile" slot="right" placeholder="请输入手机号码"></yd-input>
              </yd-cell-item>
              <yd-cell-item>
                  <yd-icon slot="icon" name="verifycode" size=".45rem"></yd-icon>
                  <yd-input slot="right" v-model="m_code" required placeholder="请输入验证码"></yd-input>
                  <yd-sendcode slot="right"
                    v-model="sendCodeStart"
                    @click.native="sendCode"
                    type="warning"
                  ></yd-sendcode>
              </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="loginSubmit(1)" shape="circle" size="large" bgcolor="#40a9ff" color="#FFF">登&nbsp;录</yd-button>
          </div>
        </yd-tab-panel>
    </yd-tab> -->
</template>

<script type="text/babel">
import { getCode, login } from "@/api/login";
import Util from "@/libs/util.js";
export default {
  data() {
    return {
      sendCodeStart: false,
      m_phone: "",
      m_code: "",
      l_phone: "",
      l_code: "",
      lawCaseId: ""
    };
  },
  beforeCreated(){
    
  },
  created() {
    // window.location.href = 'https://mediate.ptnetwork001.com/tartctest/';
    const lawCaseId = Util.GetStrParam("lawCaseId", this.$store.getters.toPath);
    this.lawCaseId = lawCaseId;
    console.log(lawCaseId);
  },
  methods: {
    sendCode() {
      if (this.m_phone == "") {
        this.$dialog.toast({
          mes: "必须填写一个手机号码获取验证码",
          timeout: 1500
        });
      } else {
        this.$dialog.loading.open("发送中...");
        getCode(this.m_phone, this.lawCaseId)
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
    loginSubmit(type) {
      login(this.m_phone, this.m_code, this.lawCaseId).then(res => {
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: "登入成功",
            icon: "success",
            timeout: 1500
          });
          this.$store.commit("setLogin", true);
          if (
            this.$store.getters.toPath == "" ||
            this.$store.getters.toPath == "/"
          ) {
            this.$router.push("/service");
          } else {
            this.$router.push(this.$store.getters.toPath);
          }
        } else {
          this.$dialog.toast({
            mes: "登入失败，" + res.data.message,
            timeout: 1500
          });
        }
      });
    }
  }
};
</script>
<style>
.yd-cell:after {
  margin-left: 0.24rem;
  content: "";
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
.loading {
    font-size: 18px;
    text-align: left;
}
</style>