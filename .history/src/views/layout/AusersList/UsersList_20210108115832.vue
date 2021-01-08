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
          <el-input placeholder="请输入内容" v-model="query">
            <el-button slot="append" icon="el-icon-search" @click="getUsers({})"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!--用户列表区域 Table 表格-->
      <el-table :data="users" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope>
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <!--修改按钮-->
            <!--el-tooltip 文字提示-->
            <el-tooltip
              effect="dark"
              content="修改角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip
              effect="dark"
              content="删除角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </el-tooltip>
            <!--分配角色按钮-->
            <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!--Pagination 分页区域-->
      <el-pagination
        class="mt10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 5, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="203"
      >
      </el-pagination>
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
      // 当前页数
      pagenum: 1,
      pagesize: 5,
      query: "",

    };
  },
  methods: {
    ...userActions(["getUsers","putUserState"]),

    //监听 pageSize 改变时会触发 每页条数
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.pagesize = newSize;
      // 根据新的newSize 重新发请求刷新
      this.getUsers({
        query: "",
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //监听 currentPage 改变时会触发 页码值
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`);
      this.pagenum = newPage;
      this.getUsers({
        query: "",
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    // 监听switch开关状态的改变
    userStateChange(userinfo) {
      // console.log(userinfo);  点击可以拿到不同状态
      // 调用修改状态的请求
      this.putUserState({
        uId: userinfo.id,
        type:userinfo.mg_state
      });
    },
  },
  mounted() {
    // 调用用户数据列表的请求
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
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>
