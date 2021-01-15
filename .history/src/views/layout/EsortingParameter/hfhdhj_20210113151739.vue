<template>
  <div>
    <el-card class="pacard">
      <!-- 头部警告 -->
      <el-alert
        title="注意:只允许为第三级分类设置相关参数!"
        :closable="false"
        type="warning"
        show-icon
      ></el-alert>
      <!-- 选择商品分类 -->
      <el-row class="check">
        <el-col>
          <span>选择商品分类: </span>
          <!-- 选择框 -->
          <el-cascader
            v-model="selectedCateKeys"
            :options="paralist"
            :props="cateProps"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
      <!-- tab页签 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 添加动态参数 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="small" :disabled="isBtnDisbled"
            >动态参数</el-button
          >
          <!-- 动态参数数据 -->
          <el-table :data="paraslist" border stripe style="margin-top: 10px;">
          <!-- 展开 -->
           <el-table-column type="expand"></el-table-column>
            <!-- 索引 -->
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="">
                <el-button type="primary" icon="el-icon-edit" size="small"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 添加静态参数 -->
        <el-tab-pane label="静态参数" name="only">
          <el-button type="primary" size="small" :disabled="isBtnDisbled"
            >静态参数</el-button
          >
          <!-- 静态参数数据 -->
          <el-table :data="paraslist" border stripe style="margin-top: 10px;">
          <!-- 展开 -->
           <el-table-column type="expand"></el-table-column>
            <!-- 索引 -->
            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="">
                <el-button type="primary" icon="el-icon-edit" size="small"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let goodsModule = createNamespacedHelpers("goods");
let { mapState: goodsState, mapActions: goodsActions } = goodsModule;
export default {
  name: "",
  props: {},
  data() {
    return {
      // 级联选择框的配置对象
      activeName: "many",
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择框双向绑定
      selectedCateKeys: [],
    };
  },
  components: {},
  methods: {
    ...goodsActions(["getAttrs", "getparameter"]),
    // 级联选择框选中项变化会触发这个事件
    handleChange() {
      this.getparadata();
    },
    // tabs标签页的变化
    handleClick() {
      // console.log(this.activeName);
      this.getparadata();
    },
    // 获取参数的列表数据
    getparadata() {
      // console.log(this.selectedCateKeys);
      // 证明选中的不是三级分类
      if (this.selectedCateKeys.length !== 3) {
        this.selectedCateKeys = [];
        return;
      } else {
        //  证明选中的是三级分类
        // console.log(this.selectedCateKeys);
        this.getparameter({
          id: this.cateId,
          sel: this.activeName,
        });
      }
    },
  },
  mounted() {
    this.getAttrs();
    this.getparameter({
      id: this.cateId,
      sel: this.activeName,
    });
  },
  computed: {
    ...goodsState(["paralist", "paraslist"]),
    // 按钮被禁用返回true否则返回false
    isBtnDisbled() {
      if (this.selectedCateKeys.length !== 3) {
        return true;
      } else {
        return false;
      }
    },
    // 当前选中的三级分类的id
    cateId() {
      if (this.selectedCateKeys.length === 3) {
        return this.selectedCateKeys[2];
      } else {
        return null;
      }
    },
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.pacard {
  margin-top: 10px;
  margin-left: 10px;
  width: 1200px;
}
.check {
  margin-top: 10px;
}
</style>