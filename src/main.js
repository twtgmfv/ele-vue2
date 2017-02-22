// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'common/stylus/index.styl'// 全局样式
import global from 'common/js/global'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import store from './vuex/store'

Vue.use(global)
Vue.use(VueRouter)
Vue.use(VueResource)

import App from './App'
// import Goods from 'components/goods/goods'
// import Ratings from 'components/ratings/ratings'
// import Seller from 'components/seller/seller'

import bus from 'common/js/bus'
Vue.http.interceptors.push((request, next) => {
  // before sending request
  bus.$emit('toggleLoading', true)
  setTimeout(function () {
    next(
      response => {
        // after sending request
        bus.$emit('toggleLoading', false)
      }
    )
  }, 200)
})
// 懒加载
const Goods = resolve => require(['components/goods/goods'], resolve)
const Ratings = resolve => require(['components/ratings/ratings'], resolve)
const Seller = resolve => require(['components/seller/seller'], resolve)

const routes = [
  {
    path: '/',
    redirect: '/goods'// 重定向
  },
  {
    path: '/goods',
    component: Goods
  },
  {
    path: '/ratings',
    component: Ratings
  },
  {
    path: '/seller',
    component: Seller
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes,
  linkActiveClass: 'active'
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
