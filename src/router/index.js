import Vue from 'vue';
import Router from 'vue-router';

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/views/login'], resolve);
import Login from '@/views/login'
import WaterIndex from '@/views/surfaceWater/index'
import History from '@/views/surfaceWater/history'
import WaterAbnormal from '@/views/surfaceWater/abnormal'
import Report from '@/views/surfaceWater/siteReport'
import intelligenceConstructionIndex from '@/views/intelligenceConstruction/index'
import pollutionSurfaceWaterIndex from '@/views/pollutionSurfaceWater/index'
import AirQualityIndex from '@/views/airQuality/index'
import airPollutionIndex from '@/views/airPollution/index'
import lampblackIndex from '@/views/lampblack/index'
import lampblackHistory from '@/views/lampblack/history'
Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    // 地表水-历史数据
    {
      path: '/surfaceWater/history',
      name: 'history',
      component: History,
    },
    {
      path: '/surfaceWater/index',
      name: 'index',
      component: WaterIndex,
    },
    {
      path: '/surfaceWater/abnormal',
      name: 'abnormal',
      component: WaterAbnormal,
    },
    {
      path: '/surfaceWater/report',
      name: 'report',
      component: Report,
    },
    {
      path: '/intelligenceConstruction/index',
      name: 'constructionIndex',
      component: intelligenceConstructionIndex,
    },
    {
      path: '/airQuality/index',
      name: 'airQualityIndex',
      component: AirQualityIndex,
    },
    // 地表水体环境污染
    {
      path: '/pollutionSurfaceWater/index',
      name: 'index',
      component: pollutionSurfaceWaterIndex,
    },
    // 大气污染
    {
      path: '/airPollution/index',
      name: 'index',
      component: airPollutionIndex,
    },
    // 餐饮油烟
    {
      path: '/lampblack/index',
      name: 'index',
      component: lampblackIndex,
    },
    {
      path: '/lampblack/history',
      name: 'index',
      component: lampblackHistory,
    },
    
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/views/swap/index'], resolve),
      children: [
        //LOAM
        // {path: '/MyAreaLOAM', component: resolve => require(['@/components/loam/myArea'], resolve), name: '我的'}
      ]
    },
    {
      path: '/platform',
      name: 'platform',
      component: resolve => require(['@/views/platformList'], resolve),
      children: [
        //LOAM
        // {path: '/MyAreaLOAM', component: resolve => require(['@/components/loam/myArea'], resolve), name: '我的'}
      ]
    },

    {
      path: '*',
      name: '404',
      component: resolve => require(['@/components/404'], resolve),
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/login')) {
    window.sessionStorage.removeItem('userInfo')
    next()
  } else {
    let user = {aaa:11};
    if (!user) {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

export default router
