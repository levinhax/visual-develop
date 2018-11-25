<template>
    <div>
        <svg ref="pieChart" class="pieChart"></svg>
    </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.pieChart
  border: 1px dashed $borderColor2
</style>

<script>
import * as d3 from 'd3'
export default {
    name: 'pieChart',
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
            // 数据转换
            var arcsData = d3.pie()(chartData);
            var outerRadius = Math.min((width - marge.left - marge.right), (height - marge.top - marge.bottom)) / 2;
            var innerRadius = 0;

            // 画布
            var chartSvg = d3.select(this.$refs.pieChart)
                .attr('width', width)
                .attr('height', height)
            // 作图的容器
            var svgContainer = chartSvg.append('g')
                .attr('transform', 'translate(' + marge.left + ',' + marge.top + ')')
            // 颜色比例尺
            var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
            // 绘制饼图
            var pie_generator = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);
            var pies = svgContainer.selectAll('g')
                .data(arcsData)
                .enter()
                .append('g')
                .attr('transform', 'translate(' + (width - marge.left - marge.right) / 2 + ',' + (height - marge.top - marge.bottom) / 2 + ')')
            pies.append('path')
                .attr('fill', function (d) {
                    return colorScale(d.index);
                })
                .attr('d', function (d) {
                    return pie_generator(d);
                });
            // 在每一个弧线中心添加文本
            pies.append('text')
                .attr('transform', function (d) {
                    return 'translate(' + pie_generator.centroid(d)[0] + ',' + pie_generator.centroid(d)[1] + ')';
                })
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    return d.data;
                });
        }
    }
}
</script>