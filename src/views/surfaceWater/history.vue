<template>
  <div class="main">
    <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      left-arrow
      style="background-color: #f5f5f5"
    />
    <div class="header">
      <van-button
        id="index"
        size="small"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="selectHeader($event)"
        >首页</van-button
      >
      <van-button
        id="his"
        color="#587DF7"
        size="small"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="selectHeader($event)"
        >历史数据</van-button
      >
      <van-button
        id="warning"
        size="small"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="selectHeader($event)"
        >预警管理</van-button
      >
      <van-button
        id="point"
        size="small"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="selectHeader($event)"
        >站点报表</van-button
      >
    </div>
    <van-search
      v-model="point"
      placeholder="环保局1/ /站点1"
      @input="onSearch"
    />
    <!-- 搜索框展示搜索内容  searchContent-->
    <div v-if="isShowSearchContent">
      <van-cell
        size="large"
        v-for="retlist in searchContent" 
        :key="retlist.deptId"
        :title="retlist.deptName"
        :value="retlist.siteName"
        @click="selectPort(retlist)"
      />
    </div>
    <div class="header_search">
      <van-button
        id="auto"
        size="small"
        :color="active == 'auto' ? '#ADC6FF' : ''"
        class="button"
        @click="selected($event)"
        >自定义</van-button
      >
      <van-button
        id="24"
        :color="active == '24' ? '#ADC6FF' : ''"
        size="small"
        class="button"
        @click="selected($event)"
        >24小时</van-button
      >
      <van-button
        id="48"
        :color="active == '48' ? '#ADC6FF' : ''"
        size="small"
        class="button"
        @click="selected($event)"
        >48小时</van-button
      >
      <van-button
        id="96"
        :color="active == '96' ? '#ADC6FF' : ''"
        size="small"
        class="button"
        @click="selected($event)"
        >96小时</van-button
      >
      <div class="calendar">
        <div style="padding: 6px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 15px; width: 15px"
            @click="startShow = true"
          />
          <span @click="startShow = true" class="timeStyle" v-if="isAuto">{{
            start
          }}</span>
          <span class="timeStyle" v-else>{{ start }}</span>
          <van-calendar
            v-model="startShow"
            @confirm="onStartConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
      </div>
      <span style="margin: 16px 0px; font-size: 14px">至</span>
      <div class="calendar">
        <div style="padding: 6px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 15px; width: 15px"
          />
          <span @click="endShow = true" class="timeStyle" v-if="isAuto">{{
            end
          }}</span>
          <span class="timeStyle" v-else>{{ end }}</span>
          <van-calendar
            v-model="endShow"
            @confirm="onEndConfirm"
            :min-date="minDate"
            :max-date="maxDate"
          />
        </div>
      </div>
    </div>
    <!-- 卡片列表 -->
    <div v-for="item in tableFactorList" :key="item">
      <div class="detailCard">
        <div class="detailCard_header">
          <img
            src="../../assets/images/clock.png"
            alt=""
            style="height: 15px; width: 15px; padding: 10px"
            @click="startShow = true"
          />
          <div class="header_title">{{ item.collTime }}</div>
        </div>
        <div class="content">
          <div
            v-for="(value, key) in item.factorMap"
            :key="key"
            class="singleFactor"
          >
            <span class="content_value_name">{{ key }}：</span
            ><span class="content_value">{{ value }}</span>
            <!-- <div class="line"></div> -->
          </div>
          <span class="content_value_name">水质类别：</span
          ><span class="content_value">{{ "II" }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getHistoryHeader } from "@/api/surfaceWater";
import { getHistoryList } from "@/api/surfaceWater";
import { searchPoints } from "@/api/surfaceWater";
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
      deptId: "1288316940539334658",
      id: "",
      point: "",
      active: "",
      isAuto: false,
      startShow: false,
      endShow: false,
      current: 1,
      size: 10,
      start: new Date(),
      end: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      loading: false,
      finished: false,
      tableFactorList: [],
      isShowSearchContent: false,
      searchContent: [],
    };
  },
  methods: {
    formatStartDate(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} 00:00:00`;
    },
    formatEndDate(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} 23:59:59`;
    },
    formatDate(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${this.timeAdd(date.getHours())}:${this.timeAdd(
        date.getMinutes()
      )}:${this.timeAdd(date.getSeconds())}`;
    },
    getNextDate(date, day) {
      var dd = new Date(date);
      dd.setDate(dd.getDate() + day);
      var y = dd.getFullYear();
      var m =dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
      var h = dd.getHours() < 10 ? "0" + dd.getHours() : dd.getHours();
      var minute = dd.getMinutes() < 10 ? "0" + dd.getMinutes() : dd.getMinutes();
      var ss = dd.getSeconds() < 10 ? "0" + dd.getSeconds() : dd.getSeconds();
      return y + "-" + m + "-" + d+" "+h+':'+minute+':'+ss;
    },
    onStartConfirm(date) {
      this.startShow = false;
      this.start = this.formatStartDate(date);
      this.getList(this.deptId);
    },
    timeAdd(str) {
      if (str <= 9) {
        str = "0" + str;
      }
      return str;
    },
    onEndConfirm(date) {
      this.endShow = false;
      this.end = this.formatEndDate(date);
      this.getList(this.deptId);
    },
    selectTime(e) {
      let id = e.currentTarget.id;
      this.active = id;
    },
    selected(e) {
      let curDate = new Date();
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "auto") {
        this.isAuto = true;
      } else if (id == "24") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate),-1);
        this.end = this.formatDate(curDate);
        this.getList(this.deptId);
      } else if (id == "48") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate),-2);
        this.end = this.formatDate(curDate);
        this.getList(this.deptId);
      } else if (id == "96") {
        this.isAuto = false;
        this.start = this.getNextDate(this.formatDate(curDate),-4);
        this.end = this.formatDate(curDate);
        this.getList(this.deptId);
      }
    },
    selectHeader(e) {
      let id = e.currentTarget.id;
      if (id == "index") {
        this.$router.push("/surfaceWater/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    // 头部检索
    onSearch() {
      var that = this;
      that.isShowSearchContent = true;
      searchPoints("21", that.point).then(
        function (result) {
          that.searchContent = result.data.data;
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
    //选择站点
    selectPort(e) {
      this.isShowSearchContent = false;
      this.getList(e.siteId);
    },

    // 获取列表
    getList(deptId) {
      this.tableFactorList = [];
      var that = this;
      getHistoryList(deptId, "21", this.start, this.end).then(
        function (result) {
          let list = result.data.data;
          for (let i = 0; i < list.length; i++) {
            that.tableFactorList.push(list[i]);
          }
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
  },
  mounted: function () {
    this.start = this.formatStartDate(this.start);
    this.end = this.formatEndDate(this.end);
    this.getList(this.deptId);
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
.calendar {
  margin: 10px 0px;
  height: 30px;
  width: 45%;
  // background: #A5A5A5;
  border-radius: 8px;
  border: 1px solid #a5a5a5;
}
.detailCard {
  margin: 10px 15px;
  // height: 670px;
  background: #ffffff;
  border: 1px solid #efefef;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);
  opacity: 1;
  border-radius: 12px;
}
.detailCard_header {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  height: 39px;
  background: #f4f4f4;
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
.button {
  background: #ffffff;
  opacity: 1;
  border-radius: 8px;
}
.content_value_name {
  margin: 5px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.content_value {
  margin: 5px;
  height: 17px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  margin-left: 2%;
}
.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 45%;
}
.line {
  margin: 10px;
  height: 0px;
  border: 1px solid #dedede;
  opacity: 1;
}
.timeStyle {
  font-size: 10px;
}
.disabledTime {
  font-size: 10px;
  background: grey;
}
</style>
