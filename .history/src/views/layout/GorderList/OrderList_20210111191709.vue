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

    }
  },
  components: {},
  methods: {
    ...orderActions(["getOrderList"]),
    
  },
  mounted() {
    // this.getOrderList()
    
  },
  computed: {
    ...orderState(["list"]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 10px;
}
</style>