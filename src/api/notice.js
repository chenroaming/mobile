import Util from '@/libs/util.js'

const service = Util.ajax

export function getByCaseId(caseId) {
  const params = {
    caseId
  }
  return service({
    url: '/mobile/notice/getByCaseId.jhtml',
    method: 'get',
    params
  })
}

export function chgCheck(caseId, releaseDate, newspaper) {
  const params = {
    caseId,
    releaseDate,
    newspaper
  }
  return service({
    url: '/mobile/notice/chgCheck.jhtml',
    method: 'get',
    params
  })
}
export function upload(file,shendId,lawCaseId) {
  let params = new FormData()
  params.append('file', file)
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  var str = '/mobile/notice/upNoticeAttach.jhtml?shendId='+shendId+'&lawCaseId='+lawCaseId;
  return service.post(str, params, config)
}

export function delAttachMent (attachId) {
  const params = {
    attachId
  };
  return service({
      url: '/mobile/notice/delAttachMent.jhtml',
      method: 'get',
      params
  });
}

export function download(lawCaseId, sendId) {
  const params = {
    lawCaseId,
    sendId
  }
  return service({
    url: '/mobile/send/downloadNoticeContent.jhtml',
    method: 'get',
    params
  })
}
export function SendInfo(lawCaseId, sendId) {
  const params = {
    lawCaseId,
    sendId
  }
  return service({
    url: '/mobile/send/smsNoticeSendInfo.jhtml',
    method: 'get',
    params
  })
}
