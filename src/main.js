import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/font/iconfont.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
import { Menu,Submenu,MenuItem,MenuItemGroup,Divider,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Toast } from 'vant';
import moment from 'moment';
import { Tab, Tabs } from 'vant'
import { List } from 'vant';
import { Col, Row } from 'vant';
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Divider);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(List);
Vue.use(Col);
Vue.use(Row);
Vue.use(Loading);
window.Toast =Toast
import '@/assets/styles/main.scss'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
