<template>
  <v-card>
    <v-card-title>{{name}}</v-card-title>
    <v-card-text>I'm card text</v-card-text>
    <v-card-actions>
      <v-btn
        @clik="handlerClickMore"
      >More</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CityCard',
  props: {
    id: { type: Number | String, required: true },
    name: { type: String, required: true }
  },
  methods: {
    handlerClickMore () {
      this.$emit('click-more', this.id)
    }
  }
}
</script>

<style scoped>

</style>
