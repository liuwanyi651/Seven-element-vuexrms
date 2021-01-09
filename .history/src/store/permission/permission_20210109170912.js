import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
  // 开启命名空间 
  namespaced: true,
  state: {
    users: [],
  },
  // 修改数据
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
  },
  actions: {
    // 发请求
    // 登录 每一个action的方法都有两个参数 第一个是store 第二个是请求的参数
    // store可以解构为commit dispatch

    // 登录
    async login(_, params) {
      let res = await api.login(params)
      if (res.meta.status === 200) {
        // 请求成功 存用户 跳转路由 提示用户
        localStorage.setItem('user', JSON.stringify(res.data))
        localStorage.setItem('token', res.data.token)
        Message.success('登录成功')
        router.push('/')
      } else {
        Message.error(res.meta.msg)
      }
    },
    //  用户数据列表
    async getUsers({ commit }, params) {
      // console.log(router)
      let res = await api.getUsers(params)
      if (res.meta.status === 200) {
        console.log(res);
        commit('setUsers', res.data)
      } else {
        Message.error(res.meta.msg)
      }
    },
    // 左侧菜单权限
    async getMenus({ commit }) {
      // console.log(router)
      let res = await api.getMenus()
      if (res.meta.status === 200) {
        let a = {
          authName: '首页',
          path: '/'
        }
        // console.log(res.data);
        res.data.unshift(a)
        commit('setmenus', res.data)
      } else {
        Message.error(res.meta.msg)
      }
    },
    // 修改用户状态
    async putUserState(_, params) {
      let res = await api.putUserState(params)
      if (res.meta.status === 200) {
        // console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },
  }
}