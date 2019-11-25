import Util from '@/libs/util.js'

const service = Util.ajax

export function auth(code, lawCaseId) {
  const params = {
    code,
    lawCaseId
  }
  return service({
    url: '/main/weChatScan.jhtml',
    method: 'get',
    params
  })
}
/**
 * 当事人
 */
export function authLiti(code) {
  const params = {
    code
  }
  return service({
    url: '/main/weChatOpen.jhtml',
    method: 'get',
    params
  })
}

// /**
//  * 提交签字文书
//  */
// export function postText(onlineRoomId,litigantId,image,lawyerId,judgeId) {
//   const data = {
//     onlineRoomId,
//     litigantId,
//     image,
//     lawyerId,
//     judgeId
//   }
//   return service({
//     url: '/main/getSignature.jhtml',
//     method: 'post',
//     data
//   })
// }

/**
 * 提交签字文书
 */
export function postText(image,roomId,pantId,judgeId,judicialId,recordId) {
  const data = {
    image,roomId,pantId,judgeId,judicialId,recordId
  }
  return service({
    url: '/mediate/getSignature.jhtml',
    method: 'post',
    data
  })
}

/**
 * 上传证据图片
 */
export function upfile (file,recordId) {
    const params = new FormData()
    params.append('file', file)
    params.append('recordId',recordId)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    // const str = '/mediate/proof/uploadProof.jhtml?recordId=' + recordId;
    const str = '/mediate/proof/uploadProof.jhtml';
    // const strs = encodeURI(str);
    return service.post(str,params,config);
}