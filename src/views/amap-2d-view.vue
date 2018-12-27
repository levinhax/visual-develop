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
      <span v-if="false">Selected: {{ selected }}</span>
      <amap2-d-weather v-if="selected==1"></amap2-d-weather>
      <amap2-d-autocomplete v-if="selected==2"></amap2-d-autocomplete>
      <amap2-d-navigation v-if="selected==3"></amap2-d-navigation>
      <amap2-d-grasproad v-if="selected==4"></amap2-d-grasproad>
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
nav option:hover
  background: #EBCCD1
</style>

<script>
import amap2DWeather from '@/components/amap-2d-weather'
import amap2DNavigation from '@/components/amap-2d-navigation'
import amap2DAutocomplete from '@/components/amap-2d-autocomplete'
import amap2DGrasproad from '../components/amap-2d-grasproad'
export default {
  name: "amap2DView",
  data() {
    return {
      selected: 1,
      options: [
        {
          text: "天气查询",
          value: 1
        },
        {
          text: "输入提示与POI搜索",
          value: 2
        },
        {
          text: "路线规划",
          value: 3
        },
        {
          text: "轨迹纠偏",
          value: 4
        }
      ]
    };
  },
  components: {
      amap2DWeather,
      amap2DAutocomplete,
      amap2DNavigation,
      amap2DGrasproad
  }
};
</script>