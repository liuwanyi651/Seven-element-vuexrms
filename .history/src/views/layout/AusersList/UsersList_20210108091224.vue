<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- Layout 布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户列表区域 Table 表格-->
      <el-table :data="users" style="width: 100%" border>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mg_state" label="状态"> </el-table-column>
        <el-table-column  label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("user");
let { mapState: userState, mapActions: userActions } = userModule;

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      query: "",
    };
  },
  methods: {
    ...userActions(["getUsers"]),
  },
  mounted() {
    this.getUsers({
      query: "",
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  watch: {},
  computed: {
    ...userState(["users"]),
  },
};
</script>

<style scoped lang="scss">
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 14px;
}
.box-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
}
</style>
