import Util from '@/libs/util.js'

const service = Util.ajax

/**
 *
 */
export function addTimeLine (param) {
	const params = {
        param
    };
    return service({
        url: '/dp/addTimeLine.jhtml',
        method: 'GET',
        params
    });
}


export function queryTimeLine (caseNo) {
	const params = {
        caseNo
    };
    return service({
        url: '/dp/queryTimeLine.jhtml',
        method: 'GET',
        params
    });
}

export function wx1(url){
    const params = {
        url
    };
    return service({
        url: '/main/getwxinfo.jhtml',
        method: 'GET',
        params
    });
}


export function bindingWeiXinByAccount(username,pwd,code,loginType){
    const data = {
        username,
        pwd,
        code,
        loginType
    };
    return service({
        url: '/main/bindingWeiXinByAccount.jhtml',
        method: 'POST',
        data
    });
}

export function code(){
    const params = {
        
    };
    return service({
        url: '/main/code.jhtml',
        method: 'GET',
        params
    });
}


export function bindingWeiXinByPhone(phone,mcode){
    const data = {
        phone,
        mcode
    };
    return service({
        url: '/main/bindingWeiXinByPhone.jhtml',
        method: 'POST',
        data
    });
}

export function phoneCode(phone){
    const params = {
        phone
    };
    return service({
        url: '/main/phoneCode.jhtml',
        method: 'GET',
        params
    });
}


