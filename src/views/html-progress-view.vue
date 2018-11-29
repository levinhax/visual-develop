<template>
    <div class="htmlProgressView example-view">
        <h3>进度条</h3>
        <router-link to="/">首页</router-link>
        <html-progress :chart-data="chartData.chartData" :options="chartData.options"></html-progress>
    </div>
</template>

<script>
import htmlProgress from '@/components/html-progress'
export default {
    name: 'htmlProgressView',
    components: {
        htmlProgress
    },
    data () {
        return {
            chartData: {
                chartData: {
                    endLength: 75
                },
                options: {
                    width: 320,
                    height: 10
                }
            }
        }
    }
}
</script>