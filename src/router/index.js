import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//路由默认匹配的首页
    name: 'Recommend',
    component: Recommend
  }
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
