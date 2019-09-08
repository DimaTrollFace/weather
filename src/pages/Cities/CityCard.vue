<template>
  <v-card>
    <v-card-title>{{name}}</v-card-title>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col>
                <img :src="`http://openweathermap.org/img/wn/${icon}@2x.png`">
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="8">
            <v-row>
              <v-col cols="12">
                <span>Temp:</span>
                <span>{{temp | kelvinToCelsius }}</span>
              </v-col>
              <v-col cols="12">
                <span>Last Update: </span>
                <span>{{lastUpdate | formatDate}}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-row justify="space-between">
          <v-col>
            <v-btn @click="handlerMore">More</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="handlerRefresh">Refresh</v-btn>
          </v-col>
          <v-col>
            <v-btn @click="handlerDelete">Delete</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    id: { type: [Number, String], required: true },
    name: { type: String, required: true },
    icon: { type: String, required: true },
    temp: { type: [Number, String] },
    lastUpdate: { type: [Date, String] }
  },
  methods: {
    handlerMore () {
      this.$emit('click-more', this.id, this.name)
    },
    handlerRefresh () {
      this.$emit('click-refresh', this.id)
    },
    handlerDelete () {
      this.$emit('click-delete', this.id)
    }
  },
  filters: {
    'formatDate': function (value) {
      let date = new Date(value)
      return date.toLocaleString()
    }
  }
}
</script>

<style scoped>

</style>
