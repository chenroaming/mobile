<template>
  <yd-layout id="app">
    
    <transition :name="transitionName">
      <!-- <keep-alive> -->
        <!-- <div v-show="isLoading">加载中</div> -->
        <router-view/>
      <!-- </keep-alive> -->
    </transition>
    
  </yd-layout>
</template>

<script>
import wx from 'weixin-js-sdk'
import {getwxinfo} from '@/api/setcase.js'
export default {
  name: 'App',
  data(){
      return {
          transitionName:''
      }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
    created() {
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
            let url=location.href.split("#")[0];
            // getwxinfo(url).then(res => {
            //     wx.config({
            //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            //         appId: res.data.appId, // 必填，公众号的唯一标识
            //         timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
            //         nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
            //         signature: res.data.signature,// 必填，签名，见附录1
            //         jsApiList: ['chooseImage', 'uploadImage', 'previewImage' ,'getLocalImgData','downloadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'hideMenuItems', 'scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            //     });
            // })
        }
        if (sessionStorage.getItem("store") ) {
            this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
        } 

        //在页面刷新时将vuex里的信息保存到sessionStorage里
        window.addEventListener("beforeunload",()=>{
            sessionStorage.setItem("store",JSON.stringify(this.$store.state))
        })
        
    },
    watch: {//使用watch 监听$router的变化
        $route(to, from) {
            //如果to的索引值为0，不添加任何动画；如果to索引大于from索引,判断为前进状态,反之则为后退状态
            if(to.meta.index > 0){
                if( to.meta.index < from.meta.index){
                    this.transitionName = 'slide-right';
                }else{
                    this.transitionName = 'slide-left';
                }
            }else if(to.meta.index == 0 && from.meta.index > 0){
                this.transitionName = 'slide-right';
            }

            //当然，如果你没有需要设置索引值为0的页面可以直接用着一段
            /*if( to.meta.index < from.meta.index){
                  this.transitionName = 'slide-right';
            }else{
                  this.transitionName = 'slide-left';
            }*/
        }
    }
}
</script>

<style>
#app {
  font-family: 'yahei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  background: #fff;
}
.yd-flexview{
  margin: 0
}
.yd-scrollview:after {
    content: "";
    display: block;
    width: 100%;
    height: 0rem;
}
#scrollView {
  background: #fff;
}
#scrollView {
  background-color: #f1f2f6;
}
    * {
        margin: 0;
        padding: 0;
        -webkit-overflow-scrolling: touch;
        -webkit-tap-highlight-color: transparent;
        font-family: arial;
        /* color: #333; */
        -webkit-user-select: auto;
    }

    html {
        font-family: arail;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        line-height: 1;
        font-size: 20px;
        height:100%;
        overflow-x: hidden;
    }
    body{
        position: relative;
        overflow-x: hidden;
        background: #f0f2f5;
        min-height:100%;
        /* display: flex; */
        flex-direction: column;
    }
    #app{
        /* display: flex; */
        flex:1;
        flex-direction: column;
        background: #f0f2f5;
    }
    img {
        display: block;
    }
    ul,ol{
        list-style: none;
    }
    a{
        text-decoration: none;
        outline: none;
    }
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all .3s;
        position: absolute;
        width:100%;
        left:0;
    }
    .slide-right-enter {
        transform: translateX(-100%);
    }
    .slide-right-leave-active {
        transform: translateX(100%);
    }
    .slide-left-enter {
        transform: translateX(100%);
    }
    .slide-left-leave-active {
        transform: translateX(-100%);
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
    .yd-font-span16{
        font-size: 16px;
    }
</style>
