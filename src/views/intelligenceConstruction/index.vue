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
        color="#587DF7"
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
   

  </div>

</template>

<script>
import { getWeather } from "@/api/intelligenceConstruction";
  export default {
    name: "about",
    data() {
      return {
        active:""
        
      };
    },
    methods: {
          selected(e) {
      let id = e.currentTarget.id;
      // this.active = "#587DF7";
      this.active = id;
      if (id == "index") {
        this.$router.push("/intelligenceConstruction/index");
      } else if (id == "his") {
        this.$router.push("/intelligenceConstruction/history");
      } else if (id == "warning") {
        this.$router.push("/intelligenceConstruction/abnormal");
      } else if (id == "point") {
        this.$router.push("/intelligenceConstruction/report");
      }
    },
    },

      
      
      
    mounted() {
     
    },
    onLoad() {
     
    },
    created() {},
  };

</script>
<style scoped lang="scss">
.header{
    margin:10px 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>
