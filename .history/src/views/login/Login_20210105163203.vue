<template>
  <div class="bg">
    <div class="box">
      <el-card class="box-card">
      <!-- 登录盒子 -->
        <div class="fs32 fw-b t-center pdtb20 ">欢迎来到小爱后台系统管理</div>
         <el-divider></el-divider>
        <!-- 登录表单区域 -->
            <!-- <el-form :model="loginForm" :rules="rules" label-width="0px" class="login-form" ref="formName">
                用户名
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"  placeholder="请输入用户名"></el-input>
                </el-form-item>
                密码
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"  placeholder="请输入密码" show-password></el-input>
                </el-form-item>
                按钮区域
                <el-form-item class="btns">
                    <el-button type="primary" @click="submit">立即登录</el-button>
                </el-form-item>
            </el-form> -->
        <!-- <el-input placeholder="请输入用户名" v-model="username"></el-input>
        <el-input placeholder="请输入密码" show-password v-model="password"></el-input>
        <el-button type="primary" @click="submit">登录</el-button> -->
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
      username: "",
      password: "",
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
</style>
