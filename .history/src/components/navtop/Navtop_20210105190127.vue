<template>
  <div class="flex">
    <div class="left">
        欢迎来到小爱后台管理系统！
    </div>
    <div class="right">
        <div>{{timer}}</div>
        <div>亲爱的{{user.username}}</div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  props: {},
  data() {
    return {
        user: {
                username: ''
            },
            timer: '',
            time: '',
    };
  },
  components: {},
  methods: {
       getuser() {
            // localStorage.getItem 是获取存储的字符串
            // console.log(111);
            let userobj = localStorage.getItem("user");
            // console.log(localStorage.getItem("user"));
            // JSON.parse 把字符串转换成对象
            this.user = JSON.parse(userobj)
        },
       getTime() {
            this.timer = dayjs(new Date()).format(' YYYY/MM/DD/HH:mm:ss')
            // console.log(this.timer);
        }
  },
  mounted() {
      this.getuser()
        this.getTime()
  },
  computed: {
      
  },
  watch: {},
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    justify-content: space-between;
}

.left {
    margin-left: 20px;
    width: 300px;
    // background: greenyellow;
}

.right {
    width: 500px;
    background: rgb(131, 110, 58);
    display: flex;
    justify-content: space-around;
}
</style>
