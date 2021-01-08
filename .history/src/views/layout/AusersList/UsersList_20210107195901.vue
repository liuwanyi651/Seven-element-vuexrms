<template>
  <div>
  <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb>
    <!--<el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        prop="username"
        label="项目"
        >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
    </el-table>--->
  </div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
let userModule = createNamespacedHelpers('user')
let {mapState: userState, mapActions: userActions} = userModule

export default {
  name: '',
  props: {
  },
  components: {

  },
  data() {
    return {
      pagenum: 1,
      pagesize: 10,
      query: ''
    }
  },
  methods: {
    ...userActions(['getUsers'])
  },
  mounted() {
    this.getUsers({
      query: '',
      pagenum: this.pagenum,
      pagesize: this.pagesize
    })
  },
  watch: {

  },
  computed: {
    ...userState(['users'])
  }
}
</script>

<style scoped lang='scss'>
</style>