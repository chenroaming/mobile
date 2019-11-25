<template>
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title='标题' bgcolor="#40a9ff" color="#fff">
        <router-link to="#" slot="left">
            <yd-navbar-back-icon  style="color:#fff;" color="#fff">返回</yd-navbar-back-icon>
        </router-link>
        <router-link to="#" slot="right">
            <yd-navbar-next-icon  style="color:#fff;" color="#fff">前进</yd-navbar-next-icon>
        </router-link>
    </yd-navbar>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">案号</span>
            <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="litiName">当事人姓名哒哒哒哒哒哒大大大大</span>
            <span slot="left" class="adress">地址地址地址地址地址地址地址地址地址地址地址地址地址地址</span>
            <span slot="right">
              <yd-checkbox v-model="checkbox1"></yd-checkbox>
          </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left"  class="litiName">当事人姓名</span>
            <span slot="left" class="adress">地址</span>
            <span slot="right">
              <yd-checkbox v-model="checkbox2"></yd-checkbox>
          </span>
        </yd-cell-item>
    </yd-cell-group>
    <yd-cell-group>
        <yd-cell-item>
            <span slot="left">案号</span>
            <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="litiName">当事人姓名</span>
            <span slot="left" class="adress">地址</span>
            <span slot="right">
              <yd-checkbox v-model="checkbox3"></yd-checkbox>
          </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left" class="litiName">当事人姓名</span>
            <span slot="left" class="adress">地址</span>
            <span slot="right">
              <yd-checkbox v-model="checkbox4"></yd-checkbox>
          </span>
        </yd-cell-item>
    </yd-cell-group>
  </div>
</template>

<script type="text/babel">

export default {
  data() {
      return {
          checkbox6: ['1'],
          checkbox1: true,
          checkbox2: true,
          checkbox3: true,
          checkbox4: false
      }
  },
  created() {

  },
  methods: {

  },
  filters: {

  }
}
</script>

<style scope>
.yd-cell-item:not(:last-child):after {
    margin-left: 0rem;
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
}
.yd-preview-header>:first-child {
    margin-right: .2rem;
    text-align: left;
}
.litiName{
    width: 1.8rem;
    display: inline-block;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: hidden;
    word-break: normal;
    text-align: left;
}
.adress{
  margin-left: .2rem;
    width: 3.8rem;
    display:block;
    white-space:pre-wrap;
    word-wrap : break-word ;
    overflow: hidden ;
    word-break:normal;
    text-align: left;
}
.yd-checkbox-text {
    margin-left: 1px;
    font-size: 12px;
    color: #666;
    pointer-events: none;
  }
</style>
