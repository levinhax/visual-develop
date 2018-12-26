<template>
  <div id="amap-2d-autocomplete">
    <div id="amapContainer" ref="amapContainer"></div>
    <div id="tip">
      <input type="text" id="keyword" name="keyword" value="请输入关键字：(选定后搜索)" onfocus='this.value=""'/>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amap-2d-autocomplete
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor6
#amapContainer
  width: 720px
  height: 480px
#tip
  background-color: #ddf
  color: #333
  border: 1px solid silver
  box-shadow: 1px 1px 1px 0px silver
  position: absolute
  top: 101px
  right: 6%
  border-radius: 5px
  overflow: hidden
  line-height: 20px
#tip input[type="text"]
  height: 25px
  border: 0
  padding-left: 5px
  width: 280px
  border-radius: 3px
  outline: none
</style>

<script>
export default {
  name: "amap-2d-autocomplete",
  data() {
    return {
      map: '',
    };
  },
  created() {},
  mounted() {
    this.renderMap();
    this.searchPlace();
  },
  methods: {
    renderMap() {
      let AMap = this.AMap || window.AMap;
      // 基本地图加载
      this.map = new AMap.Map("amapContainer", {
        resizeEnable: true,
        center: [116.397428, 39.90923],//地图中心点
        zoom: 13,//地图显示的缩放级别
        keyboardEnable: false
      });
    },
    searchPlace() {
      let AMap = this.AMap || window.AMap;
      // 输入提示
      AMap.plugin(["AMap.Autocomplete", "AMap.PlaceSearch"], () => {
        let autoOptions = {
          city: "北京", //城市，默认全国
          input: "keyword"//使用联想输入的input的id
        };
        let autocomplete= new AMap.Autocomplete(autoOptions);
        let placeSearch = new AMap.PlaceSearch({
          city:'北京',
          map: this.map
        });
        AMap.event.addListener(autocomplete, "select", (e) => {
          //TODO 针对选中的poi实现自己的功能
          placeSearch.setCity(e.poi.adcode);
          placeSearch.search(e.poi.name)
        });
      });
    }
  }
};
</script>