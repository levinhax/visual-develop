<template>
  <div class="home">
    <h2 id="nav-title">组件示例</h2>
    <section class="nav-content nav-content1">
      <ul>
        <li v-for="item in htmlLists" :key="item.name">
          <a :href="item.listUrl" target="_blank">{{ item.listName }}</a>
        </li>
      </ul>
    </section>
    <section class="nav-content nav-content2">
      <ul>
        <li v-for="item in barLists" :key="item.name">
          <a :href="item.listUrl" target="_blank">{{ item.listName }}</a>
        </li>
      </ul>
    </section>
    <section class="nav-content nav-content3">
      <ul>
        <li v-for="item in mapLists" :key="item.name">
          <a :href="item.listUrl" target="_blank">{{ item.listName }}</a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      htmlLists: [],
      barLists: [],
      mapLists: []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('http://localhost:8080/data/list.json').then((response) => {
        // this.amount = response.data.length
        this.htmlLists = response.data.htmlLists;
        this.barLists = response.data.barLists;
        this.mapLists = response.data.mapLists;
      }).catch(function (error) {
        console.log('获取数据出错: ' + error)
      })
    }
  }
}
</script>

<style lang="sass">
@import '../scss/variables.scss'
@import '../scss/site.scss'
#nav-title
  width: 320px
  padding: 3px 0px
  color: #57bcff
  font-size: 20px
  font-weight: 500
  text-align: center
  border: 1px dashed rgb(171, 191, 64)
  position: relative
  left: 360px
.nav-content
  text-align: center
  width: $nav-width
  min-height: 200px
  position: absolute
.nav-content1
  left: 360px
  border: 1px dashed rgb(135, 64, 191)
  transform: rotateY(15deg)
.nav-content2
  left: 540px
  border: 1px dashed rgb(91, 64, 191)
  transform: rotateY(-15deg)
.nav-content3
  left: 720px
  border: 1px dashed rgb(64, 184, 191)
  transform: rotateY(15deg)
.nav-content ul
  padding: 0
  li
    list-style: none
    height: 28px
    a
      color: #fff
      text-align: center
      text-decoration: none
      font-size: 12px
      font-weight: 500
      line-height: 28px
.example-view
  text-align: center
  margin-top: 30px
.example-view h3
  text-align: center
.example-view a
  display: inline-block
  margin: 20px 0 30px
  color: $main-color
</style>

