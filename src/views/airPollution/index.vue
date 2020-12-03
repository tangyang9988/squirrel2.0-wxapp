<template lang="html">
  <div class="pieBody">
        <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      left-arrow
      style="background-color: #f5f5f5"
    />
    <div class="header">
      <van-button
        id="index"
        color="#587DF7"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px"
        @click="selected($event)"
        >首页</van-button>
      <van-button
        id="his"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px"
        @click="selected($event)"
        >历史数据</van-button>
      <van-button
        id="warning"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px"
        @click="selected($event)"
        >预警管理</van-button>
      <van-button
        id="point"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px"
        @click="selected($event)"
        >站点报表</van-button>
    </div>
    <div class="abnormal">
      <div class="abnormalLine"></div>
      <span class="abnormalTitle">异常状况</span>
    </div>
    <div class="abnormalContent">
      <div class="moudle">
      <div class="current"><span class="abnormalNumber">{{countCurrent}}</span></div>
      <div class="currentTitle">当前异常</div>
      </div>
      <div class="moudle">
        <div class="last24"><span class="abnormalNumber">{{countBefore24h}}</span></div>
        <div class="currentTitle">前24小时异常</div>
      </div>
      <div class="moudle">
        <div class="month"><span class="abnormalNumber">{{countMonth}}</span></div>
        <div class="currentTitle">本月异常</div>
      </div>
      <div class="moudle">
        <div class="lastUnsolve"><span class="abnormalNumber">{{countBefore24hUnDeal}}</span></div> 
        <div class="currentTitle">前24h未处理 异常</div>
      </div>
      
    </div>
    <div class="abnormal">
      <div class="abnormalLine"></div>
      <span class="abnormalTitle">排污企业分布</span>
    </div>
    <div class="histogram">
      <canvas id="histogram" style="width: 100%;height:100%"></canvas>
    </div>
   
    <div class="abnormal">
      <div class="abnormalLine"></div>
      <span class="abnormalTitle">站点时报</span>
    </div>
    <div>
      <!-- 卡片开始 -->
      <div  class="detailCards">
        <div v-for = "(value,key) in portRecord" :key="key" class="detailCard">
          <div class="cardTitle">
            <div class="cardTitleIcon"></div>
            <div class="cardTitleWord">{{value.siteName}}</div>
          </div>
          <div   class="factorList">
            <div v-for = "(factorValue,factorKey) in value.factorMap" :factorKey="factorKey" class="singleFactor">
              <div class="factorName">{{factorKey}}：</div>
              <div class="factorValue">{{factorValue}}</div>
            </div>
          </div>
          <div class="inlineFactor">
                <div class="inlineFactorName">水质类别：</div>
                <div class="factorValue inlineFactorValue">{{value.wqiLevel}}</div>
          </div>
        </div>

      </div>

    </div>
    <!-- 真实记录 结束-->
    
</div>

</template>

<script>
import F2Bar from "@antv/f2";
import F2 from "@antv/f2/lib/index"; //引入插件
import PieLabel from "@antv/f2/lib/plugin/pie-label"; //引入插件
import { cycleChart } from "@/api/surfaceWater";
import { portDetail } from "@/api/surfaceWater";
import { getData } from "@/api/pollutionsurfaceWater";
import { getAbnormalCount } from "@/api/pollutionsurfaceWater";

export default {
  name: "about",
  data() {
    return {
      data: [],
      portRecord: [],
      factors: [],
      active: "",
      histogramData: [],
      countBefore24h:"",
      countBefore24hUnDeal:"",
      countCurrent:"",
      countMonth:""
    };
  },
  methods: {
    selected(e) {
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "index") {
        this.$router.push("/pollutionSurfaceWater/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    //柱状图
    drawHistogramChart(data) {
      var platform =localStorage.getItem("platFormId")
      // Step 1: 创建 Chart 对象
      const chart = new F2.Chart({
        id: "histogram",
        pixelRatio: window.devicePixelRatio, // 指定分辨率
      });
      // Step 2: 载入数据源
      chart.source(data);
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart.interval().position("regionName*deptNum").color("regionName");
      // Step 4: 渲染图表
      chart.render();
    },
    getPortDetail() {
      //卡片
      let that = this;
      portDetail(5, platform)
        .then(
          function (result) {
            //拼凑卡片对象
            let portCards = [];
            //1.对象的属性
            let allRecords = result.data.data; //记录数组
            for (let i = 0; i < allRecords.length; i++) {
              //几个卡片
              that.portRecord.push(allRecords[i]);
              that.factors.push(allRecords[i].factorMap);
            }
          },
          function (err) {
            console.log(err);
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
        .catch(function (error) {
          console.log(error);
          Toast.fail("登录异常");
          that.isHide = false;
        });
    },
    getChartData() {
      var that = this;
      that.histogramData = [];
      var platform =localStorage.getItem("platFormId")
      getData(platform)
        .then(function (result) {
          var histogram = result.data.data;
          for (let i = 0; i < histogram.length; i++) {
            that.histogramData.push(histogram[i]);
          }
          that.drawHistogramChart(that.histogramData)
        }).catch(function (error) {});
    },
    getAbnormal() {
      var platform =localStorage.getItem("platFormId")
      var that = this;
      getAbnormalCount(platform)
        .then(function (result) {
          that.countCurrent = result.data.data.countCurrent;
          that.countMonth = result.data.data.countMonth;
          that.countBefore24h = result.data.data.countBefore24h;
          that.countBefore24hUnDeal = result.data.data.countBefore24hUnDeal;
        }).catch(function (error) {});
    },
  },
  mounted() {
    this.getAbnormal();
    this.getChartData();
    this.getPortDetail();
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
.pieBody {
  width: 100%;
  height: 100%;
  background-color: white;
}
.progress {
  width: 100%;
  height: 15px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.detailCards {
  width: 100%;
  // height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.detailCard {
  margin-bottom: 15px;
  width: 90%;
  background-color: white;
  border-radius: 3px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05); //阴影
}
.abnormal {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 25px;
}
.abnormalLine {
  font-family: PingFang SC;
  width: 4px;
  height: 14px;
  background: #587df7;
  opacity: 1;
  border-radius: 2px;
  margin-top: 4px;
}
.abnormalTitle {
  height: 22px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
  margin-left: 4px;
}
.abnormalContent {
  height: 130px;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 12px;
  margin: 0 25px;
  display: flex;
  flex-wrap: wrap;
}
.histogram {
  height: 254px;
  background: #ffffff;
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 12px;
  margin: 0 25px;
}
.moudle {
  width: 85px;
  padding: 18px 2px;
}
.current {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background: linear-gradient(180deg, #ff5f68 0%, #f4212d 100%);
  box-shadow: 0px 3px 12px rgba(244, 33, 45, 0.5);
  opacity: 1;
  margin-left: 8px;
  text-align: center;
}
.currentTitle {
  height: 17px;
  width: 81px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  text-align: center;
  margin: 10px 0px;
}
.circle-text {
  width: 60px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 56rpx;
  color: #ffffff;
}
.last24 {
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #ffc283 0%, #fa8b16 100%);
  box-shadow: 0px 3px 12px rgba(250, 139, 22, 0.5);
  border-radius: 50%;
  opacity: 1;
  margin-left: 8px;
  text-align: center;
}
.month {
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #fff096 0%, #fada13 100%);
  box-shadow: 0px 3px 12px rgba(250, 218, 19, 0.5);
  border-radius: 50%;
  opacity: 1;
  margin-left: 8px;
  text-align: center;
}
.lastUnsolve {
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #7ff7dc 0%, #50e2c1 100%);
  box-shadow: 0px 3px 12px rgba(80, 226, 193, 0.5);
  border-radius: 50%;
  opacity: 1;
  margin-left: 8px;
  text-align: center;
}
.abnormalNumber {
  width: 60px;
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  font-family: Bebas;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
  opacity: 1;
}
.factorList {
  // height: 25px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  // margin-bottom: 8px;
  margin-left: 5%;
}

.singleFactor {
  display: flex;
  justify-content: left;
  align-items: left;
  width: 45%;
}

.factorName {
  height: 100%;
  width: 55%;

  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}

.factorValue {
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.inlineFactor {
  display: flex;
  justify-content: left;
  align-items: left;
}
.inlineFactorName {
  margin-left: 5%;
  // margin-top: 5px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 17px;
  color: #000000;
  opacity: 1;
}
.inlineFactorValue {
  float: left;
  // margin-top: 5px;
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
  margin-left: 5%;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: #000000;
  opacity: 1;
}
</style>
