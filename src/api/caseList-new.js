import Util from '@/libs/util.js'

const service = Util.ajax

export function geTCaseList(caseNo,judgeName,clerkName,pageNumber,pageSize) {
  const params = {
    caseNo,
    judgeName,
    clerkName,
    pageNumber,
    pageSize
  }
  return service({
    url: '/court/case/distributiveLawCase/lawCase.jhtml?brief=&servicePersonnelName=',
    method: 'post',
    params
  })
}
export function getTimePage(lawCaseId) {
  const params = {
    lawCaseId
  }
  return service({
    url: '/main/queryProcessNote.jhtml',
    method: 'get',
    params
  })
}
