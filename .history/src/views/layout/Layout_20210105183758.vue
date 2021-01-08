<template>
  <div>
    <div class="headerContainer">
        <navtop></navtop>
    </div>
    <div class="contentContainer">
        <div class="leftSide">
            <div id="left">
                <navleft></navleft>
            </div>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
  </div>
</template>

<script>
import navtop from '../../components/navtop/Navtop'
import navleft from '../../components/navleft/Navleft'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {
    // 注册组件
    navtop,
    navleft
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.headerContainer{
    height: 70px;
    line-height: 70px;
    position: fixed;
    top: 0;
    background:rgb(235, 231, 231);
    width: 100%;
    z-index: 99;
    color: white;
}
// 把下面撑满
#left ul {
    height: 1500px;
    border-right: 0;
}

.contentContainer {
    display: flex;
    width: calc(100% - 200px);
    .leftSide {
        width: 200px;
        position: fixed;
        left: 0;
        bottom: 0;
        top: 70px;
    }

    .main {
        flex: 1;
        position: relative;
        left: 200px;
        top: 60px;
        padding: 20px;
        background: rgb(201, 216, 238);
    }
}
</style>