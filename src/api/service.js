import Util from '@/libs/util.js'

const service = Util.ajax

export function getSendDict(lawCaseId) {
  const params = {
    lawCaseId
  }
  return service({
    url: '/mobile/send/phoneDiplmosSendDict.jhtml',
    method: 'get',
    params
  })
}

export function checkedSendDict(lawCaseId, sendId) {
  const params = {
    lawCaseId,
    sendId
  }
  return service({
    url: '/mobile/send/phoneDiplmosSendConfirmRead.jhtml',
    method: 'get',
    params
  })
}

export function download(lawCaseId, sendId) {
  const params = {
    lawCaseId,
    sendId
  }
  return service({
    url: '/mobile/send/downloadDiplomsFile.jhtml',
    method: 'get',
    params
  })
}

export function down() {
  return service({
    url: '/mobile/send/downloadDiplomsFile.jhtml',
    method: 'get'
  })
}
