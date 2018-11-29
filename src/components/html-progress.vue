<template>
    <div class="htmlProgress">
        <div class="progressbar" ref="progressbar">
            <div class="progress" ref="progress"></div>
            <p ref="progressText"></p>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
.htmlProgress
  width: 600px
  height: 320px
  margin: 0 auto
  position: relative
  border: 1px dashed $borderColor1
.progressbar
  position: absolute
  top: 150px
  left: 120px
  width: 0px
  height: 0px
  border: 1px solid #63B8FF
  border-radius: 5px
  text-align: center
  line-height: 10px
  font-size: 10px
.progress
  position: absolute
  width: 0
  height: 100%
  background: #BFEFFF
  border-radius: 5px
  z-index: -1
.progress
  background-size: 30px 30px
  background-image: -webkit-linear-gradient(-45deg, #63B8FF, #63B8FF 25%, #BFEFFF 25%, #BFEFFF 50%, #63B8FF 50%, #63B8FF 75%, #BFEFFF 75%, #BFEFFF)
  background-image: -moz-linear-gradient(-45deg, #63B8FF, #63B8FF 25%, #BFEFFF 25%, #BFEFFF 50%, #63B8FF 50%, #63B8FF 75%, #BFEFFF 75%, #BFEFFF)
  background-image: linear-gradient(-45deg, #63B8FF, #63B8FF 25%, #BFEFFF 25%, #BFEFFF 50%, #63B8FF 50%, #63B8FF 75%, #BFEFFF 75%, #BFEFFF)
  -webkit-animation: progressAnimate 1.5s linear infinite
  -moz-animation: progressAnimate 1.5s linear infinite
  animation: progressAnimate 1.5s linear infinite

@-webkit-keyframes progressAnimate
  from
    background-position: 0 0
  to
    background-position: 60px 30px

@-moz-keyframes progressAnimate
  from
    background-position: 0 0
  to
    background-position: 60px 30px

@keyframes progressAnimate
  from
    background-position: 0 0
  to
    background-position: 60px 30px
</style>

<script>
export default {
    name: 'htmlProgress',
    props: {
        chartData: {},
        options: {
            width: '',
            height: ''
        }
    },
    data () {
        return {
            progressCent: 0
        }
    },
    created () {},
    mounted () {
        this.renderChart();
    },
    methods: {
        renderChart () {
            // 设置图表数据
            var chartData = this.chartData;
            var barWidth = this.options.width
            var barHeight = this.options.height
            this.$refs.progressbar.style.width = barWidth + 'px';
            this.$refs.progressbar.style.height = barHeight + 'px';
            // 定时更新
            var timer = setInterval(() => {
                if (this.progressCent === chartData.endLength) {
                    clearInterval(timer);
                } else {
                    this.progressCent ++;
                }
                this.$refs.progressText.innerHTML = this.progressCent + '%';
                this.$refs.progress.style.width = this.progressCent + '%';
            }, 60);
        }
    }
}
</script>