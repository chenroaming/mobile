<template>
    <div style="background:#fff">
        <div id="noticeBase">
            <!-- <pdf ref="pdf"></pdf> -->
            <iframe :src="'/static/pdf/web/viewer.html?file='+ encodeURIComponent(path)" style="height:600px;width:100%"></iframe>
        </div>
    </div>
</template>
<script type="text/babel">
import JSBase64 from 'js-base64'
import pdf from '@/components/pdf/pdf'
import {
    
} from '@/api/noticeInfo';
export default {
    components: {
        pdf
    },
    data () {
        return {
            path:'',
            pdfDoc: null,
            pageNum: 1,
            pageRendering: false,
            pageNumPending: null,
            scale: 0.9
        }
    },
    
    mounted () {
        this.wxHistoryInfo();
    },
    methods:{
        // 获取数据
        wxHistoryInfo(){
            this.path = '/'+this.$route.params.path;
            // this.path = '/upload/pdf/2019/07/11/原告-何贇第2次生成的传票(存根)-20190711164052.pdf';
            console.log(this.path)
            // this.$refs.pdf.loadFile('/api/'+this.path);
            // this.$refs.pdf.loadFile('/api/upload/confrim/2019/06/04/地址确认书1559618536856.pdf');
        },
        
    }
}
   
</script>
<style>


</style>