import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./pages/Home/Index.vue')
    },
    {
      path: '/cities',
      name: 'cities',
      component: () => import(/* webpackChunkName: "about" */ './pages/Cities/Index.vue')
    },
    {
      path: '/cities/:cityID',
      name: 'city',
      component: () => import(/* webpackChunkName: "about" */ './pages/City/Index.vue')
    }
  ]
})
