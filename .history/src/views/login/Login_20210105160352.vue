<template>
  <div class="bg">
    <div class="box">
      <div class="line">
        <div class="fs28 fw-b t-center pdtb10">欢迎来到小爱后台系统管理</div>
      </div>
    </div>
    <!-- <el-input placeholder="请输入用户名" v-model="username"></el-input>
    <el-input
      placeholder="请输入密码"
      show-password
      v-model="password"
    ></el-input>
    <el-button type="primary" @click="submit">登录</el-button> -->
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
let userModule = createNamespacedHelpers('user')
let {mapActions: userActions} = userModule

export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...userActions(['login']),
    submit() {
      this.login({
        username: this.username,
        password: this.password
      })
    }
  },
  mounted() {

  },
  watch: {

  },
  computed: {

  }
}
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
.line {
    width: 600px;
    height: 350px;
    background: white;
    border-bottom: 1px solid #eee;
    box-shadow: 2px 2px 6px #cac8c8;
}

</style>