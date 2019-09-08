<template>
    <v-container>
      <v-row>
        <v-col>
          <v-btn @click="goToCities">Show cities</v-btn>
        </v-col>
      </v-row>
      <div class="current-city-info" v-if="currentCity">
        <v-row>
          <v-col>
            <h1>Weather in your city</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <full-city-info
              v-bind="currentCity"
            >
            </full-city-info>
          </v-col>
          <v-col>
            <forecast-city-info
              :list="forecastList"
            >
            </forecast-city-info>
          </v-col>
        </v-row>
      </div>
    </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home.vue',
  components: {
    'forecast-city-info': () => import('@/components/Shared/ForecastCityInfo.vue'),
    'full-city-info': () => import('@/components/Shared/FullCityInfo.vue'),
  },
  data: () => ({
    forecastList: []
  }),
  computed: {
    ...mapState([
      'currentCity'
    ])
  },
  methods: {
    goToCities () {
      this.$router.push({ name: 'cities' })
    },
    ...mapActions([
      'getForecastByCityID'
    ])
  },
  watch: {
    currentCity: {
      immediate: true,
      handler(city) {
        if (city) {
          this.getForecastByCityID(city.id)
            .then((forecast) => {
              this.forecastList = forecast.list
            })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
