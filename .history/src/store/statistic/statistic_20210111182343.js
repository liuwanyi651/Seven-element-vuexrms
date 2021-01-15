import api from '../../http/api'
import { Message } from 'element-ui'

export default {
  // 开启命名空间 
  namespaced: true,
  state: {
    reports: [], //统计列表
  },
  // 修改数据
  mutations: {
    setreports(state, data) {
      state.rights = data
    },

  },
  actions: {
    // 发请求
    // 登录 每一个action的方法都有两个参数 第一个是store 第二个是请求的参数
    // store可以解构为commit dispatch

    //权限管理 所有权限列表
    async getLineChart({commit}) {
      let res = await api.getLineChart(params)
      if (res.meta.status === 200) {
        console.log(res);
        commit('setreports',res.data)
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },
   
  }
}