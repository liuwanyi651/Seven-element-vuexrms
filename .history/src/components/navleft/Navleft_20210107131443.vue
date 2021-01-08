<template>
  <div>{{menus}}</div>
</template>

<script>
import {createNamespacedHelpers} from 'vuex'
let userModule = createNamespacedHelpers('user')
let {mapState: userState, mapActions: userActions} = userModule

export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {
    ...userActions(["getMenus"]),
  },
  mounted() {
     this.getMenus()
  },
  computed: {
    ...userState(['menus'])
  },
  watch: {}
}
</script>

<style lang="scss" scoped>

</style>