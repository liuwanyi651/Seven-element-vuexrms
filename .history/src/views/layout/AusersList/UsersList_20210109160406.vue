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
      <el-table :data="users.users" style="width: 100%" border stripe>
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
          <template slot-scope="scope">
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <!--修改按钮-->
            <!--el-tooltip 文字提示-->
            <el-tooltip
              effect="dark"
              content="修改角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEidtDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip
              effect="dark"
              content="删除角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleUserId(scope.row.id)"
              ></el-button>
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
        :total="users.total"
      >
      </el-pagination>
    </el-card>
    <!--添加用户的dialog对话框--->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
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
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!--修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!--修改用户对话框的主体部分-->
      <el-form
        :model="eidtForm"
        :rules="eidtFormFormRules"
        ref="eidtFormRef"
        label-width="70px"
      >
        <el-form-item label="用户名" >
          <el-input v-model="message.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="message.email" ></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="message.mobile" ></el-input>
        </el-form-item>
      </el-form>
      <!--修改用户对话框的底部 确定 取消-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
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
    // 验证手机的规则
    var checkMobile = (rule, value, callback) => {
      // 验证手机的正则表达式
      const reg = /^(((13[0-9])|(14[5-7])|(15[0-9])|(17[0-9])|(18[0-9]))+\d{8})$/;
      if (reg.test(value)) {
        // 合法手机号
        return callback();
      }
      callback(new Error("请输入正确的手机号"));
    };
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
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },
       // 控制修改用户的对话框的显示与隐藏
      editDialogVisible: false,
      // 查询到的用户信息对象
      eidtForm:{},
      // 修改表单的验证规则对象
      eidtFormFormRules:{
         email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      }
    };
  },
  methods: {
    ...userActions([
      "getUsers",
      "putUserState",
      "addUserList",
      "deleUser",
      "editUserInfo",
      "getIdMsg",
    ]),

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
    //监听添加用户对话框的关闭时间 并且重置
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确定 添加新用户
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        // console.log(valid);
        if (!valid) {
          return;
        } else {
          // 可以发起添加用户的请求
          this.addUserList(this.addForm);
          this.addDialogVisible = false;
          this.getUsers({
            query: "",
            pagenum: this.pagenum,
            pagesize: this.pagesize,
          });
        }
      });
    },
    // 展示编辑用户的对话框 
    showEidtDialog(id) {
      // console.log(id); 拿到不同用户的id 500
      // 调用 根据ID 查询用户信息的请求
      this.getIdMsg({ id: id });
      this.editDialogVisible = true;
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed(){
      this.$refs.eidtFormRef.resetFields()
    },
    //修改用户信息并提交 
    editUserInfo(){
      this.$refs.eidtFormRef.validate(valid=>{
        console.log(valid);
      })
    },

    // 根据id删除相对应的用户信息
    async deleUserId(id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消删除，则返回值为字符串 cancel
      // console.log(confirmResult);
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消了删除");
      } else {
        this.deleUser({ id: id });
        this.getUsers({
          query: "",
          pagenum: this.pagenum,
          pagesize: this.pagesize,
        });
      }
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
    ...userState(["users", "message"]),
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
