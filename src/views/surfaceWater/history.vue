<template>
  <div class="main">
    <!-- <van-tabs v-model="active" background="rgba(76, 173, 246, 1)">
      <van-tab title="首页">
        <van-search v-model="point" placeholder="请输入搜索关键词" />
        <van-cell title="选择日期区间" :value="date" @click="show = true" />
        <van-calendar v-model="show" type="range" @confirm="onConfirm" />
      </van-tab>
      <van-tab title="历史数据">历史数据</van-tab>
      <van-tab title="预警管理">预警管理</van-tab>
      <van-tab title="站点报表">站点报表</van-tab>
    </van-tabs> -->
    <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      right-text="按钮"
      left-arrow
      style="background-color: #f5f5f5"
    />
    <div class="header">
      <van-button
        color="#587DF7" plain
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;"
        text-color="red"
        >首页</van-button>
      <van-button
        type="default"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;"
        color="#587DF7">历史数据</van-button>
      <van-button
        color="#587DF7" plain
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;"
        >预警管理</van-button>
      <van-button
        color="#587DF7" plain
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px"
        >站点报表</van-button>
    </div>
    <van-search v-model="point" placeholder="环保局1/ /站点1" />
    <div class="header_search">
      <van-button
        color="#ADC6FF"
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px;width:90px"
        >自定义</van-button>
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px;">24小时</van-button>
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px;">48小时</van-button>
      <van-button
        plain
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px;">96小时</van-button>
        <van-cell title="选择时间" :value="date" @click="show = true" />
        <van-calendar v-model="show" type="range" @confirm="onConfirm" color="#587DF7" />
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="暂无更多数据"
      @load="load_more_items">
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
      point: "",
      active: "",
      date: "",
      show: false,
      current:1,
      size:10,
      start:"",
      end:"",
      loading: false,
      finished: false,
      tableFactorList:[]
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
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
      getHistoryList("1288316940539334658", "21","2020-11-17 00:00:00","2020-11-17 23:59:59",that.current,that.size).then(
        function (result) {
          let list = result.data.data.records;
            for (let i=0;i<list.length;i++){
                that.tableFactorList.push(list[i]);
            }
            that.loading = false;
            // that.finished = true;
            console.log(tableFactorList)
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
.header{
  margin:10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.header_search{
  margin:10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.active {
   background: #fd7522;
   border: 1px solid #fd7522;
   color: #fff;
 }

</style>
