<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片视图-->
    <el-card>
      <!-- 消息提示区域 -->
      <el-alert title="添加商品信息" type="info" show-icon :closable="false" center>
      </el-alert>
      <!-- 含状态步骤条区域 -->
      <el-steps
        :space="200"
        :active="activeIndex - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="商品完成"></el-step>
      </el-steps>
      <!-- 表单 -->
      <!-- Tabs 标签页 左边 -->
      <el-form
        :model="AddForm"
        :rules="AddFormRules"
        ref="AddFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs tab-position="left" v-model="activeIndex">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="AddForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="AddForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="AddForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="AddForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-cascader
              v-model="value"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"
            ></el-cascader>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">配置管理</el-tab-pane>
          <el-tab-pane label="商品属性" name="2">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片" name="3">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容" name="4">定时任务补偿</el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  data() {
    return {
      activeIndex: "0",
      // 添加商品的对象
      AddForm: {
        goods_name: "",
      },
      AddFormRef: {},
      AddFormRules: {
        goods_name: [
          {
            required: true,
            message: "商品名称不能为空",
            trigger: "blur",
          },
        ],
        goods_price: [
          {
            required: true,
            message: "商品价格不能为空",
            trigger: "blur",
          },
        ],
        goods_weight: [
          {
            required: true,
            message: "商品重量不能为空",
            trigger: "blur",
          },
        ],
        goods_number: [
          {
            required: true,
            message: "商品数量不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  components: {},
  methods: {},
  mounted() {},
  computed: {},
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
.el-steps {
  margin: 15px 0;
}
</style>
