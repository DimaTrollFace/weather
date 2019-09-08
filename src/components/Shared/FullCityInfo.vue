<template>
  <v-card>
    <v-card-title>
      Weather in {{name}}, {{country}}
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col class="col-5">
            <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`">
          </v-col>
          <v-col class="col-7">
            <div>
              <span>Temperature: </span>
              <span>{{temp | kelvinToCelsius}}</span>
            </div>
            <div>
              <span>Cloudiness: </span>
              <span>{{cloudiness}}</span>
            </div>
            <div>
              <span>Pressure: </span>
              <span>{{pressure}} hpa</span>
            </div>
            <div>
              <span>Humidity: </span>
              <span>{{humidity}} %</span>
            </div>
            <div>
              <span>Wind degree: </span>
              <span>{{degree}}</span>
            </div>
            <div>
              <span>Wind speed: </span>
              <span>{{speed}} m/s</span>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'FullCityInfo',
  props: {
    id: { type: Number },
    name: { type: String },
    weather: { type: Array },
    main: { type: Object },
    sys: { type: Object },
    wind: { type: Object }
  },
  computed: {
    country () {
      return this.sys.country || 'UNKNOWN'
    },
    icon () {
      return this.weather && this.weather[0] && this.weather[0].icon
    },
    temp () {
      return this.main && this.main.temp
    },
    cloudiness () {
      return this.weather && this.weather[0] && this.weather[0].description
    },
    pressure () {
      return this.main && this.main.pressure
    },
    humidity () {
      return this.main && this.main.humidity
    },
    degree () {
      return this.wind && this.wind.deg
    },
    speed () {
      return this.wind && this.wind.speed
    }
  }
}
</script>

<style scoped>

</style>
