import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import initFilters from './filters'
import initPlugins from './plugins'
import initApp from './initApp'
import Notifications from 'vue-notification'

Vue.config.productionTip = false
Vue.use(Notifications)
initPlugins(Vue)
initFilters(Vue)
const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})
initApp(app)
window.app = app
app.$mount('#app')
