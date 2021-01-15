<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
     <!--卡片视图-->
    <el-card>
          <!-- Layout 布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
          
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";
let orderModule = createNamespacedHelpers("order");
let { mapState: orderState,mapActions: orderActions } = orderModule;

export default {
  name: '',
  props:{},
  data () {
    return {
      pagenum: 1,
      pagesize: 2,
      query: "",
    }
  },
  components: {},
  methods: {
    ...orderActions(["getOrderList",]),
     // 点击搜索 调用这个请求方法
    search() {
      this.getOrderList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
  },
  mounted() {
    this.getOrderList
    
  },
  computed: {
    ...orderState(["list"]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 14px;
}
.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
  text-align: center;
}
</style>