<template>
  <div>
      <div id="amapContainer" ref="amapContainer"></div>
      <div id="info">
          {{ locStatus }}
          <hr />
          <ul>
            <li v-for="item in infos" :key="item.index">
                {{ item }}
            </li>
          </ul>
          <hr />
          <p>
            由于众多浏览器已不再支持非安全域的定位请求，为保位成功率和精度，请升级您的站点到HTTPS。
          </p>
      </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amapContainer
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor6
#info
  width: 240px
  color: #000
  font-size: 12px
  text-align: left
  background: #fff
  border: 1px solid #ccc
  padding: 8px 12px
  box-sizing: border-box
  position: absolute
  right: 6%
  top: 180px
#info ul
  padding-left: 12px
</style>

<script>
export default {
  name: "amapLocationBrowser",
  data() {
    return {
        locStatus: '定位中...',
        infos: []
    };
  },
  created() {},
  mounted() {
    this.renderMap();
  },
  methods: {
    renderMap () {
      let AMap = this.AMap || window.AMap;
      let map = new AMap.Map("amapContainer", {
        resizeEnable: true, //自适应大小
        zoom: 10 //初始视窗
      });
      AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
          buttonOffset: new AMap.Pixel(10, 20),
          // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,     
          // 定位按钮的排放位置,  RB表示右下
          buttonPosition: 'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.onComplete(result);
          } else {
            this.onError(result);
          }
        });
      });
    },
    onComplete (data) {
      this.locStatus = '定位成功';
      this.infos.push('定位结果：' + data.position);
      this.infos.push('定位类别：' + data.location_type);
      this.infos.push('精度：' + data.accuracy + ' 米');
      this.infos.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    },
    onError (data) {
      this.locStatus = '定位失败';
      console.log(data);
    }
  }
};
</script>