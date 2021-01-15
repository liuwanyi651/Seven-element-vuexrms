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
        <el-table-column type="expand">
          <!--作用域插槽 显示当前这一行的数据 pre美化数据-->
          <template slot-scope="scope">
          <!--<pre>{{ scope.row }}</pre> 拿到每一项的数据-->
            <!--Layout 布局 栅格组件-->
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="index1"
              :class="['bdbottom', index1 === 0 ? 'bdtop' : '','fx']"
            >
              <!--渲染第一级权限-->
              <el-col :span="5">
                <el-tag>
                  {{ item1.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!--渲染第二、三级权限-->
              <el-col :span="19">
                <!--通过 for 循环 嵌套渲染二级权限-->
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="index2"
                  :class="[index2 === 0 ? '' : 'bdtop','fx']"
                >
                  <el-col :span="6">
                    <el-tag type="success">
                      {{ item2.authName }}
                    </el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--通过 for 循环 嵌套渲染三级权限-->
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="(item3, index3) in item2.children"
                      :key="index3"  closable @close="removeRightById(index3)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="职位" prop="roleDesc"></el-table-column>
        <el-table-column label="描述" prop="roleName"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <!--el-tooltip 文字提示-->
            <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" size="mini" @click="showEidtDialog(scope.row)"
                >编辑</el-button
              >
            </el-tooltip>
            <!--删除按钮-->
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" size="mini" @click="deleRolesId(scope.row.id)"
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
        :model="updateUser"
        :rules="eidtFormRules"
        ref="eidtFormRef"
        label-width="80px"
      >
        <!-- 角色名字  -->
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="updateUser.roleName"></el-input>
        </el-form-item>
        <!-- 角色描述 -->
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="updateUser.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <!--修改用户对话框的底部 确定 取消-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
//引入vuex
import { createNamespacedHelpers } from "vuex";
//引进封装在user模块
let userModule = createNamespacedHelpers("permission");
let {
  mapState: userState,
  mapMutations: userMatitons,
  mapActions: userActions,
} = userModule;

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
      eidtFormRules: {
        roleName: [
          { required: true, message: "角色名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" },
        ],
        roleDesc: [{ required: true, message: "描述不能为空", trigger: "blur" }],
      },
    };
  },
  methods: {
    //展开运算符 是一个方法放入用户模块的方法名字传过来列如menus,会直接调用方法
    ...userActions(["getRoles", "addRoles", "editRolesInfo", "deleRoles","deleRolesLimit"]),
    ...userMatitons(["setUpdateUser"]),
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
    showEidtDialog(row) {
      //拿到不同用户的id 30
      this.setUpdateUser(row);
      this.editDialogVisible = true;
    },
    // 监听编辑角色对话框的关闭事件
    editDialogClosed() {
      this.$refs.eidtFormRef.resetFields();
    },
    //修改用户信息并提交
    editRoles() {
      console.log(this.updateUser);
      this.$refs.eidtFormRef.validate((valid) => {
        if (!valid) {
          return;
        } else {
          this.editRolesInfo({
            id: this.updateUser.id,
            roleName: this.updateUser.roleName,
            roleDes: this.updateUser.roleName,
          });
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.getRoles();
        }
      });
    },
      // 根据id删除相对应的用户信息
    async deleRolesId(id) {
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
        this.deleRoles({ id: id });
        this.getRoles();
      }
    },
    // 根据id 删除对应的权限
    async removeRightById(index){
      console.log(index)
    // 弹框提示用户是否要删除
    const confirmResult= await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).catch(err => err)

          if(confirmResult !== 'confirm'){
            return this.$message.info('取消了删除！')
          }else{
            this.deleRolesLimit({
            roleId:roleId.id,
            rightId:rightId
          })
           this.getRoles();
            console.log(111,roleId.id)
            console.log(222,rightId)
          }
         
          
          
    }
  },

  mounted() {
    this.getRoles();
  },
  watch: {},
  computed: {
    //展开运算得到vuex中state的对应方法的值显示出来
    ...userState(["roles", "updateUser"]),
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

// 权限下面的样式
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.fx{
  display:flex;
  align-items:center;
}
</style>
