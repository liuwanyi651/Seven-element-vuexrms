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
      <!--
      <el-table :data="users.users" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="分类名称"> </el-table-column>
        <el-table-column prop="role_name" label="是否有效"> </el-table-column>
        <el-table-column prop="mobile" label="排序"> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope>
            {{ scope.row }} 拿到每一项的数据
        
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              >编辑</el-button>
         
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      -->
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
    return {
       // 当前页数
      pagenum: 1,
      pagesize: 2,
      type: "",
    };
  },
  components: {},
  methods: {
    ...shopActions(["getgoodslist"]),
  },
  mounted() {
    this.getgoodslist({
      type:" ",
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    }) 
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
