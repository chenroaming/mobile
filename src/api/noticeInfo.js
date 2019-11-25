import Util from '@/libs/util.js';
const service = Util.ajax;



/**
 * 列表
 */
export function wxNoticeCatalog () {
    const params = {

    };
    return service({
        url: '/court/diploms/wxNoticeCatalog.jhtml',
        method: 'get',
        params
    });
}
/**
 * 列表详情
 */
export function wxNoticeInfo (caseId) {
    const params = {
        id:caseId
    };
    return service({
        url: '/court/diploms/wxNoticeInfo.jhtml',
        method: 'get',
        params
    });
}
/**
 * 地址确认书
 */
export function resultLitigant (params) {
    return service({
        url: '/court/litigant/resultLitigant.jhtml',
        method: 'get',
        params
    });
}
/**
 * 地址确认书
 */
export function saveConfrimInfo (data) {
    // const params = data
    return service({
        url: '/court/litigant/saveConfrimInfo.jhtml',
        method: 'post',
        data
    });
}
/**
 * 公告历史
 */
export function getDiplomsList (params) {
    return service({
        url: '/court/send/getDiplomsList.jhtml',
        method: 'get',
        params
    });
}