import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// export const wechatRouter = [
//   {
//     path: '/mobile/checkSendCourt',
//     name: 'checkSendCourt',
//     title: '送达确认',
//     component: resolve => require(['../components/checkSendCourt.vue'], resolve)
//   },
// ]

// export const otherRouter = [
//   {
//     path: '/mobile/weixinCode',
//     name: 'weixinCode',
//     title: '文书验证',
//     component: resolve => require(['../components/weixinCode.vue'], resolve)
//   },
//   {
//     path: '/mobile/loginJudge',
//     name: 'loginJudge',
//     title: '法官登录',
//     component: resolve => require(['../components/loginJudge.vue'], resolve)
//   },
//   {
//     path: '/mobile/timePage',
//     name: 'timePage',
//     title: '时间轴',
//     component: resolve => require(['../components/timePage.vue'], resolve)
//   },
//   {
//     path: '/mobile/setting',
//     name: 'setting',
//     title: '正在开发中。。',
//     component: resolve => require(['../components/setting.vue'], resolve)
//   },
// ]

export default new Router({
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    //    },
  mode: 'history',
//   routes: r,
    
  routes: [
    {
      path: '/mobile',
      name: 'login',
      title: '登录',
      meta: {
        notabbar: true
      },
      component: resolve => require(['../components/login.vue'], resolve)
    },
    {
      path: '/mobile/litigantLogin',
      name: 'litigantLogin',
      access: 'noNeed',
      title: '登录',
      meta: {
        notabbar: true
      },
      component: resolve => require(['../components/litigantLogin.vue'], resolve)
    },
    {
      path: '/mobile/loginCourt',
      name: 'loginCourt',
      access: 'noNeed',
      title: '登录',
      meta: {
        notabbar: true
      },
      component: resolve => require(['../components/loginCourt.vue'], resolve)
    },
    {
      path: '/mobile/map',
      name: 'map',
      title: '地图',
      component: resolve => require(['../components/map.vue'], resolve)
    },
    {
      path: '/mobile/service',
      name: 'service',
      title: '文书送达',
      component: resolve => require(['../components/service.vue'], resolve)
    },
    {
      path: '/mobile/schedule',
      name: 'schedule',
      title: '庭审排期',
      component: resolve => require(['../components/schedule.vue'], resolve)
    },
    {
      path: '/mobile/sendType',
      name: 'sendType',
      title: '送达方式',
      component: resolve => require(['../components/sendType.vue'], resolve)
    },
    {
      path: '/mobile/notice',
      name: 'notice',
      title: '公告刊登',
      component: resolve => require(['../components/notice.vue'], resolve)
    },
    {
      path: '/mobile/checkSend',
      name: 'checkSend',
      title: '送达确认',
      component: resolve => require(['../components/checkSend.vue'], resolve)
    },
    {
      path: '/mobile/checkSendCourt',
      name: 'checkSendCourt',
      access: 'noNeed',
      title: '送达确认',
      component: resolve => require(['../components/checkSendCourt.vue'], resolve)
    },
    {
      path: '/mobile/courtDate',
      name: 'courtDate',
      title: '庭审排期',
      component: resolve => require(['../components/courtDate.vue'], resolve)
    },
    {
      path: '/mobile/testLogin',
      name: 'testLogin',
      title: '开发登入',
      component: resolve => require(['../components/testLogin.vue'], resolve)
    },
    {
      path: '/mobile/uploadEvidence',
      name: 'uploadEvidence',
      access: 'noNeed',
      title: '证据上传',
      component: resolve => require(['../components/uploadEvidence.vue'], resolve)
    },
    {
      path: '/mobile/uploadNotice',
      name: 'uploadNotice',
      title: '公告上传',
      component: resolve => require(['../components/uploadNotice.vue'], resolve)
    },
    {
      path: '/mobile/evidenceList',
      name: 'evidenceList',
      title: '证据列表',
      component: resolve => require(['../components/evidenceList.vue'], resolve)
    },
    {
      path: '/mobile/addEvidence',
      name: 'addEvidence',
      title: '添加证据',
      component: resolve => require(['../components/addEvidence.vue'], resolve)
    },
    {
      path: '/mobile/editEvidence',
      name: 'editEvidence',
      title: '编辑证据',
      component: resolve => require(['../components/editEvidence.vue'], resolve)
    },
    {
      path: '/mobile/courtCaseList',
      name: 'courtCaseList',
      title: '案件列表',
      component: resolve => require(['../components/courtCaseList.vue'], resolve)
    },
    {
      path: '/mobile/caseList',
      name: 'caseList',
      title: '案件列表',
      component: resolve => require(['../components/caseList.vue'], resolve)
    },
    {
      path: '/mobile/diplomasList',
      name: 'diplomasList',
      title: '文书列表',
      component: resolve => require(['../components/diplomasList.vue'], resolve)
    },
    {
      path: '/mobile/caseList-new',
      name: 'caseList-new',
      title: '案件列表（新）',
      component: resolve => require(['../components/caseList-new.vue'], resolve)
    },
    {
      path: '/mobile/timePage',
      name: 'timePage',
      access: 'noNeed',
      title: '时间轴',
      component: resolve => require(['../components/timePage.vue'], resolve)
    },
    {
      path: '/mobile/face',
      name: 'face',
      access: 'noNeed',
      title: '活体检测',
      component: resolve => require(['../components/linkFace.vue'], resolve)
    },
    {
      path: '/mobile/weixinCode',
      name: 'weixinCode',
      access: 'noNeed',
      title: '文书验证',
      component: resolve => require(['../components/weixinCode.vue'], resolve)
    },
    {
      path: '/mobile/loginJudge',
      name: 'loginJudge',
      access: 'noNeed',
      title: '法官登录',
      component: resolve => require(['../components/loginJudge.vue'], resolve)
    },
    {
      path: '/mobile/wechatCodeLogin',
      name: 'wechatCodeLogin',
      access: 'noNeed',
      title: '登录验证',
      component: resolve => require(['../components/wechatCodeLogin.vue'], resolve)
    },
    {
      path: '/mobile/handDraw',
      name: 'handDraw',
      access: 'noNeed',
      title: '手写板',
      component: resolve => require(['../components/handDraw.vue'], resolve)
    },
    {
      path: '/mobile/uploadEvi',
      name: 'uploadEvi',
      access: 'noNeed',
      title: '上传证据',
      component: resolve => require(['../components/uploadEvi.vue'], resolve)
    },
    {
      path: '/mobile/setting',
      name: 'setting',
      access: 'noNeed',
      title: '正在开发中。。',
      component: resolve => require(['../components/setting.vue'], resolve)
    },
    {
      path: '/mobile/diplomasStep',
      name: 'diplomasStep',
      access: 'noNeed',
      title: '历史文书',
      component: resolve => require(['../views/diplomasStep/diplomasStep.vue'], resolve),
    },
    {
      path: '/mobile/diplomsDownload',
      name: 'diplomsDownload',
      access: 'noNeed',
      title: '文书下载',
      component: resolve => require(['../components/diplomsDownload.vue'], resolve)
    },
    //单页 --- satrt---
    {
      path: '/mobile/show',
      name: 'show',
      access: 'noNeed',
      title: '正在开发中。。',
      component: resolve => require(['../components/show.vue'], resolve)
    },
    {
      path: '/mobile/videoShow',
      name: 'videoShow',
      access: 'noNeed',
      title: '视频播放',
      component: resolve => require(['../components/videoShow.vue'], resolve)
    },
    {
      path: '/mobile/onlineGuide',
      name: 'onlineGuide',
      access: 'noNeed',
      title: '在线诉讼指南',
      component: resolve => require(['../views/singlePage/onlineGuide.vue'], resolve)
    },
    {
      path: '/mobile/dossierIndex',
      name: 'dossierIndex',
      access: 'noNeed',
      title: '卷宗GPS首页',
      component: resolve => require(['../components/dossierIndex.vue'], resolve)
    },
    {
      path: '/mobile/dossierLook',
      name: 'dossierLook',
      access: 'noNeed',
      title: '卷宗查询',
      component: resolve => require(['../components/dossierLook.vue'], resolve)
    },
    {
      path: '/mobile/dossierScan',
      name: 'dossierScan',
      access: 'noNeed',
      title: '卷宗扫描',
      component: resolve => require(['../components/dossierScan.vue'], resolve)
    },
    {
      path: '/mobile/dossierInfo',
      name: 'dossierInfo',
      access: 'noNeed',
      title: '卷宗信息',
      component: resolve => require(['../components/dossierInfo.vue'], resolve)
    },
    {
      path: '/mobile/dossierLogin',
      name: 'dossierLogin',
      access: 'noNeed',
      title: '帐号绑定微信',
      component: resolve => require(['../components/dossierLogin.vue'], resolve)
    },
    {
      path: '/mobile/sendAddressConfirm',
      name: 'sendAddressConfirm',
      access: 'noNeed',
      title: '送达地址确认书',
      component: resolve => require(['../components/sendAddressConfirm.vue'], resolve)
    },
    {
      path: '/mobile/noticeList',
      name: 'noticeList',
      access: 'noNeed',
      title: '公告列表',
      component: resolve => require(['../components/noticeList.vue'], resolve)
    },
    {
      path: '/mobile/noticeInfo',
      name: 'noticeInfo',
      access: 'noNeed',
      title: '公告详情',
      component: resolve => require(['../components/noticeInfo.vue'], resolve)
    },
    {
      path: '/mobile/documentHistory',
      name: 'documentHistory',
      access: 'noNeed',
      title: '文书历史',
      component: resolve => require(['../components/documentHistory.vue'], resolve)
    },
    {
      path: '/mobile/documentHistoryInfo',
      name: 'documentHistoryInfo',
      access: 'noNeed',
      title: '文书历史详情',
      component: resolve => require(['../components/documentHistoryInfo.vue'], resolve)
    },
    {
      path: '/mobile/demo',
      name: 'demo',
      access: 'noNeed',
      title: '文书历史详情',
      component: resolve => require(['../components/demo.vue'], resolve)
    },
    {
      path: '/mobile/demo1',
      name: 'demo1',
      access: 'noNeed',
      title: '文书历史详情',
      component: resolve => require(['../components/demo1.vue'], resolve)
    },
    //单页 --- end---
// 我的案件相关组件页面路由配置
    {
      path: '/mobile/mycase',
      name: 'mycase',
      title: '我的案件',
      component: resolve => require(['../views/myCase/myCase.vue'], resolve),
      meta:{
        title:'我的案件',
        index:0
      }
    },
    {
      path: '/mobile/sendAdress',
      name: 'sendAdress',
      access: 'noNeed',
      title: '送达地址确认',
      component: resolve => require(['../views/myCase/sendAdress.vue'], resolve),
      meta:{
        title:'送达地址确认',
        index:1
      }
    },
    
    {
      path: '/mobile/caseInfo',
      name: 'caseInfo',
      access: 'noNeed',
      title: '案件信息',
      component: resolve => require(['../views/myCase/caseInfo.vue'], resolve),
      meta:{
        title:'我的案件',
        index:2
      }
    },
    {
      path: '/mobile/casediplomasList',
      name: 'casediplomasList',
      access: 'noNeed',
      title: '文书列表',
      component: resolve => require(['../views/myCase/diplomasList.vue'], resolve),
      meta:{
        title:'文书列表',
        index:3
      }
    },
    {
      path: '/mobile/caseAllEvdence',
      name: 'caseAllEvdence',
      access: 'noNeed',
      title: '案件质证证据列表',
      component: resolve => require(['../views/myCase/caseAllEvdence.vue'], resolve),
      meta:{
        title:'案件质证证据列表',
        index:4
      }
    },
    {
      path: '/mobile/evidenceInfo',
      name: 'evidenceInfo',
      access: 'noNeed',
      title: '证据信息',
      component: resolve => require(['../views/myCase/evidenceInfo.vue'], resolve),
      meta:{
        title:'证据信息',
        index:5
      }
    },
    {
      path: '/mobile/addWitness',
      name: 'addWitness',
      access: 'noNeed',
      title: '质证意见',
      component: resolve => require(['../views/myCase/addWitness.vue'], resolve),
      meta:{
        title:'质证意见',
        index:6
      }
    },
    {
      path: '/mobile/dipDetail',
      name: 'dipDetail',
      access: 'noNeed',
      title: '文书预览',
      component: resolve => require(['../views/myCase/dipDetail.vue'], resolve),
      meta:{
        title:'文书预览',
        index:7
      }
    },
    {
      path: '/mobile/evidenceList-mycase',
      name: 'evidenceList-mycase',
      access: 'noNeed',
      title: '我的证据列表',
      component: resolve => require(['../views/myCase/evidenceList.vue'], resolve),
      meta:{
        title:'我的证据列表',
        index:8
      }
    },
    {
      path: '/mobile/editEvidence-mycase',
      name: 'editEvidence-mycase',
      access: 'noNeed',
      title: '编辑证据',
      component: resolve => require(['../views/myCase/editEvidence.vue'], resolve),
      meta:{
        title:'编辑证据',
        index:9
      }
    },
    {
      path: '/mobile/addEvidence-mycase',
      name: 'addEvidence-mycase',
      access: 'noNeed',
      title: '添加证据',
      component: resolve => require(['../views/myCase/addEvidence.vue'], resolve),
      meta:{
        title:'添加证据',
        index:10
      }
    },

// 在线立案相关组件页面路由配置


    {
      path: '/mobile/setcase',
      name: 'setcase',
      access: 'noNeed',
      title: '在线立案',
      component: resolve => require(['../views/setcase/setcase.vue'], resolve),
      meta:{
          title:'您的身份',
          index:1
      }
    },
    {
      path: '/mobile/setcase/claimInfo',
      name: 'claimInfo',
      access: 'noNeed',
      title: '在线立案',
      component: resolve => require(['../views/setcase/claimInfo.vue'], resolve),
      meta:{
          title:'诉讼请求与标的',
          index:2
      }
    },
    {
      path: '/mobile/setcase/factSD',
      name: 'factSD',
      access: 'noNeed',
      title: '在线立案',
      component: resolve => require(['../views/setcase/factSD.vue'], resolve),
      meta:{
          title:'事由编写',
          index:3
      }
    },
    {
      path: '/mobile/setcase/infoList',
      name: 'infoList',
      access: 'noNeed',
      title: '填写立案信息',
      component: resolve => require(['../views/setcase/infoList.vue'], resolve),
      meta:{
          title:'填写立案信息',
          index:4
      }
    },
    {
      path: '/mobile/setcase/Defendant',
      name: 'Defendant',
      access: 'noNeed',
      title: '填写被告信息',
      component: resolve => require(['../views/setcase/Defendant.vue'], resolve),
      meta:{
          title:'填写被告信息',
          index:5
      }
    },
    {
      path: '/mobile/setcase/addPlaintiffInfo',
      name: 'addPlaintiffInfo',
      access: 'noNeed',
      title: '填写原告信息',
      component: resolve => require(['../views/setcase/addPlaintiffInfo.vue'], resolve),
      meta:{
          title:'填写原告信息',
          index:5
      }
    },
    {
      path: '/mobile/setcase/addPlaintiffInfoSec',
      name: 'addPlaintiffInfoSec',
      access: 'noNeed',
      title: '填写原告信息(第二步)',
      component: resolve => require(['../views/setcase/addPlaintiffInfoSec.vue'], resolve),
      meta:{
          title:'填写原告信息(第二步)',
          index:6
      }
    },
    {
        path: '/mobile/setcase/addPlaintiffInfoSecLegal',
        name: 'addPlaintiffInfoSecLegal',
        access: 'noNeed',
        title: '填写原告信息(第二步)',
        component: resolve => require(['../views/setcase/addPlaintiffInfoSecLegal.vue'], resolve),
        meta:{
            title:'填写原告(法人)信息(第二步)',
            index:6
        }
    },
    {
      path: '/mobile/setcase/addPlaintiffInfoThr',
      name: 'addPlaintiffInfoThr',
      access: 'noNeed',
      title: '填写原告信息(第三步)',
      component: resolve => require(['../views/setcase/addPlaintiffInfoThr.vue'], resolve),
      meta:{
          title:'填写原告信息(第三步)',
          index:7
      }
    },
    {
      path: '/mobile/setcase/thirdPeo',
      name: 'thirdPeo',
      access: 'noNeed',
      title: '填写第三人信息',
      component: resolve => require(['../views/setcase/thirdPeo.vue'], resolve),
      meta:{
          title:'填写第三人信息',
          index:5
      }
    },
    {
      path: '/mobile/setcase/EvidenceMaterial',
      name: 'EvidenceMaterial',
      access: 'noNeed',
      title: '证据材料',
      component: resolve => require(['../views/setcase/EvidenceMaterial.vue'], resolve),
      meta:{
          title:'证据材料',
          index:5
      }
    },
    {
        path: '/mobile/setcase/Lawyer',
        name: 'Lawyer',
        access: 'noNeed',
        title: '添加代理人',
        component: resolve => require(['../views/setcase/Lawyer.vue'], resolve),
        meta:{
            title:'添加代理人',
            index:5
        }
    },
    {
        path: '/mobile/setcase/LawyerInfo',
        name: 'LawyerInfo',
        access: 'noNeed',
        title: '添加代理人',
        component: resolve => require(['../views/setcase/LawyerInfo.vue'], resolve),
        meta:{
            title:'添加代理人',
            index:6
        }
    },
    {
        path: '/mobile/setcase/setcaseSuccess',
        name: 'setcaseSuccess',
        access: 'noNeed',
        title: '立案成功',
        component: resolve => require(['../views/setcase/setcaseSuccess.vue'], resolve),
        meta:{
            title:'立案成功',
            index:7
        }
    },
    {
        path: '/mobile/setcase/handDrawSuccess',
        name: 'handDrawSuccess',
        access: 'noNeed',
        title: '签名成功',
        component: resolve => require(['../views/setcase/handDrawSuccess.vue'], resolve),
        meta:{
            title:'签名成功',
            index:7
        }
    },
    {
        path: '/mobile/operation',
        name: 'operation',
        access: 'noNeed',
        title: '操作说明',
        component: resolve => require(['../views/operation.vue'], resolve),
        meta:{
            title:'操作说明',
            index:7
        }
    },
    {
        path: '/mobile/listNotice',
        name: 'listNotice',
        access: 'noNeed',
        title: '通知列表',
        component: resolve => require(['../views/listNotice.vue'], resolve),
        meta:{
            title:'通知列表',
            index:7
        }
    },
    
    // {
    //   path: '/mobile/sendAddressConfirm11',
    //   name: 'sendAddressConfirm11',
    //   access: 'noNeed',
    //   title: '操作说明1111',
    //   component: resolve => require(['../views/sendAddressConfirm11.vue'], resolve),
    //   meta:{
    //       title:'操作说明1111',
    //       index:7
    //   }
  
  ],


//   scrollBehavior (to, from, savedPosition) {
//     return { x: 0, y: 0 }
//   }


})

// export const routers = [
//   RouterApp,
//   wechatRouter,
//   otherRouter
// ];
