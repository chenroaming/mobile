import Util from '@/libs/util.js'

const service = Util.ajax


/**
 * 获取案件列表
 */
export function getList (searchData, pageData) {
    const params = {
        caseNo: searchData.caseNo,
        litigantName: searchData.litigantName,
        states: searchData.states,
        briefName: searchData.briefName,
        filingDate: searchData.filingDate,
        pageSize: pageData.pageSize,
        pageNumber: pageData.pageNumber,
        number:pageData.number,
        size:pageData.size
    };
    return service({
        url: '/qtw/controversy/lawcaselist.jhtml',
        method: 'get',
        params
    });
}

/**
 * 获得证据列表
 */
export function getEvi (lawCaseId, isself) {
	const params = {
        lawCaseId,
        isself
    };
    return service({
        url: '/qtw/evi/getEviByCaseId.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 获得质证意见列表
 */
export function getReverts (lawCaseId) {
	const params = {
        lawCaseId,
    };
    return service({
        url: '/qtw/reverts/getReverts.jhtml',
        method: 'GET',
        params
    });
}


/**
 * 添加修改证据
 */
export function editEvi (file, lawCaseId, eviprove, eviname,evisource, pageNo, evidenceId, litigantId) {
    let params = new FormData()
    for(var i=0;i<file.length;i++){
        params.append('file', file[i])
    }
    let config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    var str = '/qtw/evi/editEvi.jhtml?lawCaseId='+lawCaseId+'&eviprove='+eviprove+'&eviname='+eviname+'&evisource='+evisource+'&pageNo='+pageNo+'&evidenceId='+evidenceId+'&litigantId='+litigantId;
    return service.post(str, params, config)
}

/**
 * 根据证据id删除证据
 */
export function delEvidence (lawCaseId, evidenceId) {
	const params = {
        lawCaseId,
        evidenceId
    };
    return service({
        url: '/qtw/evi/delEvidence.jhtml',
        method: 'GET',
        params
    });
}
/**
 * 删除证据附件
 */
export function deleteFile (lawCaseId, evidenceId, fileId) {
	const params = {
        lawCaseId,
        evidenceId,
        fileId
    };
    return service({
        url: '/qtw/filepath/deleteFile.jhtml',
        method: 'GET',
        params
    });
}

/**
 * 根据证据id提交证据
 */
export function checkEvi (lawCaseId, evidenceId) {
	const params = {
        lawCaseId,
        evidenceId
    };
    return service({
        url: '/qtw/evi/checkEvi.jhtml',
        method: 'post',
        params
    });
}
/**
 * 根据证据id获得证据详情
 */
export function getEviById (lawCaseId, evidenceId) {
	const params = {
        lawCaseId,
        evidenceId
    };
    return service({
        url: '/qtw/evi/getEviById.jhtml',
        method: 'post',
        params
    });
}