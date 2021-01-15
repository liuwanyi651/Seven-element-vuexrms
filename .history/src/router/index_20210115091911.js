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
      {
        path: '/users',
        name: 'UsersList',
        component: () => import('../views/layout/AusersList/UsersList.vue'),
        meta: {
          title:'用户列表',
          icon: 'el-icon-folder-opened'
        }
      },
      {
        path: '/roles',
        name: 'RoleList',
        component: () => import('../views/layout/BroleList/RoleList.vue'),
        meta: {
          title:'角色列表',
          icon: 'el-icon-setting'
        }
      },
      {
        path: '/rights',
        name: 'PermissionList',
        component: () => import('../views/layout/CpermissionList/PermissionList.vue'),
        meta: {
          title:'权限列表',
          icon: 'el-icon-bank-card'
        }
      },
      {
        path: '/goods',
        name: 'ProductList',
        component: () => import('../views/layout/DproductList/ProductList.vue'),
        meta: {
          title:'商品列表',
          icon: 'el-icon-shopping-cart-full'
        }
      },
      {
        path: '/params',
        name: 'SortingParameter',
        component: () => import('../views/layout/EsortingParameter/SortingParameter.vue'),
        meta: {
          title:'分类参数',
          icon: 'el-icon-coin'
        }
      },
      {
        path: '/categories',
        name: 'GoodsCategory',
        component: () => import('../views/layout/FgoodsCategory/GoodsCategory.vue'),
        meta: {
          title:'商品分类',
          icon: 'el-icon-film'
        }
      },
      {
        path: '/orders',
        name: 'OrderList',
        component: () => import('../views/layout/GorderList/OrderList.vue'),
        meta: {
          title:'订单列表',
          icon: 'el-icon-tickets'
        }
      },
      {
        path: '/reports',
        name: 'Statistics',
        component: () => import('../views/layout/Hstatistics/Statistics.vue'),
        meta: {
          title:'数据统计',
          icon: 'el-icon-edit'
        }
      },
      {
        path: '/add',
        component: () => import('../views/layout/DproductList/add.vue'),
       
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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
