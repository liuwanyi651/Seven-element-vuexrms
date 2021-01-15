import api from '../../http/api'
import { Message } from 'element-ui'
import dayjs from "dayjs";

export default {
  // 开启命名空间 
  namespaced: true,
  state: {
    list: [], //统计列表
  },
  // 修改数据
  mutations: {
    setlist(state, data) {
      state.list = data
    },

  },
  actions: {
    // 发请求
    // 登录 每一个action的方法都有两个参数 第一个是store 第二个是请求的参数
    // store可以解构为commit dispatch

    //权限管理 所有权限列表
      //订单列表
      async getOrderList({commit},params){
        let res = await api.getOrderList(params)
        if(res.meta.status === 200)
       //  dayjs转换时间
        res.data.goods.map(item => {
            item.new_time= dayjs.unix(item.create_time).format("YYYY-MM-DD HH:mm:ss")
        })
        // Message.success(res.meta.msg)
        console.log(res.data);
        commit('setlist',res.data)
    },
  }
}