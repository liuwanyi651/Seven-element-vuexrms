<template>
  <div>
    <el-card class="box-card">
      <!-- 添加分类 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <!-- 树状表格 -->
      <tree-table
        :data="catelist.result"
        :columns="columnsgg"
        show-index
        border
        :selection-type="false"
        :expand-type="false"
        :show-row-hover="false"
        style="margin-top: 10px;"
      >
        <!-- 是否有效 -->
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-edit"
            v-if="scope.row.cat_deleted === 'true'"
            style="color: red"
          ></i>
          <i class="el-icon-success" v-else style="color: lightblue"></i>
        </template>
        <!-- 排序 -->
        <template slot="issort" slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.cat_level ===0">一级</el-tag>
          <el-tag size="mini" type="success" v-else-if="scope.row.cat_level ===1">二级</el-tag>
          <el-tag size="mini" type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
         <template slot="isbutton" slot-scope="">
         <el-button  type="primary" icon="el-icon-edit" size="small">编辑</el-button>
         <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </template>
      </tree-table>
      <!-- 分页  -->
      <el-pagination
        class="el-page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="dalist.pagenum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="dalist.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="catelist.total"
        style="margin-top: 10px;"
      >
      </el-pagination>
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
      dalist: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      columnsgg: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          //  插槽模板
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          //  插槽模板
          type: "template",
          template: "issort",
        },
         {
          label: "操作",
          //  插槽模板
          type: "template",
          template: "isbutton",
        },
      ],
    };
  },
  components: {},
  methods: { ...goodsActions(["getcate"]),
  // 监听pagesize改变的事件
    handleSizeChange(newSize) {
      // console.log(newSize);
      this.dalist.pagesize = newSize;
      // this.getod(this.dalist)
    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage) {
      // console.log(newPage);
      this.dalist.pagenum = newPage;
    // this.getod(this.dalist)
    },
    getod(){
     this.getcate(
      this.dalist
    );
    }
  },
  mounted() {
    this.getod()
  },
  computed: {
    ...goodsState(["catelist"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.box-card {
  margin-top: 10px;
  margin-left: 10px;
  width: 1200px;
}
</style>