<template>
  <div class="areaChartView example-view">
    <h3>基础面积图</h3>
    <router-link to="/">首页</router-link>
    <area-chart :chart-data="chartData.data" :options="chartData.options"></area-chart>
  </div>
</template>

<script>
import AreaChart from '@/components/area-chart'
export default {
  name: 'AreaChartView',
  components: {
    AreaChart
  },
  data () {
    return {
      chartData: {
        data: [0, 3, 6, 8, 5, 10],
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