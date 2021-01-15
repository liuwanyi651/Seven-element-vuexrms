<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--添加分类按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
        </el-col>
      </el-row>
      <!--用户列表区域 Table 表格-->
      
      <!--分页区域-->
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let shopModule = createNamespacedHelpers("shop");
let { mapState: shopState, mapActions: shopActions } = shopModule;

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    ...shopActions(["getgoodslist"]),
  },
  mounted() {
    this.getgoodslist()
  },
  computed: {
    ...shopState(["goods"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
</style>
