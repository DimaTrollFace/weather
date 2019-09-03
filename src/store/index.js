import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const appUrl = process.env.APP_URL
const cityModel = {
  id: '',
  name: ''
}

export default new Vuex.Store({
  state: {
    userCity: null,
    currentCity: null,
    cityList: []
  },
  getters: {
    cityMap (state) {
      return state.cityList.reduce((map, city) => {
        map[city.id] = city
        return map
      }, {})
    },
    checkCityID (state, getters) {
      return id => !!getters.cityMap[id]
    }
  },
  mutations: {
    SET_CURRENT_CITY (state, city) {
      state.currentCity = city
    },
    ADD_NEW_CITY (state, city) {
      state.cityList.push(city)
    }
  },
  actions: {
    getWeatherByCityID ({ commit }, cityID) {
      return axios
        .get(`${appUrl}/weather?id=2172797`)
        .then(response => response.data)
    },
    getWeatherByCityName ({ commit }, cityName = 'London') {
      return axios
        .get(`${appUrl}/weather?q=${cityName}`)
        .then(response => response.data)
    },
    addNewCity ({ commit }, city) {
      return Promise
        .resolve()
        .then(() => {
          commit('ADD_NEW_CITY', this._vm.setModel(cityModel, city))
        })
    }
  }
})
