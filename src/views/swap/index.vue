<template>
  <div class="main">
    <van-nav-bar title="Squirrel4.0" />
    <div style="margin: 20% 4%">
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
import { loginByUsername } from "@/api/swap";
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      tenantId:""
    };
  },
  methods: {
    onSubmit() {
      this.$router.push({ path: "/platform" });
      sessionStorage.setItem("username",this.username)
      sessionStorage.setItem("password",this.password)
      sessionStorage.setItem("tenantId",this.tenantId)
    },
  },
  mounted: function () {},
};
</script>
<style scoped lang="scss">
</style>
