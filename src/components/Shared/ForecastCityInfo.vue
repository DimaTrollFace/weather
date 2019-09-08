<template>
  <v-card v-if="todayList.length > 0">
    <v-card-title>Temperature for day</v-card-title>
    <v-card-text>
      <div class="list">
        <div v-for="(item, i) in todayList" :key="i" class="list-item">
          <div class="item-data">{{item.date | filterHour}}</div>
          <div class="item-temp">{{item.temp | kelvinToCelsius | filterCelsius}}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'ForecastCityInfo',
  props: {
    list: { type: Array, default: () => ([]) }
  },
  computed: {
    normalizedList () {
      return this.list.map(data => {
        return {
          date: new Date(+Date.parse(data.dt_txt + '.000Z')),
          temp: data.main.temp
        }
      })
    },
    todayList () {
      return this.normalizedList
        .filter((data) => {
          return data.date.getDay() === new Date().getDay()
        })
    }
  },
  filters: {
    'filterHour': function (value) {
      if (value instanceof Date) {
        return `${value.getHours()} : 00`
      }
    },
    'filterCelsius': function (value) {
      let num = parseInt(value)
      let prefix = num > 0 ? '+' : '-'
      return `${prefix}${num}`
    }
  }
}
</script>

<style scoped>
  .list{
    display: flex
  }
  .list-item{
    text-align: center;
    padding: 2px;
    margin: 2px;
  }
  .item-data {
    border-bottom: 1px solid #b3d4fc
  }
</style>
