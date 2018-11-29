<template>
    <div class="radialProgressChartView example-view">
        <h3>环形进度条</h3>
        <router-link to="/">首页</router-link>
        <radial-progress-chart :chart-data="chartData.chartData" :options="chartData.options"></radial-progress-chart>
    </div>
</template>

<script>
import radialProgressChart from '@/components/radial-progress-chart'
export default {
    name: 'radialProgressChartView',
    components: {
        radialProgressChart
    },
    data () {
        return {
            chartData: {
                chartData: {
                    innerRadius: 90,
                    outerRadius: 100,
                    startAngle: 0,
                    endAngle: Math.PI * 3 / 2
                },
                options: {
                    width: 540,
                    height: 400
                }
            }
        }
    }
}
</script>