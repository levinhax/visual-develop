<template>
  <div class="pieChartView example-view">
    <h3>基础饼图</h3>
    <router-link to="/">首页</router-link>
    <pie-chart :chart-data="chartData.data" :options="chartData.options"></pie-chart>
  </div>
</template>

<script>
import PieChart from '@/components/pie-chart'
export default {
  name: 'PieChartView',
  components: {
    PieChart
  },
  data () {
    return {
      chartData: {
        data: [5, 10, 15, 20, 25],
        options: {
          width: 540,
          height: 360,
          marge: { top: 30, right: 20, bottom: 30, left: 30 }
        }
      }
    }
  }
}
</script>