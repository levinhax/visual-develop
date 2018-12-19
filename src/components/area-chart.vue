<template>
  <div>
    <svg ref="areaChart" class="areaChart"></svg>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.areaChart
  border: 1px dashed $borderColor3
</style>

<script>
import * as d3 from 'd3'
export default {
  name: 'areaChart',
  props: {
    chartData: {},
    options: {
      width: '',
      height: '',
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
  methods: {
    renderChart () {
      // 设置图表数据，宽度、高度、边值
      var chartData = this.chartData
      var width = this.options.width
      var height = this.options.height
      var marge = this.options.marge
      // 画布
      var chartSvg = d3.select(this.$refs.areaChart)
        .attr('width', width)
        .attr('height', height)
      // 作图的容器
      var svgContainer = chartSvg.append('g')
        .attr('transform', 'translate(' + marge.left + ',' + marge.top + ')')
      // x轴、y轴比例尺
      var xScale = d3.scaleLinear()
        .domain([0, chartData.length - 1])
        .range([0, width - marge.left - marge.right])
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData)])
        .range([height - marge.top - marge.bottom, 0])
      // 添加x轴、y轴
      var xAxis = d3.axisBottom(xScale)
      var yAxis = d3.axisLeft(yScale)
      svgContainer.append('g')
        .attr('transform', 'translate(0,' + (height - marge.top - marge.bottom) + ')')
        .call(xAxis)
      svgContainer.append('g')
        .attr('transform', 'translate(0, 0)')
        .call(yAxis)
      // 绘制折线
      var line_generator = d3.line()
        .x(function (d, i) {
          return xScale(i);
        })
        .y(function (d) {
          return yScale(d);
        })
        .curve(d3.curveCardinal)
      svgContainer.append('path')
        .attr('d', line_generator(chartData))
        .style('fill', 'none')
        .style('stroke', 'steelblue')
      // 绘制面积图
      var area_generator = d3.area()
        .x(function (d, i) {
          return xScale(i);
        })
        .y0(height - marge.top - marge.bottom)
        .y1(function (d) {
          return yScale(d);
        })
        .curve(d3.curveCardinal)
      svgContainer.append('path')
        .attr('d', area_generator(chartData))
        .style('fill', '#3071a9')

    }
  }
}
</script>
