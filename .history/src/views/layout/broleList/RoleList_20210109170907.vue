<template>
  <div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let userModule = createNamespacedHelpers("permission");
let { mapState: userState, mapActions: userActions } = userModule;

export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
      
     
    };
  },
  methods: {
    ...userActions(["login"]),
   
  },
  mounted() {},
  watch: {},
  computed: {
    ...userState(["users", "message"]),
  },
};
</script>

<style scoped lang="scss">

</style>
