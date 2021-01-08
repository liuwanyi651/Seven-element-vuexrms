import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import layout from '../views/layout/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:layout,
    children:[
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta:{
          title:'首页'
        }
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/Login.vue'),
    meta: {
      title:'登录',
      icon: 'el-icon-xxx'
    }
  },
   //所有路由之后最后 配置一个错误路由
  {
    path: '*',//如果我之前的都没有匹配到,就会匹配到这个*的路由
    component: () => import('../views/404/404.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
