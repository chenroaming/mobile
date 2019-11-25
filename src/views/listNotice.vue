<template lang="html">
    <div>
        <!-- <yd-navbar title="原告的起诉状及证据列表如下" bgcolor="#40a9ff" color="#fff"></yd-navbar> -->
        <div class='contentItem'>
            <p class='titleP'>原告的起诉状及证据列表如下</p>
            <p style='padding: .35rem;padding-bottom: 0;' v-for='item in list' ><a :href='item.path'>{{item.name}}</a></p>
            <p style='padding: .35rem;text-align:center' v-if='list.length==0'>暂无数据</p>
        </div>
        
    </div>
</template>

<script>
import Vue from 'vue'
import Util from '@/libs/util.js'
import {getOnlineEvidences} from '@/api/listNotice.js'
export default {
  data(){
    return{
        eventKey:'',
        list:[]
    }
  },
  created(){
        if (Util.GetUrlParam('eventKey')) {
            this.eventKey=Util.GetUrlParam('eventKey')
        }
      getOnlineEvidences(this.eventKey).then(res => {
        this.list=res.data.onlineEvidece
    })
  },
  methods:{}
}
</script>

<style lang="css">
.titleP{
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    margin: .15rem;
    margin-top: 0;
    
    padding: .35rem;
    /* padding-top: .5rem; */
    border-bottom: 1px solid #999;
}
.contentItem{
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
.point{
    font-size: 0.4rem!important;
    color: #40A9FF;
    margin-right: .1rem;
}
</style>
