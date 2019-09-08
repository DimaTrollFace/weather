<template>
  <v-dialog
    :value="visible"
    max-width="300"
  >
    <v-card>
      <v-card-title>{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <div>
          <v-btn @click="agree">Yes</v-btn>
          <v-btn @click="disagree">No</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogConfirm',
  props: {
    title: { type: String, default: 'Title' },
    text: { type: String, default: 'Default confirm text' }
  },
  data: () => ({
    visible: false
  }),
  methods: {
    open () {
      this.visible = true
    },
    close () {
      this.visible = false
    },
    agree () {
      this.$emit('agree')
      this.close()
    },
    disagree () {
      this.$emit('disagree')
      this.close()
    }
  }
}
</script>

<style scoped>

</style>
