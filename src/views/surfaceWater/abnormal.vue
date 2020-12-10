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
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >首页</van-button>
      <van-button
        id="his"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >历史数据</van-button>
      <van-button
        id="warning"
        color="#587DF7"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px; width: 90px"
        @click="selected($event)"
        >预警管理</van-button>
      <van-button
        id="point"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px"
        @click="selected($event)"
        >站点报表</van-button>
    </div>
    <van-search v-model="point" placeholder="环保局1/ /站点1"  @input="onSearch"/>
    <!-- 搜索框展示搜索内容  searchContent-->
    <div  v-if="isShowSearchContent">
        <van-cell   size="large"  v-for="(retlist,index) in searchContent" :key="index" :title="retlist.deptName" :value="retlist.siteName"  @click="selectPort(retlist)" />
    </div>
    <div  class="detailCards">
        <div v-for="(item,iIndex) in tableFactorList" :key="iIndex"  class="detailCard">

          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">区域：</div>
              <div class="factorValue">{{item.area}}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">站点：</div>
              <div class="factorValue">{{item.siteName}}</div>
            </div>
          </div>

          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">设备号：</div>
              <div class="factorValue">{{item.deviceSn}}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">安装位置：</div>
              <div class="factorValue">{{item.deviceLocation}}</div>
            </div>
          </div>
          <div class="factorList">
              <div class="singleFactor">
                <div class="factorName">监控因子：</div>
                <div class="factorValue">{{item.alias}}</div>
              </div>
              <div class="singleFactor">
                <div class="factorName">预警类型：</div>
                <div class="factorValue">{{item.alertTypeName}}</div>
              </div>
          </div>
          <div class="inlineFactor">
            <div class="inlineFactorName">预警阈值：</div>
            <div class="inlineFactorValue ">{{item.standardVal}}</div>
          </div>
              <div class="inlineFactor">
                <div class="inlineFactorName">开始时间：</div>
                <div class="inlineFactorValue ">{{item.startTime}}</div>
              </div>
              <div class="inlineFactor">
                <div class="inlineFactorName">结束时间：</div>
                <div class="inlineFactorValue ">{{item.endTime}}</div>
              </div>
               <div class="factorList">
                <div class="singleFactor">
                  <div class="factorName">持续时间：</div>
                  <div class="factorValue">{{item.duration}}</div>
                </div>
                <div class="singleFactor">
                    <div class="factorName">状态：</div>
                    <div class="factorValue">{{item.status==1?'已处理':'未处理'}}</div>
                </div>

            </div>
            <div class="cardButtons">
                <van-button class="cardButton"  v-if="item.status==1" type="default"  @click="showForm(item)" >点击查看</van-button>
                <van-button  class="cardButton" v-else type="default" @click="showForm(item)">点击处理</van-button>
            </div>

            </div>

          </div>
          <!-- 卡片结束 -->
           <abnormal-form v-if="abnormalFormHShow" @poupClose='listenPoupClose'  :message="chooseRecord" :isShow="abnormalFormHShow"></abnormal-form>
        </div>



      </div>


  </div>
</template>
<script>
import { getHistoryHeader } from "@/api/surfaceWater";
import { getWarnRecords } from "@/api/surfaceWater";
import { searchPoints } from "@/api/surfaceWater";
import { abnormalInfoSubmit } from "@/api/surfaceWater";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";
import { Toast } from "vant";
import md5 from "js-md5";
import abnormalForm from "@/components/abnormalForm"; //引入子组件
export default {
  components: { abnormalForm },
  data() {
    return {
      point: "",
      active: "",
      date: "",
      show: false,
      current: 1,
      size: 10,
      start: "",
      end: "",
      loading: false,
      finished: false,
      tableFactorList: [],
      abnormalFormHShow: false,
      chooseRecord: {},
      value1: -1,
      value2: -1,
      alertTypeList: [{ text: "全部", value: -1 }],
      option2: [
        { text: "全部", value: -1 },
        { text: "未处理", value: 0 },
        { text: "已处理", value: 1 },
      ],
      startShow: false,
      endShow: false,
      start: "",
      end: "",
      searchContent: [],
      isShowSearchContent: false,
      tmpPointId: "",
      platFormId:""
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
    showForm(e) {
      this.abnormalFormHShow = true;
      this.chooseRecord = e;
    },
    selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
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
          this.$router.push("/airPollution/index");
          break;
        case "31"://大气环境
          this.$router.push("/airPollution/index");
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
    // 获取动态表头

    // 获取列表 treeId,start,end,current,size
    getList(deptId) {
      if (deptId.length == 0) {
        deptId = "1288316940539334658";
      }
      var that = this;
      var beforeSevenDayDate = this.getBeforeDate(7);
      var todyaDate = this.getBeforeDate(0);
      getWarnRecords(
        that.platFormId,
        deptId,
        beforeSevenDayDate,
        todyaDate,
        that.current,
        that.size
      ).then(
        function (result) {
          that.tableFactorList = [];
          let list = result.data.data.records;
          for (let i = 0; i < list.length; i++) {
            that.tableFactorList.push(list[i]);
          }
          that.loading = false;
          // that.finished = true;
        },
        function (err) {
          Toast.fail("请求异常");
        }
      );
    },
    listenPoupClose(data) {
      this.abnormalFormHShow = false;
      //刷新列表
      this.getList(this.tmpPointId);
    },
    //预警类型 getAlertTypeType
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
    //处理信息提交 abnormalInfoSubmit

    //选择站点
    selectPort(e) {
      this.isShowSearchContent = false;
      // this.tableFactorList=[];
      this.getList(e.siteId);
      this.tmpPointId = e.siteId;
    },
    getPlatFormId(){
        this.platFormId = localStorage.getItem('platFormId');
    },
    //获取前几天
    // 返回前number天的日期格式为2020-02-02，参数number为前几天
    getBeforeDate(number) {
      const num = number;
      const date = new Date();
      let year = date.getFullYear();
      let mon = date.getMonth() + 1;
      let day = date.getDate();
      if (day <= num) {
        if (mon > 1) {
          mon = mon - 1;
        } else {
          year = year - 1;
          mon = 12;
        }
      }
      date.setDate(date.getDate() - num);
      year = date.getFullYear();
      mon = date.getMonth() + 1;
      day = date.getDate();
      const s =
        year +
        "-" +
        (mon < 10 ? "0" + mon : mon) +
        "-" +
        (day < 10 ? "0" + day : day);
      return s;
    },
  },
  mounted: function () {
    //   this.getAlarmType();
    this.getPlatFormId();
    this.getList("");
  },
};
</script>
<style scoped lang="scss">
.van-search {
  padding: 2px 12px 5px 12px;
}
.header{
    margin:10px 15px;
    overflow-x: scroll;
    white-space: nowrap;
  }
.header::-webkit-scrollbar { width:0; height:0; display: none; } 
.header_search {
  margin: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.active {
  background: #fd7522;
  border: 1px solid #fd7522;
  color: #fff;
}

.detailCards {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin: 8px 15px;
  width: 90%;
  padding: 10px 5px;
  background-color: white;
  border-radius: 12px;
  //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*左边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*上边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05),
    /*右边阴影*/ 2px 3px 10px rgba(0, 0, 0, 0.05);
}

.factorList {
  height: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-bottom: 8px;
  margin-left: 5px;
  border-bottom: #DEDEDE 1px dashed;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 50%;
}

.factorName {
  height: 100%;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}

.factorValue {
  font-size: 12px;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.inlineFactor {
  margin-left: 5px;
  display: flex;
  justify-content: left;
  align-items: left;
  border-bottom: #DEDEDE 1px dashed;
  height:25px;
}
.inlineFactorName {
  height: 100%;
  margin-left: 0px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}
.inlineFactorValue {
  font-size: 12px;
  font-weight: bold;
  line-height: 25px;
  color: #000000;
  opacity: 1;
}

.chartTitle {
  margin-top: 10px;
  margin-left: 20px;
}

.cardHr {
  width: 90%;
  padding-left: 5%;
}

.cardTitle {
  padding-left: 5%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 5px;
  background: #f4f4f4;
  opacity: 1;
  border-radius: 12px 12px 0px 0px;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;

  display: flex;
  justify-content: left;
  align-items: left;
}

.cardTitleIcon {
  width: 18px;
  height: 18px;
  background: #50e2c1;
  border-radius: 50%;
  opacity: 1;
}

.cardTitleWord {
  margin-left: 5px;
}

.newCard {
  width: 90%;
  height: 200px;
}
.cardsHeaderTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
}
.cardButtons {
  display: flex;
  flex-direction: row-reverse;
}
.cardButton {
  margin-right: 5%;
  background-color: #fa8b16;
  border-radius: 8px;
  height: 30px;
  box-shadow: 0px 3px 12px rgba(250, 139, 22, 0.5);
  //字体

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #ffffff;
  opacity: 1;
}
</style>
