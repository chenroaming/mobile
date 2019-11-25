<template>
    <div id="noticeInfo">
        <div class="countdownBox">
            
            <div style="display:inline-block;width:20%;">
                <span class="to_left"></span>
            </div>
            <span  class="countdown">{{noticeInfo.remaining}}</span>
        </div>
        <div id="noticeBase">
            <pdf ref="pdf"></pdf>


            <!-- <h3>原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告</h3>
            <div id="base">(2018)赣0121民初3814号 / 2019-02011 13:23:33</div>
            <p>李文燕:</p>
            <p style="text-indent:0.8rem;">原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告原告李文燕诉被告王丽英民间借贷纠纷一案判决公告判决公告</p>
            <div id="whereTime">
                <p>二零一九年二月二十一日</p>
                <p>南昌县人民法院</p>
            </div> -->
        </div>
    </div>
</template>
<script type="text/babel">
import JSBase64 from 'js-base64'
import pdf from '@/components/pdf/pdf'

import {
    wxNoticeInfo
} from '@/api/noticeInfo';
export default {
    components: {
        pdf
    },
    data () {
        return {
            noticeInfo:'',
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            scale: 0.9
        }
    },
    
    mounted () {
        this.wxNoticeInfo();
    },
    methods:{
        // 获取数据
        wxNoticeInfo(){
            var caseId = this.$route.params.id;
            wxNoticeInfo(caseId).then(res=>{
                console.log(res.data);
                if(res.data.state == 100){
                    this.noticeInfo = res.data.data;
                    let host = `${window.location.protocol}//${window.location.host === 'localhost:8080' ? '192.168.86.61' : window.location.host}/`
                    // window.open(`${host}${res.data.data}`)
                    let url = '/api/'+this.noticeInfo.filePath
                    this.$refs.pdf.loadFile(url);
                }
            
            })
        },
        
    }
}
   
</script>
<style>




    .countdownBox{
        display: inline-block;
        float: right;
        width: 80%;
    }
    .to_left {
        display: inline-block;
        width: 0;
        height: 0;
        border-right: 20px solid #f31515;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        float: right;
        /* margin-left: 100px; */
    }
	.countdown{
        background-color: #f31515;
        float: right;
        color: #fff;
        height: 40px;
        line-height: 40px;
        width: 80%;
        text-align: center;
        padding: 0 14px 0 10px;
        margin-bottom: 10px;
    }
    #noticeInfo{
        background-color: #fff;
        height: 100%;
        text-align: left;
        font-size: 15px;
        line-height: 30px;
        padding: 10px 0;
    }
    #noticeBase{
        width: 100%;
    }
    #noticeBase h3{
        font-size: 17px;
    }
    #base{
        font-size: 12px;
        color: #ccc;
    }
    #whereTime{
        text-align: right;
        margin-top: 50px;
    }

    

</style>