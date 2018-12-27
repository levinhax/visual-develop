<template>
  <div id="amap-2d-weather">
    <div id="amapContainer" ref="amapContainer"></div>
    <div class="info">
      <input type="text" v-model="city" placeholder="请输入要查询的城市">
      <input type="button" @click="getWeather" value="查询天气">
      <div v-if="showRealtimeWeatherData">
        <h4>当前城市实时天气 :</h4>
        <p>天气 : {{ realtimeWeatherData.weather }}</p>
        <p>气温 : {{ realtimeWeatherData.temperature }}℃</p>
        <p>风向 : {{ realtimeWeatherData.windDirection }}</p>
        <p>风力 : {{ realtimeWeatherData.windPower }}</p>
        <p>空气湿度 : {{ realtimeWeatherData.humidity }}</p>
        <p>发布时间 : {{ realtimeWeatherData.reportTime }}</p>
        <hr>
      </div>
      <div v-if="showFutureWeatherData">
        <h4>未来几天天气情况 :</h4>
        <ul>
          <li
            v-for="item in futureWeatherData"
            :key="item.index"
          >
            {{ item.date }} — {{ item.dayWeather }} — {{ item.nightTemp }}℃ ~ {{ item.dayTemp }}℃
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amap-2d-weather
  width: 720px
  height: 480px
  margin: 0 auto
  border: 2px dashed $borderColor6
#amapContainer
  width: 720px
  height: 480px
.info
  width: 260px
  height: 500px
  color: #111
  font-size: 14px
  text-align: left
  background-color: #fff
  padding: 5px 4px
  box-sizing: border-box
  overflow-y: scroll
  position: absolute
  top: 90px
  right: 8%
.info input[type="text"]
  width: 150px
  height: 30px
  padding: 3px 5px
  font-size: 14px
  border: 1px solid #333
  border-radius: 3px
.info input[type="button"]
  width: 80px
  height: 30px
  padding: 3px 5px
  font-size: 14px
  background-color: #ccc
  border: 1px solid #333
  border-radius: 3px
  margin: 6px 0 0 5px
.info h4
  font-size: 16px
  font-weight: 500
  margin: 12px 0 6px
.info p
  font-size: 14px
  height: 21px
  line-height: 21px
  margin: 0
.info ul
  padding-left: 8px
  list-style: none
.info li
  font-size: 14px
  line-height: 21px
</style>

<script>
export default {
  name: "amap-2d-weather",
  data() {
    return {
      map: "",
      city: "",
      realtimeWeatherData: "",
      futureWeatherData: "",
      showRealtimeWeatherData: false,
      showFutureWeatherData: false
    };
  },
  created() {},
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap() {
      let AMap = this.AMap || window.AMap;
      // 基本地图加载
      this.map = new AMap.Map("amapContainer", {
        resizeEnable: true,
        zoom: 13, //地图显示的缩放级别
      });
    },
    getWeather() {
      let AMap = this.AMap || window.AMap;
      // 查询实时天气
      AMap.plugin("AMap.Weather", () => {
        //创建天气查询实例
        let weather = new AMap.Weather();
        //执行实时天气信息查询
        weather.getLive(this.city, (err, data) => {
          if (data.info === "OK") {
            this.showRealtimeWeatherData = true;
            this.realtimeWeatherData = data;
          } else {
            this.showRealtimeWeatherData = false;
          }
        });
        //执行天气预报信息查询
        weather.getForecast(this.city, (err, data) => {
          if (data.info === "OK") {
            this.showFutureWeatherData = true;
            this.futureWeatherData = data.forecasts;
          } else {
            this.showFutureWeatherData = false;
          }
        });
      });
    }
  }
};
</script>