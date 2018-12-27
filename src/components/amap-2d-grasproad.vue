<template>
  <div id="amap-2d-grasproad">
    <div id="amapContainer" ref="amapContainer"></div>
    <div class="info">纠偏前:
      <div class="color" style="background-color:red"></div>
      <br>纠偏后:
      <div class="color" style="background-color:#0091ea"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amap-2d-grasproad
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor5
#amapContainer
  width: 720px
  height: 480px
.info
  width: 160px
  color: #111
  font-size: 14px
  text-align: left
  background-color: #fff
  padding: 5px 4px
  position: absolute
  top: 120px
  right: 10%
.color
  width: 80px
  height: 0.6rem
  display: inline-block
</style>

<script>
export default {
  name: "amap-2d-grasproad",
  data() {
    return {
      map: "",
      graspRoad: "",
      pathParam: "",
      path1: [],
      path2: [],
      oldLine: "",
      newPathParam: "",
      newLine: ""
    };
  },
  created() {},
  mounted() {
    this.renderMap();
    this.grashDriving();
  },
  methods: {
    renderMap() {
      let AMap = this.AMap || window.AMap;
      // 基本地图加载
      this.map = new AMap.Map("amapContainer", {
        resizeEnable: true,
        center: [116.397428, 39.90923], //地图中心点
        zoom: 13, //地图显示的缩放级别
        keyboardEnable: false
      });
    },
    grashDriving() {
      let AMap = this.AMap || window.AMap;
      // 原始数据，x、y、sp、ag、tm分别代表经度、纬度、速度、角度、时间
      this.pathParam = [
        { x: 116.478928, y: 39.997761, sp: 19, ag: 0, tm: 1478031031 },
        { x: 116.478907, y: 39.998422, sp: 10, ag: 0, tm: 2 },
        { x: 116.479384, y: 39.998546, sp: 10, ag: 110, tm: 3 },
        { x: 116.481053, y: 39.998204, sp: 10, ag: 120, tm: 4 },
        { x: 116.481793, y: 39.997868, sp: 10, ag: 120, tm: 5 },
        { x: 116.482898, y: 39.998217, sp: 10, ag: 30, tm: 6 },
        { x: 116.483789, y: 39.999063, sp: 10, ag: 30, tm: 7 },
        { x: 116.484674, y: 39.999844, sp: 10, ag: 30, tm: 8 }
      ];
    //   let path1 = [];
      for (let i = 0; i < this.pathParam.length; i += 1) {
        this.path1.push([this.pathParam[i].x, this.pathParam[i].y]);
      }
      this.oldLine = new AMap.Polyline({
        path: this.path1,
        strokeWeight: 8,
        strokeOpacity: 1,
        strokeColor: "red"
      });
      this.map.add(this.oldLine);
      // 轨迹纠偏
      AMap.plugin(["AMap.GraspRoad"], () => {
        this.graspRoad = new AMap.GraspRoad();
        this.graspRoad.driving(this.pathParam, (error, result) => {
          if (!error) {
            this.newPathParam = result.data.points;
            for (let i = 0; i < this.newPathParam.length; i += 1) {
              this.path2.push([this.newPathParam[i].x, this.newPathParam[i].y]);
            }
            this.newLine = new AMap.Polyline({
              path: this.path2,
              strokeWeight: 8,
              strokeOpacity: 0.8,
              strokeColor: "#0091ea",
              showDir: true
            });
            this.map.add(this.newLine);
            this.map.setFitView();
          }
        });
      });
    }
  }
};
</script>