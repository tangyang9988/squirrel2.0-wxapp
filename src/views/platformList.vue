<template>
  <div class="main">
    <van-nav-bar
      title="Squirrel4.0"
      left-text="返回"
      left-arrow
      style="background-color: #f5f5f5"
      @click-left="onClickLeft"
    />
    <div class="module_list">
      <div v-for="(item, index) in list" :key="index">
        <div @click="onClick(item)" :class="'module' + index"></div>
        <div class="module_title">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginByUsername } from "@/api/login";
import { searchList } from "@/api/login";

import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";

import axios from "axios";
import md5 from "js-md5";
import { Toast } from "vant";

export default {
  data() {
    return {
      tenantId: "",
      username: "",
      password: "",
      list: [],
    };
  },
  methods: {
    onSubmit: function (values) {
      let that = this;
      /*removeToken();
        removeRefreshToken();*/
      loginByUsername(that.tenantId, that.username, md5(that.password))
        .then(
          function (result) {
            let status = result.status,
              data = result.data;
            setToken(data.access_token);
            setRefreshToken(data.refresh_token);
            that.$router.push({ path: "/" });
          },
          function (err) {
            Toast.fail("请求异常");
            that.isHide = false;
          }
        )
        .catch(function (error) {
          Toast.fail("登录异常");
          that.isHide = false;
        });
    },
    onClick(item) {

      localStorage.setItem('platFormId', item.code);
      switch (item.code) {
        case "21"://地表水
          this.$router.push("/surfaceWater/index");
          break;
        case "39"://智慧工地
          this.$router.push("/intelligenceConstruction/index");
          break;
        case "32"://地表水体
          this.$router.push("/pollutionSurfaceWater/index");
          break;
        case "98"://重点环境空气检测
          this.$router.push("/regulations");
          break;
        case "22"://空气质量检测
          this.$router.push("/regulations");
          break;
        case "99"://餐饮油烟
          this.$router.push("/regulations");
          break;
        case "31"://大气环境
          this.$router.push("/regulations");
          break;
        case "02"://基础管理系统
          this.$router.push("/regulations");
          break;
        case "03"://远程智控
          this.$router.push("/regulations");
          break;
      }
    },
    onConfirm: function (value, index) {
      this.show = false;
      this.platformText = value.text;
      this.platform = Object.assign(value, {});
      localStorage.removeItem("platformInfo");
      localStorage.setItem("platformInfo", JSON.stringify(this.platform));
    },
    showPopup: function () {
      this.show = true;
    },
    getLlatformList: function () {
      let that = this;
      var timestamp = new Date().getTime();
      axios.get(`/platform/?timestamp=${timestamp}`).then(function (result) {
        //获取客户平台信息
        that.platformList = eval(result.data);
      });
    },

    bindingAccountHandle: function () {
      let openid = localStorage.getItem("lcznkj_openid");
      if (openid && this.bindingAccount) {
        let parmas = { openId: openid },
          that = this;
        API.bindingAccount(parmas)
          .then(
            function (result) {
              let code = result.code;
            },
            function (err) {
              Toast.fail("请求异常");
              that.isHide = false;
            }
          )
          .catch(function (error) {
            Toast.fail("登录异常");
            that.isHide = false;
          });
      }
    },
    rememberUserHandle: function () {
      localStorage.setItem(
        "lcznkj_platform_userinfo",
        JSON.stringify({
          username: this.username,
          passwd: this.passwd,
        })
      );
    },
    onClickLeft: function () {
      this.$router.push("/");
    },
  },

  mounted: function () {
    let tenantId = sessionStorage.getItem("tenantId");
    let username = sessionStorage.getItem("username");
    let password = sessionStorage.getItem("password");
    var that = this;
    searchList(tenantId, username, md5(password))
      .then(
        function (result) {
          var length = result.data.data.length;
          for (let i = 0; i < length; i++) {
            that.list.push(result.data.data[i]);
          }
        },
        function (err) {
          Toast.fail("加载数据异常");
        }
      )
      .catch(function (error) {
        Toast.fail("加载数据异常");
      });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: fixed;
  background: url("../assets/images/loginBg.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: space-around;

  .container_login {
    width: 80%;
    margin-top: 30%;
    height: 50%;
    .logo {
      width: 173px;
      margin: 0 auto 30px;
    }

    .van-button {
      background: transparent;
      color: #fff;
    }

    .van-checkbox {
      color: #fff !important;
      font-size: 12px !important;
      margin-left: 15px;
    }
  }

  .bottom_explain {
    color: #fff;
    font-size: 12px;
    text-align: center;
    margin-top: 30%;
  }
}
.containerHide {
  display: none;
}
.module_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.module0 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/1.png);
}
.module1 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/2.png);
}
.module2 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/3.png);
}
.module3 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/4.png);
}
.module4 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/5.png);
}
.module5 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/6.png);
}
.module6 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/7.png);
}
.module7 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/8.png);
}
.module8 {
  height: 98px;
  width: 98px;
  margin: 20px 10px;
  background: url(../assets/images/menu/9.png);
}
.module_title {
  margin: 0px 10px;
  width: 84px;
  height: 34px;
  font-size: 12px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: #000000;
  opacity: 1;
  text-align: center;
}
</style>
<style lang="scss">
.container_login {
  .van-cell .van-cell__value .van-field__error-message {
    display: none !important;
  }
}
</style>
