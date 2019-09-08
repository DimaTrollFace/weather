<template>
  <v-app-bar
    color="deep-purple accent-4"
    dark
    app
  >
    <v-toolbar-title>
      <router-link to="/" class="link">
        Weather
      </router-link>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
  .link {
    text-decoration: none;
    color: white;
  }
</style>
