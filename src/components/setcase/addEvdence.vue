<template lang="html">
<div   style="height:100%;background:#F1F2F6">
    <div v-show="caimSD" style="height:100%;background:#F1F2F6">
        <yd-navbar title="证据材料" bgcolor="#40a9ff" color="#fff">
        </yd-navbar>
        <yd-cell-group title="上传证据材料" style="margin-top:1rem;">
            <yd-cell-item>
                <span slot="left"  class="yd-font-span16">证据名称</span>
                <yd-input slot="right" v-model="input6" style="padding-left:0.2rem;" placeholder="请填写证据名称"></yd-input>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left"  class="yd-font-span16">证明对象</span>
                <yd-input slot="right" v-model="input6" style="padding-left:0.2rem;" placeholder="请填写证据对象"></yd-input>
            </yd-cell-item>
        </yd-cell-group>
        <yd-cell-group title="">
            <yd-cell-item>
                <div slot="left" class="upDivs">
                    <div class="upfilD"> 
                        <img src="../../images/cameraIco.png" alt="湖里法院" style="width:0.8rem">
                        <p style="color: #888;font-size: .3rem;">点击拍照上传</P> 
                    </div>
                    
                </div>
                <div slot="right" class="upDivs">
                    <div class="upfilD"> <img src="../../images/fileImg.png" alt="湖里法院" style="width:0.8rem">
                        <p style="color: #888;font-size: .3rem;">选择文件上传</P> 
                    </div>
                     
                </div>
                <!-- <yd-textarea slot="right"  placeholder="请填写您的诉讼请求" ></yd-textarea> -->
            </yd-cell-item>
        </yd-cell-group>
        <div class="blockD">
                <p class="yd-font-span16"> 添加证据材料</p>
                <div class="assCla"> <img src="../../images/add.png" alt="湖里法院" style="width:0.8rem"></div>                
        </div>
        <p class="footer-button" style="position: relative;top:5%;">
            <yd-button  type="primary">下一步</yd-button>
        </p>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import Vue from 'vue'
import {Tab, TabPanel} from 'vue-ydui/dist/lib.rem/tab';
Vue.component(Tab.name, Tab);
Vue.component(TabPanel.name, TabPanel);
export default {
  data(){
    return{
        caimSD:true,
        factSD:false,
        radio1:"",
        tabb:0,
        input6:"",
      }
  },
  created(){

  },
  methods:{
    test(){
        console.log(1111)
    },
    upStep(){

    },
    nextStep(){
        this.tabb = 1;
        console.log(5899)
        console.log(this.tabb)
        // this.identityShow = false;
        // this.addInfoShow = true;
        // console.log(9955)
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
/* .yd-tab{
    height:100%
}
.yd-tab-panel{
    height:100%;
}
.yd-tab-panel-item{
    height:100%
} */
.blockD{
    margin-top:20px;
    border-top:1px solid #ccc;
    border-bottom:1px solid #ccc;
    min-height:80px;
    background:#fff;
    padding:10px 10px;
    text-align:left;
}
.factI textarea{
    height:4.5rem
}
</style>
