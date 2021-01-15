<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!-- Layout 布局 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <!-- 搜索与添加区域 -->
          <el-input placeholder="请输入内容" v-model="query" clearable @clear="search">
            <el-button
              slot="append"
              icon="el-icon-getShopGoodssearch"
              @click="search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加商品</el-button>
        </el-col>
      </el-row>
      <!--用户列表区域 Table 表格-->
      <el-table :data="goodslist.goods" style="width: 100%" border stripe>
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称"> </el-table-column>
        <el-table-column prop="goods_price" label="商品价格(元)"> </el-table-column>
        <el-table-column prop="goods_weight" label="商品重量"> </el-table-column>
        <el-table-column prop="new_time" label="创建时间"> </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope>
            <!-- {{ scope.row }} 拿到每一项的数据-->
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--Pagination 分页区域-->
      <el-pagination
        class="mt10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[1, 2, 5, 15, 20]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="users.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let shopModule = createNamespacedHelpers("shop");
let { mapState: shopState, mapActions: shopActions } = shopModule;

export default {
  name: "",
  props: {},
  data() {
    return {
      // 当前页数
      pagenum: 1,
      pagesize: 2,
      query: "",
      total: 4,
      // 控制添加商品对话框的隐藏与显示
      addDialogVisible: false,
    };
  },
  components: {},
  methods: {
    ...shopActions(["getShopGoods"]),
    // 点击搜索 调用这个请求方法
    search() {
      this.getShopGoods({
        query: this.query,
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
        //监听 pageSize 改变时会触发 每页条数
    handleSizeChange(newSize) {
      // console.log(`每页 ${newSize} 条`);
      this.pagesize = newSize;
      // 根据新的newSize 重新发请求刷新
      this.getShopGoods({
        query: "",
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
    //监听 currentPage 改变时会触发 页码值
    handleCurrentChange(newPage) {
      // console.log(`当前页: ${newPage}`);
      this.pagenum = newPage;
      this.getShopGoods({
        query: "",
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
    },
  },
  mounted() {
    // 调用商品数据列表的请求
    this.getShopGoods({
      query: "",
      pagenum: this.pagenum,
      pagesize: this.pagesize,
    });
  },
  computed: {
    ...shopState(["goodslist"]),
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
