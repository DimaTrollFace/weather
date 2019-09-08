<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-btn class="mx-2" dark color="indigo" @click="handlerAddCity">
          <v-icon dark>mdi-plus</v-icon>
          Add city
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        v-for="city in cityList"
        :key="city.id"
        cols="12"
        lg="4"
        md="6"
      >
        <city-card
          v-bind="city"
          @click-more="handlerMore"
          @click-refresh="handlerRefresh"
          @click-delete="handlerDelete"
        ></city-card>
      </v-col>
    </v-row>
    <CityAdd ref="CityAdd"></CityAdd>
  </v-container>
</template>

<script>
import CityAdd from './CityAdd'
import CityCard from './CityCard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cities',
  components: { CityCard, CityAdd },
  computed: {
    ...mapState([
      'cityList'
    ])
  },
  methods: {
    handlerAddCity () {
      this.$refs.CityAdd.open()
    },
    handlerMore (cityID, cityName) {
      this.$router.push({ name: 'city', params: { cityID }, query: { cityName } })
    },
    handlerRefresh (cityID) {
      this.refreshCity(cityID)
    },
    handlerDelete (cityID) {
      this.deleteCity(cityID)
    },
    ...mapActions([
      'refreshCity',
      'deleteCity'
    ])
  }
}
</script>

<style scoped>

</style>
