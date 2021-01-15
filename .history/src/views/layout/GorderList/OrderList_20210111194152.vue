<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!-- Layout 布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="list.goods" style="width: 100%" border stripe>
            <el-table-column type="index" label="#"> </el-table-column>
            <el-table-column prop="order_number" label="订单编号"> </el-table-column>
            <el-table-column prop="order_price" label="订单价格"> </el-table-column>
            <el-table-column prop="order_pay" label="是否付款"> 
            <template slot-scope="scope">
            <el-tag v-if="scope.row.order_pay === '0'">未付款</el-tag>
           <el-tag type="success" v-else>已付款</el-tag>
            </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"> </el-table-column>
            <el-table-column prop="new_time" label="下单时间"> </el-table-column>
            <el-table-column label="操作"> 
            <template slot-scope="">
            <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
               <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
              ></el-button>
            </template>
            </el-table-column>
          </el-table>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let orderModule = createNamespacedHelpers("order");
let { mapState: orderState, mapActions: orderActions } = orderModule;

export default {
  name: "",
  props: {},
  data() {
    return {
      pagenum: 1,
      pagesize: 2,
      query: "",
    };
  },
  components: {},
  methods: {
    ...orderActions(["getOrderList"]),
    // 点击搜索 调用这个请求方法
    search() {
      this.getOrderList({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
  },
  mounted() {
    this.getOrderList({
      query: this.query,
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  computed: {
    ...orderState(["list"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
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
  text-align: center;
}
</style>
