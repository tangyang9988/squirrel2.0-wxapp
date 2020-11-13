<template lang="html">
  <div >
   <div class="wholeCard">
<div class="chartsCard">
    <div class="chartTitle">
      <label for="">当月水质等级</label>
    </div>
    <div class="charts">
      <!-- 环图 -->
     <canvas id="myChart" class="cycleChart"></canvas>
     
     <canvas id="barChart" class="barChart"></canvas>
    </div>
   
   <!-- 进度条 -->
   <!-- <div class="progresses">  -->
     <!-- <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div>
     <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div>
     <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div>
     <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div>
     <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div>
     <div class="progress"><van-progress :percentage="50" stroke-width="8"/></div> -->
     <!--  -->
   <!-- </div>
   <!-- 改回条状图 -->
    
    
 </div>
   </div>
 
 <div>
    <h2>站点时报</h2>
    
       <!-- 卡片开始 -->
       <div class="detailCards">
            <div class="detailCard">
                <div class="cardTitle">
                  <label for="">企业单位1-站点1</label>
                </div>
               
                <div class="cardHr">
                  <hr>
                </div>
                 <div class="factorList">
                    <div class="factor">锌：5.28mg/L</div>
                    <div class="factor">氨氮：5.28mg/L</div>
                  
                </div>
                <div class="factorList">
                    <div class="factor">总磷：5.28mg/L</div>
                    <div class="factor">蓝绿藻：-</div>
                </div>
                 <div class="factorList">
                    <div class="factor">五日生化需氧量：5.28mg/L</div>
                    <div class="factor">溶解氧：5.28mg/L</div>
                </div>
                <div class="inlineFactor" >化学需氧量：5.28mg/L</div>
                <div class="inlineFactor">高锰酸钾指数：5.28mg/L</div>
                <div class="inlineFactor">水质类别 III类</div>
            </div>

            <div class="detailCard">
                <label for="">企业单位1-站点1</label>
                
                 <div class="factorList">
                    <div class="factor">锌：5.28mg/L</div>
                    <div class="factor">氨氮：5.28mg/L</div>
                  
                </div>
                <div class="factorList">
                    <div class="factor">总磷：5.28mg/L</div>
                    <div class="factor">蓝绿藻：-</div>
                </div>
                 <div class="factorList">
                    <div class="factor">五日生化需氧量：5.28mg/L</div>
                    <div class="factor">溶解氧：5.28mg/L</div>
                </div>
                <div class="inlineFactor">化学需氧量：5.28mg/L</div>
                <div class="inlineFactor">高锰酸钾指数：5.28mg/L</div>
                <div class="inlineFactor">水质类别 III类</div>
            </div>
      
       </div>
       
            
       <!-- 卡片结束 -->
    </div>
  </div>
</template>

<script>
import F2Bar from "@antv/f2";
import F2 from "@antv/f2/lib/index"; //引入插件
import PieLabel from "@antv/f2/lib/plugin/pie-label"; //引入插件
export default {
  name: "about",
  data() {
    return {
      data: [
        { name: "I类 1", proportion: 0.4, a: "1" },
        { name: "II类 3", proportion: 0.2, a: "1" },
        { name: "III类 4", proportion: 0.18, a: "1" },
        { name: "IV类 6", proportion: 0.15, a: "1" },
        { name: "V类 4", proportion: 0.05, a: "1" },
        { name: "劣V类 3 ", proportion: 0.02, a: "1" },
      ],
      barData : [{
        year: 'I类',
        sales: 0.4
      }, {
        year: 'II类',
        sales: 0.2
      }, {
        year: 'III类',
        sales: 0.18
      }, {
        year: 'IV类',
        sales: 0.15
      }, {
        year: 'V类',
        sales: 0.05
      }, {
        year: '劣V类',
        sales: 0.02
      }]
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
  },
  mounted() {
    var v = this;
    this.$nextTick(() => {
      v.drawChart();
      v.drawBarChart();
    });
  },
  created() {},
};
</script>
<style scoped lang="scss">
.pieBody{
  width: 100%;
  height: 100%;
}
.wholeCard{
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
.charts{
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
.barChart{
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
.detailCards{
      width: 100%;
      height: 400px;
       display: flex;
      flex-direction:column;
      justify-content:center;
      align-items: center;
  }
  .detailCard{
    margin-bottom: 5px;
      width: 90%;
      height: 200px;
      background-color: white;
    border-radius:3px;
  }
  .factorList{
      height: 25px;
      display: flex;
      justify-content:center;
      align-items: center;
      width: 100%;
      margin-bottom: 8px;
  }
  .factor{
      height: 100%;
      width: 40%;
  }
  .inlineFactor{
    margin-left: 10%;
    margin-top: 5px;
  }
  .chartTitle{
    margin-top: 10px;
    margin-left: 20px;
  }
  .cardHr{
    width: 90%;
    padding-left: 5%;
  }
  .cardTitle{
    padding-left: 5%;
  }
</style>