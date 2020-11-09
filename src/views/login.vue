<template>
  <div class="container Login" v-bind:class="{containerHide:isHide}">
    <div class="container_login">
      <!-- <div class="platform_title">蓝创智能环保平台</div> -->
      <div class="logo"><img src="../assets/images/lcLogo.png" alt=""></div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="tenantId"
          name="tenantId"
          left-icon=" iconfont icon-choose"
          placeholder="请输入账号编码"
          :rules="[{ required: true, message: '请输入账号编码' }]"
        />
        <van-field
          v-model="username"
          name="username"
          left-icon=" iconfont icon-username"
          placeholder="请填写账号"
          :rules="[{ required: true, message: '请输入账号' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="password"
          placeholder="请填写密码"
          left-icon=" iconfont icon-password"
          :rules="[{ required: true, message: '请输入密码' }]"
        />

        <div style="margin: 24px 0;">
          <div style="display: flex;">  
            <!--<van-checkbox v-model="rememberUser" icon-size=12 shape="square"><font color="white">记住用户名密码</font></van-checkbox>-->
            <!--<van-checkbox v-model="bindingAccount" icon-size=12 shape="square"><font color="white">绑定微信账号</font></van-checkbox>-->
          </div>
          <div style="margin: 10px 0;">
            <van-button round block plain native-type="submit">
              登录
            </van-button>
          </div>
        </div>
      </van-form>
      <div class="bottom_explain"><p>版权所有：江苏蓝创智能科技股份有限公司</p></div>
    </div>
  </div>
</template>

<script>
  import {loginByUsername} from '@/api/login';
  import {setToken,setRefreshToken,removeToken,removeRefreshToken} from '@/util/auth';

  import axios from 'axios';
  import md5 from 'js-md5';
  import {Toast} from 'vant';

  export default {
    data() {
      return {
        tenantId: '',
        username: '',
        password: '',
        platform: {},// {text: '污染源测试平台', platformType: "psoa", preApi:'',index: ''}
        platformText: '',
        platformList: [],
        show: false,
        rememberUser: false,
        bindingAccount: false,
        isHide: true
      };
    },
    methods: {
      onSubmit: function (values) {
        let that = this;
        /*removeToken();
        removeRefreshToken();*/
        loginByUsername(that.tenantId,that.username,md5(that.password)).then(function (result) {
          let status = result.status,data = result.data;
          setToken(data.access_token);
          setRefreshToken(data.refresh_token);
          that.$router.push({ path:"/"});
        }, function (err) {
          Toast.fail("请求异常");
          that.isHide = false;
        }).catch(function (error) {
          Toast.fail("登录异常");
          that.isHide = false;
        });
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
        axios.get(`/platform/?timestamp=${timestamp}`).then(function (result) {//获取客户平台信息
          that.platformList = eval(result.data);
        });
      },

      bindingAccountHandle: function () {
        let openid = localStorage.getItem("lcznkj_openid");
        if (openid && this.bindingAccount) {
          let parmas = {openId: openid}, that = this;
          API.bindingAccount(parmas).then(function (result) {
            let code = result.code;
          }, function (err) {
            Toast.fail("请求异常");
            that.isHide = false;
          }).catch(function (error) {
            Toast.fail("登录异常");
            that.isHide = false;
            
          });
        }
      },

      rememberUserHandle: function () {
        localStorage.setItem("lcznkj_platform_userinfo", JSON.stringify({
          username: this.username,
          passwd: this.passwd
        }));
      }
    },

    mounted: function () {
      sessionStorage.removeItem("platformInfo");
      //保存openid到本地
      let params = new URLSearchParams(location.search);
      let openid = params.get("openid");
      if (openid) {
        localStorage.removeItem("lcznkj_openid");
        localStorage.setItem("lcznkj_openid", openid);
      }

      let platformInfo = localStorage.getItem("platformInfo");
      //获取本地存储的平台信息和用户信息
      let userInfo = localStorage.getItem("lcznkj_platform_userinfo");

      this.isHide = false;
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    position: fixed;
    background: url('../assets/images/loginBg.jpg') no-repeat;
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
        margin-left: 15px
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

</style>
<style lang="scss">
  .container_login {
    .van-cell .van-cell__value .van-field__error-message {
      display: none !important;
    }
  }
</style>
