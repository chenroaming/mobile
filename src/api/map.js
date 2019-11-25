import Util from '@/libs/util.js'

const service = Util.ajax

export function geTConfig(url) {
  const params = {
    url
  }
  return service({
    url: '/court/weixin/getWxSign.jhtml',
    method: 'post',
    params
  })
}
export function geTAddress() {
  // const params = {
  //   url
  // }
  return service({
    url: '/court/case/getAddress.jhtml',
    method: 'post'
    // params
  })
}
