import Util from '@/libs/util.js'

const service = Util.ajax

export function sendInfo(lawCaseId) {
  const params = {
    lawCaseId,
    receiveDateStrat: '1520564202185',
    receiveDateEnd: '1520899200000'
  }
  return service({
    url: '/mobile/send/htmlSendInfo.jhtml',
    method: 'get',
    params
  })
}

export function saveSendInfo(params) {
  return service({
    url: '/mobile/send/saveChoiceSendInfo.jhtml',
    method: 'get',
    params
  })
}
