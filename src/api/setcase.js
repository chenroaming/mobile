import Util from '@/libs/util.js'

const service = Util.ajax
export function saveWXRole(wxRole) {
  const params = {
    wxRole
  }
  return service({
    url: '/online/lawCase/saveWXRole.jhtml',
    method: 'get',
    params
  })
}
/**
 * 案由菜单获取接口
 */
export function briefMenu() {
    const params = {
        
    }
    return service({
        url: '/online/brief/briefMenu.jhtml',
        method: 'get',
        params
    })
}
/**
 * 保存在线案件信息
 */
export function saveLawCaseInfo(type,onlineBriefId,standardMoney,factContent,reasonContent) {
    const data = {
        type,
        onlineBriefId,
        standardMoney,
        factContent,
        reasonContent
    }
    return service({
        url: '/online/lawCase/saveLawCaseInfo.jhtml',
        method: 'post',
        data
    })
}
/**
 * 修改在线案件信息
 */
export function updateLawCaseInfo(type,onlineBriefId,standardMoney,factContent,reasonContent,onlineLawCaseId) {
    const data = {
        type,
        onlineBriefId,
        standardMoney,
        factContent,
        reasonContent,
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/updateLawCaseInfo.jhtml',
        method: 'post',
        data
    })
}
/**
 * 身份证正面/企业执照上传接口
 */
export function uploadFrontImage(photo) {
    const data = {
        photo
    }
    return service({
        url: '/online/litigant/uploadFrontImage.jhtml',
        method: 'post',
        data
    })
}
/**
 * 身份证反面上传接口
 */
export function uploadBackImage(photo) {
    const data = {
        photo
    }
    return service({
        url: '/online/litigant/uploadBackImage.jhtml',
        method: 'post',
        data
    })
}
/**
 * 当事人(自然人)添加接口
 */
export function saveWXOnlineLitigant(onlineLawCaseId,litigationStatusId,litigantType,identityType,frontImage,backImage,litigantName,litigantSex,birthday,nation,identityCard,litigantPhone,address,employer,employerAddress,nativePlace,sendAddress) {
    const params = {
        onlineLawCaseId,
        litigationStatusId,
        litigantType,
        identityType,
        frontImage,
        backImage,
        
        litigantName,
        litigantSex,
        birthday,
        nation,
        identityCard,
        litigantPhone,
        address,
        employer,
        employerAddress,
        nativePlace,
        sendAddress
    }
    return service({
        url: '/online/litigant/saveWXOnlineLitigant.jhtml',
        method: 'get',
        params
    })
}
/**
 * 当事人(法人)添加接口
 */
export function saveWXOnlineLitigantLegal(
    onlineLawCaseId,
    litigationStatusId,
    litigantType,
    identityType,

    legalManName,
    legalManPhone,
    nativePlace,
    address,
    litigantName,
    identityCard,

    frontImage) {
    const params = {
        onlineLawCaseId,
        litigationStatusId,
        litigantType,
        identityType,
        
        legalManName,
        legalManPhone,
        nativePlace,
        address,
        litigantName,
        identityCard,
        frontImage,
    }
    return service({
        url: '/online/litigant/saveWXOnlineLitigant.jhtml',
        method: 'get',
        params
    })
}

/**
 * 获取代理人姓名
 */
export function getLawyers(onlineLitigantId,onlineLawCaseId) {
    const params = {
        onlineLitigantId,
        onlineLawCaseId
    }
    return service({
        url: 'online/lawyer/getLawyers.jhtml',
        method: 'get',
        params
    })
}
/**
 * 获取当事人信息
 */
export function getLitigantInfo(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/getLitigantInfo.jhtml',
        method: 'get',
        params
    })
}
/**
 * 获取当事人信息(一个)
 */
export function getLitigantInfolitigant(onlineLitigantId) {
    const params = {
        onlineLitigantId
    }
    return service({
        url: '/online/litigant/getLitigantInfo.jhtml',
        method: 'get',
        params
    })
}
/**
 * 当事人修改接口
 */
export function updateWXOnlineLitigant(
    onlineLawCaseId,
    litigationStatusId,
    litigantType,
    identityType,
    frontImage,
    backImage,
    litigantName,
    litigantSex,
    birthday,
    nation,
    identityCard,
    litigantPhone,
    address,
    employer,
    employerAddress,
    nativePlace,
    sendAddress,
    onlineLitigantId) {
    const params = {
        onlineLawCaseId,
        litigationStatusId,
        litigantType,
        identityType,
        frontImage,
        backImage,
        
        litigantName,
        litigantSex,
        birthday,
        nation,
        identityCard,
        litigantPhone,
        address,
        employer,
        employerAddress,
        nativePlace,
        sendAddress,
        onlineLitigantId
    }
    return service({
        url: '/online/litigant/updateWXOnlineLitigant.jhtml',
        method: 'get',
        params
    })
}
/**
 * 当事人(法人修改接口
 */
export function updateWXOnlineLitigantLegal(
    onlineLawCaseId,
    litigationStatusId,
    litigantType,
    identityType,
    legalManName,
    legalManPhone,
    nativePlace,
    address,
    litigantName,
    identityCard,
    frontImage,

    onlineLitigantId
    ) {
    const params = {
        onlineLawCaseId,
        litigationStatusId,
        litigantType,
        identityType,
        
        legalManName,
        legalManPhone,
        nativePlace,
        address,
        litigantName,
        identityCard,
        frontImage,

        onlineLitigantId
    }
    return service({
        url: '/online/litigant/updateWXOnlineLitigant.jhtml',
        method: 'get',
        params
    })
}
/**
 * 删除当事人接口
 */
export function deleteLitigantInfo(onlineLitigantId) {
    const params = {
        onlineLitigantId
    }
    return service({
        url: '/online/litigant/deleteLitigantInfo.jhtml',
        method: 'get',
        params
    })
}
/**
 * 删除代理人接口
 */
export function deleteLawyerInfo(onlineLawyerId) {
    const params = {
        onlineLawyerId
    }
    return service({
        url: '/online/lawyer/deleteLawyerInfo.jhtml',
        method: 'get',
        params
    })
}
/**
 * 删除证据接口
 */
export function delEvidence(onlineEAId) {
    const params = {
        onlineEAId
    }
    return service({
        url: '/online/evidenceAttachment/delEvidence.jhtml',
        method: 'get',
        params
    })
}
/**
 * 律师执业证上传照片接口
 */
export function uploadLawyerImage(photo) {
    const data = {
        photo
    }
    return service({
        url: '/online/litigant/uploadLawyerImage.jhtml',
        method: 'post',
        data
    })
}
/**
 * 查看代理人信息接口
 */
export function getLawyerInfo(onlineLawyerId) {
    const params = {
        onlineLawyerId
    }
    return service({
        url: '/online/lawyer/getLawyerInfo.jhtml',
        method: 'get',
        params
    })
}

/**
 * 更新代理人信息接口
 */
export function updateWXOnlineLawyer(
    onlineLawCaseId,
    onlineLitigantId,
    type,
    name,
    sex,
    birthday,
    nation,
    lawyerIdcard,
    address,
    lawyerImage,
    onlineLawyerId) {
    const params = {
        onlineLawCaseId,
        onlineLitigantId,
        type,
        name,
        sex,
        birthday,
        nation,
        lawyerIdcard,
        address,
        lawyerImage,
        onlineLawyerId
    }
    return service({
        url: '/online/lawyer/updateWXOnlineLawyer.jhtml',
        method: 'get',
        params
    })
}
/**
 * 获取案件的代理人信息
 */
export function getLawyerList(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/getLawyerList.jhtml',
        method: 'get',
        params
    })
}

/**
 * 保存代理人接口
 */
export function addWXLawyer(
        onlineLawCaseId,
        onlineLitigantId,
        type,
        name,
        sex,
        birthday,
        nation,
        lawyerIdcard,
        address,
        lawyerImage,
    ) {
    const params = {
        onlineLawCaseId,
        onlineLitigantId,
        type,
        name,
        sex,
        birthday,
        nation,
        lawyerIdcard,
        address,
        lawyerImage
    }
    return service({
        url: '/online/lawyer/addWXLawyer.jhtml',
        method: 'get',
        params
    })
}

/**
 * 保存案件送达接口信息
 */
export function saveSendee(isReplace,onlineLitigantId,onlineLawyerId,phone,email,sendType) {
    const params = {
        isReplace,
        onlineLitigantId,
        onlineLawyerId,
        phone,
        email,
        sendType
    }
    return service({
        url: 'online/litigant/saveSendee.jhtml',
        method: 'get',
        params
    })
}

/**
 * 保存证据信息
 */
export function saveWXEvidence(onlineLawCaseId,evidence) {
    const data = {
        onlineLawCaseId,
        evidence,
    }
    return service({
        url: '/online/evidenceAttachment/saveWXEvidence.jhtml',
        method: 'post',
        data
    })
}

/**
 * 获取案件信息
 */
export function getOnlineLawCaseEdit(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/getOnlineLawCaseEdit.jhtml',
        method: 'get',
        params
    })
}

/**
 * 提交案件审核接口信息
 */
export function commitRegisterLawCase(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/commitRegisterLawCase.jhtml',
        method: 'get',
        params
    })
}

/**
 * 获取微信接口签名接口信息
 */
export function getwxinfo(url) {
    const params = {
        url
    }
    return service({
        url: '/court/wxRegister/getwxinfo.jhtml',
        method: 'get',
        params
    })
}

/**
 * 上传证据照片
 */
export function uploadWXEvidence(photo) {
    const params = {
        photo
    }
    return service({
        url: '/online/evidenceAttachment/uploadWXEvidence.jhtml',
        method: 'get',
        params
    })
}
/**
 * 判断是否添加原被告的接口
 */
export function loginUserIsLitigant(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/lawCase/completeLitigant.jhtml',
        method: 'get',
        params
    })
}
/**
 * 获取证据信息的接口
 */
export function getFiles(onlineLawCaseId) {
    const params = {
        onlineLawCaseId
    }
    return service({
        url: '/online/evidenceAttachment/getFiles.jhtml',
        method: 'get',
        params
    })
}

/**
 * 获取身份证信息的接口
 */
export function getOnlineLitigantInfo(type,onlineLitigantId) {
    const params = {
        type,
        onlineLitigantId
    }
    return service({
        url: '/online/litigant/getOnlineLitigantInfo.jhtml',
        method: 'get',
        params
    })
}