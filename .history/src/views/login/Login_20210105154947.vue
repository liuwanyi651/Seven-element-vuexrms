<template>
  <div class="bg">
    <div class="box">
      <div class="line">
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
    background-image: url(https://i02piccdn.sogoucdn.com/a14ebf0a7bb8ce96);
}
.box {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.line {
    width: 550px;
    height: 320px;
    background: white;
    border: 1px solid #ccc;
}

</style>