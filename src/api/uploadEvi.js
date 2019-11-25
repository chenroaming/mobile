import Util from '@/libs/util.js'

const service = Util.ajax

/**
 * 上传证据图片
 */
export function upfile (file,recordId) {
    const params = new FormData()
    params.append('file', file)
    params.append('recordId',recordId)
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    // const str = '/mediate/proof/uploadProof.jhtml?recordId=' + recordId;
    const str = '/mediate/proof/uploadProof.jhtml';
    // const strs = encodeURI(str);
    return service.post(str,params,config);
}

/**
 * 删除证据图片
 */
export function delProofUrl (urlId) {
    const params = {
        urlId
    }
    return service({
        url: '/mediate/proof/delProofUrl.jhtml',
        method: 'post',
        params
    })
}

/**
 * 保存证据
 */
export function saveProof (roomId,recordId,dataList) {
    const data = {
        roomId,
        recordId,
        dataList
    }
    return service({
        url: '/mediate/proof/saveProof.jhtml',
        method: 'post',
        data
    })
}
