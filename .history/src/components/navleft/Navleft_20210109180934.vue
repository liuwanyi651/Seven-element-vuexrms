<template>
  <div>
    <el-menu default-active="index" router v-for="(item, index) in menus" :key="index" :default-active="activepath"
 unique-opened>
      <!--一级菜单--->
      <el-menu-item index="/" v-if="!item.children">
        <i class="el-icon-setting"></i>
        <span slot="title">{{item.authName}}</span>
      </el-menu-item>

      <el-submenu index="1" v-else>
        <!--一级菜单的模板区域-->
        <template slot="title">
          <i :class="icon1[index]"></i>
          <span>{{item.authName}}</span>
        </template>
        <!--二级菜单--->
        <el-menu-item-group v-for="(item1,index) in menus[index].children" :key="index" >
            <el-menu-item :index="'/'+item1.path" @click="saveNavState('/'+ item1.path)">
             <i :class="icon[index+1].meta.icon"></i>
            {{item1.authName}}</el-menu-item>
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
    return {
      icon1:['el-icon-tickets','el-icon-edit', 'el-icon-film','el-icon-coin','el-icon-shopping-cart-full','el-icon-edit'
      ]
      activepath:''
    };
  },
  components: {},
  methods: {
    ...userActions(["getMenus"]),
    //高亮
    saveNavState(activepath){
      localStorage.setItem('activepath',activepath)
    }
  },
  mounted() {
      this.activepath = localStorage.getItem('activepath')
    // console.log(this.$router);
    let list = this.$router.options.routes[0].children
    if(list.length===9){
      list = list.slice(0)
      this.icon = list
    }
    // 调用左侧菜单请求数据方法
    this.getMenus();
  },
  computed: {
    ...userState(["menus"]),
  },
  watch: {},
};
</script>

<style lang="scss" scoped></style>
