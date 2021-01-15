import api from "../../http/api";
import { Message } from "element-ui";

export default {
    // 开启命名空间
    namespaced: true,
    state: {
        goods: [],
        block: [],
        tree: [],
        goodlist:[]
    },
    mutations: {
        setgoods(state, data) {
            state.goods = data;
        },
        setblock(state, data) {
            state.block = data;
        },
        settreeblock(state, data){
            state.tree = data;
        },
        // 分类参数 商品参数列表
        setgoodlist(state, data) {
            state.goodlist = data;
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
        //获取块级联块数据
        // async getloocks({ commit }, params) {
        //     let res = await api.getblock(params);
        //     if (res.meta.status === 200) {
        //         console.log(res.data)
        //         commit("setblock", res.data);
        //     } else {
        //         Message.error(res.meta.msg);
        //     }
        // },
        // async getloocktree({ commit }, params) {
        //     let res = await api.getblocktree(params);
        //     if (res.meta.status === 200) {
        //         console.log(res.data)
        //         commit("settreeblock", res.data);
        //     } else {
        //         Message.error(res.meta.msg);
        //     }
        // },
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
        async getCateList({commit}, params) {
            let res = await api.getCateList(params);
            if (res.meta.status === 200) {
                console.log(res.data)
                commit("setgoodlist", res.data);
            } else {
                Message.error(res.meta.msg);
            }
        },
    },
}