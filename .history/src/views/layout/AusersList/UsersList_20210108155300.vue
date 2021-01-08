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
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
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
        :page-sizes="[1, 2, 5, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!--添加用户的dialog对话框--->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
      <!--对话框主体内容 表单验证-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <!--用户名-->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <!--邮箱-->
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <!--电话-->
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!--对话框底部内容-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
    // 验证邮箱的规则
    // var checkEmail = (rule, value, cb) => {
    //   // 验证邮箱的正则表达式
    //  const regEmail =/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/
    //   if(regEmail.test(value)){
    //     // 合法邮箱
    //     return cb()
    //   }
    //     cb(new Error('请输入合法邮箱'))
    // };

    // 验证手机的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机的正则表达式
      const regMobile =/^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/
      if(regMobile.test(value)){
        // 合法手机号
        return cb()
      } 
        cb(new Error('请输入合法手机号'))
    }
    return {
      // 当前页数
      pagenum: 1,
      pagesize: 2,
      query: "",
      total: 4,
      // 控制添加用户对话框的隐藏与显示
      addDialogVisible: false,
      // 添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加表单验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator:checkEmail,trigger: "blur"}

        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator:checkMobile,trigger: "blur"}
          ],
      },
    };
  },
  methods: {
    ...userActions(["getUsers", "putUserState"]),

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
        type: userinfo.mg_state,
      });
    },
    // 点击搜索 调用这个请求方法
    search() {
      this.getUsers({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
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
