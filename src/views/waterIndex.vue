<template>
<div class="bodyClass">
  <van-nav-bar title="污染源在线自动监控管理系统" />
<van-tabs v-model="active" @click="onClick" color="#39a9ed">
    <van-tab title="首页"></van-tab>
    <van-tab title="异常"></van-tab>
    <van-tab title="统计报表"></van-tab>
  </van-tabs>
  <!-- 首页 -->
  <div v-if="isIndex">
    <!-- 异常图表开始 -->
      <h2>异常图表</h2>
      <div class="abonormalClass">
          <div class="abnormalCardClass" >
              <div>2 </div>
                <div class="abnormalTitleWord">当前异常</div> 
          </div>
          <div class="abnormalCardClass" >
              <div>7 </div>
                <div class="abnormalTitleWord">昨日异常</div> </div>
          <div class="abnormalCardClass">
              <div>4 </div>
                <div class="abnormalTitleWord" >昨日未处理异常</div> 
          </div>
          <div class="abnormalCardClass">
              <div>30 </div>
                <div class="abnormalTitleWord">本月异常</div> 
          </div>
        
      </div>
       <!-- 异常图表结束 -->

       <!-- 卡片开始 -->
       <div class="detailCards">
            <div class="detailCard">
                <label for="">****区-总排口</label>
                <div class="factorList">
                    <div class="factor">cod</div>
                    <div class="factor">氨氮</div>
                    <div class="factor">总磷</div>
                </div>
                <div class="factorList">
                    <div class="factor">总氮</div>
                    <div class="factor">PH</div>
                    <div class="factor">流量</div>
                </div>
                <div>时间 2020/09/18 10:53</div>
            </div>
       </div>
       <!-- 卡片结束 -->
  </div>
  <!-- 异常 -->
    <div v-if="isWarning">
     <h2>异常列表</h2>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,date) of warning" :key="date" :title="item.date" />
    </van-list>
  </div>
  <!-- 统计报表 -->
 <div v-if="isExcel">
     <h2>统计报表</h2>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,id) of dustList" :key="id" :title="item.name" />
    </van-list>

    <!-- f2图表 -->
   
		 <div class="box">
		<div class="chart">
			<span class="y-title">金额/RMB</span>
			<canvas id="mountNode">
			</canvas>
			<span class="x-title">收益</span>
		</div>
	</div>

  </div>
</div>
  


</template>

<script>
//   import {loginByUsername} from '@/api/login';
  import {Tabs} from 'vant';
import {companyNotice} from '@/api/notice';
import {warning} from '@/api/warning';
import {getHighWarning} from '@/api/warning';
import F2 from "@antv/f2" //引入插件
  export default {
    data() {
      return {
       active: 0,
      error: false,
       isIndex:true,
       isWarning:false,
       isExcel:false,
      };
    },
    methods: {
        onLoad() {
        this.getNotice();
        this.getWarningAbnormalData();
        this.getRealTime();

    },
      onClick(name, title) {
           
    //   Toast(title);
     
     if (title=="首页"){
        this.isIndex=true;
        this.isWarning=false;
        this.isExcel=false;
     }else if (title=="异常"){
        this.isIndex=false;
        this.isWarning=true;
        this.isExcel=false;
     }else if (title=="统计报表"){
        this.isIndex=false;
        this.isWarning=false;
        this.isExcel=true;
     }  
    },
        drawChart(){
      // 数据源
				var data = [{
						year: '2014 年',
						sales: 145,
						color:'#5eb6fe'
					}, {
						year: '2015 年',
						sales: 121,
						color:'#df91e9'
					}, {
						year: '2016 年',
						sales: 100,
						color:'#5fe9c8'
					}, {
						year: '2017 年',
						sales: 97,
						color:'#dfb47b'
					},
				];
				
				 // Step 1: 创建 Chart 对象
				var chart = new F2.Chart({
					id: 'mountNode',
					pixelRatio: window.devicePixelRatio
				});
				
				// Step 2: 载入数据源
				chart.source(data, {
					sales: {
					tickCount: 4
					}
				});
				
				// 隐藏单元标注
				chart.legend(false);
				chart.axis('year', {
					line: null
				});
				
				// 隐藏点击提示标注
				chart.tooltip(false);
				
				  // 显示 X 轴坐标轴文本为空 
				chart.axis('year', {
					label: function label(text) {
					  return {
						text:'',
						fillStyle:'#fff'
					  };
					}
				});
				
				// y坐标字体颜色设置
				chart.axis('sales', {
					label: function label(text) {
					  return {
						fillStyle:'#fff'
					  };
					}
				});
				
				// 图内y虚线设置
				chart.axis('sales', {
					grid:{
						lineDash: null,//实线
						strokeStyle  :'#1c316b',
						lineWidth: 2
					},
					
				});
				
				// 图标提示信息设置
				data.map(function(obj) {
					chart.guide().text({
					  position: [obj.year, obj.sales],
					  content: obj.sales,//顶部提示
					  style: {
						textAlign: 'center',
						textBaseline: 'bottom',
						fill:obj.color//顶部字体颜色
					  },
					  offsetY: -10
					});
				});
		
				// 让柱状图的宽度适配不同的屏幕尺寸
				var barWidth = 36 * (window.innerWidth / 375);
				// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴  渐变色设置
				chart.interval().position('year*sales').color('year',['l(90) 0:#0984ef 1:#5eb6fe','l(90) 0:#df6dbf 1:#df91e9','l(90) 0:#06a796 1:#5fe9c8','l(90) 0:#df8f49 1:#dfb47b']) // 定义柱状图渐变色
				.size(barWidth);
				// Step 4: 渲染图表
				chart.render();
			}

    
  
    },
  

    mounted: function () {
    
      this.drawChart();


    },
    
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .abonormalClass{
      height: 80px;
      width: 100%;
    //   background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    
  }
  .abnormalCardClass{
      height: 100%;
      width:20%;
      margin: 5px 5px;
      border-radius:3px;
      background-color: white;
      display: flex;
      flex-direction:column;
      justify-content:center;
      align-items: center;
  }
  .abnormalTitleWord{
       font-size: 8px;
      font-weight: 300;
      color: gray;
       margin-top: 10px;
  }
  .detailCards{
      width: 100%;
      height: 300px;
       display: flex;
      flex-direction:column;
      justify-content:center;
      align-items: center;
  }
  .detailCard{
      width: 80%;
      height: 110px;
      background-color: white;
    border-radius:3px;
  }
  .factorList{
      height: 15px;
      display: flex;
      justify-content:center;
      align-items: center;
      width: 100%;
      margin-bottom: 8px;
  }
  .factor{
      height: 100%;
      width: 30%;
  }
  #index{
	    position: relative;
	    min-height: 100vh;
	}
	#index.abeam {
	    margin-top:10px;
	    padding-bottom: 10px;
	    background: #ffffff;
	}
	// 单一柱状图  宽高设置
	#index.abeam #histogram{
	    display: block;
	    width: 100vw;// 我这里是为了移动端适配使用了vw布局，会根据屏幕大小自动缩放
	    height: 80vw;
	}
  
</style>
<style lang="scss">
  
</style>
