<template>
  <v-container>
    <v-row>
      <v-col>
        <full-city-info
          v-if="isInit"
          v-bind="city"
        ></full-city-info>
      </v-col>
      <v-col>
        <forecast-city-info
          :list="forecastList"
        ></forecast-city-info>
      </v-col>
    </v-row>
    <dialog-confirm
      ref="dialogConfirm"
      :title="confirmTitle"
      :text="confirmText"
      @agree="addCityToList"
    ></dialog-confirm>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'City',
  components: {
    'forecast-city-info': () => import('@/components/Shared/ForecastCityInfo.vue'),
    'full-city-info': () => import('@/components/Shared/FullCityInfo.vue'),
    'dialog-confirm': () => import('@/components/Shared/DialogConfirm.vue')
  },
  data () {
    return {
      isInit: false,
      city: this.fullCityModel(),
      forecastList: [],
      confirmTitle: 'Add city to cities'
    }
  },
  computed: {
    confirmText () {
      return `Do you want to add city "${this.city.name}" to your cities?`
    }
  },
  methods: {
    addCityToList () {
      this.addNewCity(this.city)
    },
    fullCityModel () {
      return {
        id: '',
        name: '',
        weather: [],
        main: {},
        sys: {},
        wind: {}
      }
    },
    getCity (cityID, cityName) {
      return this.getWeatherByCityID(cityID)
        .then(null, () => {
          return this.getWeatherByCityName(cityName)
        })
    },
    initCityData (cityID, cityName) {
      this.isInit = false
      this.getCity(cityID, cityName)
        .then(city => {
          return this.initModel(city)
        })
        .then(city => {
          if (!this.$store.getters['checkCityID'](city.id)) {
            this.$refs.dialogConfirm.open()
          }
          this.isInit = true
          return city
        })
        .then(city => {
          return this.getForecastByCityID(city.id)
            .then((forecast) => {
              this.forecastList = forecast.list
            })
        })
        .catch(err => {
          this.$notify(err.message)
        })
    },
    initModel (city) {
      this.city = this.setModel(this.fullCityModel(), city)
      return this.city
    },
    ...mapActions([
      'getWeatherByCityName',
      'getWeatherByCityID',
      'getForecastByCityID',
      'addNewCity'
    ])
  },
  beforeRouteEnter (from, to, next) {
    next((vm) => {
      const cityID = vm.$route.params.cityID
      const cityName = vm.$route.query.cityName
      vm.initCityData(cityID, cityName)
    })
  }
}
</script>

<style scoped>

</style>
