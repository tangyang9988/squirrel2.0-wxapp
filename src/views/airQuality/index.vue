<template lang="html">
  <div class="pieBody">
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
    <div class="chartTitle2 ">
          <div class="chartMainTitle abnormal">
             <div class="abnormalLine"></div>
             <span id="testQuality" class="abnormalTitle">空气质量等级分布</span>
            <!-- <label for="">最新30日AQI</label> -->
          </div>
          
          <van-dropdown-menu class="dropDownMenu">
            <van-dropdown-item v-model="site1Value" :options="siteData" @change="changeSite(site1Value,1)" />
          </van-dropdown-menu>
    </div>
    <div class="wholeCard chartCardRadis">
      <div  class="chartsCard">
        
        <div class="charts">
          <!-- 环图 -->
          <canvas id="myChart" class="cycleChart"></canvas>
          
        </div>
        <div class="chartTitle">
            <!-- <label for="">首要污染物</label> -->
            <div class="mainDirtyFactorTitle">首要污染物</div>
             
          </div>
          <div class="mainFactorS">
            <div class="mainFactorValue" v-for = "(value,key) in mainFactor" :key="key" >{{value.factorName}}: {{value.num}}天</div>
          </div>
      </div>
    </div>
    <!-- 最新30日AQI -->
    <div class="chartTitle2 ">
          <div class="chartMainTitle abnormal">
             <div class="abnormalLine"></div>
             <span id="testQuality" class="abnormalTitle">最新30日AQI</span>
            <!-- <label for="">最新30日AQI</label> -->
          </div>
          
          <van-dropdown-menu class="dropDownMenu">
            <van-dropdown-item v-model="site1Value" :options="siteData" @change="changeSite(site1Value,2)" />
          </van-dropdown-menu>
    </div>
    <div class="AQIcards">
      <div v-for = "(value,key) in aqiArr" :key="key" class="AQIcard">
        <div class="AQIcardDate">{{value.time}}</div>
        <div class="AQIcardAQI">{{value.aqi}}</div>
        <div :class="switchColor(value.aqiLevel)"></div>
      </div>
    </div>

    <!-- <div class="cardsHeaderTitle">站点时报</div> -->
     <div class="chartMainTitle abnormal">
             <div class="abnormalLine"></div>
             <span id="testQuality" class="abnormalTitle">站点时报</span>
            <!-- <label for="">最新30日AQI</label> -->
          </div>
      <!-- v-model="value" -->
      <!-- <van-search  placeholder="请输入站点名称" /> -->
    <!-- 真实记录 开始 -->
    <div>
      <!-- 卡片开始 -->
      <div  class="detailCards">
        <div v-for = "(value,key) in allAqiData" :key="key" class="detailCard">
          <div class="cardTitle">
            <div class="cardTitleIcon"></div>
            <div class="cardTitleWord">{{value.siteName}}</div>
          </div>

          <div   class="factorList">
            <div v-for = "(factorValue,factorKey) in value.facotrs" :factorKey="factorKey" class="singleFactor">
              <div class="factorName">{{ factorValue.factorName}}：</div>
              <div class="factorValue">{{factorValue.aqiVal}}</div>
            </div>
          </div>
          <div class="inlineFactor">
                <div class="inlineFactorName">环境评级：</div>
                <div class="factorValue inlineFactorValue">{{value.word}}</div>
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
  } from '@/api/airQuality';
  import {
    latestAQI
  } from '@/api/airQuality';
  import {
    portDetail
  } from '@/api/surfaceWater';
    import {
    getAllSiteData
  } from '@/api/airQuality';
      import {
    getSites
  } from '@/api/airQuality';
  export default {
    name: "about",
    data() {
      return {
        data: [],
        barData: [],
        portRecord:[],
        factors:[],
        active:"",
        mainFactor:[],
        aqiArr:[],
        allAqiData:[],
        siteData:[],
        site1Value:"",
        sum:0
      };
    },
    methods: {
          selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
      if (id == "index") {
        this.$router.push("/airQuality/index");
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
            "#00E300",
            "#FFFF00",
            "#FF7D00",
            "#FF0000",
            "#99004B",
            "#7D0022",
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
      getCycleChartData(siteId) { //水质环图
        
        let that = this;
        cycleChart('22',siteId).then(function (result) {

          //
          that.data=[];
          let resData = result.data.data
           let excellentPercentage = {
              name: '优 '+resData.excellent,
              proportion: resData.excellent,
              a: "1"
            }
            that.data.push(excellentPercentage)
            let goodPercentage = {
              name: '良 '+resData.good,
              proportion: resData.good,
              a: "1"
            }
            that.data.push(goodPercentage)
            let mildPercentage = {
              name: '轻度污染 '+resData.mild,
              proportion: resData.mild,
              a: "1"
            }
            that.data.push(mildPercentage)
            let mediumPercentage = {
              name: '中度污染 '+resData.medium,
              proportion: resData.medium,
              a: "1"
            }
            that.data.push(mediumPercentage)
            let severePercentage = {
              name: '重度污染 '+resData.severe,
              proportion: resData.severe,
              a: "1"
            }
            that.data.push(severePercentage)
            let seriousPercentage = {
              name: '严重污染 '+resData.serious,
              proportion: resData.serious,
              a: "1"
            }
            that.data.push(seriousPercentage);
            that.mainFactor=resData.facotrs;

          that.drawChart();

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
          let allRecords = result.data.data //记录数组
          
          for (let i = 0; i < allRecords.length; i++) {//几个卡片
            
            that.portRecord.push(allRecords[i])
            that.factors.push(allRecords[i].factorMap)

          }
          // //2.对象的值
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
      getAQI(site) { //卡片

        let that = this;
        latestAQI('22',site).then(function (result) {
          
          that.aqiArr=result.data.data

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
      //getAllSiteData
      getAllAQIData() { //卡片

        let that = this;
        getAllSiteData('22').then(function (result) {
          that.allAqiData=result.data.data

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
      //获取站点
      getSites() { //卡片

        let that = this;
        getSites('22').then(function (result) {
          
          let resData=result.data.data
          for (let i = 0; i < resData.length; i++) {
            let singleSite={text:resData[i].siteName,value:resData[i].siteId}
            that.siteData.push(singleSite)
          }
          //默认使用第一个站点
          that.site1Value=that.siteData[0].value
          that.getCycleChartData(that.siteData[0].value)
          that.getAQI(that.siteData[0].value)

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
      //更换站点
      changeSite(e,type){
        this.sum++;
          if (type==1){
            this.getCycleChartData(e)
          }else if (type==2){
            this.getAQI(e)
          } 
         
      },
      switchColor(level){
        return `AQICardBottom${level}`
      }
      
    },
    mounted() {
      var v = this;
      this.$nextTick(() => {
        
        v.getPortDetail();
        v.getAllAQIData();
        v.getSites();


      });
    },
    onLoad() {

    },
    created() {},
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
  .pieBody {
    width: 100%;
    height: 100%;
    background-color: white;
  }

  .wholeCard {
    width: 90%;
    // height: 320px;
    margin-left: 5%;
    margin-right: 5%;
  }

  .chartsCard {
    width: 100%;
    height: 280px;
    background-color: white;

  }

  .charts {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: -10px;
  }

  .cycleChart {
    width: 80% !important;
    height: 220px !important;
  }
  .mainFactorS{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
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

  .chartCardRadis{
    
    background: #FFFFFF;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 12px;
  }

  .factorList {
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
     border-bottom: #DEDEDE 1px dashed;
  }

  .factorName {
    height: 100%;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 25px;
    color: #000000;
    opacity: 1;
  }

  .factorValue {
    font-size: 12px;
    font-weight: bold;
    line-height: 25px;
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
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 400;
    line-height: 25px;
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
    margin-bottom: 5px;
  }

  .chartTitle2{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 90%;
    margin-right: 5%;
  }
  .chartMainTitle{
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
  .mainFactorValue{
    
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 17px;
    color: #000000;
    opacity: 1;
  }
  .AQIcards{
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
    width: 90%;
    margin-left: 5%;
    padding: 5px;
    background: #FFFFFF;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 12px;
  }
  .AQIcard{
    width: 50px;
    height: 46px;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 8px;
    margin: 5px 5px;
  }
  .AQIcardDate{
    // width: 21px;
    height: 13px;
    font-size: 9px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 13px;
    color: #4D4D4D;
    opacity: 1;

  }
  .AQIcardAQI{
    // width: 17px;
    height: 20px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 20px;
    color: #000000;
    opacity: 1;
    text-align: center;

  }
  .AQICardBottom1{
    background-color: #00E300;
    height: 28%;
    
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }
  .AQICardBottom2{
    background-color: #FFFF00;
    height: 28%;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }
  .AQICardBottom3{
    background-color: #FF7D00;
    height: 28%;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }
  .AQICardBottom4{
    background-color: #FF0000;
    height: 28%;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }
  .AQICardBottom5{
    background-color: #99004B;
    height: 28%;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }
  .AQICardBottom6{
    background-color: #7D0022;
    height: 28%;
    border: 1px solid #B1B1B1;
    opacity: 1;
    border-radius: 0px 0px 8px 8px;
  }

  .mainDirtyFactorTitle{
    
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 20px;
    color: #A7A7A7;
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
.dropDownMenu{
margin:8px -15px;
width: 100px;
height: 30px;
background: #FFFFFF;
border: 1px solid #A5A5A5;
opacity: 1;
border-radius: 8px;
}
</style>
