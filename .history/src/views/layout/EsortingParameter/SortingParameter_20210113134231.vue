<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!-- 头部警告区域 -->
      <el-alert
        title="注意:只允许为第三级分类设置相关参数!"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <!-- 选择商品分类区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类:</span>
          <!-- 选择商品分类的级联选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="goodlist"
            :props="cageProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
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
      // 级联选择框的配置对象
      cageProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
    };
  },
  components: {},
  methods: {
    ...shopActions(["getCateList"]),
     handleChange(selectedOptions) {
        console.log(selectedOptions);
      }
  },
  mounted() {
    // 默认所有分类列表
    this.getCateList();
  },
  computed: {
    ...shopState(["goodlist"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.cat_opt {
  margin: 15px 0;
}
.el-cascader {
  margin: 0 15px;
}
</style>
