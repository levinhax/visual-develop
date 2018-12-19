<template>
  <div>
      <div id="amapContainer" ref="amapContainer"></div>
      <div id="info">
          当前城市: {{ locPlace }}
      </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amapContainer
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor5
#info
  width: 160px
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
</style>

<script>
export default {
  name: "amapLocationIp",
  data() {
    return {
        locPlace: '浙江',
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
        center: [116.397428, 39.90923],
        resizeEnable: true, //自适应大小
        zoom: 10 //初始视窗
      });
      AMap.plugin('AMap.CitySearch', () => {
        let citysearch = new AMap.CitySearch();
        citysearch.getLocalCity((status, result) => {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              this.locPlace = result.city;
              let citybounds = result.bounds;
              map.setBounds(citybounds);
            }
          }
        });
      });
    },
  }
};
</script>