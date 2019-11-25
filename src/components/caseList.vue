<template>
    <div>
        <yd-navbar title="案件列表" bgcolor="#40a9ff" color="#fff">
            <router-link to="/mobile/litigantLogin" slot="left">
                <yd-navbar-back-icon color="#fff" style="color:#fff;">退出</yd-navbar-back-icon>   
            </router-link>
            <!-- <router-link to="#" slot="right" @click="gotoAdd">
                <yd-navbar-next-icon color="#fff" style="color:#fff;">添加证据</yd-navbar-next-icon>
            </router-link> -->
        </yd-navbar>
    <yd-tab active-color="#40a9ff">
        <yd-cell-group>
            <yd-cell-item arrow type="label" v-for="item in caseList"  @click="gotoEvidenceList">
                <span slot="left">{{item.caseNo}}</span>
                <div slot="right" style="width:100%;height:100%;z-index:9;position: absolute;" @click="gotoEvidenceList(item.id)"></div>
                <yd-button :type="item.processType =='举证期' ? 'primary' : 'hollow'" slot="right">{{item.processType}}</yd-button>
            </yd-cell-item>
        </yd-cell-group>
    </yd-tab>
    </div>
</template>

<script type="text/babel">
import { getList } from "@/api/evidence.js";
import Util from "@/libs/util.js";
import { formatDate } from "@/libs/date.js";
export default {
  data() {
    return {
        dsa:true,
      list:[
          {
              title:"dbasd"
          },
          {
              title:"dbasd"
          },
          {
              title:"dbasd"
          },
          {
              title:"dbasd"
          },
      ],
      searchData:{
        caseNo: '',
        litigantName: "",
        filingDate: [],
        states: "",
        briefName: "",
      },
      caseList:[],
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
      getList(page){
            var params = {
                pageNumber: 1,
                pageSize:1000,
                number: page,
                size:10,
            };
            this.caseList = [];
            getList(this.searchData, params).then(res => {
                    res.data.result2.map(item => {
                        let objectData = {
                            id:item.lawCaseId,
                            processType: item.processType,
                        };
                        this.caseList.push(objectData);
                        var arr = res.data.result;
                        for(var i=0;i<this.caseList.length;i++){
                            for(var n=0;n<arr.length;n++){
                                if(this.caseList[i].id==arr[n].id){
                                    this.caseList[i].caseNo = arr[n].caseNo;
                                    this.caseList[i].briefName = arr[n].brief.name;
                                }
                            }
                        }
                    })
                    console.log(this.caseList)
            })
      },
      gotoEvidenceList(id){
        this.$router.push({
            name: 'evidenceList',
            params: { lawCaseId: id }
        });
      },
      deleEvidence(){
            this.$dialog.confirm({
                title: '提示',
                mes: '是否删除该证据？',
                opts: () => {
                    this.$dialog.toast({mes: '你点了确定', timeout: 1000});
                }
            });
          
      },
      gotoAdd(){
      }
   
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd");
    },
    formatDateTime(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style>
.yd-cell:after {
  margin-left: 0.24rem;
  content: "";
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
</style>
