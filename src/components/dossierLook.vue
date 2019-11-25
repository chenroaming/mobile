<template>
    <div style="background-color: #fff;padding-bottom:30px; height:100%;">
        <yd-navbar title="湖里法院全在线平台" fontsize="17px" color="#1a1a1a">
        </yd-navbar>
        <div style="height:15px;"></div>
        <yd-flexbox>
            <i class="iconfont icon-juanzong change-icon-juanzong"></i>
            <div class="look-fenline"></div>
            <div class="look-juan-title"><p>卷宗GPS</p></div>
        </yd-flexbox>
        <div style="height:65px;"></div>
        <yd-flexbox>
            <yd-flexbox-item>
                <!-- <yd-flexbox> -->
                    <div class="num-box">
                        <select v-model='selected' class="myYear">
                            <option v-for='item in formItemList'>
                                {{item}}
                            </option>
                        </select>
                        <span id="spanId" style="float:left; margin-top: 14px; padding: 0 0.1rem;">闽0206民初</span>
                        <input placeholder="输入案号" class="num-input" id="inputId"/>
                        <span id="spanNum" style="float:left; margin-top: 14px; padding: 0 0.1rem;">号</span>
                    </div>
                <!-- </yd-flexbox> -->
                <div style="height:45px;margin-top: 45px;"></div>
                <div><yd-button size="large" type="primary" shape="circle" style="width:50%;margin: 0 auto;" bgcolor="#397ce5" color="#FFF" @click.native="dossierLook()">查询</yd-button></div>
            </yd-flexbox-item>
        </yd-flexbox>
    </div>
</template>
<script>
import {
    queryTimeLine
} from "../api/dossier.js"
import Util from "@/libs/util.js";
export default {
    data(){
        return{
            selected:'(2016)',
            caseNo:"",
            msgs:[],
            selected:'',
        }
    },
    created(){
        
    },
    methods:{
        dossierLook(){
            this.$dialog.loading.open("加载中...");
            var inputValue = document.getElementById('inputId').value
            var spanValue1 = document.getElementById("spanId").innerText
            var spanValue2 = document.getElementById("spanNum").innerText            
            // console.log(spanValue1)
            // console.log(inputValue)
            this.caseNo = "("+this.selected+")"+spanValue1+inputValue+spanValue2;
            // console.log(this.caseNo)
            // console.log(this.selected)
            // return;
            queryTimeLine(this.caseNo)
            .then(res => {
                if(res.data.state == 100){
                    this.$dialog.loading.close();
                    this.$router.push({
                        name: "dossierInfo",
                         params: {caseNo: this.caseNo}
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
        }, 
    },
     computed:{
        formItemList:function () {
            var myDate= new Date();
            var date=myDate.getFullYear()+5;//结束年份 
            var dateNow = new Date().getFullYear()
            this.selected = dateNow;
            console.log(dateNow)
            for (var i = 0; i <= 10; i++) {
                this.msgs.push(date)
                date -= 1;
            }
            return this.msgs
        },
    }  
}
</script>
<style>
.yd-navbar:after {
    content: "";
    position: absolute;
    z-index: 2;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #fff;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.icon-juanzong{
    font-size: 60px!important;
    color: #6499f2;
    margin-left: 10px;
}
.look-fenline{
    width: 2px;
    height: 28px;
    background-color: #9ebff7;
    display: inline-block;
    margin-left: 10px;
}
.look-juan-title{
    display: inline-block;
    margin-left: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #777272;
}
.num-box{
    width: 100%;
    /* border: 1px solid rgb(182, 182, 182); */
    margin: 0 auto;
    border-radius: 0.2rem;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    margin-left: 12%;
}
.num-input{
    width: 1.9rem;
    padding: 0 0.2rem;
    line-height: 1rem;
    height: 1rem;
    border: 1px solid rgb(182, 182, 182);
    border-radius: 5px;
    border: 1px solid #ccc;
    font-weight: bold;
    float:left;
    display: inline-block;
}
.myYear{
    width: 1.9rem;
    line-height: 1rem;
    font-size: 18px;
    padding: 0 0.3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    float:left;
}
</style>
