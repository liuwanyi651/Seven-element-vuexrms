<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--添加角色按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表区域-->
      <el-table :data="roles" stripe border>
        <!-- 展开列 -->
        <el-table-column type="expand"></el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="职位" prop="roleDesc"></el-table-column>
        <el-table-column label="描述" prop="roleName"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <!--el-tooltip 文字提示-->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" @click="showEidtDialog(scope.row.id)"
                >编辑</el-button
              >
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" @click="deleUserId(scope.row.id)"
                >删除</el-button
              >
            </el-tooltip>
            <!--分配角色按钮-->
            <el-tooltip
              effect="dark"
              content="分配权限"
              placement="top"
              :enterable="false"
            >
              <el-button type="warning" size="mini">分配权限</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加角色的Dialog 对话框 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      width="40%"
    >
      <!-- 对话框的主体信息 Form 表单验证 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <!-- 角色名字  -->
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="addForm.roleName"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部 确定与取消按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleInfo">确 定</el-button>
      </span>
    </el-dialog>
    <!--编辑角色的对话框-->
    <el-dialog
      title="编辑角色"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!--编辑角色对话框的主体部分-->
      <el-form
        :model="message"
        :rules="eidtFormRules"
        ref="eidtFormRef"
        label-width="70px"
      >
        <!-- 角色名字  -->
        <el-form-item label="角色名" prop="roleName" disabled>
          <el-input v-model="message.roleName"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="message.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--修改用户对话框的底部 确定 取消-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("permission");
let { mapState: userState, mapActions: userActions } = userModule;

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      // 控制添加角色对话框的显示与隐藏
      addDialogVisible: false,
      // 添加角色的表单数据
      addForm: {
        roleName: "",
        roleDesc: "",
      },
      // 添加表单验证规则对象
      addFormRules: {
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        roleDesc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
      },
       // 控制修改角色的对话框的显示与隐藏
      editDialogVisible: false,
       // 编辑角色表单的验证规则对象
      eidtFormRules:{
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        roleDesc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
      }
    };
  },
  methods: {
    ...userActions(["getRoles", "addRoles","getIdRolesMsg","editRolesInfo"]),
    //监听添加角色对话框的关闭时间 并且重置
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    // 点击确定 添加新角色
    addRoleInfo() {
      this.$refs.addFormRef.validate((valid) => {
        // console.log(valid);
        if (!valid) {
          return;
        } else {
          // 可以发起添加角色的请求
          this.addRoles(this.addForm);
          this.addDialogVisible = false;
          // 再次调用角色列表的方法 刷新页面
          this.getRoles();
        }
      });
    },
    // 展示编辑用户的对话框
    showEidtDialog(id) {
      console.log(id); //拿到不同用户的id 30
      // // 调用 根据ID 查询用户信息的请求
      this.getIdRolesMsg({ id: id });
      this.editDialogVisible = true;
    },
     // 监听编辑角色对话框的关闭事件
    editDialogClosed(){
      this.$refs.eidtFormRef.resetFields()
    },
    //修改用户信息并提交 
    editRoles(){
      this.$refs.eidtFormRef.validate(valid=>{
        if (!valid) {
          return;
        } else {
          // 可以发起修改用户的请求
          this.editRolesInfo(this.message);
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
           this.getRoles();
        }
      })
    },

  },

  mounted() {
    this.getRoles();
  },
  watch: {},
  computed: {
    ...userState(["roles","message"]),
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
.el-button {
  margin-bottom: 10px;
}
</style>
