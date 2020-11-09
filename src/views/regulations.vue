<template>
<div class="bodyClass">
  <van-nav-bar title="监管" />
<van-tabs v-model="active" @click="onClick" color="#39a9ed">
    <van-tab title="首页"></van-tab>
    <van-tab title="异常"></van-tab>
    <van-tab title="统计报表"></van-tab>
  </van-tabs>
  <!-- 首页 -->
  <div v-if="isIndex">
     <div>
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
            <van-swipe-item>3</van-swipe-item>
            <van-swipe-item>4</van-swipe-item>
        </van-swipe>
      </div>
    <div>
        <h2>公告栏</h2>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <li v-for="(item,id) of list" :key="id">{{item.title}}</li> -->
        <van-cell v-for="(item,id) of list" :key="id" :title="item.title" />
    </van-list>
      </div>
  </div>
  <!-- 异常 -->
    <div v-if="isWarning">
     <h2>异常列表</h2>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <li v-for="(item,date) of warning" :key="date">{{item.date}} ,{{item.noiseStatus}},{{item.tspStatus}}</li> -->
        <van-cell v-for="(item,date) of warning" :key="date" :title="item.date+item.noiseStatus" />
    </van-list>
  </div>
  <!-- 统计报表 -->
 <div v-if="isExcel">
     <h2>报表列表</h2>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <!-- <li v-for="(item,id) of dustList" :key="id">{{item.name}}</li> -->
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
       list: [],
       dustList:[],
       warning:[],
      error: false,
      loading: false,
       finished: false,
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
        console.log("is index:",this.isIndex,"is warning:",this.isWarning,"is excel:",this.isExcel)
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
     console.log("is index:",this.isIndex,"is warning:",this.isWarning,"is excel:",this.isExcel)
    },
    getNotice(){
        let that = this;
        companyNotice().then(function (result) {
            let listLength=result.data.data.length
            for (let i=0;i<listLength;i++){
                that.list.push(result.data.data[i]);
            }
            that.finished=true;
         
        }, function (err) {
          console.log(err)
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          Toast.fail("登录异常");
          that.isHide = false;
        });
      
    },
    getWarningAbnormalData(){
         let that = this;
        warning().then(function (result) {
            console.log(result.data.data)
           let listLength=result.data.data.length
            for (let i=0;i<listLength;i++){
                that.dustList.push(result.data.data[i]);
            }
             console.log("that.dustList:",that.dustList)
        }, function (err) {
          console.log(err)
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          Toast.fail("登录异常");
          that.isHide = false;
        });
      
    },
  getRealTime(){
      console.log("get real time ")
        let that = this;
        getHighWarning().then(function (result) {
            console.log("real time ",result)
            let listLength=result.data.data.length
            for (let i=0;i<listLength;i++){
                that.warning.push(result.data.data[i]);
            }
         
        }, function (err) {
          console.log(err)
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          Toast.fail("登录异常");
          that.isHide = false;
        });
      
    }
    },
  

    mounted: function () {
      
    },
    
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .bodyClass{
    background-color:  #ffffff;
  //  margin:0 5%;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  h2{
    margin: 15px 15px 10px;
    font-size: 25px;
    font-weight: normal;
    line-height: 1.5;
    
  }
</style>
<style lang="scss">
  
</style>
