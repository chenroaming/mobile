import Util from '@/libs/util.js'

const service = Util.ajax

export function historyDiplomas(lawCaseId) {
  const params = {
    lawCaseId
  }
  return service({
    url: '/dp/historyDiplomas.jhtml',
    method: 'get',
    params
  })
}
