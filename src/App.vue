<template>
  <v-app>
    <Header></Header>
    <v-content>
      <router-view></router-view>
    </v-content>
    <notifications group="foo" />
  </v-app>
</template>

<script>

import Header from './components/Header/Index'
export default {
  name: 'App',
  components: { Header }
}
</script>
