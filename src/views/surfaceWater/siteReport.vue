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
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >首页</van-button>
      <van-button
        id="his"
        size="small"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >历史数据</van-button
      >
      <van-button
        id="warning"
        size="small"
        :color="active == 'warning' ? '#587DF7' : ''"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
        >预警管理</van-button
      >
      <van-button
        id="point"
        size="small"
        color="#587DF7"
        style="background: #f2f5ff; opacity: 1; border-radius: 8px; width: 90px"
        @click="buttonSelect($event)"
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
      id: "",
      point: "",
      active: "",
      startShow: false,
      start: "",
      loading: false,
      finished: false,
      reportList: [],
      isShowSearchContent: false,
      searchContent: [],
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
        this.$router.push("/surfaceWater/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    selected(e) {
      let id = e.currentTarget.id;
      this.active = id;
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
      if (deptId.length == 0) {
        deptId = "1288316940539334658";
      }
      var that = this;
      getReportList("21", deptId, "2", "2020-11-19").then(
        function (result) {
          let list = result.data.data;
          for (let i = 0; i < list.length; i++) {
            that.reportList.push(list[i]);
          }
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
  color: #587df7;
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
  border: 1px solid #a5a5a5;
}
.van-button--small {
  min-width: 45px;
}
.detailCard {
  // width: 95%;
  margin: 10px 15px;
  height: 670px;
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
  border: 1px solid #dedede;
  opacity: 1;
}
</style>
