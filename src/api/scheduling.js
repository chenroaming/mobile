import Util from '@/libs/util.js'

const service = Util.ajax

export function schedulList(caseId) {
  const params = {
    caseId
  }
  return service({
    url: '/mobile/scheduling/litigant/list.jhtml',
    method: 'get',
    params
  })
}

export function confirm(schedulingId, isConfirm, remark) {
  const params = {
    schedulingId,
    isConfirm,
    remark
  }
  return service({
    url: '/mobile/scheduling/confirm.jhtml',
    method: 'get',
    params
  })
}
