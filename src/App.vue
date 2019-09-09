<template>
  <v-app>
    <Header></Header>
    <v-content>
      <transition name="rout" mode="out-in">
        <router-view></router-view>
      </transition>
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
<style scoped>
.rout-enter-active {
  transition: all .5s ease;
}
.rout-leave-active {
  transition: all 1s ease;
}
.rout-enter, .rout-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
</style>
