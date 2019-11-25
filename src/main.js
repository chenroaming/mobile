// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import vuex from 'vuex'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
import VueWechatTitle from 'vue-wechat-title'
import Util from '@/libs/util.js'
import { auth, authLiti } from '@/api/auth.js';
import eruda from 'eruda/eruda.min.js' // 测试工具
import './assets/iconfont/iconfont.css';
import BaiduMap from 'vue-baidu-map'
import Cookies from 'js-cookie'
import infiniteScroll from 'vue-infinite-scroll'

import wx from 'weixin-js-sdk'
import {getwxinfo} from '@/api/setcase.js'
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';
Vue.use(infiniteScroll)

import VideoPlayer from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
Vue.use(VideoPlayer)

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '3s5kFNIlo9hvD8yBEZBvu9DTAQ2y244k'
})

// pdf

// eruda.init() // eruda初始化

Vue.config.productionTip = false

// const FastClick = require('fastclick')
//
// document.addEventListener(
//   'DOMContentLoaded',
//   function() {
//     FastClick.attach(document.body)
//   },
//   false
// )

Vue.use(vuex)
Vue.use(YDUI)
Vue.use(VueWechatTitle)

const store = new vuex.Store({
  state: {
    toPath: '',
    hasLogin: false,
    isLoading: false,
    onlineLawCase:'',
    litigantInfoFristId:'',
    factContent:'',
    opposite:'',
    fromtOrLegalImg:'',
    lawyerImg:'',
    fromtOrLegalImg1:'',

    caseEstablish:false,
    namePath: '', // 签名的路径
    nameDirection: '' //签名显示的方向
    // addressDataStore:''
  },
  mutations: {
    setPhone (state, phone) {
      state.phone = phone
    },
    updateLoadingStatus (state, isLoading) {
      state.isLoading = isLoading
    },
    setLogin (state, hasLogin) {
      state.hasLogin = hasLogin
    },
    setToPath (state, toPath) {
      state.toPath = toPath
    },
    setOnlineLawCase (state, onlineLawCase){
        state.onlineLawCase = onlineLawCase
    },
    setlitigantInfoFristId (state, litigantInfoFristId){
        state.litigantInfoFristId = litigantInfoFristId
    },
    factContent (state, factContent){
        state.factContent = factContent
    },
    opposite (state, opposite){
        state.opposite = opposite
    },
    fromtOrLegalImg (state, fromtOrLegalImg){
        state.fromtOrLegalImg = fromtOrLegalImg
    },
    lawyerImg (state, lawyerImg){
        state.lawyerImg = lawyerImg
    },
    fromtOrLegalImg1 (state, fromtOrLegalImg1){
        state.fromtOrLegalImg1 = fromtOrLegalImg1
    },
    caseEstablish (state){
        state.caseEstablish = true
    },
    namePath (state, namePath){
      state.namePath = namePath
    },
  },
  getters: {
    hasLogin: state => state.hasLogin,
    toPath: state => state.toPath,
    onlineLawCase:state => state.onlineLawCase,
    litigantInfoFristId:state => state.litigantInfoFristId,
    factContent:state => state.factContent,
    opposite:state => state.opposite,
    fromtOrLegalImg:state => state.fromtOrLegalImg,
    lawyerImg:state => state.lawyerImg,
    fromtOrLegalImg1:state => state.fromtOrLegalImg1,
    caseEstablish:state => state.caseEstablish,
    namePath:state => state.namePath,
  }
})

router.beforeEach((to, from, next) => {

  /* 显示加载中动画 */
  store.commit('updateLoadingStatus', true)
  if(to.path == '/mobile/diplomasList'){
    next()
  }else if (store.getters.hasLogin) {
    next()
  } else {
    if ( to.path == '/mobile/weixinCode' || to.path == '/mobile/loginJudge'|| to.path == '/mobile/timePage'
     || to.path == '/mobile/setting' ) 
     {
      next()
    }
    // else if(to.path == '/mobile/litigantLogin'){
    //   next()
    // } else 
    // {
      const curRouterObj = Util.getRouterObjByName(
        router,
        to.name
      );
      // console.log(curRouterObj)
       if(
         to.path == '/mobile/caseList'|| 
        to.path == '/mobile/caseList-new'
        || to.path == '/mobile/mycase' 
        || to.path == '/mobile/setcase' 
      ){
        var code = Util.GetUrlParam('code')
        var redirect_uri = encodeURIComponent('https://' + window.location.host + to.fullPath)
        if (code) {
          store.commit('setToPath', to.fullPath)
          authLiti(code).then(res => {
              console.log(res)
            if (res.data.state == 100) {
              store.commit('setLogin', true)
              next()
            } else if(to.path == '/mobile/caseList') {
              next({
                name: 'litigantLogin'
              })
            }else if(to.path == '/mobile/caseList-new'){
              next({
                name: 'loginJudge'
              })
            }else if(to.path == '/mobile/mycase'){
                window.localStorage.setItem('backPath',to.name)
              next({
                name: 'litigantLogin',
                // params: { backPath: to.name }
              })
            }else if(to.path == '/mobile/setcase'){
                window.localStorage.setItem('backPath',to.name)
              next({
                name: 'litigantLogin',
                // params: { backPath: to.name }
              })
            }
          })
        } else {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bbc3c1b5084a715&redirect_uri=' + redirect_uri
           + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
        }
      }
     
      
      
      else if ( to.path == '/mobile/checkSendCourt' || to.path == '/mobile/checkSend'  || to.path == '/mobile/checkSendCourt' || to.path == '/mobile/checkSend' || to.path == '/mobile/map') {
        var code = Util.GetUrlParam('code')
        var lawCaseId = Util.GetUrlParam('lawCaseId')
        var redirect_uri = encodeURIComponent('https://' + window.location.host + to.fullPath)
        console.log(redirect_uri)
        if (code) {
          store.commit('setToPath', to.fullPath)
          auth(code, lawCaseId).then(res => {
            if (res.data.state == 100) {
              store.commit('setLogin', true)
              next()
            } else if(to.path == '/mobile/caseList'){
              next({
                name: 'litigantLogin'
              })
            }
            else {
              next({
                name: 'loginCourt'
              })
            }
          })
        } else {
          window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7bbc3c1b5084a715&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
        }
      } else {
        if(Cookies.get('user') && to.name !== 'litigantLogin'){
          next()
        }else if(!Cookies.get('user') && to.name == 'caseList'){
          store.commit('setToPath', to.fullPath)
          next({
            name: 'litigantLogin'
          })
        }
        else if(!Cookies.get('user') && to.name == 'setcase'){
            store.commit('setToPath', to.fullPath)
            next({
              name: 'litigantLogin',
              params: { backPath: to.name }
            })}
        else if(to.name == 'evidenceList'){
          next()
        }
        else if(curRouterObj 
          && curRouterObj.access == 'noNeed'){
          next()
        }
        else if (!store.getters.hasLogin && to.name !== 'login') {
          // 判断是否已经登录且前往的页面不是登录页
          store.commit('setToPath', to.fullPath)
          next({
            name: 'login'
          })
        } 

        else {
          
          next()
        }
      }
  }
})
router.afterEach(route => {

        // window.scrollTo(0,0);
  /* 隐藏加载中动画 */
  store.commit('updateLoadingStatus', false)
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
