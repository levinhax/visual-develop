<template>
  <div class="basisBarChartView example-view">
    <h3>基础柱状图</h3>
    <router-link to="/">首页</router-link>
    <basis-bar-chart :chart-data="barChart.data" :options="barChart.options"></basis-bar-chart>
  </div>
</template>

<script>
import BasisBarChart from '@/components/basis-bar-chart'
export default {
  name: 'BasisBarChartView',
  components: {
    BasisBarChart
  },
  data () {
    return {
      barChart: {
        data: [
          {
            city: '北京',
            temperature: 8
          },
          {
            city: '天津',
            temperature: 11
          },
          {
            city: '上海',
            temperature: 18
          },
          {
            city: '杭州',
            temperature: 18
          },
          {
            city: '广州',
            temperature: 26
          },
          {
            city: '成都',
            temperature: 15
          },
          {
            city: '郑州',
            temperature: 16
          }
        ],
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