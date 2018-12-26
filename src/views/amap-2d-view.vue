<template>
  <div class="amap2DView example-view">
    <h3>高德2D地图</h3>
    <nav>
      <select v-model="selected">
        <option disabled value>请选择</option>
        <option
          v-for="option in options"
          v-bind:value="option.value"
          :key="option.index"
        >{{ option.text }}</option>
      </select>
      <span>Selected: {{ selected }}</span>
      <amap2-d-autocomplete v-if="selected==1"></amap2-d-autocomplete>
      <amap2-d-navigation v-if="selected==2"></amap2-d-navigation>
    </nav>
  </div>
</template>

<style lang="sass" scoped>
nav
  margin-bottom: 12px
nav select
  background: rgba(0,0,0,0)
  width: 264px
  height: 35px
  font-size: 16px
  color: white
  text-align: center
  border: 1px #1a1a1a solid
  border-radius: 5px
nav option
  color: #111
  background: #A6E1EC
  line-height: 20px
nav select:focus
  border: 1px solid #ddd
  box-shadow: 0 0 8px 1px #DDD
nav option:hover
  background: #EBCCD1
</style>

<script>
import amap2DNavigation from '@/components/amap-2d-navigation'
import amap2DAutocomplete from '@/components/amap-2d-autocomplete'
export default {
  name: "amap2DView",
  data() {
    return {
      selected: 1,
      options: [
        {
          text: "输入提示与POI搜索",
          value: 1
        },
        {
          text: "路线规划",
          value: 2
        },
        {
          text: "轨迹纠偏",
          value: 3
        }
      ]
    };
  },
  components: {
      amap2DAutocomplete,
      amap2DNavigation
  }
};
</script>