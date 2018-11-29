<template>
  <div>
    <svg ref="radialProgressChart" class="radialProgressChart"></svg>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.radialProgressChart
  border: 1px dashed $borderColor5
</style>

<script>
import * as d3 from 'd3';
export default {
  name: 'radialProgressChart',
  props: {
    chartData: {},
    options: {
      width: '',
      height: ''
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {
    this.renderChart();
  },
  methods: {
    renderChart () {
      // 设置图表数据，宽度、高度、边值
      var chartData = this.chartData
      var width = this.options.width
      var height = this.options.height

      // 画布
      var chartSvg = d3.select(this.$refs.radialProgressChart)
        .attr('width', width)
        .attr('height', height)
      // 作图的容器
      var svgContainer = chartSvg.append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
      // 圆弧构造函数
      var arcGenerator = d3.arc()
        .innerRadius(chartData.innerRadius)
        .outerRadius(chartData.outerRadius)
        .startAngle(chartData.startAngle);
      // 进度条绘制
      // 背景圆
      svgContainer.append('path')
        .datum({ endAngle: 2 * Math.PI })
        .style('fill', '#FDF5E6')
        .attr('d', arcGenerator);
      var arcPicture2 = svgContainer.append('path')
        .datum({ endAngle: 0 })
        .style('fill', '#FFC125')
        .attr('d', arcGenerator);
      // 圆心处的数据
      svgContainer.append('text')
        .text('')
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('font-size', '32px');
      var colorLinear = d3.scaleLinear()
        .domain([0, 100])
        .range(['#EEE685', '#EE3B3B']);
      d3.interval(function () {
        arcPicture2.transition().duration(750).attrTween('d', function (d) {
          var compute = d3.interpolate(d.endAngle, chartData.endAngle);
          return function (t) {
            d.endAngle = compute(t);
            var data = d.endAngle / Math.PI / 2 * 100;
            // 设置数值
            d3.select('text').text(data.toFixed(0) + '%');
            // 将新参数传入，生成新的圆弧构造器
            return arcGenerator(d);
          }
        })
        .styleTween('fill', function (d) {
          return function () {
            var data = d.endAngle / Math.PI / 2 * 100;
            // 返回数值对应的颜色
            return colorLinear(data);
          }
        })
      }, 1000);
    }
  }
}
</script>
