import axios from './axios'
import helper from './helper'
import Vue from 'vue'

export default function () {
  Vue.use(axios)
  Vue.use(helper)
}
