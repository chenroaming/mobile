import Util from '@/libs/util.js'

const service = Util.ajax

export function upload(file,lawCaseId, uploadType, evidenceId, litigantId) {
    let params = new FormData()
    params.append('file', file)
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    if(evidenceId==null){
        var str = '/court/evidenceManage/upEvidence.jhtml?lawCaseId='+lawCaseId+'&uploadType='+uploadType;
    }else{
        var str = '/court/evidenceManage/upEvidence.jhtml?lawCaseId='+lawCaseId+'&evidenceId='+evidenceId+'&uploadType='+uploadType;
    }

    return service.post(str, params, config)
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
export function addEvidence (evidenceId, litigantId) {
    const params = {
        evidenceId,
        litigantId
    };
    return service({
        url: '/court/evidenceManage/addEvidence.jhtml',
        method: 'get',
        params
    });
}
export function delAttachMent (attachId) {
  const params = {
    attachId
  };
  return service({
      url: '/court/evidenceManage/delAttachMent.jhtml',
      method: 'get',
      params
  });
}

  export function saveSendImage(lawCaseId, litigantId, sendImageArray) {
    const params = {
      lawCaseId,
      litigantId,
      sendImageArray
    }
    return service({
      url: '/mobile/send/saveSendImage.jhtml',
      method: 'get',
      params
    })
  }

  export function receiveDocument(lawCaseId, litigantId) {
    const params = {
      lawCaseId,
      litigantId
    }
    return service({
      url: '/court/evidenceManage/findEvidenAbout1.jhtml',
      method: 'get',
      params
    })
  }

  export function receiveDocumentConfirm(lawCaseId, litigantId) {
    const params = {
      lawCaseId,
      litigantId,
      type: 1
    }
    return service({
      url: '/mobile/send/receiveDocumentConfirm.jhtml',
      method: 'get',
      params
    })
  }
