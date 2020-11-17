<template lang="html">
  <div class="pieBody">
    <div class="wholeCard">
      <div  class="chartsCard">
        <div class="chartTitle">
          <label for="">当月水质等级</label>
        </div>
        <div class="charts">
          <!-- 环图 -->
          <canvas id="myChart" class="cycleChart"></canvas>
          <canvas id="barChart" class="barChart"></canvas>
        </div>
      </div>
    </div>

    <div>
      <div class="cardsHeaderTitle">站点时报</div>
      <!-- v-model="value" -->
      <van-search  placeholder="请输入站点名称" />
      <!-- 卡片开始 -->
      <div class="detailCards">
        <div class="detailCard">
          <div class="cardTitle">
            <div class="cardTitleIcon"></div>
            <div class="cardTitleWord">企业单位1-站点1</div>
          </div>

          <!-- <div class="cardHr">
                  <hr>
                </div> -->
          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">水温：</div>
              <div class="factorValue">27.48℃</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">pH值：</div>
              <div class="factorValue">7.48</div>
            </div>
          </div>

          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">电导率：</div>
              <div class="factorValue">273.2</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">浊度：</div>
              <div class="factorValue">205.27</div>
            </div>
          </div>


          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">锌：</div>
              <div class="factorValue">5.28mg/L</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">氨氮：</div>
              <div class="factorValue">5.28mg/L</div>
            </div>
          </div>

          <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">总磷：</div>
              <div class="factorValue">5.28mg/L/</div>
            </div>
            <div class="singleFactor">
                <div class="factorName">蓝绿藻：</div>
                <div class="factorValue">-</div>
            </div>
          </div>
            <div class="factorList">
              <div class="singleFactor">
                <div class="factorName">五日生化需氧量：</div>
                <div class="factorValue">5.28mg/L</div>
                </div>
                <div class="singleFactor">
                  <div class="factorName">溶解氧：</div>
                  <div class="factorValue">5.28mg/L</div>
                </div>
              </div>
              <div class="inlineFactor">
                <div class="inlineFactorName">化学需氧量：</div>
                <div class="factorValue ">5.28mg/L</div>
              </div>
              <div class="inlineFactor">
                <div class="inlineFactorName">高锰酸钾指数：</div>
                <div class="factorValue ">5.28mg/L</div>
              </div>
              <div class="inlineFactor">
                <div class="inlineFactorName">水质类别：</div>
                <div class="factorValue ">III类</div>
              </div>
            </div>

          </div>


          <!-- 卡片结束 -->
        </div>
      </div>
    </div>
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
        data: [

        ],
        barData: []
      };
    },
    methods: {

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
        cycleChart(3,21).then(function (result) {

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
              a: "1"
            }
            that.data.push(singlePercentage)
            let singleBarChart = {
              year: numbers[i],
              sales: singleNumber
            }
            that.barData.push(singleBarChart)
          }

          that.drawChart()
          that.drawBarChart()

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
        portDetail(5,21).then(function (result) {
          //拼凑卡片对象
          let portCards = []
          //1.对象的属性
          let allFactors = result.data.data.x
          let ports = result.data.data.y
          for (let i = 0; i < ports.length; i++) {//几个卡片
            for (let j = 0; j < allFactors.length; j++) {//几个因子
              portCards["factorCodeName"]=allFactors[j].factorCode
              portCards["factorCodeAlias"]=allFactors[j].alias
            }

            numberSum += numbers[i]
          }
          //2.对象的值


          console.log(portCards)


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
      }
    },
    mounted() {
      var v = this;
      this.$nextTick(() => {
        v.getCycleChartData();
        v.getPortDetail();
        //v.drawChart();
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

  }

  .charts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -20px;
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
    height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .detailCard {
    margin-bottom: 5px;
    width: 90%;
    height: 290px;
    background-color: white;
    border-radius: 3px;
    
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
  }

  .factorList {
    height: 25px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 8px;
    margin-left: 5px;
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
    margin-left: 10px;
    margin-top: 5px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 17px;
    color: #000000;
    opacity: 1;
  }
  .inlineFactorValue{
    float:left;
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
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 22px;
    color: #000000;
    opacity: 1;
  }

</style>
