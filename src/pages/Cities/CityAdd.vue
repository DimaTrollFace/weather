<template>
  <v-dialog v-model="visible" persistent max-width="290">
    <v-card>
      <v-card-title class="headline">Add City</v-card-title>
      <v-card-text>
        Please enter a city name
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col>
              <v-form>
                <v-text-field
                  v-model="form.cityName"
                  label="City name"
                  required
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="green darken-1" text @click="handlerAddCity">Add</v-btn>
              <v-btn color="red darken-1" text @click="close">Close</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CityAdd',
  data () {
    return {
      visible: false,
      form: this.formModel()
    }
  },
  methods: {
    formModel () {
      return {
        cityName: ''
      }
    },
    checkCityID (id) {
      return this.$store.getters['checkCityID'](id)
    },
    open () {
      this.visible = true
      this.form = this.formModel()
    },
    close () {
      this.visible = false
    },
    handlerAddCity () {
      this.getWeatherByCityName(this.form.cityName)
        .then(city => {
          if (!this.checkCityID(city.id)) {
            return this.addNewCity(city)
          }
          return Promise.reject(new Error(` The city ${city.name} is there`))
        })
        .then(() => {
          this.close()
        })
        .catch(err => {
          // Has not city
        })
    },
    ...mapActions([
      'getWeatherByCityName',
      'addNewCity'
    ])
  }
}
</script>

<style scoped>

</style>
