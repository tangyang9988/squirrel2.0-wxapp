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
  </div>
</div>
  


</template>

<script>
//   import {loginByUsername} from '@/api/login';
  import {Tabs} from 'vant';
import {companyNotice} from '@/api/notice';
import {warning} from '@/api/warning';
import {getHighWarning} from '@/api/warning';
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
    
    
  
    },
  

    mounted: function () {
      
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
  
</style>
<style lang="scss">
  
</style>
