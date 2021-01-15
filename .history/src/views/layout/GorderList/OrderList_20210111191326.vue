<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
     <!--卡片视图-->
    <el-card>
 
    </el-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { createNamespacedHelpers } from "vuex";
let orderModule = createNamespacedHelpers("order");
let { mapState: orderState,mapActions: orderActions } = orderModule;

export default {
  name: '',
  props:{},
  data () {
    return {
       hi: "",
      timer: "",
      time: "",
    }
  },
  components: {},
  methods: {
    ...orderActions(["getOrderList"]),
     getTime() {
      
      setInterval(() => {
        this.timer = dayjs(new Date()).format(" YYYY/MM/DD");
      this.time = dayjs(new Date()).format(" HH:mm:ss");
        if (dayjs().hour() >= 6 && dayjs().hour() <= 12) {
          this.hi = "早上";
        } else if (dayjs().hour() >= 12 && dayjs().hour() <= 14) {
          this.hi = "中午";
        } else if (dayjs().hour() >= 14 && dayjs().hour() <= 18) {
          this.hi = "下午";
        } else if (dayjs().hour() >= 16 && dayjs().hour() <= 23) {
          this.hi = "晚上";
        } else {
          this.hi = "该睡觉啦！";
        }
      }, 1000);
      // console.log(this.timer);
    },
  },
  mounted() {
    this.getOrderList()
  },
  computed: {
    ...orderState(["list"]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 10px;
}
</style>