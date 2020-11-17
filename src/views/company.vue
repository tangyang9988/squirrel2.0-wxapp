<template>
<div>
<van-tabs v-model="active" @click="onClick">
    <van-tab title="实时数据"></van-tab>
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
        <h3>公告</h3>
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <li v-for="(item,id) of list" :key="id">{{item.title}}</li>
    </van-list>
      </div>
  </div>
  <!-- 统计报表 -->
 <div v-if="isExcel">
     <h3>报表列表</h3>
     <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <li v-for="(item,id) of dustList" :key="id">{{item.name}}</li>
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
       active: 2,
       list: [],
       dustList:[],
       warning:[],
      error: false,
      loading: false,
       finished: false,
       isIndex:true,
       isExcel:false,
      };
    },
    methods: {
        onLoad() {
        this.getNotice();
        this.getRealTime();
        console.log("is index:",this.isIndex,"is warning:",this.isWarning,"is excel:",this.isExcel)
  },
      onClick(name, title) {
           
    //   Toast(title);
     
     if (title=="实时数据"){
        this.isIndex=true;
        this.isWarning=false;
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

  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
<style lang="scss">
  
</style>
