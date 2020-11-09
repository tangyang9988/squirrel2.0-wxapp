
import axios from 'axios'
import {bus} from '../bus.js'
import {Base64} from 'js-base64';
import {serialize} from '@/util/util';
import {getToken} from '@/util/auth';
axios.defaults.withCredentials = true;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';//配置请求头

//添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  const clientId = "saber",clientSecret="saber_secret";
  const meta = (config.meta || {});
  const isToken = meta.isToken === false;
  config.headers['Authorization'] = `Basic ${Base64.encode(`${clientId}:${clientSecret}`)}`;

  //让每个请求携带token
  if (getToken() && !isToken) {
    config.headers["Blade-Auth"] = 'bearer ' + getToken();
  }

  //headers中配置text请求
  if (config.text === true) {
    config.headers["Content-Type"] = "text/plain";
  }

  if (config.method === 'post' && meta.isSerialize === true) {
    config.data = serialize(config.data);
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.data && response.data.code) {
    if (parseInt(response.data.code) === 401) {
      debugger
      console.log("401")
      //未登录
      bus.$emit('goto', '/login')
    }
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
export default axios;
