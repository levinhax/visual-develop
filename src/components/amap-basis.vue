<template>
  <div id="amapContainer" ref="amapContainer"></div>
</template>

<style lang="sass" scoped>
@import '../scss/variables.scss'
#amapContainer
  width: 720px
  height: 480px
  margin: 0 auto
  border: 1px dashed $borderColor5
</style>

<script>
export default {
  name: "amapContainer",
  data() {
    return {};
  },
  created() {},
  mounted() {
      this.renderMap();
  },
  methods: {
    renderMap () {
      let AMap = this.AMap || window.AMap;
      new AMap.Map("amapContainer", {
        resizeEnable: true, //自适应大小
        zoom: 13 //初始视窗
      });
    }
  }
};
</script>