<template lang="html">
<div style="height:100%;background:#F1F2F6">
    <div style="height:100%;background:#F1F2F6">
        <yd-navbar title="签名成功" bgcolor="#40a9ff" color="#fff">
            
        </yd-navbar>
        <div style='text-align:center'>
            <img src="../../images/successLogin.png" style="width:2.8rem;width: 2.8rem;
    margin: 0 auto;
    margin-top: 1rem;">
            <p style='font-size:24px'>签名成功</p>
            <!-- 立案成功 -->
        </div>
    </div>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import Vue from 'vue'
export default {
    data(){
        return{
            
        }
    },
    
    created(){
        this.$dialog.confirm({
            title: '提交成功',
            mes: '签名已提交成功',
            opts: () => {
                WeixinJSBridge.invoke('closeWindow',{},function(res){});
            }
        });
    },
    methods:{
        test(){
            console.log('this is test')
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
.yd-toast-none-icon .yd-toast-content {
    color:#fff
}
</style>