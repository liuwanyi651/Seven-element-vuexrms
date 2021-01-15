<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!--添加分类按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary" @click="addDialogVisible = true">添加分类</el-button>
        </el-col>
      </el-row>
      <!--表格-->
      <tree-table
        :data="goods.result"
        :columns="columns"
        show-index
        index-text="#"
        border
        :selection-type="false"
        :expand-type="false"
        :show-row-hover="false"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-edit"
            v-if="scope.row.cat_deleted === 'true'"
            style="color: red"
          ></i>
          <i class="el-icon-success" v-else style="color: lightgreen"></i>
        </template>
        <!-- 排序 -->
        <template slot="rank" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope>
          <el-button size="mini"  type="primary" icon="el-icon-edit">编辑</el-button>
           <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </tree-table>
      <!--分页区域-->
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
      list: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      // 总条数
      total: 0,
      // 为table指定列的定义
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          // 表示 将当前定义为模板列
          type: "template",
          // 表示当前这一列使用的模板名称
          template: "isok",
        },
        {
          label: "排序",
          // 表示 将当前定义为模板列
          type: "template",
          // 表示当前这一列使用的模板名称
          template: "rank",
        },
        {
          label: "操作",
          // 表示 将当前定义为模板列
          type: "template",
          // 表示当前这一列使用的模板名称
          template: "opt",
        },
      ],
    };
  },
  components: {},
  methods: {
    ...shopActions(["getgoodslist"]),
    getlist() {
      this.getgoodslist(this.list);
    },
  },
  mounted() {
    this.getlist();
  },
  computed: {
    ...shopState(["goods"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.box-card {
  margin-top: 10px;
  margin-left: 10px;
  width: 1200px;
}
.el-button {
  margin-bottom: 10px;
}
</style>
