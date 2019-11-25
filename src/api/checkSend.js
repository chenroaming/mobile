import Util from '@/libs/util.js'

const service = Util.ajax

export function upload(file) {
  let params = new FormData()
  params.append('file', file)
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' }
  }
  return service.post('/mobile/send/uploadSendImage.jhtml', params, config)
}

export function commissionerDelivery(lawCaseId, litigantId) {
  const params = {
    lawCaseId,
    litigantId
  }
  return service({
    url: '/mobile/send/commissionerDelivery.jhtml',
    method: 'get',
    params
  })
}
export function getLitigantDiplomsEdit(litigantId) {
  const params = {
    litigantId
  }
  return service({
    url: '/dp/getLitigantDiplomsEdit.jhtml',
    method: 'get',
    params
  })
}

export function saveSendImage(lawCaseId, litigantId, sendImageArray, sendId) {
  const params = {
    lawCaseId,
    litigantId,
    sendImageArray,
    sendId
  }
  return service({
    url: '/mobile/send/saveSendImage.jhtml',
    method: 'get',
    params
  })
}

export function receiveDocument(lawCaseId, litigantId, sendId) {
  const params = {
    lawCaseId,
    litigantId,
    sendId
  }
  return service({
    url: '/mobile/send/receiveDocument.jhtml',
    method: 'get',
    params
  })
}

export function receiveDocumentConfirm(lawCaseId, litigantId, sendId) {
  const params = {
    lawCaseId,
    litigantId,
    sendId,
    type: 1
  }
  return service({
    url: '/mobile/send/receiveDocumentConfirm.jhtml',
    method: 'get',
    params
  })
}
