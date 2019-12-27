<template>
  <div style="width:100%;height:100%;padding:0.1rem;">
    <div class="mybook" v-show="myBookShow">
      <div class="mytext" ref="mytext">
        <slot>
          
          <!-- <h1>声明</h1>
          <p>&nbsp&nbsp&nbsp&nbsp本人同意通过电子签名在庭审笔录及相关法律文书上签署，同时认可在线签署的电子签名在庭审笔录及相关法律文书，与纸质文书具有相同的法律效力</p>
          <p style="text-align:right">日期：{{textDate}}</p>
          <div class="nameDiv">
            <span>签名：</span>
            <label v-if='!myNameShow'>请签名</label>
            
          </div> -->
          <img v-bind:src="url" v-show="myNameShow" @click="writeName" class="myName" :style="{width:nameWidth,height:nameHeight}">
        </slot>
        <!-- <img class="real_pic" :src="dataURL" /> -->
      </div>

      <div class="writeName">
        <yd-button @click.native="writeName">
          <span v-if="dataURL==''">进入签名</span>
          <span v-if="dataURL!=''">重签</span>
        </yd-button>
        <yd-button @click.native="submitText"><span>提交</span></yd-button>
      </div>
    </div>
    <div class="mydraw" v-show="myDrawShow">
      <div class="cont" style="width:15%;">
        <yd-button @click.native="clear"><span>清除</span></yd-button>
        <yd-button @click.native="save"><span>保存</span></yd-button>
        <yd-button @click.native="close"><span>关闭</span></yd-button>
      </div>
      <div class="cont" style="width:70%;height:100%;position: relative;">
        <canvas id="canvas" width="260px" height="700px" ref="mycanvas">Canvas画板</canvas>
      </div>
      <div class="cont" style="width: 12%;font-size:0.3rem">
        <p>
          签&nbsp;&nbsp;字
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  import html2canvas from '../../node_modules/html2canvas'
  import {postText} from '@/api/auth'
  import Util from '@/libs/util.js'


  const service = Util.ajax

  var draw;

  var preHandler = function (e) {
    e.preventDefault();
  }

  class Draw {

    constructor(el) {

      this.el = el

      this.canvas = document.getElementById(this.el);

      this.cxt = this.canvas.getContext('2d');

      this.stage_info = this.canvas.getBoundingClientRect();

      document.getElementById("canvas").height = document.documentElement.clientHeight;

      this.path = {

        beginX: 0,

        beginY: 0,

        endX: 0,

        endY: 0

      }

    }

    init(btn) {

      var that = this;



      this.canvas.addEventListener('touchstart', function (event) {

        document.addEventListener('touchstart', preHandler, false);

        that.drawBegin(event)

      })

      this.canvas.addEventListener('touchend', function (event) {

        document.addEventListener('touchend', preHandler, false);

        that.drawEnd()

      })

      this.clear(btn)

    }

    drawBegin(e) {

      var that = this;

      window.getSelection() ? window.getSelection().removeAllRanges() : document.selection.empty()

      this.cxt.strokeStyle = "#000"

      this.cxt.beginPath()

      this.cxt.moveTo(

        e.changedTouches[0].clientX - this.stage_info.left,

        e.changedTouches[0].clientY - this.stage_info.top

      )

      this.path.beginX = e.changedTouches[0].clientX - this.stage_info.left

      this.path.beginY = e.changedTouches[0].clientY - this.stage_info.top

      canvas.addEventListener("touchmove", function () {

        that.drawing(event)

      })

    }

    drawing(e) {
      this.cxt.lineTo(

        e.changedTouches[0].clientX - this.stage_info.left,
        e.changedTouches[0].clientY - this.stage_info.top

      )

      this.path.endX = e.changedTouches[0].clientX - this.stage_info.left

      this.path.endY = e.changedTouches[0].clientY - this.stage_info.top

      this.cxt.stroke()

    }

    drawEnd() {

      document.removeEventListener('touchstart', preHandler, false);

      document.removeEventListener('touchend', preHandler, false);

      document.removeEventListener('touchmove', preHandler, false);

      //canvas.ontouchmove = canvas.ontouchend = null

    }

    clear(btn) {

      this.cxt.clearRect(0, 0, 260, 700)

    }

    save() {
      console.log(canvas.toDataURL("image/png"))
      return canvas.toDataURL("image/png")
    }

  }

  export default {

    data() {

      return {

        val: true,

        url: "",

        myBookShow: true,

        myDrawShow: false,

        myNameShow: false,

        textDate: "2018.11.28",

        nameWidth: "50px",

        nameHeight: "100px",

        dataURL: '',

        urlId: '',

        // onlineRoomId: '',

        // litigantId: '',
        // lawyerId:'',
        // judgeId:''
        roomId:'',
        pantId:'',
        judgeId:'',
        judicialId:'',
        recordId:''
      }

    },

    mounted() {
        //获取当前时间
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        this.textDate = year + "年" + month + "月" + day +'日';
      //获取链接参数
      this.urlId = Util.GetUrlParam("id");
      //获取房间id
      this.roomId = this.urlId.split('-')[0];
      //获取申请人id
      this.pantId = this.urlId.split('-')[1];
      //获取法官id
      this.judgeId = this.urlId.split('-')[2];
      //获取司法局id
      this.judicialId = this.urlId.split('-')[3];
      console.log(this.urlId);
      this.recordId = this.urlId.split('-')[4];
      // this.writeName();
    },

    methods: {

      clear: function () {

        draw.clear();

      },

      save: function () {

        var data = draw.save();

        this.url = data;

        console.log(data)

        this.myDrawShow = false;

        this.myBookShow = true;

        //获取签名图片原尺寸
        this.oldWidth = this.$refs.mycanvas.offsetWidth;
        this.oldHeight = this.$refs.mycanvas.offsetHeight;

        //图片等比例缩放
        this.nameWidth = (this.oldWidth / 5) + 'px';
        this.nameHeight = (this.oldHeight / 5) + 'px';

        // console.log(this.oldWidth);
        // console.log(this.oldHeight);

        //关闭签名窗口
        // this.close();

        //显示签名
        this.myNameShow = true;

        //获得文书图片base64
        this.toImage();
      },

      mutate(word) {

        this.$emit("input", word);

      },

      writeName() {
        this.myDrawShow = true;
        this.myBookShow = false;
        setTimeout(() => {
          if (!draw) {
            draw = new Draw('canvas');
            draw.init();
          }
        }, 300);
      },

      close() {
        this.myDrawShow = false;
        this.myBookShow = true;
      },

      //div转图片
      toImage() {
        var that = this;
        setTimeout(function () {
          html2canvas(that.$refs.mytext, {
            backgroundColor: "#fff",
            // logging: true,//日志
            // allowTaint:true,//允许加载跨域的图片
          }).then((canvas) => {
            let dataURL = canvas.toDataURL("image/png");
            console.log(dataURL);
            that.dataURL = dataURL;
          });
        }, 500)
      },

      //提交文书
      submitText() {
        //image,roomId,pantId,judgeId,judicialId
        // this.save();
        if(this.dataURL == ''){
          this.$dialog.toast({
            mes: '请先签名才能提交！',
            timeout: 1500
          })
          return;
        }
        console.log(this.dataURL);
        if (this.dataURL != '') {
          postText(this.dataURL,this.roomId,this.pantId,this.judgeId,this.judicialId,this.recordId)
            .then(res => {
              if (res.data.state == 100) {
                this.$dialog.confirm({
                  title: '提交成功',
                  mes: res.data.message,
                  opts:[{
                    txt: '确定',
                    color: true,
                    callback: () => {
                      WeixinJSBridge.invoke('closeWindow',{},function(res){});
                    }
                  }]
                });
              } else if(res.data.state == 101) {
                this.$dialog.toast({
                  mes: '提交失败，' + res.data.message,
                  timeout: 1500
                })
              }
            });
        }
      }
    }

  }
  //图片缩放自适应宽高算法
  /**
   * @imgWidth 图片宽
   * @imgHeight 图片高
   * @containerWidth 容器宽度
   * @containerHeight 容器高度
   **/
  //   function scalingImage(imgWidth, imgHeight, containerWidth, containerHeight) {
  //       var containerRatio = containerWidth / containerHeight;
  //       var imgRatio = imgWidth / imgHeight;

  //       if (imgRatio > containerRatio) {
  //           imgWidth = containerWidth;
  //           imgHeight = containerWidth / imgRatio;
  //       } else if (imgRatio < containerRatio) {
  //           imgHeight = containerHeight;
  //          imgWidth = containerHeight * imgRatio;
  //       } else {
  //          imgWidth = containerWidth;
  //           imgHeight = containerHeight;
  //       } 
  //       return { width: imgWidth, height: imgHeight };
  //  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
  .cont {
    display: inline-block;
    vertical-align: middle;
    touch-action: none;
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

  h1,
  h2 {

    font-weight: normal;

  }

  ul {

    list-style-type: none;

    padding: 0;

  }

  li {

    display: inline-block;

    margin: 0 10px;

  }

  a {

    color: #42b983;

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
    width: 150px;
  }

  .mytext h1 {
    font-size: 0.5rem;
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .mydraw {
    height: 100%;
    width: 100%;
  }

  .nameDiv {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
  }

  .nameDiv span {
    margin-right: 45px;
  }

  .myName {
    -moz-transform: rotate(-90deg);
    -webkit-transform: rotate(-90deg);
    /* border: 1px solid red; */
    margin-right: 35px;
    margin-left: 35px;
  }

  .real_pic {
    height: 100%;
    width: 100%;
  }

</style>
