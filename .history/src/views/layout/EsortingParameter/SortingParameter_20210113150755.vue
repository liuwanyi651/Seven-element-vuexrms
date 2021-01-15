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
      <!-- Tabs 标签页区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <!-- 添加动态参数的面板 -->
        <el-tab-pane label="动态参数" name="many">
          <!-- 添加参数的按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
         <!-- 添加静态属性的面板 -->
        <el-tab-pane label="静态属性" name="only">
           <!-- 添加属性的按钮 -->
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
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
      // 级联选择框双向数据绑定的数组
      selectedCateKeys: [],
      // 被激活的页签的名称
      activeName: "many",
    };
  },
  components: {},
  methods: {
    ...shopActions(["getCateList","getParameterList"]),
    // 级联选择框选中项变化，会触发这个函数
    handleChange() {
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        return;
      }
      // 证明选中的三级分类
      // console.log(this.selectedCateKeys);
      // 根据所选分类的id 和当前所处的面板 获取对应的参数
      this.getParameterList({
        id:this.cateId,
        sel:this.activeName
      })
    },
    // tab页签点击事件的处理函数
    handleTabClick() {
      console.log(this.activeName);
    },
  },
  mounted() {
    // 默认所有分类列表
    this.getCateList();
  },
  computed: {
    ...shopState(["goodlist","paraslist"]),

    // 如果按钮需要被禁用，则返回true 否则返回false
    isBtnDisabled(){
      if(this.selectedCateKeys.length !== 3){
        return true
      }
      return false
    },
    // 当前选中的三级分类的Id
    cateId(){
      if(this.selectedCateKeys.length == 3){
        return this.selectedCateKeys[2]
      }
      return null
    }
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
