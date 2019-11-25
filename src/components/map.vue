<template>
<div>
    <div style="background-color: #f1f2f6;padding-bottom:30px;" v-show="caseShow">
    <yd-navbar title='案件列表' bgcolor="#40a9ff" color="#fff">
        <router-link to="loginCourt" slot="left">
            <yd-navbar-back-icon  style="color:#fff;" color="#fff">退出</yd-navbar-back-icon>
        </router-link>
        <span @click="nextStep" slot="right">
               <router-link to="#" slot="right">
                    <yd-navbar-next-icon style="color:#fff;" color="#fff">下一步</yd-navbar-next-icon>
                  </router-link>
        </span>

    </yd-navbar>
    <yd-cell-group v-for="parent,index in addressData" :key="index">
        <yd-cell-item>
            <span slot="left">案号:{{parent.caseNo}}</span>
            <span slot="right"></span>
        </yd-cell-item>
        <yd-cell-item v-for="child,cindex in parent.litigants" :key="child.index" v-show="child.addressType == 1">
            <span slot="left" class="litiName">{{child.litigantName}}</span>
            <span slot="left" class="adress" v-for="childc in child.litigantAddresses" :class="childc.type == 2 ? 'showAddress' : 'hideAddress'">
              <span>{{childc.address}}</span>
            </span>
            <span slot="right">
              <yd-checkbox-group v-model="checkbox"  v-for="childc in child.litigantAddresses" :class="childc.type == 2 ? 'showAddress' : 'hideAddress'">
                <yd-checkbox :val="childc.address"></yd-checkbox>
              </yd-checkbox-group>
              <yd-checkbox-group v-model="checkbox"  v-if="child.litigantAddresses.length==0">
                  <yd-checkbox :val="0"></yd-checkbox>
              </yd-checkbox-group>
            </span>
        </yd-cell-item>
    </yd-cell-group>
    </yd-cell-group>
  </div>
    <yd-tab active-color="#40a9ff" style="height:100%" v-show="!caseShow">
        <yd-navbar title='地图导航' bgcolor="#40a9ff" color="#fff">
            <span @click="upStep" slot="left">
                <router-link to="#" slot="left">
                    <yd-navbar-back-icon  style="color:#fff;" color="#fff">返回</yd-navbar-back-icon>
                </router-link>
            </span>
        </yd-navbar>
          <div style="margin: 0.35rem">
            <yd-cell-group style="margin-bottom: 0.35rem">
                <yd-cell-item>
                    <span slot="left">起始地址：</span>
                    <yd-input slot="right" type="text"  v-model="startAdress1"  placeholder="请输入起始地址"></yd-input>
                </yd-cell-item>
                <div v-for="item in otherAdressList">
                <yd-cell-item >
                    <span slot="left">途径地点<span>{{item.leng+1}}</span> ：</span>
                    <!-- <yd-input slot="right" type="text" :v-model="itemInput" placeholder="途经地点1"></yd-input> -->
                    <input type="text" slot="right" name="" v-model="item.value"  class="inputArr"  placeholder="途经地点" >
                </yd-cell-item>
                </div>
                <div class="addDiv" @click="addInput" v-show="addD">+</div>
                <yd-cell-item>
                    <span slot="left">结束地址：</span>
                    <yd-input slot="right" type="text" v-model="endAdress1" placeholder="请输入结束地址"></yd-input>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="adressArr" shape="circle" size="large"  style="margin-top: 0.35rem" bgcolor="#40a9ff" color="#FFF">搜&nbsp;索</yd-button>
          </div>
          <!-- <button type="button" name="button" @click.native="dropBaiduApp">55555</button> -->
          <yd-button type="hollow" @click.native="dropBaiduApp" style='
          position: absolute;
          top: 500px;
          right: 10px;
          z-index: 999;'>在APP中打开</yd-button>
          <!-- <yd-button @click.native="dropBaiduApp" shape="circle" size="large"  style="margin-top: 0.35rem" bgcolor="#40a9ff" color="#FFF">55555</yd-button> -->
        </yd-tab-panel>
        <baidu-map class="map":location="location"
        :center="center" :zoom="zoom" @ready="handler" :scroll-wheel-zoom="true" :reload="reload"
        >
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bm-driving
        :start="startAdress"
        :end="endAdress"
        :auto-viewport="true"
        markersset
        :waypoints="adress1"  ></bm-driving>
        <!-- <bm-local-search :keyword="keyword" :auto-viewport="true" @markersset="getPoi" location="中国"></bm-local-search> -->
        </baidu-map>
    </yd-tab>
</div>
</template>


<script type="text/babel">
import { weChatlogin } from '@/api/login'
import Util from '@/libs/util.js'
import {geTConfig} from '@/api/map.js'
import {geTAddress} from '@/api/map.js'
import Vue from 'vue'
var wx = require("weixin-js-sdk");
export default {
  data() {
    return {
      location:"北京",
      caseShow:true,
      startAdress:"",
      startAdress1:"",
      endAdress:"",
      keyword:"",
      endAdress1:"",
      addD:true,
      otherAdressList:[],
      checkbox:[],
      adressInput:[],
      adress:[],
      adress1:[],
      adress2:[],
      shili:{},
      center: {lng: 0, lat: 0},
      zoom: 3,
      addressData:''
    }
  },
  mounted(){},
  created() {

    var self=this

      var testUrl = window.location.href;
      // console.log(this.$route.params)
      // self.addressData=this.$route.params
       geTConfig(testUrl).then(res=>{
          console.log(res.data)
      })
      geTAddress().then(res=>{
         console.log(res.data.lawCases)
         for(var i=0;i<res.data.lawCases.length;i++){
           for (var j = 0; j < res.data.lawCases[i].litigants.length; j++) {
             for (var x = 0; x < res.data.lawCases[i].litigants[j].litigantAddresses.length; x++) {
               if (res.data.lawCases[i].litigants[j].litigantAddresses[x].type==2&&res.data.lawCases[i].litigants[j].litigantAddresses[x].address!=" ") {
                 res.data.lawCases[i].litigants[j].addressType=1
               }else{
                 if (res.data.lawCases[i].litigants[j].addressType==1) {

                 }else {
                   res.data.lawCases[i].litigants[j].addressType=0
                 }

               }
             }
           }
         }
         self.addressData=res.data.lawCases
     })
  },
  methods: {
    nextStep(){
        console.log(this.checkbox)
        this.caseShow = false;
        var self = this
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var myGeo = new BMap.Geocoder();
            myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result){
              if (result){
                console.log(result)
                self.startAdress1=result.address
              }
            });
          }
       });
       this.otherAdressList=[];
       for(var i=0;i<this.checkbox.length;i++){
         if(this.checkbox[i]=="0"){
           this.checkbox[i]=""
         }
           var datA = {
               value:this.checkbox[i],
               leng:i
           }
           this.otherAdressList.push(datA)
       }
       console.log(this.otherAdressList)
    },

    upStep(){
        this.caseShow = true;
    },
    handler ({BMap, map}) {
      this.center.lng = 118.10388605
      this.center.lat = 24.48923061
      this.zoom = 13
      this.shili = {BMap, map};
    },
    addInput(){
        var datas = {
            value:"",
            leng:this.otherAdressList.length
        }
        this.otherAdressList.push(datas)
    },
    getPoi({pois}){
        console.log({pois});
    },

    adressArr(){
        var testUrl = window.location.href;
        geTConfig(testUrl).then(res => {
            console.log(res.data)
        });
        if(this.endAdress1==""){
            this.$dialog.toast({
                mes: "请输入结束地址",
                icon: "error",
                timeout: 1000
            });
            return false;
        }else if(this.startAdress1==""){
            this.$dialog.toast({
                mes: "请输入开始地址",
                icon: "error",
                timeout: 1000
            });
            return false;
        }
        this.endAdress="";
        this.startAdress = "";
        this.adress=[];
        this.adress2 = [];
        for (var i = 0; i < this.otherAdressList.length; i++) {
          if (this.otherAdressList[i].value!="") {
            this.adress.push(this.otherAdressList[i].value)
          }
        }
        console.log(this.adress)
        var localSearch = new this.shili.BMap.LocalSearch(this.shili.map);
        if(this.adress.length != 0){
            for(var i=0;i<this.adress.length;i++){
                this.shili.map.clearOverlays();//清空原来的标注
                var keywordstart = this.adress[i];
                var that = this;
                var localSearch = new this.shili.BMap.LocalSearch(this.shili.map);
                localSearch.setSearchCompleteCallback(function (searchResult) {
                    var poi = searchResult.Br[0];
                    console.log(poi.point.lat,poi.point.lng)
                    var strarr ={
                        lng:poi.point.lng,
                        lat:poi.point.lat
                    }
                    that.adress2.push(strarr)
                })
                localSearch.search(keywordstart);
            }
        }
        this.addAdreess(this.startAdress1,1)
        this.reload()

    },
    reload(){
        this.addAdreess(this.endAdress1,2)
        this.adress1 = this.adress2;
    },
    addAdreess(str,dex){
        var localSearch = new this.shili.BMap.LocalSearch(this.shili.map);
        var keywordstart = str;
        var that = this;
        var localSearch = new this.shili.BMap.LocalSearch(this.shili.map);
        localSearch.setSearchCompleteCallback(function (searchResult) {
          var poi = searchResult.Br[0];
          console.log(poi.point.lng)
            if(dex==1){
                that.startAdress = {
                    lng:poi.point.lng,
                    lat:poi.point.lat
                }
            }else{
                that.endAdress = {
                    lng:poi.point.lng,
                    lat:poi.point.lat
                }
            }
        })

        localSearch.search(keywordstart);
    },
    dropBaiduApp(){
      console.log(this.endAdress.lat+","+this.endAdress.lng)
      window.location.href='baidumap://map/direction?origin={{我的位置}}&destination=latlng:'+this.endAdress.lat+','+this.endAdress.lng+'|name=目的地&mode=driving&coord_type=gcj02';
      // alert(1)
    }
  }
}
</script>
<style>
.yd-cell:after {
  margin-left: 0.24rem;
  content: '';
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid #d9d9d9;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.yd-btn-block {
  width: 100%;
  display: block;
  font-size: 0.4rem;
  height: 0.9rem;
  margin-top: 0.8rem;
}
.map {
  width: 100%;
  height: 400px;
}
.addDiv{
    font-size: 0.8rem;
    color: #969696;
    border-bottom: 0.5px solid #d9d9d9;
}
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
  .showAddress{
    display: inline-block!important;
  }
  .hideAddress{
    display: none!important;
  }
</style>
