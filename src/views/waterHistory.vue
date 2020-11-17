<template lang="html">
  <div >
 <div >
   <van-search v-model="value" placeholder="请输入搜索关键词" />
    <div class="poups">
       <van-cell class="poup" is-link @click="showStartTimePickerPopup">选择开始时间</van-cell>
        <van-popup v-model="showTimePickerStart"> 

          <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
         <van-cell class="poup" is-link @click="showEndTimePickerPopup">选择结束时间</van-cell>
          <van-popup v-model="showTimePickerEnd">   

            <van-datetime-picker
            v-model="currentDate"
            type="date"
            title="选择年月日"
            :min-date="minDate"
            :max-date="maxDate"
          />
      </van-popup>
    </div>
    
    
 </div>
 <div>
    <h2>站点时报</h2>
       <!-- 卡片开始 -->
       <div class="detailCards">
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

export default {
  name: "about",
  data() {
    return {
     minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
       showTimePickerStart: false,
showTimePickerEnd: false,
    };
  },
  methods: {
      showStartTimePickerPopup() {
      this.showTimePickerStart = true;
      this.showTimePickerEnd=false;
    },
    showEndTimePickerPopup() {
      this.showTimePickerStart = false;
      this.showTimePickerEnd=true;
    },
  },
  mounted() {
    
    
  },
  created() {},
};
</script>
<style scoped lang="scss">
.pieBody{
  width: 100%;
  height: 100%;
}
.poups{
   width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.poup{
  width: 50%;
}

.charts {
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.cycleChart {
  width: 50%;
  height: 250px !important;
}
.barChart{
   width: 50%;
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
      width: 80%;
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
</style>