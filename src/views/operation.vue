<template lang="html">
    <div>
        <yd-navbar title="全在线平台操作手册" bgcolor="#40a9ff" color="#fff"></yd-navbar>
        <div class='contentItem'>
            <p class='titleP'>登录平台</p>
            <p style='padding: .35rem;'><yd-icon name="warn" class='point'>
                </yd-icon>平台网址为（https://dq.hlcourt.gov.cn）。为保证用户信息安全和在线操作流畅性，建议使用谷歌chrome 浏览器(69以上版本)，或QQ、 火 狐、搜狗最新版本浏览器登录平台。
            <br>
            <yd-icon name="warn" class='point'></yd-icon>点击平台首页右上角注册按钮，进入用户注册界面；输入手机号获取验证码，进入身份信息填写界面；按页面提示录入身份信息，并上传证件照片，完成初始注册。<br>
            <yd-icon name="warn" class='point'></yd-icon>登录账号为身份证号码，密码随机生成并通过短信发送到注册登记的手机号码上，密码为初始密码，请及时修改，保护个人信息安全。<br>
            <yd-icon name="warn" class='point'></yd-icon>用户首次登录平台需进行实名认证。请按系统提示使用手机微信扫描登录界面的二维码，进行人脸识别并输入短信验证码后即完成实名认证。</p>
        </div>
        <div class='contentItem'>
            <p class='titleP'>在线立案</p>
            <p style='padding: .35rem;'>
                <yd-icon name="warn" class='point'></yd-icon>用户登录平台后，选择“在线立案”，选择身份为当事人或代理人。<br>
                <yd-icon name="warn" class='point'></yd-icon>按页面提示填写立案要素，上传起诉状、身份证明及授权委托材料、证据材料，点击确认提交。<br>
                <yd-icon name="warn" class='point'></yd-icon>平台会自动生成立案回执编号，请妥善保管此编号，以便于后续查询立案信息。<br>
                <yd-icon name="warn" class='point'></yd-icon>经法院审查予以立案，平台以短信通知原告，原告可登录平台扫码缴费。<br>
            </p>
        </div>
        <div class='contentItem'>
            <p class='titleP'>在线送达</p>
            <p style='padding: .35rem;'><yd-icon name="warn" class='point'></yd-icon>登录平台后，选择“易送达”可查看案件流程信息，或在线提交案件材料，选择文件类型(如证据、申请书等)并上传相应文件(文件格式支持：doc、docx、xls、xlsx、jpg、png、jpeg、bmp) 。<br></p>
        </div>
        <div class='contentItem'>
            <p class='titleP'>在线质证</p>
            <p style='padding: .35rem;'><yd-icon name="warn" class='point'></yd-icon>登录平台后，选择“在线质证”。<br>
                <yd-icon name="warn" class='point'></yd-icon>
                选择案号，点击进入举证页面。填写证据名称、来源、证明对象，并上传证据。经核对无误后，点击确认提交，完成在线举证。（提示：点击“确认提交”前， 可对填写内容进行修改，或撤回证据；点击“确认提交”后不可修改或删除）。<br>
                <yd-icon name="warn" class='point'></yd-icon>一方当事人在线举证后，平台以短信自动通知其他各方当事人。<br>
                <yd-icon name="warn" class='point'></yd-icon>选择案号，点击进入质证页面。对对方上传的证据发表质证意见，也可查看对方对已方证据的质证意见。<br>
            </p>
        </div>
        <div class='contentItem'>
            <p class='titleP'>在线庭审</p>
            <p style='padding: .35rem;'><yd-icon name="warn" class='point'></yd-icon>参加在线庭审需具备可上网电脑、摄像头、耳麦等硬件设备。开庭前，先进行调试设备，请勿在暄闹或人流较多的场所参加在线庭审。<br>
            <yd-icon name="warn" class='point'></yd-icon>登录平台后，选择“在线庭审”，点击相应案号中的“进入庭审”，进行人验识别，经验证无误后即可进入在线法庭。<br>
            <yd-icon name="warn" class='point'></yd-icon>在线庭审时，当事人应遵从法庭指挥，如有证据材料需当庭提交，经法官同意后，可点击庭审界面右侧证据列表中的“上传证据”，上传证据材料。<br>
            <yd-icon name="warn" class='point'></yd-icon>在线庭审过程通过AI语音识别，同步记录，并录音录像，如庭审过程中出现网络中断等情况，请及时与法官联系。除经查明确属网络故障、设备损坏、
                电力中断或者不可抗力等原因外，当事人不按时参加在线庭审的，视为“拒不到庭”，庭审中擅自退出的，视为“中途退庭”，分别按照《中华人民共和
                国民事诉讼法》及相关司法解释的规定处理。
            </p>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  data(){
    return{}
  },
  created(){},
  methods:{}
}
</script>

<style lang="css">
.titleP{
    font-size: 18px;
    text-align: center;
    font-weight: bold;
    margin: .15rem;
    margin-top: 0;
    
    padding: .35rem;
    /* padding-top: .5rem; */
    border-bottom: 1px solid #999;
}
.contentItem{
    text-align: left;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
}
.point{
    font-size: 0.4rem!important;
    color: #40A9FF;
    margin-right: .1rem;
}
</style>
