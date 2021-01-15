import api from '../../http/api'
import { Message } from 'element-ui'

export default {
  // 开启命名空间 
  namespaced: true,
  state: {
    rights: [], //权限列表
    roles: [],//角色列表
    message: {},
    updateUser: {},
    rightstree:[]
  },
  // 修改数据
  mutations: {
    //得到的data值赋给了state.users：固定写法
    setrights(state, data) {
      state.rights = data
    },
    setroles(state, data) {
      state.roles = data
    },
    setmessage(state, data) {
      state.message = data
    },
    setUpdateUser(state, data) {
      state.updateUser = data
    },
    delectRoles(state, data) {
      state.roles = data
      console.log(state, data);
    },
    // 所有权限列表 tree 树状显示权限
    setrightstree(state, data) {
      state.rightstree = data
    },
  },
  actions: {
    // 发请求
    // 登录 每一个action的方法都有两个参数 第一个是store 第二个是请求的参数
    // store可以解构为commit dispatch

    //权限管理 所有权限列表  list 列表显示权限
    async getRights({ commit }, params) {
      let res = await api.getRights(params)
      if (res.meta.status === 200) {
        console.log(res.data);
        commit("setrights", res.data)
      } else {
        Message.error(res.meta.msg)
      }
    },
        //权限管理 所有权限列表 tree 树状显示权限
        async getRightsTree({ commit }, params) {
          let res = await api.getRightsTree(params)
          if (res.meta.status === 200) {
            console.log(res.data);
            commit("setrightstree", res.data)
          } else {
            Message.error(res.meta.msg)
          }
        },
    // 角色列表
    async getRoles({ commit }) {
      let res = await api.getRoles()
      if (res.meta.status === 200) {
        console.log(res.data);
        commit("setroles", res.data)
      } else {
        Message.error(res.meta.msg)
      }
    },
    // 添加角色
    async addRoles(_, params) {
      let res = await api.addRoles(params)
      if (res.meta.status === 201) {
        console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },

    //编辑提交角色
    async editRolesInfo({ commit }, params) {
      let res = await api.editRolesInfo(params);
      if (res.meta.status === 200) {
        commit('setUpdateUser', res.data)
        Message.success('修改成功');
      } else {
        Message.error(res.meta.msg);
      }
    },
    // 删除角色
    async deleRoles(_, params) {
      let res = await api.deleRoles(params)
      if (res.meta.status === 200) {
        console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },
    // 色授权 分配权限
    async roleAuthor(_, params) {
      let res = await api.roleAuthor(params)
      if (res.meta.status === 200) {
        console.log(res);
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },
    // 删除单个角色指定权限
    async deleRolesLimit({ commit }, params) {
      let res = await api.deleRolesLimit(params)
      if (res.meta.status === 200) {
        console.log(res);
        commit("delectRoles", params)
        Message.success(res.meta.msg)
      } else {
        Message.error(res.meta.msg)
      }
    },
  }
}