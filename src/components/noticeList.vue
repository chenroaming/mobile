<template>
    <div id="notice">
        <div style="height:142px;"></div>
        <div id="noticeList">
            <!-- <div id="everyNotice">
                <h3>南昌县人民法院</h3>
                <p>原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告</p>
                <div class="time">(2018)赣0121民初3814号 / 2019-02011 13:23:33</div>
            </div> -->
            <div id="everyNotice" v-show="showInfo">
                <h3>平潭法院</h3>
                <p style="font-size: 0.3rem;letter-spacing: 1px;line-height: 30px;margin-bottom: 10px;">无已送达公告</p>
            </div>
            <div id="everyNotice" v-show="noticeList.length>0" v-for="item in noticeList" v-model="item.id" @click="show(item.id)">
                <h3>平潭法院</h3>
                <p style="font-size: 0.28rem;letter-spacing: 1px;">{{item.titleName}}</p>
                <div class="time">{{item.caseNo}} / {{item.releaseDate}} </div>
            </div>
        </div>
        
    </div>
</template>
<script type="text/babel">
import {
    wxNoticeCatalog

} from '@/api/noticeInfo';
export default {
    data () {
        return {
            noticeList:[],
            showInfo:true,
        }
    },
    mounted () {
        this.wxNoticeCatalog();
    },
    methods:{
         // 获取数据
        wxNoticeCatalog(){
            wxNoticeCatalog().then(res=>{
            console.log(res.data.data);
                if(res.data.state == 100){
                    if(res.data.data.length>0){
                        this.noticeList = res.data.data;
                        this.showInfo = false;
                    }else{
                         this.showInfo = true;
                    }
                    
                }
            
            })
        },
        // 显示该联系人详情        index 为数组下标
        show(listId) {
            console.log("show", listId);
            this.$router.push({
                name: "noticeInfo",
                params: { id: listId }
            });
        },
    }
}
   
</script>
<style>
    #notice{
        background:url(../images/noticeListBg.png) no-repeat; 
        background-size: contain;
        height: 100%;
    }
    #noticeList{
        width: 90%;
        margin: 0 auto 30px auto;
        border: 1px solid #cccccc80;
        border-radius: 6px;
        background-color: #fff;
        padding-top: 8px;
    }
    #everyNotice{
        text-align: left;
        line-height: 25px;
        font-size: 16px;
        margin-top: 10px;
        border-bottom: 1px solid #cccccc5e;
        padding-bottom: 5px;
        cursor: pointer;
    }
    #everyNotice h3, #everyNotice p,#everyNotice .time{
        width: 90%;
        margin: 0 auto;
    }
    #everyNotice h3{
        color: red;
        font-size: 0.32rem;
        letter-spacing: 0.04rem;
    }
    #everyNotice .time{
        color: #ccc;
        font-size: 0.24rem;
    }
    #everyNotice:last-child{
        border-bottom: none;
    }
    #everyNotice .time{
        overflow:hidden; /*超出的部分隐藏起来。*/ 
        white-space:nowrap;/*不显示的地方用省略号...代替*/
        text-overflow:ellipsis;/* 支持 IE */
    }
</style>