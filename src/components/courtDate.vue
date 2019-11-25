<template lang="html">
  <div style="background-color: #f1f2f6;padding-bottom:30px;">
    <yd-navbar title="庭审排期" bgcolor="#40a9ff" color="#fff">
      <router-link to="/mobile" slot="left">
        <yd-navbar-back-icon color="#fff" style="color:#fff;">返回</yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div id="calendar">
      <!-- 年份 月份 -->
      <div class="month">
          <ul>
              <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
              <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
              <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                  <span class="choose-year">{{ currentYear }}</span>
                  <span class="choose-month">{{ currentMonth }}月</span>
              </li>
              <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
          </ul>
      </div>
      <!-- 星期 -->
      <ul class="weekdays">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li style="color:#ed3f14">六</li>
          <li style="color:#ed3f14">日</li>
      </ul>
      <!-- 日期 -->
      <ul class="days">
          <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
          <li  v-for="dayobject in days" :class="dayobject.work? 'work':''">
              <!--本月-->
              <!--如果不是本月  改变类名加灰色-->
              <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
              <!--如果是本月  还需要判断是不是这一天-->
              <span v-else>
            <!--今天  同年同月同日-->
                  <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                  <span v-else>{{ dayobject.day.getDate() }}</span>
              </span>
          </li>
      </ul>
  </div>
</div>
</template>

<script>
import { orderByTimes } from '@/api/courtDate.js'
import { formatDate } from  '@/libs/date.js'
export default {
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: []
    }
  },
  created: function() {
    //在vue初始化时调用
    this.initData(null)
  },
  methods: {
    initData: function(cur) {
      var leftcount = 0 //存放剩余数量
      var date

      if (cur) {
        date = new Date(cur)
      } else {
        var now = new Date()
        var d = new Date(this.formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      var currentMonth = date.getMonth()
      var nextMonth = ++currentMonth;
      var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
      var oneDay=1000*60*60*24;
      var endDate = new Date(nextMonthFirstDay - oneDay);
      var workDate = new Array();
      orderByTimes(date.getTime(), endDate.getTime()).then(res => {
        res.data.result.content.map((item,index) => {
          workDate.push(item.startDate)
        })
        this.currentDay = date.getDate()
        this.currentYear = date.getFullYear()
        this.currentMonth = date.getMonth() + 1

        this.currentWeek = date.getDay() // 1...6,0
        if (this.currentWeek == 0) {
          this.currentWeek = 7
        }
        var str = this.formatDate(
          this.currentYear,
          this.currentMonth,
          this.currentDay
        )
        this.days.length = 0
        // 今天是周日，放在第一行第7个位置，前面6个
        //初始化本周
        for (var i = this.currentWeek - 1; i >= 0; i--) {
          var d = new Date(str)
          d.setDate(d.getDate() - i)
          var dayobject = {} //用一个对象包装Date对象  以便为以后预定功能添加属性
          dayobject.day = d
          this.days.push(dayobject) //将日期放入data 中的days数组 供页面渲染使用
        }
        //其他周
        var maxD;
        if(this.currentWeek > 5) {
          maxD = 42;
        } else {
          maxD = 35;
        }
        for (var i = 1; i <= maxD - this.currentWeek; i++) {
          var d = new Date(str)
          d.setDate(d.getDate() + i)
          var dayobject = {}
          dayobject.day = d
          var has = false
          for(var j = 0;j<workDate.length;j++) {
            if(formatDate(d, 'yyyy-MM-dd') == formatDate(new Date(workDate[j]), 'yyyy-MM-dd')) {
              dayobject.work = true
              j = workDate.length
            } else {
              dayobject.work = false
            }
          }
          this.days.push(dayobject)
        }
        console.log(this.days)
      })
    },
    pickPre: function(year, month) {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext: function(year, month) {
      var d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickYear: function(year, month) {
      alert(year + ',' + month)
    },

    // 返回 类似 2016-01-02 格式的字符串
    formatDate: function(year, month, day) {
      var y = year
      var m = month
      if (m < 10) m = '0' + m
      var d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
  }
}
</script>

<style lang="css">
* {
    box-sizing: border-box;
}
ul {
  list-style-type: none;
}
#calendar{
  margin: 0 auto;
}
.month {
  width: 100%;
  background: #40a9ff;
}
.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.year-month {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}
.year-month:hover {
    background: rgba(150, 2, 12, 0.1);
}
.choose-year {
    padding-left: 20px;
    padding-right: 20px;
}
.choose-month {
    text-align: center;
    font-size: .8rem;
}
.arrow {
  padding: 24px 30px;
}
.arrow:hover {
    background: rgba(100, 2, 12, 0.1);
}
.month ul li {
    color: white;
    font-size: 20px;
    text-transform: uppercase;
    letter-spacing: 3px;
}
.weekdays {
    margin: 0;
    padding: 10px 0;
    background-color: #40a9ff;
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    color: #FFFFFF;
    justify-content: space-around;
}
.weekdays li {
    display: inline-block;
    width: 13.6%;
    text-align: center;
}
.days {
    padding: 0;
    background: #FFFFFF;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.days li {
    list-style-type: none;
    display: inline-block;
    width: 13.2%;
    margin-top: 2px;
    margin-bottom: 2px;
    text-align: center;
    padding-bottom: 13px;
    padding-top: 13px;
    font-size: .4rem;
    color: #000;
}
.days li .active {
    padding: 6px 10px;
    color: #ed3f14;
}
.days li.work {
    /* box-sizing: border-box; */
    background: rgba(64,169,255,.3);
    color: #fff;
}
.days li .other-month {
    padding: 5px;
    color: gainsboro;
}
.days li:hover {
  background: rgba(237,63,20,.3);
  border: 2px solid #ed3f14;
}
</style>
