<template>
  <div>
    <el-menu default-active="index" @open="handleOpen" @close="handleClose" v-for="(item, index) in menus" :key="index" :index="item.authName">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <el-menu-item-group  v-for="(item,index) in menus[index].children" :key="index">
           
            <el-menu-item >{{item.authName}}</el-menu-item>
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
    this.getMenus();
  },
  computed: {
    ...userState(["menus"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
