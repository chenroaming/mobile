<template lang="html">
<div class="" style="width:100%;height:100%">
  <yd-navbar title='文书预览' bgcolor="#40a9ff" color="#fff">
    <router-link to="/mobile/casediplomasList" slot="left">
            <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>   
        </router-link>
  </yd-navbar>
  <pdf :src='path' style="width:100%;height:100%"></pdf>
</div>
</template>

<script>
import Util from '@/libs/util.js'
import Vue from 'vue'
import pdf from 'vue-pdf'
var count = 0;
export default {
    components: {
        pdf
    },
  data(){
    return{
      path:""
    }
  },
  created(){
      if (this.$route.params) {
            if(this.$route.params.path){
                let str = this.$route.params.path;
                let str1 = str.substr(0, 1);
                let str2 = window.location.host;
                if(str1 == '/'){
                    this.path = 'https://' + str2 +  this.$route.params.path;
                }else{
                    this.path ='https://' + str2 +'/'+  this.$route.params.path;
                }
                
            }
       }
       console.log(this.path)
  },
  watch: {
		'$route' (to, from) {
            if (this.$route.params) {
                if(this.$route.params.path){
                    let str = this.$route.params.path;
                    let str1 = str.substr(0, 1);
                    let str2 = window.location.host;
                    if(str1 == '/'){
                        this.path ='https://' + str2 +  this.$route.params.path;
                    }else{
                        this.path = 'https://'+str2 +'/'+  this.$route.params.path;
                    }
                    
                }
            }
            console.log(this.path)
		},
    },
  methods:{
  }

}
</script>

<style lang="css" >
</style>
