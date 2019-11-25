import Util from '@/libs/util.js'

const service = Util.ajax

export function orderByTimes(startDate, endDate) {
  const params = {
    startDate,
    endDate,
    pageNumber: 1,
    pageSize: 99
  }
  return service({
    url: '/court/scheduling/list.jhtml',
    method: 'get',
    params
  })
}

export function login(code) {
  const data = {
    username: '姚亮',
    password: '122515',
    code
  }
  return service({
    url: '/main/login.jhtml',
    method: 'post',
    data
  })
}
