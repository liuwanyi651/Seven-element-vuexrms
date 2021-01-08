<template>
  <div class="flex">
    <div class="left">欢迎来到小爱后台管理系统！</div>
    <div class="right">
      <div>{{ timer }} {{ hi }}{{time}}</div>
      <div>亲爱的{{ user.username }}
         <el-button type="primary">退出</el-button>
      </div>
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
        username: "",
      },
      hi: "",
      timer: "",
      time: "",
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
      this.user = JSON.parse(userobj);
    },
    getTime() {
      this.timer = dayjs(new Date()).format(" YYYY/MM/DD");
      this.time = dayjs(new Date()).format(" HH:mm:ss");
      setInterval(() => {
        if (dayjs().hour() >= 6 && dayjs().hour() <= 12) {
          this.hi = "早上";
        } else if (dayjs().hour() >= 12 && dayjs().hour() <= 14) {
          this.hi = "中午";
        } else if (dayjs().hour() >= 14 && dayjs().hour() <= 18) {
          this.hi = "下午";
        } else if (dayjs().hour() >= 16 && dayjs().hour() <= 23) {
          this.hi = "晚上";
        } else {
          this.hi = "该睡觉啦！";
        }
      }, 1000);
      // console.log(this.timer);
    },
  },
  mounted() {
    this.getuser();
    this.getTime();
  },
  computed: {},
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
  // background: rgb(131, 110, 58);
  display: flex;
  justify-content:space-around;
}
</style>
