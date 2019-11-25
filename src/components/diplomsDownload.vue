<template lang="html">
<div class="" style="width:100%;height:100%">
<img slot="loadingTip" style="display:inline-block;margin-top:2rem;width: 3rem;" v-show='loadingImg' src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>
<img v-show="imageShow" @click="imgCli" class="wxTips" src="../images/wxTips.png" alt="">
<!-- <a id="installaz" href="http://court2.ptnetwork001.com/upload/pdf/2018/11/07/1541555644551.pdf?mp.wexin.qq.com" style="">Install the In-House App</a> -->
</div>
</template>

<script>
import Util from '@/libs/util.js'
import {wxDiplomsDownload} from '@/api/weixinCode.js'
export default {
  data(){
    return{
      path:"",
      paths:"",
      loadingImg:true,
      imageShow:false,
    }
  },
  created(){
    if(Util.GetUrlParam("lawCaseId")){
        let lawCaseId = Util.GetUrlParam("lawCaseId");
        let litigantId = Util.GetUrlParam("litigantId");
        let sendId = Util.GetUrlParam("sendId");
        wxDiplomsDownload(lawCaseId,litigantId,sendId,'wx').then(res => {
            if(res.data.state == 100){
                this.loadingImg = false;
                // this.imageShow = true;
                var fileStr = res.data.data;
                let str1 = fileStr.substr(0, 1);

                let str2 = window.location.host; 
                let httpNm =  document.location.protocol;
                console.log(httpNm)
                if(str1 == '/'){
                    if(httpNm == 'https:'){
                        this.path = 'https://' + str2 +  fileStr;
                    }else{
                        this.path = 'http://' + str2 +  fileStr;
                    }
                }else{
                    if(httpNm == 'https:'){
                        this.path = 'https://' + str2 +'/'+  fileStr;
                    }else{
                        this.path = 'http://' + str2 +'/'+  fileStr;
                    }
                }
                // document.getElementById('installaz').click();
                console.log(this.path)
                window.history.pushState({},0,this.path); 
                location.reload(); 
            }
        })
    }
  },

  methods:{
    imgCli(){

    }
  }

}
</script>

<style lang="css" >
.wxTips{
    width: 100%;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    z-index: 9999;
}
</style>
