<template lang="html">
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
        color="#587DF7"
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

   <!-- 卡片 -->
   <div  class="detailCards">
        <div v-for = "(value,key) in presentRecord" :key="key" class="detailCard">
          <div class="cardTitle">
            <div class="cardTitleIcon"></div>
            <div style="margin-left:5px">{{value.siteName}}</div>
          </div>

          <div   class="factorList">
            <div v-for = "(factorValue,factorKey) in value.factorMap" :factorKey="factorKey" class="singleFactor">
              <div class="factorName">{{factorKey}}：</div>
              <div class="factorValue">{{factorValue}}</div>
              <div class="line"></div>
            </div>
          </div>
        
        </div>

      </div>

  </div>

</template>

<script>
import { getWeather } from "@/api/intelligenceConstruction";
import { presentData } from "@/api/intelligenceConstruction";
  export default {
    name: "about",
    data() {
      return {
        active:"",
        presentRecord:[],
        factors:[],
        platForm:""
      };
    },
    methods: {
          selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
      if (id == "index") {
        this.$router.push("/intelligenceConstruction/index")
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    getPresentData(site) { //卡片
        let that = this;
        presentData(that.platForm,site).then(function (result) {
           //拼凑卡片对象
          let portCards = []
          //1.对象的属性
          let allRecords = result.data.data //记录数组

          for (let i = 0; i < allRecords.length; i++) {//几个卡片

            that.presentRecord.push(allRecords[i])
            that.factors.push(allRecords[i].factorMap)

          }

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
       getPlatFormId(){
        this.platForm = localStorage.getItem('platFormId');
      }
    },




    mounted() {
     this.getPresentData();
     this.getPlatFormId();
    },
    onLoad() {

    },
    created() {},
  };

</script>
<style scoped lang="scss">
.van-search {
  padding: 2px 12px;
}
.header{
    margin:10px 15px;
    overflow-x: scroll;
    white-space: nowrap;
  }
.header::-webkit-scrollbar { width:0; height:0; display: none; } 
  .detailCards {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .detailCard {
    margin-bottom: 15px;
    padding-bottom: 10px;
    width: 90%;
    background-color: white;
    border-radius: 3px;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.05);//阴影
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
    border-bottom: #DEDEDE 1px dashed;
  }

  .factorName {
    height: 25px;
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
</style>
