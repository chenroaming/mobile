<template>
  <div>
    
    <div style="width:100%;height:100%;">
      <yd-popup v-model="show1" position="center" width="90%" :close-on-masker='closeMasker'>
            <div style="background-color:#fff;" id="idCardTxt">
              <p style="font-size:16px;">身份确认</p>
              <yd-cell-item>
                  <!-- <span slot="left">身份证号：</span> -->
                  <yd-textarea slot="right" placeholder="请输入您的身份证号" v-model="idCard"></yd-textarea>
              </yd-cell-item>
              <yd-input slot="right" v-model="resultLitigantData.briefName" disabled></yd-input>
              <p style="text-align: center;">
                  <yd-button @click.native="keepIdCard">确定</yd-button>
              </p>
            </div>
      </yd-popup>
      <div id="sendAddressConfirm" v-show="myBookShow" ref="mytext">
        <h3>福建省平潭县人民法院</h3>
        <h3>送达地址确认书</h3>
        <table border="1" style="width:90%;margin:0 auto" cellspacing="0" cellpadding="0">
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <col width="20%" />
          <tr>
            <td>案号</td>
            <td colspan="4" style="text-align:left;padding-left:10px;">
              <yd-input slot="right" v-model="resultLitigantData.caseNo" disabled></yd-input>
            </td>
          </tr>
          <tr>
            <td>案由</td>
            <td colspan="4" style="text-align:left;padding-left:10px;">
              <yd-input slot="right" v-model="resultLitigantData.briefName" disabled></yd-input>
            </td>
          </tr>
          <tr>
            <td>当事人</td>
            <td colspan="4" style="text-align:left;padding-left:10px;">
              <yd-input slot="right" v-model="resultLitigantData.litigantName" disabled></yd-input>
            </td>
          </tr>
          <tr>
            <td>告知事项</td>
            <td colspan="4" style="text-align:left;">
              <p>1.为便于当事人及时收到人民法院诉讼文书，保证诉讼程序顺利进行，当事人应当如实提供确切的送达地址；</p>
              <p>2.如果提供的地址不确切，或不及时告知变更后的地址，使诉讼文书无法送达或未及时送达，当事人将自行承担由此可能产生的法律后果；</p>
              <p>3.为提高送达效率，法院可以采用传真、电子邮件、微信等方式送达诉讼文书，但判决书、裁定书、调解书除外，以发送方设备显示发送成功视为送达；</p>
              <p>4.确认的送达地址适用于一审、二审、再审审查、执行程序。如果送达地址有变更，应当及时书面告知人民法院变更后的送达地址。</p>
              <p>5.有关送达的法律规定，见本确认书后页。</p>
            </td>
          </tr>
          <tr>
            <td rowspan="7">送达地址</td>
            <td>指定签收人</td>
            <td colspan="3" style="text-align:left;padding-left:10px;">
              <yd-input slot="right" v-model="resultLitigantData.recipient"></yd-input>
            </td>
          </tr>
          <tr>
            <td>证件类型</td>
            <td colspan="3" style="text-align:left;padding-left:10px;">
              <select
                v-model="resultLitigantData.recipientCardType"
                style="border: none;width: 90%;color: rgb(67, 118, 203);"
              >
                <option value="第二代大陆居民身份证">第二代大陆居民身份证</option>
                <option value="台胞证">台胞证</option>
                <option value="护照">护照</option>
                <option value="组织机构代码">组织机构代码</option>
              </select>
              >
            </td>
          </tr>
          <tr>
            <td>证件号码</td>
            <td colspan="3" style="text-align:left;padding-left:10px;" id="checkId">
              <yd-input
                style="display:inline-bolck"
                slot="right"
                v-model="resultLitigantData.recipientCard"
                :show-clear-icon="true"
              ></yd-input>
            </td>
          </tr>
          <tr>
            <td>是否接受电子送达</td>
            <td colspan="3" style="text-align:left;padding-left:10px;padding-right: 18px;">
              是否接受电子送达：
              <yd-radio-group
                v-model="myReceive"
                size="15"
                style="line-height: 16px;margin: 6px 0;"
                :callback="checkType"
              >
                <yd-radio val="是">
                  <span style="font-size: 12px;line-height: 12px;">是</span>
                </yd-radio>
                <yd-radio val="否">
                  <span style="font-size: 12px;line-height: 12px;">否</span>
                </yd-radio>
              </yd-radio-group>
              <yd-checkbox-group size="12" v-model="checkbox5" id="checkType" v-show="check">
                <p>
                  <yd-checkbox val="手机号码" v-model="phone1" :change="listen('手机号码')">手机号码(电子送达必填)</yd-checkbox>
                  <yd-input slot="right" v-model="mobile" class="myInput" :show-clear-icon="true"></yd-input>
                </p>
                <p>
                  <yd-checkbox val="电子邮箱">电子邮箱：</yd-checkbox>
                  <yd-input
                    slot="right"
                    v-model="resultLitigantData.email"
                    class="myInput"
                    :show-clear-icon="true"
                  ></yd-input>
                </p>
                <p>
                  <yd-checkbox val="微信号">微信号：</yd-checkbox>
                  <yd-input
                    slot="right"
                    v-model="resultLitigantData.wechatNum"
                    class="myInput"
                    :show-clear-icon="true"
                  ></yd-input>
                </p>
                <p>
                  <yd-checkbox val="微信公众号" style="margin-bottom:8px;">微信公众号</yd-checkbox>
                </p>
              </yd-checkbox-group>
            </td>
          </tr>
          <tr>
            <td>
              确认送达
              <br />地址
            </td>
            <td colspan="3" style="text-align:left;padding-left:10px;" id="checkAdd">
              <yd-input slot="right" v-model="resultLitigantData.sendAddress" :show-clear-icon="true"></yd-input>
            </td>
          </tr>
          <tr>
            <td>手机号码</td>
            <td colspan="3" style="text-align:left;padding-left:10px;" id="checkPhone">
              <yd-input slot="right" v-model="resultLitigantData.phone" :show-clear-icon="true"></yd-input>
            </td>
          </tr>
          <!-- <tr>
                      <td>邮编</td>
                      <td colspan="3" style="text-align:left;padding-left:10px;">
                          <yd-input slot="right" v-model="resultLitigantData.postcode"></yd-input>
                      </td>
          </tr>-->
          <tr>
            <td>受送达人确认</td>
            <td colspan="4" style="text-align:left;">
              <p>1.本人已阅读本确认书的告知事项，并清楚了解其内容及法律意义；</p>
              <p>2.本人承诺基于诚信原则进行所有诉讼活动，保证上述送达地址是准确、有效的，如无法送达，将承担相应法律责任；</p>
              <p>3.本人承诺，诉讼过程中，本人送达地址、联系方式（包括手机号码、传真号码、电子邮箱等）若有变更，或者中途撤销委托代理、委托新的代理人，需要变更送达地址的，将以书面形式告知人民法院，确认新的送达地址，否则，人民法院可以上述地址为送达地址；</p>
              <p>4.本人确认以上地址为本案一审、二审、再审审查、执行程序的送达地址。</p>
              <p>
                <yd-checkbox-group size="15" v-model="checkbox2">
                  受送达人签名、盖章或捺印：
                  <yd-button
                    size="small"
                    type="primary"
                    shape="circle"
                    @click.native="writeName"
                    v-show=" resultLitigantData.signDate ? false : true"
                  >签名</yd-button>
                  <yd-button
                    size="small"
                    type="primary"
                    shape="circle"
                    @click.native="writeName"
                    v-show=" resultLitigantData.signDate ? true : false"
                  >重签</yd-button>
                  <!-- <yd-button
                    size="small"
                    type="primary"
                    shape="circle"
                    @click.native="delName"
                    v-show=" resultLitigantData.signDate ? true : false"
                  >签名删除</yd-button> -->
                  <!-- <yd-input slot="right" ></yd-input> -->
                  <div>
                    <img
                      v-if="namePath"
                      v-bind:src="namePath"
                      :style="{width:nameWidth,height:nameHeight}"
                      @click="writeName"
                    />
                    <!-- v-show=" url != '' ? true : false" -->
                  </div>
                </yd-checkbox-group>
              </p>
              <p style="margin-left:20px;">{{resultLitigantData.signDate}}</p>
            </td>
          </tr>
          <tr>
            <td>备注</td>
            <td colspan="4" style="text-align:left;">当事人授权委托代理人代为签收法律文书的，代理人应当同时提交当事人签名确认的本人送达地址。</td>
          </tr>
        </table>
        <p style="line-height:22px;">注：收到后请于三日内填妥并寄回本院。</p>
        <yd-button
          size="small"
          type="primary"
          shape="circle"
          @click.native="keep"
          style="width:100px;margin-top:20px;margin-bottom:40px;"
        >提交</yd-button>
        <!-- <h3 style="margin:40px 0px 10px 0;">送达地址有关事项告知书</h3>
              <div style="width:90%;margin:0 auto;line-height:20px;text-align:left;">
                  <p style="text-indent: 2em;">根据《中华人民共和国民事诉讼法》《最高人民法院关于适用〈中华人民共和国民事诉讼法〉的解释》《最高人民法院关于以法院专递方式邮寄送达民事诉讼文书的若干规定》等，现将送达地址及送达方式有关事项告知如下：</p>
                  <p style="text-indent: 2em;">一、法院专递的适用范围</p>
                  <p style="text-indent: 2em;">人民法院直接送达诉讼文书有困难的，可以交由国家邮政机构（以下简称邮政机构）以法院专递方式邮寄送达，但有下列情形之一的除外：</p>
                  <p style="text-indent: 2em;">１．受送达人或者其诉讼代理人、受送达人指定的代收人同意在指定的期间到人民法院接受送达的；２．受送达人下落不明的；３．法律规定或者我国缔结或者参加的国际条约中约定有特别送达方式的。</p>
                  <p style="text-indent: 2em;">以法院专递方式邮寄送达民事诉讼文书的，其送达与人民法院送达具有同等法律效力。</p>
                  <p style="text-indent: 2em;">二、电子送达的适用范围</p>
                  <p style="text-indent: 2em;">经受送达人同意，本院将采用电子送达方式送达诉讼文书，但判决书、裁定书、调解书除外。电子送达到达受送达人特定系统的日期，即人民法院对应系统显示发送成功的日期为送达日期。但受送达人证明到达其特定系统的日期与人民法院对应系统显示发送成功的日期不一致的，以受送达人证明到达其特定系统的日期为准。</p>
                  <p style="text-indent: 2em;">以法院电子送达方式送达诉讼文书的，其送达与人民法院送达具有同等法律效力。</p>
                  <p style="text-indent: 2em;">如受送达人同意接受电子送达，需向本院提供手机号码，该手机号码将用于接收法院以短信形式发送的电子送达诉讼文书签名码。签名码为身份确认码，受送达人可以凭立案时预留的证件号和签名码签收电子诉讼文书。</p>
                  <p style="text-indent: 2em;">三、送达地址的提供或者确认</p>
                  <p style="text-indent: 2em;">当事人起诉或者答辩时应当向人民法院提供或者确认自己准确的送达地址，并填写送达地址、送达方式确认书。当事人拒绝提供的，人民法院应该告知其拒不提供送达地址的不利后果，并记入笔录。</p>
                  <p style="text-indent: 2em;">四、送达地址的推定</p>
                  <p style="text-indent: 2em;">当事人拒绝提供自己的送达地址，经人民法院告知后仍不提供的，人民法院可以通过以下方式推定送达地址：（一）当事人在诉讼中所涉及的合同、往来函件中对送达地址有明确约定的，以约定的地址为送达地址；（二）没有约定的，以当事人在诉讼中提供的书面材料中自己的地址为送达地址；（三）没有约定的，也未提交书面材料或书面材料未载明地址的，以当事人一年内进行其他诉讼、仲裁案件中提供的地址为送达地址；（四）人民法院在本案中已经通过直接送达、邮寄送达、留置送达等方式向当事人有效送达过的，该地址可视为当事人的送达地址；（五）当事人向法院寄送诉讼材料的邮单上载明了详细寄件地址的，以该地址为送达地址；（六）无以上情形的，以当事人一年以内进行其他民事活动经常使用的地址为送达地址；（七）以上情形仍不能推定送达地址的，自然人以其户籍登记的住所或经常居住地登记的住址为送达地址，法人或其他组织以其工商登记或其他依法登记、备案的住所为送达地址；（八）人民法院可以要求一方当事人提供对方的有效联系电话、户籍信息或依法登记、备案的信息，以便及时、有效送达。</p>
                  <p style="text-indent: 2em;">五、法律后果及其除外条件</p>
                  <p style="text-indent: 2em;">因受送达人自己提供或者确认的送达地址不准确、拒不提供送达地址、送达地址变更未及时告知人民法院、受送达人本人或者受送达人指定的代收人拒绝签收，导致诉讼文书未能被受送达人实际接收的，文书退回之日视为送达之日。</p>
                  <p style="text-indent: 2em;">受送达人能够证明自己在诉讼文书送达的过程中没有过错的，不适用前款规定。</p>
        </div>-->
      </div>
      <div class="handwriting-board" :class="direction" v-show="handDraw">
        <div class="handle-box">
          <!-- <div class="color-box" v-if="showColor">
            <div v-for="(item, index) in colors" :key="index" class="color-item" :class="{active:item.active}" :style="{background:item.color}" @click="clickColorItem(item)"></div>
          </div> -->
          <button @click="clickReset">清除</button>
          <button v-if="!filePath" @click="clickFinish">保存</button>
          <button @click="clickClose">返回</button>
          <!-- <button v-if="mode === 'two'" @click="clickOrientation">{{direction === 'horizontal' ? '竖版' : '横版'}}</button> -->
        </div>
        <div class="board-box">
          <img v-if="filePath" :src="filePath">
          <canvas v-else ref="boardCanvas" :width="canvasWidth" :height="canvasHeight" @touchstart="onTouchStart" @touchmove="onTouchMove" @touchend="onTouchEnd"></canvas>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { resultLitigant, saveConfrimInfo } from "@/api/noticeInfo";
import html2canvas from "../../node_modules/html2canvas";
import Util from "@/libs/util.js";
import Vue from 'vue'
import { formatDate } from "@/api/date.js"; // 在组件中引用date.js
// import { JuryRule } from "@/static/rule.js";
const service = Util.ajax;


export default {
  data() {
    return {
      checkbox2: [""],
      checkbox5: ["手机号码"],
      mobile: "",
      input2: "",
      input3: "",
      idCard: "",
      resultLitigantData: {
        // signDate:1559609584204
      }, //回填的数据
      myReceive: "是",
      myBookShow: true,
      myDrawShow: false,
      myNameShow: false,
      handDraw: false,
      heightData: '100%',// 签名界面高度
      widthData: '100%', // 签名界面宽度
      show1: false,//身份证模态框
      closeMasker: false,
      val: true,
      check: true,
      phone1: true,
      url: "",
      nameWidth: "190px",
      nameHeight: "70px",

      direction: "", // 画板方向 vertical horizontal
      colors: [
        { color: "black", active: true },
        { color: "red", active: false },
        { color: "blue", active: false }
      ], // 可选颜色
      ctx: "", // canvas对象
      canvasWidth: "", // canvas宽度
      canvasHeight: "", // canvas高度
      lineColor: "black", // 线条的颜色
      lineWidth: 3, // 线条宽度
      filePath: "", // 生成的图片地址
      namePath: '',// 签名生成后保存的地址
    };
  },
  props: {
    showColor: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      default: "two" // 三种模式 缩小版mini,全屏版full,两种模式都有two
    }
  },
  mounted() {
    this.resultLitigant();
    if (this.mode === "full") {
      this.direction = "horizontal";
    }
    this.initCanvas();
    window.addEventListener("orientationchange", () => {
      const width = document.documentElement.clientWidth;
      const height = document.documentElement.clientHeight;
      switch (window.orientation) {
        case 90:         
          this.clickReset();
          break;
        case -90:
          this.clickReset();
          break;
      }
    }, false);
  },
  components: {},
  methods: {
    listen(val) {},
    // 切割地址栏参数
    GetRequest(value) {
        //url例子：www.bicycle.com?id="123456"&Name="bicycle"；  
      var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
      var object = {};
      if (url.indexOf("?") != -1)//url中存在问号，也就说有参数。  
      {
        var str = url.substr(1);  //得到?后面的字符串
        var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
        for (var i = 0; i < strs.length; i++) {
          object[strs[i].split("=")[0]] = strs[i].split("=")[1]
        }
      }
      return object[value] ? object[value] : "";
    },
    //  获取数据
    resultLitigant(idCard) {
      let litigantId = this.GetRequest('litigantId');
      if(litigantId){
        let obj ={
          litigantId: litigantId
        }
        resultLitigant(obj).then(res => {
          if (res.data.state == 100) {
            this.resultLitigantData = res.data.data;
            if (this.myReceive == "是") {
              this.mobile = this.resultLitigantData.phone;
              this.checkbox5 = ["手机号码"];
              if (this.resultLitigantData.wechatNum) {
                this.checkbox5.push("微信号");
              }
              if (this.resultLitigantData.email) {
                this.checkbox5.push("电子邮箱");
              }
              if (this.resultLitigantData.wechatPublic) {
                this.checkbox5.push("微信公众号");
              }
            }
          } 
        });
      }else{
        this.show1 = true;
      }
      
    },
    checkType(type) {
      if (type == "否") {
        this.checkbox5 = [];
        this.mobile = "";
        this.resultLitigantData.email = "";
        this.resultLitigantData.wechatNum = "";
        this.check = false;
      } else {
        this.checkbox5 = ["手机号码"];
        this.check = true;
      }
    },
    keepIdCard(){
      // this.show1 = false;
      if(!this.idCard){
        this.$dialog.toast({
            mes: '身份证号不能为空',
            timeout: 1500,
            icon: 'error',
        });
        return
      }
      // 正则表达式：
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if(idcardReg.test(this.idCard)) {
          this.show1 = false;
          let obj ={
            idCard: this.idCard
          }
          resultLitigant(obj).then(res => {
            if (res.data.state == 100) {
              console.log(res.data)
              this.resultLitigantData = res.data.data;
              this.resultLitigantData.recipientCard = this.idCard;
              if (this.myReceive == "是") {
                this.mobile = this.resultLitigantData.phone;
                this.checkbox5 = ["手机号码"];
              }
            } 
          });
      }else{
        this.$dialog.toast({
            mes: '身份证号格式错误',
            timeout: 1500,
            icon: 'error',
        });
      }
    },
    // 保存地址确认书
    keep() {
      if (this.myReceive == "否") {
        this.resultLitigantData.receive = false;
        this.resultLitigantData.email = "";
        this.resultLitigantData.wechatNum = "";
        this.resultLitigantData.wechatPublic = "";
      } else if (this.myReceive == "是") {
        this.resultLitigantData.receive = true;
        var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
        var regEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (this.resultLitigantData.phone == "") {
          this.$dialog.alert({ mes: "请输入手机号码" });
          return false;
        } else if (!reg.test(this.resultLitigantData.phone)) {
          this.$dialog.alert({ mes: "手机格式不正确" });
          return false;
        }
        if (this.checkbox5.length > 0) {
          for (var i = 0; i < this.checkbox5.length; i++) {
            // 验证手机号
            if (this.checkbox5.indexOf("手机号码") == -1) {
              this.$dialog.alert({ mes: "电子送达手机号为勾选项" });
              return;
            }
            if (this.checkbox5[i] == "手机号码" && this.mobile == "") {
              this.$dialog.alert({ mes: "电子送达手机号为必填项" });
              return;
            } else if (
              this.checkbox5[i] == "手机号码" &&
              !reg.test(this.mobile)
            ) {
              this.$dialog.alert({ mes: "电子送达手机号格式不正确" });
              return;
            } else if (
              this.checkbox5[i] == "手机号码" &&
              reg.test(this.mobile)
            ) {
              this.resultLitigantData.mobile = this.resultLitigantData.phone;
            }
            // 电子邮箱验证
            if (this.checkbox5.indexOf("电子邮箱") == -1) {
              this.resultLitigantData.email = "";
            }
            if (this.checkbox5[i] == "电子邮箱") {
              if (this.resultLitigantData.email == "") {
                this.$dialog.alert({ mes: "您选择了电子邮箱需要填写电子邮箱" });
                return;
              } else if (!regEmail.test(this.resultLitigantData.email)) {
                this.$dialog.alert({ mes: "邮箱格式不正确" });
                return;
              }
            }
            // 微信号验证
            if (this.checkbox5.indexOf("微信号") == -1) {
              this.resultLitigantData.wechatNum = "";
            }
            if (
              this.checkbox5[i] == "微信号" &&
              this.resultLitigantData.wechatNum == ""
            ) {
              this.$dialog.alert({ mes: "您选择了微信号需要填写微信号" });
              return;
            }
            if (this.checkbox5[i] == "微信公众号") {
              this.resultLitigantData.wechatPublic = "微信公众号";
            }
          }
        } else {
          this.$dialog.alert({ mes: "电子送达手机号为必填项" });
          return;
        }
      } else {
        this.$dialog.toast({
          mes: "请选择是否接受电子送达",
          timeout: 1500
        });
        return;
      }
      this.resultLitigantData.idCard = this.idCard;
      this.resultLitigantData.signPath = this.namePath; //签名路径
      console.log("resultLitigantData", this.resultLitigantData);
      saveConfrimInfo(this.resultLitigantData).then(res => {
        console.log(res.data);
        if (res.data.state == 100) {
          this.$dialog.toast({
            mes: res.data.message,
            timeout: 1500,
            icon: "success"
          });
        } else {
          this.$dialog.toast({
            mes: res.data.message,
            timeout: 1500
          });
        }
      });
    },
    /**
     * 初始化画板，获取canvas节点对象，设置画板的宽高
     * 不能在此方法中设置线条宽度样式，否则无效
     */
    initCanvas() {
      // 获取到当前canvas节点的信息，包含宽，高，top，left等
      var boardCanvas = this.$refs.boardCanvas; // 获取canvas元素
      this.canvasWidth = boardCanvas.offsetWidth; // 设置画板宽度
      this.canvasHeight = boardCanvas.offsetHeight; // 设置画板高度
      // canvas基础设置，线条设置
      this.ctx = boardCanvas.getContext("2d");
      this.ctx.beginPath();
    },
    /**
     * 绘制笔触
     */
    handleDraw(targetX, targetY) {
      this.ctx.lineTo(targetX, targetY); // 将笔触移到当前点击点
      this.ctx.stroke();
    },
    /**
     * 触摸开始
     * 获取当前点击点的坐标
     * 设置线条颜色，宽度，样式等
     */
    onTouchStart(e) {
      let offsetLeft = e.target.offsetLeft; // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop; // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft;
      let targetY = e.touches[0].clientY - offsetTop;
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.lineColor; // 设置线条颜色
      this.ctx.lineWidth = this.lineWidth; // 设置线条的宽度
      this.ctx.lineCap = "round"; // 设置线条的端点的样式，设为圆弧形
      this.ctx.lineJoin = "round"; // 设置线条的连接点的样式，设为弧形
      this.handleDraw(targetX, targetY);
    },
    /**
     * 触摸过程中
     * 获取并计算当前点击点的坐标，绘制线条
     */
    onTouchMove(e) {
      let offsetLeft = e.target.offsetLeft; // 获取canvas距离页面左边的距离
      let offsetTop = e.target.offsetTop; // 获取canvas距离页面顶部的距离
      let targetX = e.touches[0].clientX - offsetLeft;
      let targetY = e.touches[0].clientY - offsetTop;
      this.handleDraw(targetX, targetY);
    },
    /**
     * 触摸结束
     */
    onTouchEnd(e) {},
    /**
     * 颜色模块点击事件，切换点击的颜色状态
     */
    clickColorItem(e) {
      this.colors.forEach(item => {
        item.active = false;
      });
      e.active = true;
      this.lineColor = e.color; // 设置当前笔触颜色
    },
    /**
     * 重写按钮点击事件，清空画板内容
     */
    clickReset() {
      // 清空图片
      this.filePath = "";
      // 清空画板
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      // 重新设置canvas画板节点对象，否则绘画会出问题,这里异步操作，否则绘画有误
      setTimeout(() => {
        this.initCanvas();
      }, 100);
    },
    /**
     * 点击完成，生成画板图片，隐藏canvas画板区域，将生成的图片显示出来
     */
    clickFinish() {
      // 将canvas转成临时图片数据保存
      this.filePath = this.$refs.boardCanvas.toDataURL();
      this.$emit("onComplete", this.filePath); // 将生成的图片传给父组件
      this.$store.commit("namePath", this.filePath);
      this.namePath = this.$store.getters.namePath
      this.handDraw = false;
      this.myBookShow = true;
      var myDate = new Date(); //获取系统当前时间
      this.resultLitigantData.signDate = myDate.getFullYear() +"年" + (myDate.getMonth() + 1) +"月" +myDate.getDate() + "日"
    },
    clickClose() {
      this.handDraw = false;
      this.myBookShow = true;
    },
    /**
     * 点击“横版”“返回”,如果当前是缩小版，改为横版，否则返回为缩小版
     * 清空画板内容
     */
    clickOrientation() {
      if (this.direction === "horizontal") {
        this.direction = "";
      } else {
        this.direction = "horizontal";
      }
      // 清空画板内容后后修改样式, 重置canvas
      this.clickReset();
    },
    writeName() {
      this.handDraw = true;
      this.myBookShow = false;
      // if (this.mode === "full") {
      //   this.direction = "horizontal";
      // }
      this.direction = "";
      this.filePath = '';
      // this.initCanvas();
      setTimeout(() => {
        this.initCanvas();
      }, 300);
    },
  },
  filters: {
    formatDate(time) {
      if (time) {
        var date = new Date(time);
        return formatDate(date, "yyyy年MM月dd日"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
      } else {
        return "";
      }
    },
    formatDateTwo(time) {
      var date = new Date(time);
      return formatDate(date, "hh:mm:ss"); // 时间点 例 21点12分12秒的格式
    }
  },
  watch: {
    mobile: function(val) {
      if (this.myReceive == "是") {
        this.resultLitigantData.phone = val;
      }
    },
    "resultLitigantData.phone": function(val) {
      if (this.myReceive == "是") {
        this.mobile = val;
      }
    }
    // 电子邮箱有输入
    // 'resultLitigantData.email':function(val){
    //     if(val && this.myReceive == '是'){
    //         this.checkbox5.push('电子邮箱')
    //     }
    // },
    // 'resultLitigantData.wechatNum':function(val){
    //     if(val && this.myReceive == '是'){
    //         this.checkbox5.push('微信号')
    //     }
    // }
  }
};
</script>
<style lang="css" scoped>
* {
  touch-action: pan-y;
}
#idCardTxt{
  line-height: 50px;
  padding: 0 10px;
}
#idCardTxt .yd-textarea>textarea{
  border: 1px solid #ccc;
  line-height: 30px;
  padding: 0 5px;
}
.myInput {
  border-bottom: 1px solid #a6a2a2;
  width: 76%;
  margin: 5px;
  padding: 2px;
}
#sendAddressConfirm {
  background-color: #fff;
}
#sendAddressConfirm h3 {
  line-height: 22px;
  font-size: 16px;
}
#sendAddressConfirm h3:first-child {
  padding-top: 10px;
}
#sendAddressConfirm h3:nth-child(2) {
  padding-bottom: 10px;
}
table {
  border-collapse: collapse;
  line-height: 20px;
}
table td {
  border: 1px solid black;
  text-align: center;
}
.yd-checkbox-text {
  display: inline-block;
  font-size: 12px !important;
}
.yd-input-success:after {
  font-size: 0.3rem;
}
.yd-radio {
  margin-left: 0;
}
.yd-radio {
  padding: 0;
}
#checkId .yd-input a {
  display: block !important;
}
#checkType .yd-input a {
  display: block !important;
}
#checkAdd .yd-input a {
  display: block !important;
}
#checkPhone .yd-input a {
  display: block !important;
}
.yd-input-clear:after {
  color: #c5c5c578 !important;
  content: "\E60C" !important;
}
.cont {
  display: inline-block;
  vertical-align: middle;
}

.cont button {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
  margin: 20px 0px;
}

.cont p {
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}
#canvas {
  background: #fff;
  cursor: default;
  border: 1px dashed rgb(204, 204, 204);
  height: 100%;
  width: 100%;
}

#keyword-box {
  margin: 10px 0;
}

.mytext {
  font-size: 0.3rem;
  text-align: left;
  line-height: 25px;
  padding: 0 10px;
  word-wrap: break-word;
}

.mytext h1 {
  font-size: 0.5rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 15px;
}

/* .mydraw {
  height: 100%;
  width: 56%;
} */

.nameDiv {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 50px;
}

.nameDiv span {
  margin-right: 45px;
}

.real_pic {
  height: 100%;
  width: 100%;
}
/* input:disabled */
.yd-input > input {
  color: rgb(67, 118, 203);
}
.yd-input > input:disabled {
  color: #000;
}
.yd-checkbox-icon {
  vertical-align: middle !important;
}

.handwriting-board{
  background-color: #fff;
}
.board-box {
  width: 100%;
  height: 220px;
  display: block;
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  overflow: hidden;
  box-sizing: border-box;
}
.board-box canvas,img {
  width: 100%;
  height: 100%;
}
.handle-box {
  padding: 6px 0px;
  display: flex;
  justify-content: flex-end;
  align-items: center;  
}
.handle-box .color-box {
  display: flex;
  background: #ffffff;
}
.handle-box .color-item {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin: 0px 5px;
  transition: 0.3s;
}
.handle-box button {
  font-size: 10px;
  width: 50px;
  height: 25px;
  padding: 0;
  border-radius: 3px;
  color: #fff;
  margin-left: 10px;
  border: 1px solid #ececec;
  outline: none;
  background: #04be02;
}
/* 水平状态样式 */
.horizontal {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0px;
  left: 0px;
  background: #ffffff;
  display: flex;
  align-items: center;
  flex-flow: row-reverse;
}
.horizontal .board-box {
    width: calc("100% - 100px");
    height: 90vh;
}
.horizontal .handle-box {
  height: 90vh;
  width: 50px;
  flex-direction: column;
  padding: 0px 10px;
}
.horizontal .color-box {
  flex-direction: column;
}
.horizontal .color-item {
  margin: 10px 0px;
}
.horizontal button {
  transform: rotate(90deg);
  margin: 40px 0px 10px;
}
</style>


