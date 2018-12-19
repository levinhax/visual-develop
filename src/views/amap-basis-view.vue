<template>
    <div class="amapBasisView example-view">
        <h3>高德地图-定位</h3>
        <router-link to="/">首页</router-link>
        <nav>
            <input type="radio" id="basis" value="0" v-model="pickedMap">
            <label for="basis">默认加载</label>
            <span>&nbsp;&nbsp;</span>
            <input type="radio" id="browser" value="1" v-model="pickedMap">
            <label for="browser">浏览器定位</label>
            <span>&nbsp;&nbsp;</span>
            <input type="radio" id="ip" value="2" v-model="pickedMap">
            <label for="ip">IP 定位</label>
        </nav>
        <amap-basis v-if="pickedMap==0"></amap-basis>
        <amap-location-browser v-if="pickedMap==1"></amap-location-browser>
        <amap-location-ip v-if="pickedMap==2"></amap-location-ip>
    </div>
</template>

<script>
import amapBasis from '@/components/amap-basis'
import amapLocationBrowser from '@/components/amap-location-browser'
import amapLocationIp from '@/components/amap-location-ip'
export default {
    name: 'amapBasisView',
    components: {
        amapBasis,
        amapLocationBrowser,
        amapLocationIp
    },
    data () {
        return {
            pickedMap: 0
        }
    }
}
</script>

<style lang="sass" scoped>
nav
  margin-bottom: 12px  
</style>