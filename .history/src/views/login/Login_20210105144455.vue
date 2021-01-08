<template>
  <div>
    <el-input placeholder="请输入用户名" v-model="username"></el-input>
    <el-input
      placeholder="请输入密码"
      show-password
      v-model="password"
    ></el-input>
    <el-button type="primary" @click="submit">登录</el-button>
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

<style scoped lang='scss'>
</style>