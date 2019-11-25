import Util from '@/libs/util.js'

const service = Util.ajax


/**
 * 获得我的案件列表
 * caseNo 案件编号  支持模糊查询
 * isFinsh  是否结案 true和false 
 * regiterTimeSort   立案时间排序  desc 和asc  默认desc
 * pageSize  默认15
 * pageNumber  默认1
 */
export function wxLitigantLawCaseList (caseNo, isFinsh,regiterTimeSort,pageSize,pageNumber) {
	const params = {
        caseNo,
        isFinsh,
        regiterTimeSort,
        pageSize,
        pageNumber
    };
    return service({
        url: '/court/case/wxLitigantLawCaseList.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 保存确认送达地址接口
 * lawCaseId   	案件id
 * sendAddress  	送达地址 
 */
export function wxSaveChoiceSendInfo (lawCaseId, sendAddress) {
	const params = {
        lawCaseId,
        sendAddress,
    };
    return service({
        url: '/mobile/send/wxSaveChoiceSendInfo.jhtml',
        method: 'post',
        params
    });
}

/**
 * 
 * @param {案件ID} lowCaseId 
 */
export function findByCaseLitigant (lowCaseId) {
    const params = {
        lowCaseId
    };
    return service({
        url: '/court/estFile/findByCaseLitigant.jhtml',
        method: 'post',
        params
    });
}

/**
 * 获案件信息
 * @param {案件ID} lowCaseId 
 */
export function wxLawCaseLitigantList (lawCaseId) {
    const params = {
        lawCaseId
    };
    return service({
        url: '/court/case/wxLawCaseLitigantList.jhtml',
        method: 'post',
        params
    });
}

/**
 * 获取证据以及质证信息
 * evidenceId   	证据id
 */
export function getEvidenceReverts (evidenceId) {
	const params = {
        evidenceId
    };
    return service({
        url: '/qtw/reverts/getEvidenceReverts.jhtml',
        method: 'post',
        params
    });
}

/**
 * 添加质证信息
 * evidenceId   	证据id
 * content-内容1；
 * content2-内容2；
 * result-真实性合法性
 */
export function addreverts (evidenceId,content,content2,result) {
	const params = {
        evidenceId,
        content,
        content2,
        result
    };
    return service({
        url: '/qtw/reverts/addrevert.jhtml',
        method: 'post',
        params
    });
}

/**
 * 获取文书列表
 * lawCaseId   	案件id
 * 
 */
export function wxLitigantSendDiplomsList (lawCaseId,pageSize,pageNumber) {
	const params = {
        lawCaseId,
        pageSize,
        pageNumber,
    };
    return service({
        url: '/dp/wxLitigantSendDiplomsList.jhtml',
        method: 'post',
        params
    });
}