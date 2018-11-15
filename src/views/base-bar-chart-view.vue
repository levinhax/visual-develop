<template>
  <div class="baseBarChartView example-view">
    <h3>一个简单的柱形图</h3>
    <router-link to="/">首页</router-link>
    <base-bar-chart :chartData="chartData.data" :width="chartData.width" :options="chartData.options"></base-bar-chart>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseBarChart from '@/components/base-bar-chart'
export default {
  name: 'BaseBarChartView',
  components: {
    BaseBarChart
  },
  data () {
    return {
      chartData: {
        data: [4, 6, 9, 2, 10],
        width: 540,
        options: {
          barHeight: 20,
          marge: { top: 30, right: 20, bottom: 30, left: 20 }
        }
      }
    }
  }
}
</script>

<style lang="sass">
  
</style>
