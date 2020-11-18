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
        @click="selected($event)"
        >首页</van-button
      >
      <van-button
        id="his"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >历史数据</van-button
      >
      <van-button
        id="warning"
        size="small"
        :color="active == 'warning' ? '#587DF7' : ''"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >预警管理</van-button
      >
      <van-button
        id="point"
        size="small"
        color="#587DF7"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >站点报表</van-button
      >
    </div>
    <van-search v-model="point" placeholder="环保局1/ /站点1" />
    <div class="header_search">
      <!-- <van-button
        color="#ADC6FF"
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px; width: 90px"
        >自定义</van-button
      >
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        >24小时</van-button
      >
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        >48小时</van-button
      >
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        >96小时</van-button
      > -->
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
      <van-button size="small"  style="width:1px">日</van-button>
      <van-button size="small" class="button">周</van-button>
      <van-button size="small" class="button">月</van-button>
      <van-button size="small" class="button">年</van-button>
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多数据"
    >
      <van-cell
        v-for="item in tableFactorList"
        :key="item"
        :title="item.siteName"
        :value="item.collTime"
      />
    </van-list>
  </div>
</template>
<script>
import { getHistoryHeader } from "@/api/surfaceWater";
import { getHistoryList } from "@/api/surfaceWater";
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
      current: 1,
      size: 10,
      start: "",
      loading: false,
      finished: false,
      tableFactorList: [],
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
    selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
      if (id == "index") {
        this.$router.push("/surfaceWater/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/index");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/history");
      }
    },
    // 获取动态表头
    getHeader() {
      getHistoryHeader("1288316940539334658", "21").then(
        function (result) {
          let title = result.data.data.x;
          let data = result.data.data.y;
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
    // 获取列表
    getList() {
      var that = this;
      getHistoryList(
        "1288316940539334658",
        "21",
        "2020-11-17 00:00:00",
        "2020-11-17 23:59:59",
        that.current,
        that.size
      ).then(
        function (result) {
          let list = result.data.data.records;
          for (let i = 0; i < list.length; i++) {
            that.tableFactorList.push(list[i]);
          }
          that.loading = false;
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
  },
  mounted: function () {
    this.getHeader();
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
</style>
