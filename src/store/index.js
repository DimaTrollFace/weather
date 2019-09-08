import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { cookies } from './plugins'

Vue.use(Vuex)

const appUrl = process.env.APP_URL
const cityModel = {
  id: '',
  name: '',
  temp: '',
  icon: '',
  lastUpdate: '',
  status: ''
}

export default new Vuex.Store({
  state: {
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
    ADD_NEW_CITY (state, city) {
      state.cityList.push(city)
    },
    REFRESH_CITY (state, city) {
      state.cityList = state.cityList
        .map(oldCity => oldCity.id === city.id ? city : oldCity)
    },
    DELETE_CITY (state, cityID) {
      state.cityList = state.cityList
        .filter(city => city.id !== cityID)
    }
  },
  actions: {
    prepareCityModel (context, city) {
      return new Promise((resolve, reject) => {
        try {
          resolve(this._vm.setModel(cityModel,
            {
              temp: city.temp || city.main && city.main.temp,
              icon: city.icon || city.weather && city.weather[0].icon,
              lastUpdate: city.lastUpdate,
              status: city.status,
              ...city
            })
          )
        } catch (e) {
          reject(e)
        }
      })
    },
    getWeatherByCityCoords (context, { lat, lon }) {
      return axios
        .get(`${appUrl}/weather?lat=${lat}&lon=${lon}`)
        .then(response => response.data)
        .catch(err => {

        })
    },
    getWeatherByCityID ({ commit }, cityID) {
      return axios
        .get(`${appUrl}/weather?id=${cityID}`)
        .then(response => response.data)
    },
    getWeatherByCityName ({ commit }, cityName = 'London') {
      return axios
        .get(`${appUrl}/weather?q=${cityName}`)
        .then(response => response.data)
    },
    addNewCity ({ dispatch, commit }, city) {
      return Promise
        .resolve()
        .then(() => {
          return dispatch('prepareCityModel', city)
        })
        .then((preparedCityModel) => {
          commit('ADD_NEW_CITY', preparedCityModel)
        })
    },
    refreshCity ({ dispatch, commit }, cityID) {
      return dispatch('getWeatherByCityID', cityID)
        .then((city) => {
          return dispatch('prepareCityModel', { city, lastUpdate: new Date() })
        })
        .then((preparedCityMode) => {
          commit('REFRESH_CITY', preparedCityMode)
        })
    },
    deleteCity ({ commit }, cityID) {
      return Promise
        .resolve()
        .then(() => {
          commit('DELETE_CITY', cityID)
        })
    }
  },
  plugins: [cookies]
})
