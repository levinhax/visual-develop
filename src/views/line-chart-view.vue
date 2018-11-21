<template>
  <div class="lineChartView example-view">
    <h3>基础折线图</h3>
    <router-link to="/">首页</router-link>
    <line-chart :chart-data="chartData.data" :options="chartData.options"></line-chart>
  </div>
</template>

<script>
import LineChart from '@/components/line-chart'
export default {
  name: 'LineChartView',
  components: {
    LineChart
  },
  data () {
    return {
      chartData: {
        data: [1, 4, 6, 2, 9, 9, 12],
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