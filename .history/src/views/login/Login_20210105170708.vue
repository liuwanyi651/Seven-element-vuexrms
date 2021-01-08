<template>
  <div class="bg">
    <div class="box">
      <el-card class="box-card">
      <!-- 登录盒子 -->
        <div class="fs32 fw-b t-center pdtb20 bbs">欢迎来到小爱后台系统管理</div>
        <!-- 登录表单区域 -->
            <el-form :model="loginForm" :rules="loginFormRules" label-width="112px" class="login-form" ref="formName">
                <!-- 用户名 -->
                <el-form-item prop="username" label="请输入用户名" >
                    <el-input v-model="loginForm.username"  placeholder="请输入用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password" label="请输入您密码">
                    <el-input v-model="loginForm.password"  placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                <!-- 文字 -->
                <div>特别提醒：如果您是管理员，请使用管理员账号，如果不知道账号，请联系公司人事</div>
                <!-- 按钮区域 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="submit" size="medium">立即登录</el-button>
                </el-form-item>
            </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("user");
let { mapActions: userActions } = userModule;

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      //登录表单的数据绑定对象
            loginForm: {
                username: "",
                password: "",
            },
            //这是表单的验证规则对象
            loginFormRules: {
                // 验证用户名是否合法
                username: [{
                        required: true,
                        message: "用户名不能为空",
                        trigger: "blur",
                    },
                    {
                        min: 2,
                        max: 8,
                        message: "用户名在2-8位之间",
                        trigger: "blur",
                    },
                ],
                // 验证密码是否合法
                password: [{
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                    {
                        min: 1,
                        max: 15,
                        message: "密码在6~15位",
                        trigger: "blur",
                    },
                ]}
    };
  },
  methods: {
    ...userActions(["login"]),
    submit() {
      this.login({
        username: this.username,
        password: this.password,
      });
    },
  },
  mounted() {},
  watch: {},
  computed: {},
};
</script>

<style scoped lang="scss">
.bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  position: absolute;
  background-image: url(https://preview.pro.antdv.com/assets/background.a568162c.svg);
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.box-card {
  width: 600px;
  height: 350px;
}
.login-form {
    margin-top: 20px;
    padding: 0 20px;
    box-sizing: border-box;
}
.btns {
    display: flex;
    justify-content: center;  
} 
</style>
