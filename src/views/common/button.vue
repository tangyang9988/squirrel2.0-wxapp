<template lang="html">
    <div class="header">
        <van-button
        id="index"
        color="#587DF7"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px;display: inline-block;"
        @click="selected($event)"
        >首页</van-button>
      <van-button
        id="his"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px;display: inline-block;"
        @click="selected($event)"
        >历史数据</van-button>
      <van-button
        id="warning"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px;display: inline-block;"
        @click="selected($event)"
        >预警管理</van-button>
      <van-button
        id="point"
        size="small"
        style="background: #F2F5FF; opacity: 1; border-radius: 8px;width: 90px;display: inline-block;"
        @click="selected($event)"
        >站点报表</van-button>
    </div>
</div>
</template>
<script>
  export default {
    name: "about",
    data() {
      return {
      };
    },
    methods: {
      selected(e) {
      let id = e.currentTarget.id;
      this.active = id;
      if (id == "index") {
        this.$router.push("/surfaceWater/index");
      } else if (id == "his") {
        this.$router.push("/surfaceWater/history");
      } else if (id == "warning") {
        this.$router.push("/surfaceWater/abnormal");
      } else if (id == "point") {
        this.$router.push("/surfaceWater/report");
      }
    },
    },
    mounted() {
    },
  }

</script>
<style scoped lang="scss">
  .header{
    margin:10px 15px;
    overflow-x: scroll;
    white-space: nowrap;
  }
  .header::-webkit-scrollbar { width:0; height:0; display: none; } 

</style>
