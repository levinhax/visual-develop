<template>
  <div>
    <svg ref="baseBarChart" class="baseBarChart"></svg>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.baseBarChart
  border: 1px dashed $borderColor2
</style>

<script>
import * as d3 from 'd3'
export default {
  name: 'baseBarChart',
  props: {
    chartData: {},
    width: {},
    options: {
      barHeight: '',
      marge: ''
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {
    this.renderChart()
  },
  watch: {},
  methods: {
    renderChart () {
      // 设置图表数据，图表宽度、矩形宽度、marge
      var chartData = this.chartData
      var width = this.width
      var barHeight = this.options.barHeight
      var marge = this.options.marge
      // 画布
      var chartSvg = d3.select(this.$refs.baseBarChart)
        .attr('width', width + marge.left + marge.right)
        .attr('height', barHeight * this.chartData.length + marge.top + marge.bottom)
      // 作图的容器
      var svgContainer = chartSvg.append('g')
        .attr('transform', 'translate(' + marge.left + ',' + marge.top + ')')
      // x轴比例尺
      var xScale = d3.scaleLinear()
        .domain([0, d3.max(chartData)])
        .range([0, width - marge.left - marge.right])
      // 矩形和label文字组合的容器
      var g = svgContainer.selectAll('g')
        .data(chartData)
        .enter()
        .append('g')
        .attr('transform', function (d, i) {
          return 'translate(0,' + i * barHeight + ')'
        })
      // 添加矩形
      g.append('rect')
        .attr('width', xScale)
        .attr('height', barHeight - 5)
        .attr('fill', 'green')
      // 添加label文字
      g.append('text')
        .attr('x', function (d) { return xScale(d) + 5 })
        .attr('y', barHeight - 12)
        .attr('dy', '3px')
        .attr('fill', '#fff')
        .style('font-size', '12px')
        .text(function (d) { return d })
    }
  }
}
</script>

