<template>
  <div>
    <svg ref="basisBarChart" class="basisBarChart"></svg>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.basisBarChart
  border: 1px dashed $borderColor3
</style>

<script>
import * as d3 from 'd3'
export default {
  name: 'basisBarChart',
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
      var chartSvg = d3.select(this.$refs.basisBarChart)
        .attr('width', width)
        .attr('height', height)
      // 作图的容器
      var g = chartSvg.append('g')
        .attr('transform', 'translate(' + marge.left + ',' + marge.top + ')')
      // x轴、y轴比例尺
      var xScale = d3.scaleBand()
        .domain(chartData.map(function (d) {
          return d.city
        }))
        .rangeRound([0, width - marge.left - marge.right])
      var yScale = d3.scaleLinear()
        .domain([0, d3.max(chartData.map(function (d) {
          return d.temperature
        }))])
        .rangeRound([height - marge.top - marge.bottom, 0])
      // 添加x轴、y轴
      var xAxis = d3.axisBottom(xScale)
      var yAxis = d3.axisLeft(yScale)
      g.append('g')
        .attr('transform', 'translate(0,' + (height - marge.top - marge.bottom) + ')')
        .call(xAxis)
      g.append('g')
        .attr('transform', 'translate(0, 0)')
        .call(yAxis)
        .append('text')
      // 添加矩形
      var gs = g.selectAll('.rect')
        .data(chartData)
        .enter()
        .append('g')
      var rectPadding = 50
      gs.append('rect')
        .attr('class', 'myRect')
        .attr('x', function (d, i) {
          return (width - marge.left - marge.right) / chartData.length * i + rectPadding / 2
        })
        // .attr('y', function (d) {
        //   return yScale(d.temperature)
        // })
        // .attr('width', function () {
        //   return xScale.step() - rectPadding
        // })
        // .attr('height', function (d) {
        //   return height - marge.top - marge.bottom - yScale(d.temperature)
        // })
        // .attr('fill', 'green')
        .attr('y', function () {
          return yScale(yScale.domain()[0])
        })
        .attr('width', function () {
          return xScale.step() - rectPadding
        })
        .attr('height', function () {
          return 0
        })
        .attr('fill', 'green')
        .transition()
        .duration(1200)
        .delay(function (d, i) {
          return i * 400
        })
        // .ease(d3.easeElasticInOut)
        .attr('y', function (d) {
          return yScale(d.temperature)
        })
        .attr('height', function (d) {
          return height - marge.top - marge.bottom - yScale(d.temperature)
        })
      // 添加label文本
      gs.append('text')
        .attr('x', function (d, i) {
          return (width - marge.left - marge.right) / chartData.length * i + rectPadding / 2
        })
        .attr('y', function (d) {
          return yScale(d.temperature)
        })
        // .attr('dx', function (i) {
        //   return (xScale.step(i) - rectPadding) / 2
        // })
        .attr('dy', '-.5rem')
        .attr('fill', '#fff')
        .style('font-size', '12px')
        .text(function (d) {
          return d.temperature + '°'
        })
      // 交互事件
      chartSvg.selectAll('.myRect')
        .on('mouseover', function () {
          this.setAttribute('fill', 'red')
        })
        .on('mouseout', function () {
          this.setAttribute('fill', 'green')
        })
    }
  }
}
</script>
