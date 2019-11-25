import Util from '@/libs/util.js'

const service = Util.ajax

export function getCode(phone, lawCaseId) {
  const params = {
    phone,
    lawCaseId
  }
  return service({
    url: '/main/mcode.jhtml',
    method: 'get',
    params
  })
}

export function login(phone, mcode, lawCaseId) {
  const data = {
    phone,
    mcode,
    lawCaseId
  }
  return service({
    url: '/main/mlogin.jhtml',
    method: 'post',
    data
  })
}




export function weChatlogin(username, password, lawCaseId, isLawcase) {
  const data = {
    username,
    password,
    lawCaseId,
    isLawcase
  }
  return service({
    url: '/main/weChatlogin.jhtml',
    method: 'post',
    data
  })
}

export function phoneLogin (idCard,password,code) {
  const data = {
      idCard,
      password,
      code
  }
  return service({
      url: '/main/phoneLogin.jhtml',
      method: 'post',
      data
  });
}

/**
 * 
 * @param {*} username 用户名
 * @param {*} password 密码
 * @param {*} code 验证码
 * @param {*} loginType 类型
 */
export function loginNew (username, password, code,loginType) {
  const params = {
    username,
    password,
    code,
    loginType
  }
  return service({
    url: '/main/login.jhtml',
    method: 'post',
    params
  })
}


/**
 * [用户登入接口]
 * @param {string} roleType [角色类型]
 * @returns { state: number, message: string } [state:100 成功；101 失败]
 */
export function optionRole (roleType) {
  const params = {
    roleType
  }
  return service({
    url: '/main/optionRole.jhtml',
    method: 'post',
    params
  })
}