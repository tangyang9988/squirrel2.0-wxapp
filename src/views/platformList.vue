<template>
  <div class="main">
    <van-nav-bar title="Squirrel4.0" />
    <van-list
      finished-text="没有更多了"
      offset="300"
      error-text="请求失败，点击重新加载"
    >
      <div v-for="(item, index) in list" :key="index" class="module_list">
        <div class="module">
          <div style="margin: 10% 25%" @click="onClick(item.name)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </van-list>
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
      switch (item) {
        case "地表水质量监测系统":
          this.$router.push("/surfaceWater/history");
          break;
        case "智慧工地智能管理系统":
          this.$router.push("/regulations");
          break;
        case "地表水体环境污染源监测系统":
          this.$router.push("/regulations");
          break;
        case "空气智能监管系统":
          this.$router.push("/regulations");
          break;
        case "餐饮油烟监控管理系统":
          this.$router.push("/regulations");
          break;
        case "VOC环境智能监管系统":
          this.$router.push("/regulations");
          break;
        case "基础管理系统":
          this.$router.push("/regulations");
          break;
        case "后台管理系统":
          this.$router.push("/regulations");
          break;
        case "远程智控":
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
    /* position: fixed;*/
    /*width: 230px;*/
    /* position: fixed;*/
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
}
.module {
  height: 100px;
  width: 100%;
  margin: 10px;
  background: rgb(241, 240, 240);
}
</style>
<style lang="scss">
.container_login {
  .van-cell .van-cell__value .van-field__error-message {
    display: none !important;
  }
}
</style>
