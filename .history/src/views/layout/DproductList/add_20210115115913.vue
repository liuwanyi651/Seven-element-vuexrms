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
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
               <!-- 选择商品分类的级联选择框 -->
                <el-cascader
                  v-model="addForm.goods_cat"
                  :options="goodlist"
                  :props="cageProps" @change="handleChange"
                ></el-cascader>
            </el-form-item>
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
import { createNamespacedHelpers } from "vuex";
let shopModule = createNamespacedHelpers("shop");
let { mapState: shopState, mapActions: shopActions } = shopModule;

export default {
  name: "",
  props: {},
  data() {
    return {
      activeIndex: "0",
      // 添加商品的对象
     addForm: { 
        goods_name: "",
        goods_price: '',
        goods_weight: '',
        goods_number: '',
      },
      addFormRef: {},
      addFormRules: {
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
         goods_cat: [
          {
            required: true,
            message: "商品分类不能为空",
            trigger: "blur",
          },
        ],
      },
       // 级联选择框的配置对象
      cageProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 商品所属的分类数组
     goods_cat: [],
    };
  },
  components: {},
  methods: {
    ...shopActions(["getCateList", ]),
    // 级联选择器选中项变化，会触发这个函数
    handleChange(){
      console.log(this.addForm.goods_cat);
      if(this.addForm.goods_cat.length !==3){
       this.addForm.goods_cat = []
      }
    },
    // 切换标签页
    beforeTabLeave(activeName,OldActiveName){
      console.log('即将离开标签页名字是'+OldActiveName);
      console.log('即将进入标签页名字是'+activeName);
      return false
      if(OldActiveName === '0' && this.addForm.goods_cat.length !==3)
      {
        this.$message.error('请先选择商品部分')
      }
      return false
    }
  },
  mounted() {
    // 默认所有分类列表
    this.getCateList();
  },
  computed: {
    ...shopState(["goodlist",]),
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
.el-steps {
  margin: 15px 0;
}
.cat_opt {
  margin: 15px 0;
}
</style>
