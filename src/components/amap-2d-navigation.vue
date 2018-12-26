<template>
  <div id="amap-2d-navigation">
    <div id="amapContainer" ref="amapContainer"></div>
    <div id="tips">
      <input type="text" id="keyword1" v-on:blur="getPoint1($event)" placeholder="请输入起点：(选定后搜索)" />
      <br>
      <input type="text" id="keyword2" v-on:blur="getPoint2($event)" placeholder="请输入终点：(选定后搜索)" />
      <br>
      <button @click="searchLoad()">搜索</button>
    </div>
    <div id="panel"></div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amap-2d-navigation
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor5
#amapContainer
  width: 720px
  height: 480px
#tips
  background-color: #eee
  color: #333
  padding: 8px 4px
  border: 1px solid silver
  box-sizing: border-box
  box-shadow: 1px 1px 1px 0px silver
  position: absolute
  top: 100px
  right: 6%
  border-radius: 5px
  overflow: hidden
  line-height: 20px
#tips input[type="text"]
  height: 28px
  border: 0
  padding-left: 5px
  margin-bottom: 8px
  width: 280px
  border-radius: 3px
  outline: none
#tips button
  width: 280px
  height: 30px
  border: 1px solid #ccc
  border-radius: 4px
  cursor: pointer
#panel
  position: fixed
  background-color: white
  max-height: 80%
  overflow-y: auto
  top: 80px
  left: 35px
  width: 280px
#panel .amap-call
  background-color: #009cf9
  border-top-left-radius: 4px
  border-top-right-radius: 4px
#panel .amap-lib-driving
	border-bottom-left-radius: 4px
  border-bottom-right-radius: 4px
  overflow: hidden
</style>

<script>
export default {
  name: "amap-2d-navigation",
  data() {
    return {
      map: '',
      keyword1: '',
      keyword2: '',
      point1: '',
      point2: '',
    };
  },
  created() {},
  mounted() {
    this.renderMap();
    this.getTips1();
    this.getTips2();
  },
  methods: {
    renderMap() {
      let AMap = this.AMap || window.AMap;
      // 基本地图加载
      this.map = new AMap.Map("amapContainer", {
        resizeEnable: true, //自适应大小
        zoom: 13 //初始视窗
      });
    },
    getTips1() {
      let AMap = this.AMap || window.AMap;
      // 输入提示
      AMap.plugin(["AMap.Autocomplete"], () => {
        new AMap.Autocomplete({
          input: "keyword1"
        });
      });
    },
    getTips2() {
      let AMap = this.AMap || window.AMap;
      // 输入提示
      AMap.plugin(["AMap.Autocomplete"], () => {
        new AMap.Autocomplete({
          input: "keyword2"
        });
      });
    },
    getPoint1 (e) {
      this.point1 = e.target.value;
    },
    getPoint2 (e) {
      this.point2 = e.target.value;
    },
    searchLoad () {
      let AMap = this.AMap || window.AMap;
      AMap.plugin("AMap.Driving", () => {
        // 构造路线导航类
        let drving = new AMap.Driving({
          map: this.map,
          // 驾车路线规划策略，AMap.DrivingPolicy.LEAST_TIME是最快捷模式
          policy: AMap.DrivingPolicy.LEAST_TIME,
          panel: "panel"
        });
        // 根据起终点名称规划驾车导航路线
        // let points = [
        //   { keyword: "北京市地震局（公交站）", city: "北京" },
        //   { keyword: "亦庄文化园（地铁站）", city: "北京" }
        // ];
        let points = [
          { keyword: this.point1, city: "北京" },
          { keyword: this.point2, city: "北京" }
        ];
        drving.search(points, (status, result) => {
          if (status === 'complete') {
            console.log('获取驾车数据成功：' + result);
          } else {
            console.log('获取驾车数据失败：' + result);
          }
        });
      });
    }
  }
};
</script>