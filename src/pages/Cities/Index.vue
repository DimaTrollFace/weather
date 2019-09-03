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
      >
        <city-card
          v-bind="city"
        ></city-card>
      </v-col>
    </v-row>
    <CityAdd ref="CityAdd"></CityAdd>
  </v-container>
</template>

<script>
import CityAdd from './CityAdd'
import CityCard from './CityCard'
import { mapState } from 'vuex'
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
    }
  }
}
</script>

<style scoped>

</style>
