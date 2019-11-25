<template lang="html">
<div class="fd" style="height:100%;">
    <!-- 你的身份 -->
    <div style="height:100%;background: #fff;">
        <yd-navbar title="您的身份" bgcolor="#40a9ff" color="#fff">
        </yd-navbar>
        <yd-cell-group>
            <yd-cell-item  style="padding-top:20px">
                <span slot="left" ><span class="yd-font-span14" style="color:#787878">请选择您的身份</span></span>
            </yd-cell-item>
            <yd-cell-item >     
                <span slot="left" >
                    <yd-radio-group v-model="identity"> 
                        <yd-radio val="原告" class="yd-font-span16">我是原告</yd-radio>
                    </yd-radio-group>
                </span>
            </yd-cell-item>
            <yd-cell-item >     
                <span slot="left" >
                    <yd-radio-group v-model="identity"> 
                        <yd-radio val="代理人" class="yd-font-span16">我是原告代理人</yd-radio>
                    </yd-radio-group>
                </span>
            </yd-cell-item>
            <!-- <yd-cell-item style="height:1.5rem">     
                <span slot="left" >
                    <yd-radio-group v-model="identity"> 
                        <yd-radio val="3" style="float:left">
                            <span class="yd-font-span16">我帮他人立案</span>
                        </yd-radio>              
                    </yd-radio-group><br/>
                    <p style="float:left;padding-left:20px;line-height:30px;" class="yd-font-span12">(仅帮助他人完成立案信息的提交，不参与其他诉讼过程)</p>
                </span>
                 
            </yd-cell-item> -->
        </yd-cell-group>
        <p class="footer-button">
            <mt-button type="primary" size='large' class='mint-btn' @click.native="nextStep">选择完毕，下一步</mt-button>
            <!-- <yd-button @click.native="nextStep"  type="primary" shape="circle"></yd-button> -->
        </p>
    </div>
</div>

</template>

<script>
import {saveWXRole} from '@/api/setcase.js'
import {geTConfig} from '@/api/map.js'
import Vue from 'vue'
export default {
     components: {},
  data(){
    return{
        identity:"",
      }
  },
  created(){
      if (window.localStorage.getItem('onlineLitigantId')) {
          localStorage.removeItem('onlineLitigantId');
      }
      if (window.localStorage.getItem('onlineLawCaseId')) {
          localStorage.removeItem('onlineLawCaseId');
      }
      if (window.localStorage.getItem('onlineLawyerId')) {
          localStorage.removeItem('onlineLawyerId');
      }
  },
  methods:{
    test(){
        console.log('this is test!')
    },
    nextStep(){
        if (this.identity&&this.identity!=3) {
            saveWXRole(this.identity).then(res => {
                if (res.data.state==100) {
                    this.$router.push({
                        name:'claimInfo'
                    })
                }else{
                    this.$dialog.toast({
                        mes: res.data.message,
                        icon: "warning",
                        timeout: 1000
                    });
                }
            });
        }else if (this.identity==3) {
            this.$dialog.toast({
                mes: "正在研发敬请期待~",
                icon: "warning",
                timeout: 1000
            });
        }else{
            this.$dialog.toast({
                mes: "请先选取身份~",
                icon: "warning",
                timeout: 1000
            });
        }
    }
  }
}
</script>

<style lang="css">
.yd-timeline-content {
    margin-left: 16px;
    border-left: 1px solid #e4e5e9;
    text-align: left;
}
.mint-btn {
    background-color:#40a9ff;
    color: #fff!important;
    padding: 0.1rem 0.7rem;
    font-size: 16px;
    border-radius: 0.1rem;
    width: 90%;
    margin: 0 auto;
}
.footer-button{
    position: absolute;
    bottom: 5%;
    text-align: center;
    width: 100%;
}
.yd-font-span12{
    font-size:12px;
}
.yd-font-span14{
    font-size:14px;
}
.yd-font-span16{
    font-size:16px;
    font-weight:600;
}
.assCla{
    padding: 10px 20px;
}
.yd-textarea textarea{
    height:3.5rem;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    padding: 0.2rem;
}
.upDivs{
    height: 150px;
    width:150px;
    border: 1px solid #ccc;
    border-radius: 0.3rem;
    margin: 10px 0;
}
.upfilD{
    margin-top: 55px;
    text-align: center;
}
.nextBtn{
    background-color: #40a9ff;
    color: #fff;
    padding: 0.2rem 1.5rem;
    font-size: 0.4rem;
    border-radius: 0.1rem;
    text-align: center;
    position: relative;
    border: none;
    pointer-events: auto;
    height: .6rem;
    box-sizing: content-box;
    white-space: nowrap;
}
.yd-toast-content {
    color: #fff
}
</style>
