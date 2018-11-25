import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BaseBarChartView from './views/base-bar-chart-view.vue'
import BasisBarChartView from './views/basis-bar-chart-view.vue'
import AreaChartView from './views/area-chart-view.vue'
import LineChartView from './views/line-chart-view.vue'
import PieChartView from './views/pie-chart-view.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/basebarchart',
      name: 'basebarchart',
      component: BaseBarChartView
    },
    {
      path: '/basisbarchart',
      name: 'basisbarchart',
      component: BasisBarChartView
    },
    {
      path: '/areachart',
      name: 'areachart',
      component: AreaChartView
    },
    {
      path: '/linechart',
      name: 'linechart',
      component: LineChartView
    },
    {
      path: '/piechart',
      name: 'piechart',
      component: PieChartView
    }
  ]
})