import axios from 'axios'
import wechatRouter from '../router'
import wx from 'weixin-js-sdk'
let util = {}

util.ajax = axios.create({
  baseURL: '/api',
  timeout: 30000
})

util.GetUrlParam = function (paraName) {
  var url = document.location.toString()
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

util.GetStrParam = function (paraName, str) {
  var url = str.toString()
  var arrObj = url.split('?')
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&')
    var arr
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=')
      if (arr != null && arr[0] == paraName) {
        return arr[1]
      }
    }
    return ''
  } else {
    return ''
  }
}

util.getRouterObjByName = function (routers, name) {
  // console.log(8883)
  // console.log(name)
  // console.log(routers.options.routes)
  if (!name || !routers ) {
      return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers.options.routes) {
      if (item.name === name) {
          return item;
      }
      // routerObj = util.getRouterObjByName(item.children, name);
      // if (routerObj) {
      //     return routerObj;
      // }
  }
  // return null;
};

util.addEvent = function (element, evnt, funct){
    if (element.attachEvent)
        return element.attachEvent('on'+evnt, funct);
    else
        return element.addEventListener(evnt, funct, false);
}

util.timestampToTime=function (timestamp) {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() + ' ';
    return Y+M+D;
}

export default util
