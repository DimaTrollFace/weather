import axios from './axios'
import helper from './helper'
import cookie from './cookie'

export default function (Vue) {
  Vue.use(axios)
  Vue.use(helper)
  Vue.use(cookie)
}
