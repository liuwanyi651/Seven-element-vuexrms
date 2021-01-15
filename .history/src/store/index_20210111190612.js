import Vue from 'vue'
import Vuex from 'vuex'
import user from './user/user'
import permission from './permission/permission'
import statistic from './statistic/statistic'
import order from './order/order'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user, //用户模块
    permission, //权限管理模块
    statistic, //统计模块
    order, //订单管理模块
  }
})
