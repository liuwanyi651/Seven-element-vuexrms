<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
     <!--卡片视图-->
    <el-card>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let shopModule = createNamespacedHelpers("shop");
let { mapState: shopState,mapActions: shopActions } = shopModule;

export default {
  name: '',
  props:{},
  data () {
    return {
     
    }
  },
  components: {},
  methods: {
    ...shopActions(["getLineChart"]),
   
  },
  mounted() {
   
  },
  computed: {
    ...shopState(["reports",]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 10px;
}
</style>