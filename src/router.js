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
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
