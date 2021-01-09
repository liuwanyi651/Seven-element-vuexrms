import api from '../../http/api'
import { Message } from 'element-ui'
import router from '../../router'

export default {
  // 开启命名空间 
  namespaced: true,
  state: {
    users: [],
    menus: [],
    message:{},
  },
  // 修改数据
  mutations: {
    setUsers(state, data) {
      state.users = data
    },
    setmenus(state, data) {
      state.menus = data
    },
    setmessage(state,data){
      state.message = data
    }
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
        Message.error('设置状态失败')
      }
    },
    // 添加用户
    async addUserList(_, params) {
      let res = await api.addUserList(params)
      if (res.meta.status === 201) {
        console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error('用户创建失败')
      }
    },
    //根据用户ID获取数据
    async getIdMsg({ commit }, params) {
      let res = await api.getIdMsg(params);
      if (res.meta.status === 200) {
        console.log(res.data)
        commit("setmessage", res.data);
        Message.success(res.meta.msg)
      } else {
        Message.error('查询失败');
      }
    },
    //修改用户信息
    async editUserInfo(_, params) {
      let res = await api.editUserInfo(params);
      if (res.meta.status === 200) {
        Message.success(res.meta.msg);
      } else {
        Message.error('更新失败');
      }
    },
    // 删除单个用户
    async deleUser(_, params) {
      let res = await api.deleUser(params)
      if (res.meta.status === 200) {
        console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error('删除用户失败')
      }
    },
  }
}