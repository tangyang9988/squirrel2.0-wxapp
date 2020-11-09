<template>
  <div class="lc_container">
    <div class="menu-tabs">
      <el-menu
        :default-active="active"
        class="el-menu-public"
        mode="horizontal"
        @select="handleSelect"
        router
        menu-trigger="hover"
        unique-opened
        background-color="#1080FF"
        text-color="#fff"
        active-text-color="#ee7128">
          <el-menu-item v-for="(items,index) in tabArr" :key="index" :index="items.id" :route="items.controler">{{items.name}}</el-menu-item>
          <el-submenu popper-class="menuPopper" v-for="item in tabChildArr" :key="item.name" :index="item.id">
            <template slot="title">{{item.name}}</template>
              <el-menu-item class="submenuItem" v-for="(it,i) in item.childs" :key="i" :index="it.id" :route="it.controler">{{it.name}}</el-menu-item>
          </el-submenu>

          <el-menu-item v-for="items in myArea" :key="items.id" :index="items.id" :route="items.controler">{{items.name}}</el-menu-item>

          <!-- <el-submenu popper-class="menuPopper" index="111">
            <template slot="title">我的</template>
              <el-menu-item class="submenuItem" index="999">退出</el-menu-item>
          </el-submenu> -->
          
      </el-menu>
    </div>
    <router-view style="padding-top:46px;"></router-view>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        active: '1',
        value1: 0,
        tabs: []
      }
    },
    props: ['myArea'],
    computed: {
      tabChildArr: function () {
        return this.tabs.filter( item => { return item.childs.length > 0 })
      },
      tabArr: function () {
        return this.tabs.filter( item => { return item.childs.length == 0  })
      }
    },
    methods: {
      getMenu(callback){
        let platformInfo = localStorage.getItem('platformInfo');
        let platformType = JSON.parse(platformInfo).platformType;
        if(platformType){
          let _this = this;
          let option = {type: platformType};
          LOGIN_API.getMenu(option).then((result) => {
            callback(result.data);
          })
        }
      },
      handleSelect(key, keyPath) {
        if(key == '999'){
          this.logout();
        }
      },
      logout: function () {
        let that = this;
        LOGIN_API.logout().then(function (result) {
          that.$router.push({path: '/login'});
          that.removeLoginInfo();
          window.document.title = that.platformName;
        }, function (err) {
          Toast.fail("退出异常");
        }).catch(function (error) {
          Toast.fail("退出异常");
        });
      },
    },
    watch: {
      $route: function (newVal, oldVal) {
        for(let i = 0; i < this.tabs.length; i++) {
          if( this.tabs[i] && newVal.path == '/' + this.tabs[i].controler){
            this.active = this.tabs[i].id;
            return;
          }
        }
      }
    },
    async mounted() {
      let _this = this;
      await this.getMenu(data => {
        _this.tabs = data;
        document.getElementsByClassName('menu-tabs')[0].style.width = window.innerWidth+'px';
      let menuElement = document.getElementsByClassName('el-menu-public')[0];
      let tabWidth =  _this.tabChildArr.length * 116 + _this.tabArr.length * 96 + 88 * _this.myArea.length;
      menuElement.style.width =  tabWidth + 'px';
      if(tabWidth>window.innerWidth){
        document.getElementsByClassName('menu-tabs')[0].style['overflow-x'] = 'auto';
      }else{
         menuElement.style.width = window.innerWidth+'px'
      }
      let newVal = _this.$route;
      for(let i = 0; i < _this.tabs.length; i++) {
          if( _this.tabs[i] && newVal.path == '/' + _this.tabs[i].controler){
            _this.active = _this.tabs[i].id;
            return;
          }
        }
      });
      // window.onresize = () => {
      //   document.getElementsByClassName('menu-tabs')[0].style.width = window.innerWidth+'px';
      //   let tabWidth =  _this.tabChildArr.length * 116 + _this.tabArr.length * 96 + 88 * _this.myArea.length;
      //   let menuElement = document.getElementsByClassName('el-menu-public')[0];
      //   menuElement.style.width =  tabWidth + 'px';
      //   if(tabWidth>window.innerWidth){
      //     document.getElementsByClassName('menu-tabs')[0].style['overflow-x'] = 'auto';
      //   }else{
      //    menuElement.style.width = window.innerWidth+'px'
      // }
      // }

      
      
    },
  }
</script>

<style lang="scss" scoped>
 .lc_container{
    overflow: hidden;
    .menu-tabs{
    position: fixed;top:0;left:0;right:0;z-index: 10000;
    }
    .menu-tabs::-webkit-scrollbar {
        display: none;
    }
    .is-active{
      font-size: 16px;
    }
 }
 
</style>
