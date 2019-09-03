import axios from 'axios'
export default {
  install (Vue) {
    axios.interceptors.request.use((config) => {
      const { method } = config
      if (method === 'get') {
        config.url += `&APPID=${process.env.APP_ID}`
      }
      return config
    })
    Vue.prototype.$axios = axios
  }
}
