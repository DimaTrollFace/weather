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
  lastUpdate: ''
}

export default new Vuex.Store({
  state: {
    cityList: [],
    currentCity: null
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
    ADD_CITY (state, city) {
      state.cityList.push(city)
    },
    SET_CURRENT_CITY (state, city) {
      state.currentCity = city
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
    setCurrentCity ({ commit }, city) {
      return Promise
        .resolve()
        .then(() => {
          commit('SET_CURRENT_CITY', city)
        })
    },
    prepareCityModel (context, city) {
      return new Promise((resolve, reject) => {
        try {
          resolve(this._vm.setModel(cityModel,
            {
              temp: (city.main && city.main.temp) || city.temp,
              icon: (city.weather && city.weather[0].icon) || city.icon,
              lastUpdate: new Date(city.lastUpdate),
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
          let message = err.response.data.message || message
          this._vm.errorMessage(message)
          throw err
        })
    },
    getWeatherByCityID ({ commit }, cityID) {
      return axios
        .get(`${appUrl}/weather?id=${cityID}`)
        .then(response => response.data)
        .catch(err => {
          let message = err.response.data.message || message
          this._vm.errorMessage(message)
          throw err
        })
    },
    getWeatherByCityName ({ commit }, cityName = 'London') {
      return axios
        .get(`${appUrl}/weather?q=${cityName}`)
        .then(response => response.data)
        .catch(err => {
          let message = err.response.data.message || message
          this._vm.errorMessage(message)
          throw err
        })
    },
    getForecastByCityID (context, cityID) {
      return axios
        .get(`${appUrl}/forecast?id=${cityID}`)
        .then((response) => {
          return response.data
        })
        .catch(err => {
          let message = err.response.data.message || message
          this._vm.errorMessage(message)
          throw err
        })
    },
    addNewCity ({ dispatch, commit }, city) {
      return Promise
        .resolve()
        .then(() => {
          return dispatch('addCity', { ...city, lastUpdate: new Date() })
        })
        .catch(err => {
          this._vm.errorMessage(err.message)
          throw err
        })
    },
    addCity ({ commit, getters, dispatch }, city) {
      return Promise
        .resolve()
        .then(() => {
          return dispatch('prepareCityModel', city)
        })
        .then((preparedCityModel) => {
          if (!getters['checkCityID'](preparedCityModel.id)) {
            commit('ADD_CITY', preparedCityModel)
          }
        })
    },
    refreshCity ({ dispatch, commit }, cityID) {
      return dispatch('getWeatherByCityID', cityID)
        .then((city) => {
          return dispatch('prepareCityModel', { ...city, lastUpdate: new Date() })
        })
        .then((preparedCityMode) => {
          commit('REFRESH_CITY', preparedCityMode)
        })
        .catch(err => {
          this._vm.errorMessage(err.message)
          throw err
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
