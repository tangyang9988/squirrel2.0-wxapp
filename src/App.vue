<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  /*@import './font/iconfont.css';*/
  /*@import './styles/style.css';*/
  body, html {
    background-color: #f5f5f5;
    font-size: 16px;
    min-height: 100%;
    margin: 0;
    /* padding-left: 3%;
    padding-right: 3%; */
  }
  #app{
    max-width: 100%;
    margin: 0 auto;
  }
</style>
