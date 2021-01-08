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
    navtop
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>