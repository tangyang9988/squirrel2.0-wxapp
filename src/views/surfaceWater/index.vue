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
    <div class="abnormal" >
      <div class="abnormalLine"></div>
      <span id="testQuality" class="abnormalTitle">当月水质等级</span>
    </div>
    <!-- 可点击的环形图 -->
    <div class="wholeCard">
      <div  class="chartsCard">
        <div class="charts">
          <!-- 环图 直线图-->
          <canvas id="container" ></canvas>
        </div>
      </div>
    </div>
    <div class="abnormal">
      <div class="abnormalLine"></div>
      <span class="abnormalTitle">站点时报</span>
    </div>

    <!-- 真实记录 开始 -->
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
  import {
    cycleChart
  } from '@/api/surfaceWater';
  import {
    portDetail
  } from '@/api/surfaceWater';
  export default {
    name: "about",
    data() {
      return {
        data: [],
        barData: [],
        portRecord:[],
        factors:[],
        active:"",
        platForm:"",
        data2 : [],
      };
    },
    methods: {
      selected(e) {
      let id = e.currentTarget.id;
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

      drawChart() {
        // Step 1: 创建 Chart 对象
        const chart = new F2.Chart({
          id: "myChart",
          pixelRatio: window.devicePixelRatio, // 指定分辨率
          plugins: PieLabel,
        });

        chart.source(this.data);
        chart.legend({
          position: "right",
        });
        chart.coord("polar", {
          transposed: true,
          innerRadius: 0.7,
        });
        chart.axis(false);
        chart
          .interval()
          .position("a*proportion")
          .color("name", [
            "#1890FF",
            "#13C2C2",
            "#2FC25B",
            "#FACC14",
            "#F04864",
            "#8543E0",
          ])
          .adjust("stack");

        chart.render();
      },
      newDrawChart() {
        let that=this;
        const chart = new F2.Chart({
        id: 'container',
        pixelRatio: window.devicePixelRatio,
        plugins: PieLabel
        });
        chart.source(that.data2);
        chart.coord('polar', {
          transposed: true,
          radius: 0.9,
          innerRadius: 0.5
        });
        chart.axis(false);
        chart.legend(false);
        chart.tooltip(false);
        chart.guide()
          .html({
            position: [ '50%', '50%' ],
            html: '<div style="text-align: center;width:150px;height: 50px;">\n      <p style="font-size: 12px;color: #999;margin: 0" ref="surfaceWaterDataType" id="surfaceWaterDataType"></p>\n      <p style="font-size: 18px;color: #343434;margin: 0;font-weight: bold;" ref="surfaceWaterData" id="surfaceWaterData"></p>\n      </div>'
          });
        chart.interval()
          .position('const*money')
          .adjust('stack')
          .color('type', [ '#1890FF', '#13C2C2', '#2FC25B', '#FACC14' ]);
          // chart.legend({
          //   position: 'bottom',
          //   align: 'center'
          // });
        chart.pieLabel({
          sidePadding: 30,
          activeShape: true,
          label1: function label1(data) {
            return {
              text:  data.money*100+"%",
              fill: '#343434',
              fontWeight: 'bold'
            };
          },
          label2: function label2(data) {
            return {
              text: data.type,
              fill: '#999'
            };
          },
          onClick: function onClick(ev) {
            const data = ev.data;
            console.log(data)
            if (data) {
              let selectedInfo=document.getElementById("surfaceWaterDataType")
              let selectedDataInfo=document.getElementById("surfaceWaterData")

               selectedInfo.innerText =data.type
               selectedDataInfo.innerText=data.money
            }
          }
        });
        chart.render();
      },
      //条状图
      drawBarChart() {
        const chart = new F2Bar.Chart({
          id: "barChart",
          pixelRatio: window.devicePixelRatio,
        });

        chart.source(this.barData, {
          sales: {
            tickCount: 5,
          },
        });
        chart.coord({
          transposed: true,
        });
        chart.tooltip({
          showItemMarker: false,
          onShow: function onShow(ev) {
            const items = ev.items;
            items[0].name = null;
            items[0].name = items[0].title;
            items[0].value = "¥ " + items[0].value;
          },
        });
        chart.interval().position("year*sales");
        chart.render();
      },
      getCycleChartData() { //水质环图

        let that = this;
        cycleChart(3,that.platForm).then(function (result) {

          //环形图
          let numbers = result.data.data.y
          let numberName = result.data.data.x
          let numberSum = 0
          let percentage = []
          let barChartArr = []
          for (let i = 0; i < numbers.length; i++) {
            numberSum += numbers[i]
          }
          for (let i = 0; i < numbers.length; i++) {
            let singleNumber = numbers[i] / numberSum
            singleNumber = that.fomatFloat(singleNumber, 2)
            let singlePercentage = {
              name: numberName[i],
              proportion: singleNumber,
              const: 'const',
            }
            that.data.push(singlePercentage)
            let singleBarChart = {
              year: numbers[i],
              sales: singleNumber
            }
            that.barData.push(singleBarChart)

            //可点击环图
            let newObject={
              const: 'const',
              type: numberName[i],
              money: singleNumber
            }
             that.data2.push(newObject)
          }

          // that.drawChart();
          // that.drawBarChart();
           that.newDrawChart();

        }, function (err) {
          console.log(err)
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          console.log(error)
          Toast.fail("登录异常");
          that.isHide = false;
        });
      },
      getPortDetail() { //卡片

        let that = this;
        portDetail(that.platForm).then(function (result) {
          //拼凑卡片对象
          let portCards = []
          //1.对象的属性
          let allRecords = result.data.data //记录数组

          for (let i = 0; i < allRecords.length; i++) {//几个卡片

            that.portRecord.push(allRecords[i])
            that.factors.push(allRecords[i].factorMap)

          }
          // //2.对象的值


          console.log(that.portRecord)


        }, function (err) {
          console.log(err)
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          console.log(error)
          Toast.fail("登录异常");
          that.isHide = false;
        });
      },
      //保留指定位数的小数
      fomatFloat(src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
      },
      getPlatFormId(){
        this.platForm = localStorage.getItem('platFormId');
        console.log("从本地存储获取到平台id:",this.platForm);
      }
    },
    mounted() {
      var v = this;
      this.$nextTick(() => {

        v.getPlatFormId();
        v.getCycleChartData();
        v.getPortDetail();
        //v.newDrawChart();
        //v.drawBarChart();


      });
    },
    onLoad() {
      console.log("onload")
      this.getCycleChartData();

    },
    created() {},
  };

</script>
<style scoped lang="scss">
  .header{
    margin:10px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .pieBody {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .wholeCard {
    width: 90%;
    height: 240px;
    padding-left: 5%;
    padding-right: 5%;
  }

  .chartsCard {
    width: 100%;
    height: 240px;
    background-color: white;
     //卡片阴影
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 12px;

  }

  .charts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }

  .cycleChart {
    width: 45% !important;
    height: 250px !important;
  }

  .barChart {
    width: 45% !important;
    height: 250px !important;
  }

  .progresses {
    width: 50%;
    height: 250px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
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
    // height: 110px;
    width: 90%;
    // height: 290px;
    background-color: white;
    border-radius: 3px;

    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  }

  .factorList {
    // height: 25px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap:  wrap ;
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
  .inlineFactor{
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
  .inlineFactorValue{
    float:left;
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
    background: #F4F4F4;
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
    ;

  }

  .cardTitleIcon {
    width: 18px;
    height: 18px;
    background: #50E2C1;
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
  .cardsHeaderTitle{
    margin-left: 5%;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 22px;
    color: #000000;
    opacity: 1;
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
</style>
