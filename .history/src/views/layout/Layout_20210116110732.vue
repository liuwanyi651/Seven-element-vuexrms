<template>
  <div style="height: 100%">
    <div class="headerContainer">
      <navtop></navtop>
    </div>
    <div class="contentContainer">
      <div class="leftSide">
        <div id="left">
          <el-menu :default-active="activename" class="el-menu-vertical-demo"  router  unique-opened>
            <el-submenu :index="`${item.path}`"  v-for="(item, index) in menus" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item-group v-for="(item1, index1) in item.children" :key="index1">
                <el-menu-item :index="`${item1.path}`" @click="jump(item1)">{{item1.authName}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </div>
      </div>
      <div class="main">
        <div class="df">
          <!--拖拽插件-->
          <draggable v-model="rigtarr" draggable=".one">
            <transition-group class="df">
              <div class="one" :class="activename == item.path ? 'two' : 'one'" v-for="(item, index) in rigtarr" :key="index"
                @click="jump(item)">
                <div>{{ item.authName }}</div>
                <div @click.stop="del(index)" :class="item.path == activename ? '' : 'aaa'">
                  <i :class=" item.path == '/' && rigtarr.length == 1 ? '' : 'el-icon-close'"></i>
                </div>
              </div>
            </transition-group>
          </draggable>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navtop from "../../components/navtop/Navtop";
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("user");
let { mapState: userState, mapActions: userActions } = userModule;
import draggable from "vuedraggable";

export default {
  name: "",
  props: {},
  data() {
    return {
      rigtarr: ["首页"],
      activename: "首页", //左侧高亮
    };
  },
  components: {
    // 注册组件
    navtop,
    draggable,
  },
  methods: {
    ...userActions(["getMenus"]),
    getdata() {
      this.getMenus();
      this.rigtarr = JSON.parse(localStorage.getItem("rigtarr")) || []; //获取缓存 右侧
      this.activename = localStorage.getItem("activename") || ""; // 获取索引
    },
    jump(e) {
      //判断是否重复
      // console.log(e);
      let falge = true;
      this.rigtarr.map((v) => {
        v.path == e.path ? (falge = false) : "";
      });
      falge ? this.rigtarr.push(e) : "";
      this.activename = e.path;
      localStorage.setItem("activename", this.activename);
      localStorage.setItem("rigtarr", JSON.stringify(this.rigtarr));
      this.$router.push(this.activename); //跳路由
      // console.log(e);
    },
    del(e) {
      //删除
      //删除最后一个
      if (this.rigtarr.length - 1 == e && this.rigtarr.length != 1) {
        this.activename = this.rigtarr[e - 1].path;

        this.jump(this.rigtarr[e - 1]);
      } else if (e == this.rigtarr.length - 1 && this.rigtarr.length == 1) {
        //删除最后一个（列表只剩一个时）

        this.activename = "/";

        this.rigtarr.push({ path: "/", authName: "首页" });
      } else {
        //正常情况
        this.activename = this.rigtarr[e].path;
        this.jump(this.rigtarr[e + 1]);
      }
        this.rigtarr.splice(e, 1); //删除数组元素
    },
  },
  mounted() {
    this.getdata();
  },
  computed: { ...userState(["menus"]) },
  watch: {},
};
</script>

<style lang="scss" scoped>
.headerContainer {
  height: 70px;
  line-height: 70px;
  position: fixed;
  top: 0;
  background: rgb(252, 252, 252);
  width: 100%;
  z-index: 99;
}
// 把下面撑满
#left ul {
  height: 1500px;
  border-right: 0;
}

.contentContainer {
  display: flex;
  width: calc(100% - 240px);

  .leftSide {
    width: 240px;
    position: fixed;
    left: 0;
    bottom: 0;
    top: 70px;
    background-color: white;
  }

  .main {
    flex: 1;
    position: relative;
    left: 240px;
    top: 60px;
    padding: 20px;
    background: rgb(249, 250, 252);
  }
}
.df {
  display: flex;
  .one {
    display: flex;
    padding: 10px 20px;
  }
  .two {
    padding: 10px 20px;
    color: white;
    background: #409eff;
  }
}
.eee {
  display: block;
}
.aaa {
  display: none;
}
</style>
