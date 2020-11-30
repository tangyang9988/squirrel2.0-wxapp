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
        :color="active == 'index' ? '#587DF7' : ''"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >首页</van-button
      >
      <van-button
        id="his"
        color="#587DF7"
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
        :color="active == 'point' ? '#587DF7' : ''"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >站点报表</van-button
      >
    </div>
      <van-search
      v-model="point"
      placeholder="环保局1/ /站点1"
      @input="onSearch"/>
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
        color=""
        size="small"
        style="opacity: 1; border-radius: 8px; width: 90px"
        @click="selectTime($event)"
        >自定义</van-button
      >
      <van-button
        id="24"
        :color="active == '24' ? '#587DF7' : ''"
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        @click="selectTime($event)"
        >24小时</van-button>
      <van-button
        id="48"
        color=""
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        @click="selectTime($event)"
        >48小时</van-button
      >
      <van-button
        id="96"
        :color="active == '96' ? '#587DF7' : ''"
        size="small"
        style="background: #fffff; opacity: 1; border-radius: 8px"
        @click="selectTime($event)"
        >96小时</van-button
      >
      <div class="calendar" >
        <div style="padding: 7px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 15px; width: 15px"
            @click="startShow = true"
          />
          <span style="" >{{ start }}</span>
          <van-calendar v-model="startShow" :min-date="minDate" :max-date="maxDate" @confirm="onStartConfirm" />
        </div>
      </div>
      <span style="margin: 15px 0px">至</span>
      <div class="calendar" >
        <div style="padding: 7px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 15px; width: 15px"
            @click="endShow = true"
          />
          <span style="">{{ end }}</span>
          <van-calendar v-model="endShow" @confirm="onEndConfirm" />
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
          <div v-for="(value,key) in item.factorMap" :key="key" class="singleFactor">
            <span class="content_value_name">{{key}}：</span><span class="content_value">{{value}}</span>
          <!-- <div class="line"></div> -->
        </div>
        <span class="content_value_name">水质类别：</span><span class="content_value">{{"II"}}</span>
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
      deptId :"1288316940539334658",
      id: "",
      point: "",
      // maxDate: new Date(""),
      active: "",
      startShow: false,
      endShow: false,
      current: 1,
      size: 10,
      start: "",
      end: "",
      loading: false,
      finished: false,
      tableFactorList: [],
      isShowSearchContent: false,
      searchContent: [],
       minDate: new Date(2010, 0, 1),
      maxDate: new Date(2030, 0, 31),

    };
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm(date) {
      this.show = false;
      this.date = this.formatDate(date);
    },
    onStartConfirm(date) {
      this.startShow = false;
      this.start = this.formatDate(date);
    },
    onEndConfirm(date) {
      this.endShow = false;
      this.end = this.formatDate(date);
    },
    selected(e) {
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
    selectTime(e) {
      let id = e.currentTarget.id;
      this.active= id
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
      var that = this;
      getHistoryList(
        deptId,
        "21",
        "2020-11-17 00:00:00",
        "2020-11-17 23:59:59",
      ).then(
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
  border: 1px solid #A5A5A5;
}
.detailCard {
  margin: 10px 15px;
  // height: 670px;
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
  flex-wrap:  wrap ;
  flex-direction: row;
  width: 100%;
  margin-left:2%;
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
  border: 1px solid #DEDEDE;
  opacity: 1;
}

</style>
