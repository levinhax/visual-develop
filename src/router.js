import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

import htmlProgressView from './views/html-progress-view.vue'

import BaseBarChartView from './views/base-bar-chart-view.vue'
import BasisBarChartView from './views/basis-bar-chart-view.vue'
import AreaChartView from './views/area-chart-view.vue'
import LineChartView from './views/line-chart-view.vue'
import PieChartView from './views/pie-chart-view.vue'
import radialProgressChartView from './views/radial-progress-chart-view.vue'

import amapBasisView from './views/amap-basis-view.vue'
import amap2DView from './views/amap-2d-view.vue'

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
      // html 组件
      path: '/htmlprogress',
      name: 'htmlprogress',
      component: htmlProgressView
    },
    {
      // 图表组件
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
    },
    {
      path: '/radialprogresschart',
      name: 'radialprogresschart',
      component: radialProgressChartView
    },
    {
      // 地图组件
      path: '/amapbasis',
      name: 'amapbasis',
      component: amapBasisView
    },
    {
      path: '/amap2d',
      name: 'amap2d',
      component: amap2DView
    }
  ]
})