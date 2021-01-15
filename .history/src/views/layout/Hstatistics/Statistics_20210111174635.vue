<template>
  <div>
      <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/users' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
     <!--卡片视图-->
    <el-card>
    <!-- 2.为 ECharts 准备一个具备大小（宽高）的 DOM -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
let statisticModule = createNamespacedHelpers("statistic");
let { mapState: statisticState,mapActions: statisticActions } = statisticModule;
// 1.引入 ECharts  >
import echarts from 'echarts'
export default {
  name: '',
  props:{},
  data () {
    return {
    }
  },
  components: {},
  methods: {
    ...statisticActions(["getRoles"]),
  },
  mounted() {
      // 3.基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        
      // 4.指定图表的配置项和数据
       var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
       //5.使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  },
  computed: {
    ...statisticState(["roles",]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 10px;
}
</style>