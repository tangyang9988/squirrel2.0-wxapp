<template>
  <div class="body">
    <van-nav-bar
      title="Squirrel4.0"
      style="background-color: #f5f5f5"
    />
      <div class="bodyForm">
        <van-form @submit="onSubmit" class="form">
          <div class="formIcons">
            <van-image class="formImageIcon" :src="require('../../assets/images/code_small.png')" />
            <label for="" class="fromIconTitle">编码</label>
          </div>
          
          <van-field
            v-model="tenantId"
            name="编码"
            placeholder="编码"
            :rules="[{ required: true, message: '请填写编码' }]"
          />
          <div class="formIcons">
            <van-image class="formImageIcon" :src="require('../../assets/images/login_count_icon_small.png')" />
            <label for="" class="fromIconTitle">账号</label>
          </div>
          <van-field
            v-model="username"
            name="账号"
            placeholder="账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
          <div class="formIcons">
            <van-image class="formImageIcon" :src="require('../../assets/images/logn_password_small.png')" />
            <label for="" class="fromIconTitle">密码</label>
          </div>
          <van-field
            id="passwordInput"
            v-model="password"
            type="password"
            name="密码"
            placeholder="请输入密码"
            right-icon="eye-o"
            @click-right-icon="showPassword($event)"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button class="formSubmitButton" round block type="info" native-type="submit">
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
    showPassword(e){
      
      let passwordDom=document.getElementById("passwordInput")
      if (passwordDom.type=="password"){
        passwordDom.type="textarea"
      }else{
        passwordDom.type="password"
      }
    }
  },
  mounted: function () {},
};
</script>
<style scoped lang="scss">
.body{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction:column;
   background-image: url(../../assets/images/login03.png);
  background-size:cover;
}
.bodyForm{
  width:100%;
  height:500px;
  margin-top: 55%;
  display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
//强制取消白色背景,改为透明
.van-cell{
  background-color: rgba(0, 0, 0, 0)!important;
}
.formIcons{
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: left;
  padding: 10px 16px;
}
.form{
  width:80%
}

.formImageIcon{
  width: 24px;
  height: 24px;
}
.fromIconTitle{
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 20px;
  color: #000000;
  opacity: 1;
  margin-top: 2px;
}
.formSubmitButton{
  background: linear-gradient(90deg, #40A9FF 0%, #587DF7 100%);
  box-shadow: 0px 3px 12px rgba(88, 125, 247, 0.5);
  opacity: 1;
  border-radius: 24px;
}
</style>
