import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import initPlugins from './plugins'
import initApp from './initApp'

Vue.config.productionTip = false
initPlugins()
const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})
initApp(app)
window.app = app
app.$mount('#app')
