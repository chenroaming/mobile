import Util from '@/libs/util.js'

const service = Util.ajax

/**
 * 获得质证意见列表
 */
export function getOnlineEvidences (eventKey) {
	const params = {
        eventKey,
    };
    return service({
        url: '/main/getOnlineEvidences.jhtml',
        method: 'GET',
        params
    });
}


