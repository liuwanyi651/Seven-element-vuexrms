import api from "../../http/api";
import { Message } from "element-ui";
import dayjs from "dayjs";


export default {
    // 开启命名空间
    namespaced: true,
    state: {
        goods: [],
        block: [],
        tree: [],
        goodlist: [],
        paraslist:[] ,//分类参数列表
        goodslist:[],//商品列表
    },
    mutations: {
        setgoods(state, data) {
            state.goods = data;
        },
        setblock(state, data) {
            state.block = data;
        },
        settreeblock(state, data) {
            state.tree = data;
        },
        // 分类参数 商品参数列表
        setgoodlist(state, data) {
            state.goodlist = data;
        },
        // 分类参数 参数列表
        setparaslist(state, data) {
            state.paraslist = data;
        },
        // 商品列表
        setgoodslist(state, data) {
            state.goodslist = data;
        },
    },
    actions: {
        //商品分类数据列表
        async getgoodslist({ commit }, params) {
            let res = await api.getgoods(params);
            if (res.meta.status === 200) {
                console.log(res.data)
                commit("setgoods", res.data);
            } else {
                Message.error(res.meta.msg);
            }
        },
        //添加分类
        async addclassid(_, params) {
            let res = await api.addclassid(params);
            if (res.meta.status === 200) {
                Message.success(res.meta.msg);
            } else {
                Message.error(res.meta.msg);
            }
        },
        //商品分类数据列表 不传参数 默认所有分类数据
        async getCateList({ commit }, params) {
            let res = await api.getCateList(params);
            if (res.meta.status === 200) {
                console.log(res.data)
                commit("setgoodlist", res.data);
            } else {
                Message.error(res.meta.msg);
            }
        },
        // 获取参数列表
        async getParameterList({ commit }, params) {
            let res = await api.getParameterList(params)
            if (res.meta.status === 200) {
                console.log(res.data);
                Message.success(res.meta.msg)
                commit('setparaslist', res.data)
            }
        },
        // 添加动态参数或者静态属性
        async getParameter(_, params) {
            let res = await api.getParameter(params)
            if (res.meta.status === 200) {
                console.log(res.data);
                Message.success(res.meta.msg)
            }else {
                Message.error(res.meta.msg);
            }
        },
        // 获取商品列表
        async getShopGoods({ commit }, params) {
            let res = await api.getShopGoods(params)
            if (res.meta.status === 200) {
                console.log(res.data);
                // dayjs处理时间
                res.data.goods.map(item => {
                    item.new_time = dayjs.unix(item.add_time).format("YYYY-MM-DD HH:mm:ss")
                })
                // Message.success(res.meta.msg)
                commit('setgoodslist', res.data)
            }else {
                Message.error(res.meta.msg);
            }
        }

    }
}