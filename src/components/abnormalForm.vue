<template>
  <div class="main">
     <van-popup position="bottom" v-model:show="isShow" :lock-scroll="isLockScroll" :close-on-click-overlay="isClickOverlay" click-overlay="clickOverlay"  @close="poupClose">
        <div  class="detailCards">
        <div  class="detailCard">
             <div class="inlineFactor">
                 <div class="dealCardTitleIconBody"><div class="dealcardTitleIcon"></div></div>
                 <div class="inlineFactorName dealCardTitle">处理单</div>
            </div>
            <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">区域：</div>
              <div class="factorValue">{{message.area}}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">站点：</div>
              <div class="factorValue">{{message.siteName}}</div>
            </div>
            </div>  
            <div class="factorList">
            <div class="singleFactor">
              <div class="factorName">设备编号：</div>
              <div class="factorValue">{{message.deviceSn}}</div>
            </div>
            <div class="singleFactor">
              <div class="factorName">安装位置：</div>
              <div class="factorValue">{{message.deviceLocation}}</div>
            </div>
            </div>


            <div class="factorList">
                <div class="singleFactor">
                  <div class="factorName">监控因子：</div>
                  <div class="factorValue">{{message.alias}}</div>
                </div>
                <div class="singleFactor">
                  <div class="factorName">预警类型：</div>
                  <div class="factorValue">{{message.alertTypeName}}</div>
                </div>
            </div>  
            <div class="inlineFactor">
              <div class="inlineFactorName">预警阈值：</div>
              <div class="factorValue ">{{message.standardVal}}</div>
            </div>
            <div class="inlineFactor">
              <div class="inlineFactorName">开始时间：</div>
              <div class="factorValue ">{{message.startTime}}</div>
            </div>
            <div class="inlineFactor">
              <div class="inlineFactorName">结束时间：</div>
              <div class="factorValue ">{{message.endTime}}</div>
            </div>
            <div class="factorList">
                <div class="singleFactor">
                  <div class="factorName">持续时间：</div>
                  <div class="factorValue">{{message.duration}}</div>
                </div>
                <div class="singleFactor">
                 <div class="factorName">状态：</div>
                <div class="factorValue">{{message.status==1?'已处理':'未处理'}}</div>
                </div>
            </div>
            <van-field
              v-model="feedback"
              rows="1"
              autosize
              label="留言"
              type="textarea"
              placeholder="请输入留言"
            />   
            <div class="cardButtons">
                <van-button class="cardButton"   type="default" @click="commit">提交</van-button>
                <van-button  class="cardButton"  type="default" @click="cancel">取消</van-button>
            </div>
            
        </div>
           
    </div>
     </van-popup>
        
    
  </div>
</template>
<script>
import { getHistoryHeader } from "@/api/surfaceWater";
import { getWarnRecords } from "@/api/surfaceWater";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";
import { Toast } from "vant";
import md5 from "js-md5";
export default {
    props:["message","isShow"],
  data() {
    return {
      feedback:"",
      isLockScroll:true,
      isClickOverlay:false,
      loading: false,
      finished: false,
      tableFactorList:[]
    };
  },
  methods: {
    
    onConfirm(date) {
      
    },
   poupClose(){//弹出层关闭时，告诉父组件，弹出层已关闭
    this.$emit('poup-close',this.isShow=false)
    },
    clickOverlay(){
        console.log("点击遮罩层")
    },
    commit(){
        console.log("点击提交")
        this.isShow=false;
        this.$emit('poup-close',false)
    },
    cancel(){
         console.log("点击取消")
        this.isShow=false;
        this.$emit('poupClose',false)
    },
  },
  
  mounted: function () {
      console.log("子组件：",this.message,"子组件是否打开",this.isShow)
    
  },
};
</script>
<style scoped lang="scss">

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
    margin-bottom: 15px;
    width: 90%;
    height: 250px;
    background-color: white;
    border-radius: 3px;
    
    //box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
    box-shadow:2px 3px 10px  rgba(0, 0, 0, 0.05),   /*左边阴影*/

            2px 3px 10px  rgba(0, 0, 0, 0.05),  /*上边阴影*/

            2px 3px 10px  rgba(0, 0, 0, 0.05),  /*右边阴影*/

            2px 3px 10px  rgba(0, 0, 0, 0.05);

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
  .cardButtons{
    display: flex;
    flex-direction:  row-reverse;
  }
  .cardButton{
    margin-right: 5%;
    background-color: #FA8B16;
    border-radius: 8px;
     height: 30px;
    box-shadow: 0px 3px 12px rgba(250, 139, 22, 0.5);
    //字体
    
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 17px;
    color: #FFFFFF;
    opacity: 1;
  }
  .dealCardTitle{
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: bold;
    line-height: 17px;
    color: #587DF7;
  }
  .dealcardTitleIcon{
        width: 8px;
        height: 2px;
        background: #587DF7;
        opacity: 1;
        border-radius: 2px;
  }
  .dealCardTitleIconBody{
      margin-left: 5%;
    height: 22px;
    width: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
