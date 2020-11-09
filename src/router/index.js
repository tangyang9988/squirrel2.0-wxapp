import Vue from 'vue';
import Router from 'vue-router';

// 懒加载方式，当路由被访问的时候才加载对应组件
// const Login = resolve => require(['@/views/login'], resolve);
import Login from '@/views/login'
import Regulations from '@/views/Regulations'
import Company from '@/views/Company' 
import Operations from '@/views/Operations'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/regulations',
      name: 'Regulations',
      component: Regulations,
    },
    {
      path: '/company',
      name: 'Company',
      component: Company,
    },
    {
      path: '/operations',
      name: 'Operations',
      component: Operations,
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
