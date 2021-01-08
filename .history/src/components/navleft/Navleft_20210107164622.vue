<template>
  <div>
    <el-menu default-active="index" @open="handleOpen" @close="handleClose" v-for="(item, index) in menus" :key="index" unique-opened>
      <!--一级菜单--->
      <el-submenu index="1">
        <!--一级菜单的模板区域-->
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <!--二级菜单--->
        <el-menu-item-group v-for="(item1,index) in menus[index].children" :key="index" >
            <el-menu-item :index="item1.path">{{item.authName}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("user");
let { mapState: userState, mapActions: userActions } = userModule;

export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {},
  methods: {
    ...userActions(["getMenus"]),

    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  mounted() {
     
    console.log(this.$router);
    this.getMenus();
  },
  computed: {
    ...userState(["menus"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
