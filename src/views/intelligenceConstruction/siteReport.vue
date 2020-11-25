<template>
  <div class="main">
    <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      right-text="按钮"
      left-arrow
      style="background-color: #f5f5f5"
    />
    <div class="header">
      <van-button
        id="index"
        :color="active == 'index' ? '#587DF7' : ''"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >首页</van-button
      >
      <van-button
        id="his"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >历史数据</van-button
      >
      <van-button
        id="warning"
        size="small"
        :color="active == 'warning' ? '#587DF7' : ''"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >预警管理</van-button
      >
      <van-button
        id="point"
        size="small"
        color="#587DF7"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >站点报表</van-button
      >
    </div>
    <van-search v-model="point" placeholder="环保局1/ /站点1" />
    <div class="header_search">
      <div class="calendar">
        <div style="padding: 6px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 15px; width: 15px"
            @click="startShow = true"
          />
          <span style="">{{ start }}</span>
          <van-calendar v-model="startShow" @confirm="onStartConfirm" />
        </div>
      </div>
      <van-button
        size="small"
        class="button"
        id="day"
        :color="active == 'day' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >日</van-button
      >
      <van-button
        size="small"
        class="button"
        id="week"
        :color="active == 'week' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >周</van-button
      >
      <van-button
        size="small"
        class="button"
        id="month"
        :color="active == 'month' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >月</van-button
      >
      <van-button
        size="small"
        class="button"
        id="year"
        :color="active == 'year' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >年</van-button
      >
    </div>
    <!-- 卡片列表 -->
    <div v-for="item in reportList" :key="item">
      <div class="detailCard">
        <div class="detailCard_header">
          <img
            src="../../assets/images/clock.png"
            alt=""
            style="height: 15px; width: 15px; padding: 10px"
            @click="startShow = true"
          />
          <div class="header_title">{{ item.statTime }}</div>
        </div>
        <div style="margin:0px;20px">
          <div v-for="factor in item.factorList" :key="factor">
          <div class="content_factorName">
            {{ factor.factorName }}{{ factor.unit }}
          </div>
          <div>
            <span class="content_value_name">最大值：</span
            ><span class="content_value">{{ factor.maxVal }}</span
            ><span class="content_value_name">最小值：</span
            ><span class="content_value">{{ factor.minVal }}</span
            ><span class="content_value_name">平均值：</span
            ><span class="content_value">{{ factor.minVal }}</span>
          </div>
          <div>
            <span class="content_value_name">达标率：</span
            ><span class="content_value">{{ factor.standardRate }}</span
            ><span class="content_value_name">在线率：</span
            ><span class="content_value">{{ factor.onlineRate }}</span>
          </div>
          <div class="line"></div>
        </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import { getReportList } from "@/api/surfaceWater";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";
import { Toast } from "vant";
import md5 from "js-md5";
export default {
  data() {
    return {
      id: "",
      point: "",
      active: "",
      startShow: false,
      start: "",
      loading: false,
      finished: false,
      reportList: [],
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}年${
        date.getMonth() + 1
      }月${date.getDate()}日`;
    },
    onStartConfirm(date) {
      this.startShow = false;
      this.start = this.formatDate(date);
    },
    buttonSelect(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
       if (id == "index") {
        this.$router.push("/intelligenceConstruction/index");
      } else if (id == "his") {
        this.$router.push("/intelligenceConstruction/history");
      } else if (id == "warning") {
        this.$router.push("/intelligenceConstruction/abnormal");
      } else if (id == "point") {
        this.$router.push("/intelligenceConstruction/report");
      }
    },
    selected(e) {
      let id = e.currentTarget.id;
      this.active = id;
    },
    // 获取列表
    getList() {
      var that = this;
      getReportList("39", "1288316940539334658", "2", "2020-11-19").then(
        function (result) {
          let list = result.data.data;
          for (let i = 0; i < list.length; i++) {
            that.reportList.push(list[i]);
          }
          console.log(that.reportList);
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
  },
  mounted: function () {
    this.getList();
  },
};
</script>
<style scoped lang="scss">
.header {
  margin: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header_search {
  margin: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.active {
  color: #587DF7;
}
.button {
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
}
.calendar {
  height: 30px;
  width: 45%;
  // background: #A5A5A5;
  border-radius: 8px;
  border: 1px solid #A5A5A5;
}
.van-button--small {
  min-width: 45px;
}
.detailCard {
  // width: 95%;
  margin: 10px 15px;
  height: 670px;
  background: #FFFFFF;
  border: 1px solid #EFEFEF;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 12px;
}
.detailCard_header {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  height: 39px;
  background: #F4F4F4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;
}
.header_title {
  width: 151px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  padding: 10px;
}
.content_factorName {
  margin: 10px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.content_value_name {
  margin: 0px 10px;
  // width: 30px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.content_value {
  margin: 0px 10px;
  // width: 14px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.line {
  margin: 10px;
  height: 0px;
  border: 1px solid #DEDEDE;
  opacity: 1;
}
</style>
