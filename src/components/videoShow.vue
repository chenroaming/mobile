<template lang="html">
  <div>
    <div  style="text-align: center;">
        <yd-navbar title='纵横集团互联网法庭' bgcolor="#40a9ff" color="#fff">
        </yd-navbar>
        <!-- <video preload='auto' id='my-video'  src='http://pili-vod.hlcourt.gov.cn/%E5%85%A8%E5%9C%A8%E7%BA%BF%E8%AF%89%E8%AE%BC%E5%B9%B3%E5%8F%B0%E7%9F%AD%E7%89%87.mp4'  webkit-playsinline='true' playsinline='true'x-webkit-airplay='true' x5-video-player-type='h5' x5-video-player-fullscreen='true'x5-video-ignore-metadata='true'  width='100%' height='100%'><p> 不支持video</p> </video> -->
        <video-player style="margin-top:0px" class="video-player vjs-custom-skin"
            ref="videoPlayer"
            :playsinline="true"
            :options="playerOptions"
        ></video-player>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        playerOptions : {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "",
          src: 'http://pili-vod.hlcourt.gov.cn/%E5%85%A8%E5%9C%A8%E7%BA%BF%E8%AF%89%E8%AE%BC%E5%B9%B3%E5%8F%B0%E7%9F%AD%E7%89%87.mp4'//url地址
        //   src: 'http://sante.weixinbe.com/public/supplier/1527739003138040.mp4'//url地址
          // src: 'http://www.html5videoplayer.net/videos/madagascar3.mp4'//url地址
          // src: "" //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
        }
    }
  },
  mounted(){
     document.title= '纵横集团互联网法庭';
  },
  created(){

  },
  methods: {

  }
}
</script>

<style lang="css">
img{
    width: 100%;
}
</style>
