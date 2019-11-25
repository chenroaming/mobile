import Util from '@/libs/util.js'

const service = Util.ajax

export function wxImageLawCaseInfo(lawCaseId, litigantId, sendId, type) {
    const params = {
        lawCaseId,
        litigantId,
        sendId,
        type
    }
    return service({
      url: '/main/wxImageLawCaseInfo.jhtml',
      method: 'get',
      params
    })
  }

  export function wxDiplomsDownload(lawCaseId, litigantId, sendId, type) {
    const params = {
        lawCaseId,
        litigantId,
        sendId,
        type
    }
    return service({
      url: '/dp/wxDiplomsDownload.jhtml',
      method: 'get',
      params
    })
  }
  export function getWxImageUrl(code,lawCaseId, litigantId, sendId, type) {
    const params = {
        code,
        lawCaseId,
        litigantId,
        sendId,
        type
    }
    return service({
      url: '/main/getWxImageUrl.jhtml',
      method: 'get',
      params
    })
  }
  