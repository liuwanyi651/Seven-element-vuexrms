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
      <div id="main" style="width: 1200px;height:450px;"></div>
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
      // 需要合并的数据
      // options: {
      //   title: {
      //     text: '用户来源'
      //   },
      //   tooltip: {
      //     trigger: 'axis',
      //     axisPointer: {
      //       type: 'cross',
      //       label: {
      //         backgroundColor: '#E9EEF3'
      //       }
      //     }
      //   },
      //   grid: {
      //     left: '3%',
      //     right: '4%',
      //     bottom: '3%',
      //     containLabel: true
      //   },
      //   xAxis: [
      //     {
      //       boundaryGap: false
      //     }
      //   ],
      //   yAxis: [
      //     {
      //       type: 'value'
      //     }
      //   ]
      // }
    }
  },
  components: {},
  methods: {
    ...statisticActions(["getLineChart"]),
    getChart(){
       //4.指定图表的配置项和数据
        var myChart = echarts.init(document.getElementById('main'));
        //5.使用刚指定的配置项和数据显示图表。
         myChart.setOption(this.reports);
    }
  },
  mounted() {
    this.getLineChart(),
      setTimeout(() => {
      this.getChart();
    }, 500);
  },
  computed: {
    ...statisticState(["reports",]),
  },
  watch: {} 
}
</script>

<style lang="scss" scoped>
.el-breadcrumb{
  margin-bottom: 10px;
}
</style>