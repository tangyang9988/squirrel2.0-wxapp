<template>
  <div>
    <van-nav-bar
      title="Squirrel4.0"
      style="background-color: #f5f5f5"
    />
      <div class="body">
        <van-form @submit="onSubmit">
          <van-field
            v-model="tenantId"
            name="租户"
            label="租户"
            placeholder="租户"
            :rules="[{ required: true, message: '请填写租户' }]"
          />
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">
              登录
            </van-button>
          </div>
        </van-form>
      </div>
  </div>
</template>
<script>
import { loginByUsername } from "@/api/login";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/util/auth";
import { Toast } from "vant";
import md5 from "js-md5";
export default {
  data() {
    return {
      username: "",
      password: "",
      tenantId: "",
    };
  },
  methods: {
    onSubmit: function (values) {
      let that = this;
      loginByUsername(that.tenantId, that.username, md5(that.password))
        .then(
          function (result) {
            let status = result.status,
              data = result.data;
            setToken(data.access_token);
            setRefreshToken(data.refresh_token);
            that.$router.push({ path: "/platform" });
            sessionStorage.setItem("username", that.username);
            sessionStorage.setItem("password", that.password);
            sessionStorage.setItem("tenantId", that.tenantId);
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
  },
  mounted: function () {},
};
</script>
<style scoped lang="scss">
.body{
  width:100%;
  height:500px;
  // background-image: url(../../assets/images/login.png);
  background-size:auto;
  margin:10% 10px;
}
</style>
