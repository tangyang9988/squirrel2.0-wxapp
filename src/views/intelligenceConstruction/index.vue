<template lang="html">
  <div class="pieBody">
        <h2>智慧工地</h2>
    
</div>

</template>

<script>
import { getWeather } from "@/api/intelligenceConstruction";
  export default {
    name: "about",
    data() {
      return {
        
      };
    },
    methods: {
         getWeather() { //水质环图
        var that = this;
        getWeather("39").then(
          function (result) {
            
              console.log(result.data.data)
          },
          function (err) {
            Toast.fail("请求异常");
          }
        );
      },
    },

      
      
      
    mounted() {
     this.getWeather();
    },
    onLoad() {
     
    },
    created() {},
  };

</script>
<style scoped lang="scss">

</style>
