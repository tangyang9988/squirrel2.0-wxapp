<template>
  <div class="main">
    <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      left-arrow
      style="background-color: #f5f5f5"
      @click-left="onClickLeft"
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
      placeholder="环保局1 /站点1"
      @input="onSearch"
    />
    <!-- 搜索框展示搜索内容  searchContent-->
    <div v-if="isShowSearchContent">
      <van-cell
        size="large"
        v-for="(retlist,reIndex) in searchContent"
        :key="reIndex"
        :title="retlist.deptName"
        :value="retlist.siteName"
        @click="selectPort(retlist)"
      />
    </div>
    <div class="header_search">
      <div class="calendar" >
        <div style="padding: 6px">
          <img
            src="../../assets/images/calendar.png"
            alt=""
            style="height: 14px; width: 14px"
          />
          <span class="timeStyle" @click="startShow = true" v-if="isAuto">{{ start }}</span>
          <span class="timeStyle"  v-else >{{ start }}</span>
          <van-calendar v-model="startShow" @confirm="onStartConfirm" :min-date="minDate" :max-date="maxDate" />
        </div>
      </div>
      <van-button
        id="auto"
        size="small"
        class="button"
        :color="active == 'auto' ? '#ADC6FF' : ''"
        @click="selected($event)"
        >自定义</van-button
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
    </div>
    <!-- 卡片列表 -->
    <div v-for="(item,itIndex) in reportList" :key="itIndex">
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
          <div v-for="(factor,factorIndex) in item.factorList" :key="factorIndex">
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
      deptId :"1288316940539334658",
      point: "",
      active: "",
      isAuto:false,
      type:2,
      startShow: false,
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(),
      start: new Date(),
      loading: false,
      finished: false,
      reportList: [],
      isShowSearchContent: false,
      searchContent: [],
      platFormId:""
    };
  },
  methods: {
    formatDate(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    },
    formatMonth(date) {
      return `${date.getFullYear()}-${
        date.getMonth() + 1}`;
    },
    onStartConfirm(date) {
      this.startShow = false;
      this.start = this.formatDate(date);
      this.getList(this.deptId,this.start)
    },
    buttonSelect(e) {
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "index") {
         //根据不同平台id跳转不同首页
        switch (this.platFormId) {
        case "21"://地表水
          this.$router.push("/surfaceWater/index");
          break;
        case "39"://智慧工地
          this.$router.push("/intelligenceConstruction/index");
          break;
        case "32"://地表水体
          this.$router.push("/pollutionSurfaceWater/index");
          break;
        case "98"://重点环境空气检测
          this.$router.push("/regulations");
          break;
        case "22"://空气质量检测
          this.$router.push("/airQuality/index");
          break;
        case "99"://餐饮油烟
          this.$router.push("/regulations");
          break;
        case "31"://大气环境
          this.$router.push("/regulations");
          break;
        case "02"://基础管理系统
          this.$router.push("/regulations");
          break;
        case "03"://远程智控
          this.$router.push("/regulations");
          break;
      }
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    onClickLeft: function () {
      this.$router.push("/");
    },
    selected(e) {
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "auto") {
        this.isAuto =true;
      } else if (id == "week") {
        this.isAuto =false;
        this.type= 3
        this.start=this.formatDate(new Date())
        this.getList(this.deptId,this.start);
      } else if (id == "month") {
        this.isAuto =false;
        this.type= 4
        this.start=this.formatMonth(new Date())
        this.getList(this.deptId,this.start);
      }
    },
    getPlatFormId(){
        this.platFormId = localStorage.getItem('platFormId');
        console.log("从本地存储获取到平台id:",this.platFormId);
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
    getList(deptId,time) {
      this.reportList=[];
      var that = this;
      getReportList("21", deptId, this.type, this.start).then(
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
    this.getPlatFormId();
    this.start = this.formatDate(this.start)
    this.getList(this.deptId,this.start);
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
  border: 1px dashed #DEDEDE;
  opacity: 1;
}
.timeStyle{
  font-size: 10px;
}
.disabledTime{
  font-size: 10px;
  background: grey;
}

</style>
