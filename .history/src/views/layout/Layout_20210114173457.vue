<template>
  <div style="height: 100%">
    <div class="headerContainer">
      <navtop></navtop>
    </div>

    <div class="contentContainer">
      <div class="leftSide">
        <div id="left">
         
        </div>
      </div>
      <div class="main">
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
export default {
  name: "",
  props: {},
  data() {
    return {};
  },
  components: {
    // 注册组件
    navtop,
  },
  methods: {
     ...userActions(["getMenus"]),
  },
  mounted() {},
  computed: {...userState(["menus"]),},
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
</style>
