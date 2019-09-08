import axios from './axios'
import helper from './helper'
import cookie from './cookie'
import Vue from 'vue'

export default function () {
  Vue.use(axios)
  Vue.use(helper)
  Vue.use(cookie)
}
