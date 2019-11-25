<template>
  <!-- <div style="font-size:12px;">
        <div id="caseNo">
            案号:
            {{caseNo}}
        </div>
        <yd-timeline>
            <yd-timeline-item v-for="(item,index) in diplomsList" :key="index" v-show="diplomsList.length>0">
                <p>
                    <span>{{item.diplomsName}}</span>
                    <br>
                    <span>当事人:{{item.litigantName}}</span>
                    <yd-button type="hollow" style="float: right;" @click.native="viewPdf(item.path)">预览</yd-button>
                </p>
                <p>{{item.sendDate}}</p>
            </yd-timeline-item>
            <yd-timeline-item v-show="diplomsList.length === 0">
                <p>
                    <span>无历史文书</span>
                </p>
            </yd-timeline-item>
        </yd-timeline>
  </div>-->
  <div>
    <yd-navbar title="文书验证" bgcolor="#40a9ff" color="#fff"></yd-navbar>
    <yd-cell-group style="position: relative;">
        <yd-cell-item>
            <span slot="left">案号：</span>
            <span slot="right">(2019)闽0206民初9405号</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">案由：</span>
            <span slot="right">被继承人债务清偿纠纷</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">承办法庭：</span>
            <span slot="right">殿前法庭</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">审判员：</span>
            <span slot="right">姚亮</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">书记员：</span>
            <span slot="right">姚亮</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">案件标的：</span>
            <span slot="right">298026元</span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">文书1</span>
            <span slot="right">
                <yd-button type="hollow">预览</yd-button>
            </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">文书2</span>
            <span slot="right">
                <yd-button type="hollow">预览</yd-button>
            </span>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">文书3</span>
            <span slot="right">
                <yd-button type="hollow">预览</yd-button>
            </span>
        </yd-cell-item>
    </yd-cell-group>
  </div>
</template>
<script type="text/babel">
import { getDiplomsList } from "@/api/noticeInfo";
export default {
  data() {
    return {
      diplomsList: [], //历史文书列表
      caseNo: ""
    };
  },
  mounted() {
    // this.getDiplomsList();
  },
  methods: {
    // 网址切割
    GetRequest(value) {
      //url例子：www.bicycle.com?id="123456"&Name="bicycle"；
      var date1 = location.href.split("?"); //id="123456"&Name="bicycle";
      var date2 = date1[1].split("&"); //["id=ff8080816abae234016abb4c28af002b", "sendId=4028d6c36b0ce4a2016b0d003e31000f", "litigantId=ff8080816abae234016abb4c28d3002c"]
      console.log("date2", date2);
      if (date2.length > 0) {
        let date3 = [];
        let date4 = {};
        let str = "";
        for (let i = 0; i < date2.length; i++) {
          str = date2[i].split("=");
          date4 = {
            name: str[0],
            value: str[1]
          };
          date3.push(date4);
        }
        return date3; //格式：[{name:id,value:12},{name:id,value:12}]
      }
    },
    // 获取数据
    getDiplomsList() {
      let obj = this.GetRequest();
      // let obj1 = {
      //     id:'ff8080816abae234016abb4c28af002b',
      //     litigantId:'ff8080816abae234016abb4c28d3002c',
      //     sendId:'4028d6c36b0ce4a2016b0d003e31000f'
      // }
      // console.log('obj1',obj1)
      let obj0 = {}; //用来传输获取数据
      obj.forEach(item => {
        obj0[item.name] = item.value;
      });
      console.log("obj0", JSON.stringify(obj0, null, 2));
      getDiplomsList(obj0).then(res => {
        if (res.data.state == 100) {
          this.diplomsList = res.data.data.diplomsList;
          this.caseNo = res.data.data.caseNo;
        } else {
          this.$dialog.alert({ mes: res.data.message });
          return;
        }
      });
    },
    // 预览
    viewPdf(path) {
      console.log(path);
      if (path != "") {
        this.$router.push({
          name: "documentHistoryInfo",
          params: { path: path }
        });
      }
    }
  }
};
</script>
<style lang="css" scoped>
/* #caseNo {
  height: 50px;
  line-height: 50px;
  text-align: left;
  background-color: #fff;
  margin-bottom: 10px;
  padding-left: 14px;
  font-size: 0.32rem;
  font-weight: bold;
}
.yd-timeline-item {
  text-align: left;
}
.yd-timeline-item p {
  line-height: 28px;
} */

.yd-cell-item{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    padding-left: .24rem;
    overflow: hidden;
    width: 96%;
    margin: 0 auto;
    border-bottom: 1px solid #f2f2f2;
}
.yd-cell-left {
    color: #333;
    font-size: .3rem;
    white-space: nowrap;
    -ms-flex-align: center;
}
</style>
